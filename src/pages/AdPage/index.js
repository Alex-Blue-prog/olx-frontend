import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as C from "./styles";
import useApi from "../../helpers/OlxAPI";
import {PageContainer} from "../../components/MainComponents";

export const AdPage = () => {
    const api = useApi();
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

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

  return (
    <PageContainer>
        <C.PageArea>
            <div className="leftSide">
                <div className="box">
                    <div className="adImage">
                        {loading && <C.Fake height={300}/>}
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
