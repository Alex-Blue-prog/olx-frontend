import React, { useEffect, useState } from 'react';
import * as C from "./styles";
import { ErrorMessage, PageContainer } from '../../components/MainComponents';
import useApi from "../../helpers/OlxAPI";
import MiniSlider from '../../components/partials/MiniSlider';


export const MyAccount = () => {

  const api = useApi();
  
  //general states
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState([]);
  
  //user states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  
  const [ads, setAds] = useState([]);


  useEffect(()=> {

    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }

    const getUser = async () => {
      const user = await api.getUser();
      // console.log(user.ads);
      
      // setName(user.name);
      // setEmail(user.email);
      // setState(user.state);
      setAds(user.ads);

    }

    getStates();
    getUser();

  },[api]);


  const updateUserInfo = async (e) => {
    e.preventDefault();

    setError("");
    setDisabled(true);
    setLoading(true);

    let userNewInfo =  {
      name: name || undefined,
      email: email || undefined,
      state: state || undefined,
      password: password || undefined
    }

    const json = await api.updateUser(userNewInfo);

    if(json.error) {
      
      const nameError = json.error?.name?.msg;
      const emailError = json.error?.email?.msg;
      const passwordError = json.error?.password?.msg;
      const stateError = json.error?.state?.msg;

      const serverError = nameError || emailError || passwordError || stateError;
      setError(serverError);
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

                      <option value=""></option>
                      {stateList.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
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

                <MiniSlider key={index} data={item} />

              ))}
            </div>
        </C.PageArea>
    </PageContainer>
  )
}
