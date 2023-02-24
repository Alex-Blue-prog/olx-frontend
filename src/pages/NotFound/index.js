import React from 'react';
import { Link } from "react-router-dom";
import * as C from "./styles";

export const NotFound = () => {
  return (
    <C.Container>
        <h1>404 Página não encontrada</h1>

        <Link to={"/"}>Voltar para Home</Link>
    </C.Container>
  )
}
