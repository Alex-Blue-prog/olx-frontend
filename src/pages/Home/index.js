import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import * as C from "./styles";
import { PageContainer } from "../../components/MainComponents";
import useApi from "../../helpers/OlxAPI";


export const Home = () => {
  const api = useApi();
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
          ...
        </C.PageArea>
      </PageContainer>
    </>
  )
}
