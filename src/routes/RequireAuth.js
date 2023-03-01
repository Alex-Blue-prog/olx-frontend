import React from 'react';
import { Navigate } from "react-router-dom";
import { isLogged } from '../helpers/AuthHandler';

export const RequireAuth = ({children, ...rest}) => {
    
    const logged = isLogged();
    // let authorized = (rest.private && !logged) ? false : true;

    if(logged) {
        return children;
    } else {
        <Navigate to="/sigin" />
    }
}
