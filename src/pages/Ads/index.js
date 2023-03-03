import React, { useEffect, useState } from 'react';
import {useSearchParams, useNavigate} from "react-router-dom";
import * as C from "./styles";
import useApi from "../../helpers/OlxAPI";
import { PageContainer } from "../../components/MainComponents";
import { AdItem } from '../../components/partials/AdItem';


export const Ads = () => {
    const api = useApi();

    //queryString section -- start
    const [searchParams, setSearchParams] = useSearchParams();

    const[q, setQ] = useState(searchParams.get("q") || "");
    const[state, setState] = useState(searchParams.get("state") || "");
    const[cat, setCat] = useState(searchParams.get("cat") || "");

    useEffect(() => {
        searchParams.set("q", q);
        searchParams.set("state", state);
        searchParams.set("cat", cat);

        setSearchParams(searchParams);
    },[q, state, cat]);
    //queryString section -- end

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
  
    useEffect(()=> {
      const getStates = async () => {
        const slist = await api.getStates();
        setStateList(slist);
      }
      const getCategories = async () => {
        const cats = await api.getCategories();
        setCategories(cats);
      }
  
      const getRecentAds = async () => {
        const json = await api.getAds({
          sort:"desc",
          limit:8
        });
        setAdList(json.ads);
      }
  
      getStates();
      getCategories();
      getRecentAds();
    },[api]);

    
    return (
        <PageContainer>
            <C.PageArea>
                <div className="leftSide">
                    <form action="GET">
                        <input value={q} onChange={e=>setQ(e.target.value)} type="text" name='q' placeholder='O que você procura ?'/>

                        <div className="filterName">Estado:</div>
                        <select value={state} onChange={e=>setState(e.target.value)} name="state">
                            <option value=""></option>
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
                    ....
                </div>
            </C.PageArea>
        </PageContainer>
       
    )
}
