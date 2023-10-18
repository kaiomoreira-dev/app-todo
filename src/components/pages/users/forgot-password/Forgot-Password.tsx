import { ChangeEvent, FormEvent, useState } from 'react'
import { Footer } from '../../../footer/Footer'
import { Header } from '../../../header/Header'
import styles from './Forgot-Password.module.css'

interface IEmail{
    email: string,
}

export function ForgotPassword(){
    const [emailField, setEmailField] = useState<IEmail>({
        email: '',
    } as IEmail)

    async function handleForgotPassword(event: FormEvent<HTMLFormElement>){
        try {
            event.preventDefault();
             await fetch(`https://api-todo-oe5w.onrender.com/api/users/forgot-password`,{
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

            setEmailField({
                email: '',
            })
        } catch (error) {
            alert('E-mail não encontrado')
        }
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
                <form action="" onSubmit={handleForgotPassword}>
                    <fieldset>
                    <div className={styles['title-content']}>
                        <span>Redefinição de senha</span>
                        <p>
                            Para recuperar sua senha, digite seu e-mail abaixo. Que nos enviaremos um link para você acessar e redefinir sua senha.
                        </p>    
                    </div>
                    <label htmlFor="email">E-mail</label>
                    <input id={styles['space-down']}type="text" value={emailField.email} onChange={handleOnChange}  name="email" placeholder='example@email.com' />
                    </fieldset>
                    <footer>
                        <a href="/">
                            <button type='button'>Cancelar</button>
                        </a>
                        <button type='submit'>Pesquisar</button>
                    </footer>
                </form>
            </main>
            <Footer/>
        </div>
    )
}