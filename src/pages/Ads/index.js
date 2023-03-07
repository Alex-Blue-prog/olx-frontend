import React, { useEffect, useRef, useState } from 'react';
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

    const[adsTotal, setAdsTotal] = useState(0);
    const[pageCount, setPageCount] = useState(0);
    const[currentPage, setCurrentPage] = useState(1);
    const[adList, setAdList] = useState([]);

    const[opacity, setOpacity] = useState(1);
    const[loading, setLoading] = useState(true);
    // const[secs, setSecs] = useState(0);

    const[q, setQ] = useState(searchParams.get("q") || "");
    const[state, setState] = useState(searchParams.get("state") || "");
    const[cat, setCat] = useState(searchParams.get("cat") || "");

    useEffect(()=> {
        window.scrollTo(0, 0);
    },[currentPage]);



    const getAdsList = async () => {

        // setLoading(true);
        let offset = (currentPage - 1) * 9;

        const json = await api.getAds({
            sort:"desc",
            limit:9,
            q,
            state,
            cat,
            offset
          });

          setAdList(json.ads);
          setAdsTotal(json.total);

          setOpacity(1);
          setLoading(false);
          secs = 2000;

    }

    useEffect(() => {
    
        searchParams.set("q", q);
        searchParams.set("state", state);
        searchParams.set("cat", cat);
        setSearchParams(searchParams);

        //get list of products(ads)
        setCurrentPage(1);

        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, secs);
        setOpacity(0.3);

    },[q, state, cat, searchParams, setSearchParams, api]);

    //pagination -- start
    useEffect(()=> {

        //pegar quantidade de paginações baseado nesso calculo
        if(adList.length > 0 ) {
            setPageCount(Math.ceil(adsTotal / 9));
        } else {
            setPageCount(0);
        }

    },[adsTotal, adList.length])

    useEffect(()=> {
        //when currentPage changes, change the page too
        getAdsList();
        setOpacity(0.3);
    },[currentPage])

    let pagination = [];
    for(let i = 0; i < pageCount; i++) {
        pagination.push(i + 1);
    }


    const paginationContainer = useRef(); 
    const [scroll, setScroll] = useState(0);

    const goRight = () => {
        if(scroll > paginationContainer.current.scrollWidth - paginationContainer.current.clientWidth) return;
        setScroll(scroll + 50);  
    }

    const goLeft = () => {
        if(scroll <= 0) return;
        setScroll(scroll - 50);  
    }


    useEffect(() => {
        paginationContainer.current?.scrollTo({
            top: 0,
            left: scroll,
            behavior: "smooth"
        });
    },[scroll])

    //pagination -- end

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

                    {loading && adList.length === 0 &&
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
                    
                    <div className="paginationWrapper">
                        <div 
                            className="left" 
                            onClick={goLeft} 
                            style={{display: pagination.length >= 11 ? "block" : "none"}}>
                        </div>

                        <div 
                            className="right" 
                            onClick={goRight}
                            style={{display: pagination.length >= 11 ? "block" : "none"}}
                        >
                        </div>

                        <div className="paginationContainer" ref={paginationContainer}>

                            <div className="pagination">
                                {pagination.map((item, index) => (
                                    <div key={index} onClick={()=> setCurrentPage(item)} className={item === currentPage ? "active pageItem" : "pageItem"}>
                                        {item}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    
                    
                </div>
            </C.PageArea>
        </PageContainer>
       
    )
}
