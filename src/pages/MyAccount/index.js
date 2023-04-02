import React, { useEffect, useState } from 'react';
import * as C from "./styles";
import { ErrorMessage, PageContainer } from '../../components/MainComponents';
import useApi from "../../helpers/OlxAPI";
import { AdItem } from '../../components/partials/AdItem';


export const MyAccount = () => {

  const api = useApi();
  
  //general states
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  
  //user states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  
  const [ads, setAds] = useState([]);


  useEffect(()=> {

    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }

    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }

    const getUser = async () => {
      const user = await api.getUser();
      console.log(user.ads);
      
      setName(user.name);
      setEmail(user.email);
      setState(user.state);
      setAds(user.ads);

    }

    getCategories();
    getStates();
    getUser();

  },[api]);


  const updateUserInfo = async (e) => {
    e.preventDefault();

    setDisabled(true);
    setError("");
    setLoading(true);

    const json = await api.updateUser({name, email, state, password});

    if(json.error) {
      setError(json.error);
    } else {
      window.alert("Informações de usuário alteradas com sucesso.");
    }

    setLoading(false);
    setDisabled(false);
  }


  return (
    <PageContainer>
        <C.PageArea>

            <h2>Conta</h2>
            <form onSubmit={updateUserInfo}>

              <div className="wrapper">
                {loading && 
                  <div>
                   <label htmlFor=""></label>
                    <div className="inputDiv">
                      Carregando...
                    </div>
                  </div>
                }

              {error && 
                <div>
                <label htmlFor=""></label>
                 <div className="inputDiv">
                  <ErrorMessage>{error}</ErrorMessage>
                 </div>
               </div>
              }
               

                <div>
                  <label htmlFor="name">Nome</label>
                  <div className="inputDiv">
                    <input disabled={disabled} onChange={e => setName(e.target.value)} value={name} id='name' type="text" name='name' />
                  </div>
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <div className="inputDiv">
                    <input  disabled={disabled}  onChange={e => setEmail(e.target.value)} value={email} id='email' type="email" name='email' />
                  </div>
                </div>

                <div>
                  <label htmlFor="password">Nova senha</label>
                  <div className="inputDiv">
                    <input disabled={disabled}  onChange={e => setPassword(e.target.value)} value={password} id='password' type="password" name='password' />
                  </div>
                </div>

                <div>
                  <label htmlFor="state">Estado</label>

                  <div className="inputDiv">
                    <select disabled={disabled}  onChange={e => setState(e.target.value)} value={state} name="state" id="state">
        
                      {stateList.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                      ))}

                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor=""></label>

                  <div className="inputDiv">
                    <button disabled={disabled}>Salvar</button>
                  </div>
                </div>

              </div>
              
            </form>

            <h2>Anúncios</h2>
            <div className="list">
              {ads.map((item, index) => (

                <div className='adItem' key={index}>
                  <div className="imgContainer">
                    <img src={item.images[0].url} alt="ad" />
                  </div>
                  <div className='adItemInfo'> <b>Nome:</b> {item.title}</div>
                  <div className='adItemInfo'> <b>Preço:</b> {item.price}</div>
                  <div className='adItemInfo'> <b>Negociável:</b> {item.priceNegotiable ? "sim" : "não"}</div>
                  <div className='adItemInfo'> <b>Categoria:</b> {item.category} </div>
                  <div className='adItemInfo'> <b>Status:</b> {item.status ? "online" : "offline"} </div>
                  <div className='adItemInfo'> <b>Visualizações:</b> {item.views}</div>
                  <button>Editar</button>
                </div>

              ))}
            </div>
        </C.PageArea>
    </PageContainer>
  )
}
