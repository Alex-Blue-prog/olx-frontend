import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as C from "./styles";
import useApi from "../../helpers/OlxAPI";
import {PageContainer} from "../../components/MainComponents";
import { AdItem } from "../../components/partials/AdItem";
// import {Slide} from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";

export const AdPage = () => {
    const api = useApi();
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});
    const [slidePosition, setSlidePosition] = useState(0);

     //fix scroll
     useEffect(() => {
        window.scrollTo(0, 0);
    },[id]);

    useEffect(() => {
        const getAdInfo = async () => {

            //reset for other ad pages
            setLoading(true);
            setSlidePosition(0);
            setAdInfo({});
            //

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

    //slide images to right
    const handleRight = () => {
        let imgstotal = adInfo.images.length;

        if(slidePosition === imgstotal - 1) {
            setSlidePosition(0);
            return;
        }
        setSlidePosition(slidePosition + 1);
    }

    //slide images to left
    const handleLeft = () => {
        let imgstotal = adInfo.images.length;

        if(slidePosition === 0) {
            setSlidePosition(imgstotal - 1);
            return;
        }
        setSlidePosition(slidePosition - 1);
    }

    //slide automatically to the right after 5 seconds
    useEffect(()=> {

        const slide = setInterval(()=> {
            let imgstotal = adInfo.images.length;
            if(slidePosition === imgstotal - 1) {
                setSlidePosition(0);
                return;
            }
            setSlidePosition(slidePosition + 1);
        }, 5000);
  
        return () => clearInterval(slide);
    },[adInfo, slidePosition]);

   

  return (
    <PageContainer>
        {adInfo.category && 
            <C.BreadCrumb>
                Voce está aqui:
                <Link to={"/"} >Home</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                /
                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                /
               <span>{adInfo.title}</span>
            </C.BreadCrumb>
        }   

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
                    {adInfo.priceNogotiable && 
                        "Preço Negociável"
                    }
                    {!adInfo.priceNogotiable && adInfo.price &&
                        <div className="price">
                            Preço: <span>R$ {adInfo.price}</span>
                        </div>
                    }
                </div>
                {loading && <C.Fake height={50}/>}
                {adInfo.userInfo && 
                    <>
                        <a rel='noreferrer' href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o vendedor</a>
                        <div className="createBy box box--padding">
                            <strong>{adInfo.userInfo.name}</strong>
                            <small>E-mail: {adInfo.userInfo.email}</small>
                            <small>Estado: {adInfo.stateName}</small>
                        </div>
                    </> 
                }
            </div>
           
        </C.PageArea>

        <C.OthersArea>
        {adInfo.others && 
            <>
                <h2>Outras ofertas</h2>
                <div className="list">
                    {adInfo.others.map((item, index) => (
                        <AdItem key={index} data={item} />
                    ))}
                </div>
            </>
        }
        </C.OthersArea>
    </PageContainer>
  )
}
