import React, { useEffect, useRef, useState } from 'react';
import useApi from "../../../helpers/OlxAPI";

//price formater dependencies
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const MiniSlider = ({data}) => {

    const api = useApi();

    const [openModal, setOpenModal] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const imgsTotal = data.images.length;

    const slideRight = () => {

        if(slideIndex === imgsTotal - 1) {
            setSlideIndex(0);
            return;
        }

        setSlideIndex(slideIndex + 1);
    }

    const slideLeft = () => {

        if(slideIndex === 0) {
            setSlideIndex(imgsTotal - 1);
            return;
        }

        setSlideIndex(slideIndex - 1);
    }
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }

        getCategories();
    },[api]);

    //inputs states
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [price, setPrice] = useState(data.price);
    const [negotiable, setNegotiable] = useState(data.priceNegotiable);
    const [status, setStatus] = useState(data.status === "true" ? true : false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState(data.description);
    const fileField = useRef();


     //price formater
     const priceMask = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal: true,
        decimalSymbol: ","
    });


    //update ad information
    const editAd = async (e) => {
        e.preventDefault();
        setDisabled(true);
        

        const fData = new FormData();
        fData.append("title", title);
        fData.append("price", price);
        fData.append("priceneg", negotiable);
        fData.append("status", status);
        fData.append("desc", description);
        fData.append("cat", category);

        if(fileField.current.files.length > 0) {
            for(let i=0; i < fileField.current.files.length; i++) {
                fData.append('img', fileField.current.files[i]);
            }
        }

        const json = await api.updateAd(fData, data._id);

        if(!json.error) {
            alert("Informações salvas com sucesso.");
            window.location.reload();
        } else {
            alert("Preencha os campos corretamente.");
        }


        setDisabled(false);
    }


  return (
        <div className='adItem'>
            {openModal &&
                <>
                    <div className="blackScreen" onClick={() => setOpenModal(false)}></div>
                    <div className={`modal`}>
                        <label>
                            Nome: <br />
                            <input type="text" onChange={e => setTitle(e.target.value)} value={title} disabled={disabled} />
                        </label>

                        <label>
                            Preço: <br />
                            <MaskedInput 
                                mask={priceMask} 
                                placeholder="R$ "
                                disabled={disabled || negotiable}
                                value={price}
                                onChange={e=> setPrice(e.target.value)}
                            />
                        </label>

                        <label>
                            Negociável: <br />
                            <input type="checkbox" onChange={() => setNegotiable(!negotiable)} checked={negotiable} disabled={disabled} style={{width: "auto"}} />
                        </label>

                        <label>
                            Categorias: <br />
                            <select value={category} onChange={e => setCategory(e.target.value)} disabled={disabled}>
                                {categories.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </label>


                        <label>
                            Online: <br />
                            <input type="checkbox" onChange={() => setStatus(!status)} checked={status} disabled={disabled} style={{width: "auto"}} />
                        </label>

                        <label>
                            Imagens (1 ou mais): <br />
                            <input type="file" ref={fileField} accept='image/*' multiple disabled={disabled} />
                        </label>

                        <label>
                            Descrição: <br />
                            <textarea onChange={e => setDescription(e.target.value)} value={description} disabled={disabled} />
                        </label>

                        <button onClick={editAd}>Salvar</button>
                    </div>
                </>
            }
            
            <div className="imgContainer">

                {data.images.map((value, index) => (
                    <img style={{display: slideIndex === index ? "block" : "none"}} src={value.url} alt="ad" key={index} />
                ))}

                <div onClick={slideLeft} className="leftIcon">
                    <div></div>
                </div>
                <div onClick={slideRight} className="rightIcon">
                    <div></div>
                </div>
            </div>
            <div className='adItemInfo'> <b>Nome:</b> {data.title}</div>
            <div className='adItemInfo'> <b>Preço:</b> {data.price}</div>
            <div className='adItemInfo'> <b>Negociável:</b> {data.priceNegotiable ? "sim" : "não"}</div>
            <div className='adItemInfo'> <b>Categoria:</b> {data.category} </div>
            <div className='adItemInfo'> <b>Status:</b> {data.status ? "online" : "offline"} </div>
            <div className='adItemInfo'> <b>Visualizações:</b> {data.views}</div>
            <button onClick={() => setOpenModal(true)}>Editar</button>
            {/* <button className='delBtn' onClick={deleteAd}>Deletar</button> */}
        </div>
  )
}

export default MiniSlider;