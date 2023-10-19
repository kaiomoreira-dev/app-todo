/* eslint-disable no-cond-assign */
import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Create } from './components/pages/todos/create/Create';
import { Register } from './components/pages/users/register/Register';
import { Login } from './components/pages/users/login/Login';
import { VerifyEmail } from './components/pages/users/verify-email/Veirfy-Email';
import { ForgotPassword } from './components/pages/users/forgot-password/Forgot-Password';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Create />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
