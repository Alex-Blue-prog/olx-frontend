import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import * as C from "./styles";
import useApi from "../../helpers/OlxAPI";
import { PageContainer } from "../../components/MainComponents";
import { AdItem } from '../../components/partials/AdItem';


export const Home = () => {
  const api = useApi();
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
    <>
      <C.SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method='GET' action="/ads">
              <input type="text" name='q' placeholder='O que você procura?' />
              <select name="state">
                {stateList.map((item, index) => (
                  <option key={index} value={item.name}>{item.name}</option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((item, index)=>(
              <Link key={index} to={`/ads?cat=${item.slug}`} className='categoryItem'>
                <img src={item.img} alt="category" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </C.SearchArea>

      <PageContainer>
        <C.PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((item, index) => (
              <AdItem key={index} data={item} />
            ))}
          </div>
          <Link to={"/ads"} className="seeAllLink">Ver todos...</Link>
          <hr />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque architecto modi eos, dolorum ipsa repellendus vero quasi, aliquam asperiores iste aperiam atque perspiciatis labore ipsam!
          </p>
        </C.PageArea>
      </PageContainer>
    </>
  )
}
