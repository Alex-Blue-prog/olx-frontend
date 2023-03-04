import React, { useEffect, useState } from 'react';
import {useSearchParams} from "react-router-dom";
import * as C from "./styles";
import useApi from "../../helpers/OlxAPI";
import { PageContainer } from "../../components/MainComponents";
import { AdItem } from '../../components/partials/AdItem';
let timer;
let secs = 0;

export const Ads = () => {
    const api = useApi();

    //queryString section -- start
    const [searchParams, setSearchParams] = useSearchParams();

    const[adList, setAdList] = useState([]);
    const[opacity, setOpacity] = useState(1);
    // const[secs, setSecs] = useState(0);
    const[loading, setLoading] = useState(true);

    const[q, setQ] = useState(searchParams.get("q") || "");
    const[state, setState] = useState(searchParams.get("state") || "");
    const[cat, setCat] = useState(searchParams.get("cat") || "");


    useEffect(() => {
    
        searchParams.set("q", q);
        searchParams.set("state", state);
        searchParams.set("cat", cat);
        setSearchParams(searchParams);

        //get list of products(ads)
        const getAdsList = async () => {

            setLoading(true);

            const json = await api.getAds({
                sort:"desc",
                limit:9,
                q,
                state,
                cat
              });

              setAdList(json.ads);
              setOpacity(1);
              setLoading(false);
              secs = 2000;
        }

        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, secs);
        setOpacity(0.3);

    },[q, state, cat, searchParams, setSearchParams, api]);
    //queryString section -- end

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
   
    useEffect(()=> {

      const getStates = async () => {
        const slist = await api.getStates();
        setStateList(slist);
      }
      const getCategories = async () => {
        const cats = await api.getCategories();
        setCategories(cats);
      }
  
      getStates();
      getCategories();

    },[api]);

    
    return (
        <PageContainer>
            <C.PageArea>
                <div className="leftSide">
                    <form action="GET">
                        <input value={q} onChange={e=>setQ(e.target.value)} type="text" name='q' placeholder='O que você procura ?'/>

                        <div className="filterName">Estado:</div>
                        <select value={state} onChange={e=>setState(e.target.value)} name="state">
                            <option value="">Nenhum</option>
                            {stateList.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>

                        <div className="filterName">Categorias:</div>
                        <ul>
                            {categories.map((item, index) => (
                                <li onClick={()=> setCat(item.slug)} key={index} className={cat === item.slug ? "categoryItem active" : "categoryItem"}>
                                    <img src={item.img} alt="" />
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>

                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>

                    {loading &&
                        <div className="listWarning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Não encontramos resultados.</div>
                    }

                    <div className="list" style={{opacity: opacity}}>
                        {adList.map((item, index)=> (
                            <AdItem key={index} data={item} />
                        ))}
                    </div>
                </div>
            </C.PageArea>
        </PageContainer>
       
    )
}
