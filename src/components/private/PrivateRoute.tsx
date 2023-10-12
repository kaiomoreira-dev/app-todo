import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";

interface IRouteProps{
    element: React.ReactNode
}

export function PrivateRoute({element, ...rest}: IRouteProps){
    const [validRefreshToken, setValidRefreshToken] = useState(true);

    useEffect(()=>{
        async function verifyRefreshToken(){
            const refreshToken = localStorage.getItem('refreshToken');
            if(!refreshToken){
                setValidRefreshToken(false);
                return;
            }
    
            const responseRefreshToken = await fetch(`https://api-todo-oe5w.onrender.com/api/users/refresh-token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refreshToken }),
            });
    
            if (responseRefreshToken.ok) {
                setValidRefreshToken(true);
              } else {
                setValidRefreshToken(false);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }
        verifyRefreshToken();
    }, [])

    if (!validRefreshToken) {
        return <Navigate to="/login" />;
    }

    return <Routes><Route {...rest} element={element} path="/" /></Routes>;
}