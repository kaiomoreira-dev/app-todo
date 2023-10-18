/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useState } from 'react'
import {Header} from '../../../header/Header'
import styles from './Register.module.css'
import { Footer } from '../../../footer/Footer'
import rocketImg from '../../../../assets/rocket.svg'
import todoImg from '../../../../assets/todo.svg'
import sendEmailImg from '../../../../assets/send-email.png'

export interface IUser{
    firstname?: string,
    lastname?: string,
    email: string,
    password: string,
    confirmPassword:string
}

export function Register(){
    //[x] criar estado para armazenar os dados do formulário
    const [registerUser, setRegisterUser] = useState<IUser>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    } as IUser)

    const [message, setMessage] = useState<boolean>(false)
     
    //[x] criar metodo para enviar as informações para a API do backend
    async function handleRegisterUser(event: FormEvent<HTMLFormElement>){
        try {
            event.preventDefault();
            setMessage(true)
        
            if(registerUser.password !== registerUser.confirmPassword){
                alert('As senhas não conferem')
                return
            }
            // console.log(process.env.API_URL)

            const responseRegisterUser = await fetch(`https://api-todo-oe5w.onrender.com/api/users`,{
                body: JSON.stringify(
                    {
                        name: `${registerUser.firstname} ${registerUser.lastname}`,
                        email: registerUser.email,
                        password: registerUser.password
                    }
                ),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!responseRegisterUser.ok) throw new Error()

            setRegisterUser({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            await responseRegisterUser.json()

            //[] redirecionar para a página de login
            window.scrollTo(0, 0);

            redirect().then((result)=>{
                if (result) {
                    window.location.href = '/login';
                }
            })

        } catch (error) {
            alert('Email já cadastrado')
        }
    }

    async function redirect(){
        return new Promise((resolve) => {
            setTimeout(()=>{
            resolve(true)
            }, 5000)
        })
    }
    

    //[x] criar metodo para receber os dados do formulário
    function handleOnChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target

        setRegisterUser({
            ...registerUser,
            [name]: value
        })
    }
    
    return(
        <div className={styles.container}>
            <Header/>
            <main>
                <div className={message ? styles['confirm-email']: styles.none}>
                    <img src={sendEmailImg} alt="" />

                    <span>Confirmação Enviada com Sucesso!</span>
                    <p>
                        A confirmação foi enviada para o seu e-mail. Por favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.
                    </p>
                    <p>
                        Se você não receber o e-mail dentro de alguns minutos, verifique sua pasta de spam ou entre em contato conosco para obter ajuda.
                    </p>
                </div>
                <span className={message ? styles.icon : styles.none}>
                    Equipe
                    <img src={rocketImg} alt="" />
                    <img src={todoImg} alt="" />
                </span>
                <form 
                className={message ? styles.none : styles.form} 
                id="register-account" 
                onSubmit={handleRegisterUser}
                >
                    <fieldset className={styles.fieldset} form='register-account' name='group-register'>
                        <span className={styles.title}><p>Cadastrar</p></span>

                        <label htmlFor="firstname">Nome</label>
                        <input type="text" value={registerUser.firstname} onChange={handleOnChange} name="firstname" id="firstname" required placeholder='Digite seu nome' />
                    
                        <label htmlFor="lastname">Sobrenome</label>
                        <input type="text" value={registerUser.lastname} onChange={handleOnChange} name="lastname" id="lastname" required placeholder='Digite seu sobrenome' />
                    
                        <label htmlFor="email">E-mail</label>
                        <input type="text" value={registerUser.email} onChange={handleOnChange} name="email" id="email" required placeholder='example@email.com' />
                    
                        <label htmlFor="password">Senha</label>
                        <input type="password" value={registerUser.password} onChange={handleOnChange} name="password" id="password" required placeholder='Digite sua senha' />

                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input type="password" value={registerUser.confirmPassword} pattern={registerUser.password} title='A senha e a confirmação de senha não coincidem. Por favor, tente novamente' onChange={handleOnChange} name="confirmPassword" id="confirmPassword" required placeholder='Confirme sua senha' />
                    </fieldset>
                    <footer className={styles.footer}>
                    <button type='submit'>Cadastrar</button>
                        <span>
                            <p>
                                Já tem cadastro?
                            </p>
                            <a href="/login">fazer login</a>
                        </span>
                    </footer>
                </form>
            </main>
            <Footer />
        </div>
    )
}