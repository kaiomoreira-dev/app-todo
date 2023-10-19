import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../../footer/Footer';
import { Header } from '../../../header/Header';
import styles from './Reset-Password.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

export interface IUser{
    password: string,
    confirmPassword:string
}

export function ResetPassword() {
    const { search } = useLocation();

    const navigate = useNavigate()

    const params = new URLSearchParams(search);
    const token = params.get('token'); 
    localStorage.setItem('tokenResetPassword', token as string) 

    //[x] criar estado para armazenar os dados do formulário
    const [resetPassword, setResetPassword] = useState<IUser>({
        password: '',
        confirmPassword: ''
    } as IUser)

    async function handleResetPassword(event: FormEvent<HTMLFormElement>){
        try {
            event.preventDefault();
            
            const tokebResetPassword = localStorage.getItem('tokenResetPassword')

            if(tokebResetPassword){
                navigate('/login')
            }
        
            if(resetPassword.password !== resetPassword.confirmPassword){
                alert('As senhas não conferem')
                return
            }
            // console.log(process.env.API_URL)

            const responseResetPassword = await fetch(`https://api-todo-oe5w.onrender.com/api/users/reset-password?token=${token}`,{
                body: JSON.stringify(
                    {
                        password: resetPassword.password
                    }
                ),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!responseResetPassword.ok) throw new Error()

            setResetPassword({
                password: '',
                confirmPassword: ''
            })
            await responseResetPassword.json()

            //[x] redirecionar para a página de login
            navigate('/login')

        } catch (error) {
            alert('Email já cadastrado')
        }
    }

     //[x] criar metodo para receber os dados do formulário
     function handleOnChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target

        setResetPassword({
            ...resetPassword,
            [name]: value
        })
    }
    

  return (
    <div className={styles.container}>
        <Header />
        <main className={styles['main-content']}>
        <form action="" onSubmit={handleResetPassword}>
            <fieldset>
            <div className={styles['title-content']}>
                <span>Redefinir sua senha</span>

                <p>
                    Mínimo de 8 caracteres, incluindo letras maiúsculas e minúsculas.
                </p> 
                    
            </div>
                <label htmlFor="password">Senha</label>
                <input type="password" value={resetPassword.password} onChange={handleOnChange}  name="password" id="password" required placeholder='Digite sua senha' />

                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input type="password" onChange={handleOnChange} value={resetPassword.confirmPassword} pattern={resetPassword.password}  title='A senha e a confirmação de senha não coincidem. Por favor, tente novamente' name="confirmPassword" id="confirmPassword" required placeholder='Confirme sua senha' />
            </fieldset>
            <footer>
                <Link to="/login">
                    <button type='button'>Cancelar</button>
                </Link>
                <button type='submit'>Confirmar</button>
            </footer>
        </form>
        </main>
        <Footer />
    </div>
  );
}  