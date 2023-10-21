import { ChangeEvent, FormEvent, useState } from 'react'
import { Footer } from '../../../footer/Footer'
import { Header } from '../../../header/Header'
import styles from './Forgot-Password.module.css'
import { Link, useNavigate } from 'react-router-dom'
import sendEmailImg from '../../../../assets/send-email.png'


interface IEmail{
    email: string,
}

export function ForgotPassword(){
    const [emailField, setEmailField] = useState<IEmail>({
        email: '',
    } as IEmail)

    const [message, setMessage] = useState<boolean>(false)

    const navigate = useNavigate()

    async function handleForgotPassword(event: FormEvent<HTMLFormElement>){
        try {
            event.preventDefault();
             const responseConfirmEmail = await fetch(`https://api-todo.kaiomoreira-dev.com.br/api/users/forgot-password`,{
                body: JSON.stringify(
                    {
                        email: emailField.email,
                    }
                ),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await responseConfirmEmail.json()
            if(!responseConfirmEmail.ok) throw new Error('E-mail não encontrado')

            setEmailField({
                email: '',
            })
            setMessage(true)

            redirect().then((result)=>{
                if (result) {
                    navigate('/login')
                }
            })

        } catch (error) {
            alert('E-mail não encontrado')
        }
    }

    async function redirect(){
        return new Promise((resolve) => {
            setTimeout(()=>{
            resolve(true)
            }, 3000)
        })
    }

    //[x] criar metodo para receber os dados do formulário
    function handleOnChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target

        setEmailField({
            ...emailField,
            [name]: value
        })
    }

    return(
        <div className={styles.container}>
            <Header/>
            <main className={styles['main-content']}>
                <div className={message ? styles['confirm-email'] : styles.none}>
                        <img src={sendEmailImg} alt="" />

                        <span>Redefinição Enviada com Sucesso!</span>
                        <p>
                            Um e-mail com instruções para redefinir sua senha foi enviado para o seu endereço de e-mail. Por favor, verifique sua caixa de entrada e siga as instruções fornecidas. 
                        </p>
                </div>
                <form id={message ? styles.none : ''} action="" onSubmit={handleForgotPassword}>
                    <fieldset>
                    <div className={styles['title-content']}>
                        <span>Encontre sua conta</span>
                        <p>
                            Para recuperar sua senha, digite seu e-mail abaixo. Que nos enviaremos um link para você acessar e redefinir sua senha.
                        </p>    
                    </div>
                    <label htmlFor="email">E-mail</label>
                    <input id={styles['space-down']}type="text" value={emailField.email} onChange={handleOnChange}  name="email" placeholder='example@email.com' />
                    </fieldset>
                    <footer>
                        <Link to="/login">
                            <button type='button'>Voltar</button>
                        </Link>
                        <button type='submit'>Encontrar</button>
                    </footer>
                </form>
            </main>
            <Footer/>
        </div>
    )
}