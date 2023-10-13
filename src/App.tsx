/* eslint-disable no-cond-assign */
import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Create } from './components/pages/todos/create/Create';
import { Register } from './components/pages/users/register/Register';
import { Login } from './components/pages/users/login/Login';
import { verifyRefreshToken } from './utils/verify-refresh-token';
import { useEffect, useState } from 'react';

export default function App() {
  const [isValidRefreshToken, setIsValidRefreshToken] = useState<boolean>(false)

  useEffect(()=>{
      async function checkToken() {
        if(!localStorage.getItem('refreshToken')){
          setIsValidRefreshToken(false)
          return
        }
        const isValidRefreshToken = await verifyRefreshToken()
        setIsValidRefreshToken(isValidRefreshToken)
      }
      checkToken()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create  />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
