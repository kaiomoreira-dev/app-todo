/* eslint-disable no-cond-assign */
import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Create } from './components/pages/todos/create/Create';
import { Register } from './components/pages/users/register/Register';
import { Login } from './components/pages/users/login/Login';
import { verifyRefreshToken } from './utils/verify-refresh-token';
import { useEffect, useState } from 'react';
import { VerifyEmail } from './components/pages/users/verify-email/Veirfy-Email';

export default function App() {
  const [isValidRefreshToken, setIsValidRefreshToken] = useState<boolean>(false)
  const [block, setBlock] = useState<boolean>(false)

  useEffect(()=>{
      async function checkToken() {
        if(!localStorage.getItem('refreshToken')){
          setIsValidRefreshToken(false)
          return
        }
        const isValidRefreshToken = await verifyRefreshToken()
        setIsValidRefreshToken(isValidRefreshToken)
      }
      async function blockScreen() {
        const hasVisited = localStorage.getItem('hasVisited')
        if(hasVisited !== 'true'){
          setBlock(true)
          return
        }
      }
      checkToken()
      blockScreen()
  })
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isValidRefreshToken ? <Create /> : <Login />} />
          <Route path="/verify-email" element={block ? <Login /> : <VerifyEmail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
