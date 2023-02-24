import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import * as C from "./styles";
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents';
import useApi from "../../helpers/OlxAPI";
import {doLogin} from "../../helpers/AuthHandler";

export const SignIn = () => {
    const api = useApi();
    // const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        const json = await api.login(email, password); // const json = await useApi.login(email, password);
     
        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            // navigate("/");
            window.location.href = "/";
        }

        setDisabled(false);
    }

  return (
    <PageContainer>
        <PageTitle>Login</PageTitle>
        <C.PageArea>
            {error && 
                <ErrorMessage>{error}</ErrorMessage>
            }
            <form onSubmit={handleSubmit}>
                <label className='area'>
                    <div className="area--title">E-mail</div>
                    <div className="area--input">
                        <input 
                            type="email" 
                            disabled={disabled} 
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title">Senha</div>
                    <div className="area--input">
                        <input 
                            type="password" 
                            disabled={disabled} 
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title">Lembrar Senha</div>
    
                        <input 
                            type="checkbox" 
                            disabled={disabled} 
                            checked={rememberPassword}
                            onChange={()=> setRememberPassword(!rememberPassword)}
                        />
                   
                </label>
                <label className='area'>
                    <div className="area--title"></div>
                    <div className="area--input">
                        <button disabled={disabled}>Fazer login</button>
                    </div>
                </label>
            </form>
        </C.PageArea>
    </PageContainer>
  )
}
