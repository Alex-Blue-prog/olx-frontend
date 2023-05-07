import React, { useEffect, useRef, useState } from 'react';
import * as C from "./styles";
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents';
import useApi from "../../helpers/OlxAPI";
import { useNavigate } from "react-router-dom";

//price formater dependencies
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";


export const AddAd = () => {
    const api = useApi();
    const fileField = useRef();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }

        getCategories();
    },[api]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");
        let errors = [];
        
        if(!title.trim()) {
            errors.push("Sem título");
        }

        if(!category) {
            errors.push("Sem categoria")
        }

        if(errors.length === 0) {

            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current.files.length > 0) {
                for(let i=0; i < fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.addAd(fData);

            if(!json.error) {
                navigate(`/ad/${json.id}`);
                return;

            } else {
                setError(json.error);
            }


        } else {
            setError(error.join("\n"));
        }

        setDisabled(false);
    }

    console.log(fileField);

    //price formater
    const priceMask = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal: true,
        decimalSymbol: ","
    })

  return (
    <PageContainer>
        <PageTitle>Postar um anúncio</PageTitle>
        <C.PageArea>
            {error && 
                <ErrorMessage>{error}</ErrorMessage>
            }
            <form onSubmit={handleSubmit}>
                <label className='area'>
                    <div className="area--title">Título</div>
                    <div className="area--input">
                        <input 
                            type="text" 
                            disabled={disabled} 
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            required
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title">Categoria</div>
                    <div className="area--input">
                        <select value={category} onChange={e => setCategory(e.target.value)} disabled={disabled} required>
                          <option value=""></option>
                          {categories.map((item) => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                          ))}
                        </select>
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title">Preço</div>
                    <div className="area--input">
                        <MaskedInput 
                            mask={priceMask} 
                            placeholder="R$ "
                            disabled={disabled || priceNegotiable}
                            value={price}
                            onChange={e=> setPrice(e.target.value)}
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title">Preço Negociável</div>
    
                        <input 
                            type="checkbox" 
                            disabled={disabled} 
                            checked={priceNegotiable}
                            onChange={()=> setPriceNegotiable(!priceNegotiable)}
                        />
                   
                </label>
                <label className='area'>
                    <div className="area--title">Descrição</div>
                    <div className="area--input">
                        <textarea disabled={disabled} value={desc} onChange={e=> setDesc(e.target.value)}>
                        </textarea>
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title">Imagens (1 ou mais)</div>
                    <div className="area--input">
                        <input 
                            type={"file"}
                            disabled={disabled}
                            ref={fileField}
                            accept={"image/*"}
                            multiple
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className="area--title"></div>
                    <div className="area--input">
                        <button disabled={disabled}>Enviar Anúncio</button>
                    </div>
                </label>
            </form>
        </C.PageArea>
    </PageContainer>
  )
}
