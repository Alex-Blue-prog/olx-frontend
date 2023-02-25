import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as C from "./styles";
import useApi from "../../helpers/OlxAPI";
import {PageContainer} from "../../components/MainComponents";
// import {Slide} from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";

export const AdPage = () => {
    const api = useApi();
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});
    const [slidePosition, setSlidePosition] = useState(0);

    useEffect(() => {
        const getAdInfo = async () => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo();
    },[api, id]);

    const formDate = (date) => {
        let cDate = new Date(date);

        let months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    const handleRight = () => {
        let imgstotal = adInfo.images.length;

        if(slidePosition === imgstotal - 1) {
            setSlidePosition(0);
            return;
        }
        setSlidePosition(slidePosition + 1);
    }

    const handleLeft = () => {
        let imgstotal = adInfo.images.length;

        if(slidePosition === 0) {
            setSlidePosition(imgstotal - 1);
            return;
        }
        setSlidePosition(slidePosition - 1);
    }

    //slide automatically to the right after 3 seconds
    useEffect(()=> {

        const slide = setInterval(()=> {
            let imgstotal = adInfo.images.length;
            if(slidePosition === imgstotal - 1) {
                setSlidePosition(0);
                return;
            }
            setSlidePosition(slidePosition + 1);
        }, 3000);
  
        return () => clearInterval(slide);
    },[adInfo, slidePosition]);

  return (
    <PageContainer>
        <C.PageArea>
            <div className="leftSide">
                <div className="box">
                    <div className="adImage">
                        {loading && <C.Fake height={300}/>}

                        {adInfo.images &&
                            <div className="slide" style={{marginLeft: `calc(-100% * ${slidePosition})`}}>

                                {adInfo.images.map((img, index) => (
                                    <div key={index} className="slideItem">
                                        <img src={img} alt="" />
                                    </div>
                                ))}

                            </div>
                        }
                        <div onClick={handleLeft} className="leftIcon">
                            <div></div>
                        </div>
                        <div onClick={handleRight} className="rightIcon">
                            <div></div>
                        </div>
                    </div>
                    <div className="adInfo">
                        <div className="adName">
                            {loading && <C.Fake height={20}/>}
                            {adInfo &&
                                <>
                                <h2>{adInfo.title}</h2> 
                                <small>Criado em {formDate(adInfo.dateCreated)}</small>
                                </>
                            }
                        </div>
                        <div className="adDescription">
                            {loading && <C.Fake height={100} />}
                            {adInfo.description}
                            <hr />
                            {adInfo.views && 
                                <small>Visualizações: {adInfo.views}</small>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightSide">
                <div className="box box--padding">
                    {loading && <C.Fake height={20}/>}
                </div>
                <div className="box box--padding">
                    {loading && <C.Fake height={50}/>}
                </div>
            </div>
        </C.PageArea>
    </PageContainer>
  )
}
