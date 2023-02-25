import React from 'react'
import * as C from "./styles";
import { Link } from 'react-router-dom';

export const AdItem = ({data}) => {
    let price = "";

    if(data.priceNegotiable) {
        price = "Preço Negociável";
    } else {
        price = `R$ ${data.price}`;
    }


  return (
    <C.Item className='aditem'>
        <Link to={`/ad/${data.id}`}>
            <div className="itemImg">
                <img src={data.image} alt="" />
            </div>
            <div className="itemName">{data.title}</div>
            <div className="itemPrice">{price}</div>
        </Link>
    </C.Item>
  )
}
