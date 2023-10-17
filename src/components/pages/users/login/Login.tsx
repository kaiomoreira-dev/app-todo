import { ChangeEvent, FormEvent, useState } from 'react'
import { Header } from '../../../header/Header'
import styles from './Login.module.css'
import { Footer } from '../../../footer/Footer';

export interface IUser{
    email: string,
    password: string,
}

export function Login(){
    const [loginUser, setLoginUser] = useState<IUser>({
        email: '',
        password: '',
    } as IUser)

    //[x] criar metodo para enviar as informações de login para a API do backend
    async function handleLoginUser(event: FormEvent<HTMLFormElement>){
        try {
            event.preventDefault();
        
            const responseLoginUser = await fetch(`https://api-todo-oe5w.onrender.com/api/users/login`,{
                body: JSON.stringify(
                    {
                        email: loginUser.email,
                        password: loginUser.password
                    }
                ),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setLoginUser({
                email: '',
                password: '',
            })
            const data = await responseLoginUser.json()

            //[x] armazenar accessToken, refreshToken e user.id no localStorage
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('idUser', data.user.id)
            //[x] redirecionar para a página de tarefas
            window.location.href = '/'
        } catch (error) {
            alert('Senha ou e-mail incorretos')
        }
    }

    //[x] criar metodo para receber os dados do formulário
    function handleOnChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target

        setLoginUser({
            ...loginUser,
            [name]: value
        })
    }

    return(
    
    <div className={styles.container}>
            <Header/>
            <div className={styles['form-center']}>
                <form 
                className={styles.form} 
                id="register-account" 
                onSubmit={handleLoginUser}
                >
                    <fieldset className={styles.fieldset} form='register-account' name='group-register'>
                        <span className={styles.title}><p>Conectar-se</p></span>

                        <label htmlFor="email">E-mail</label>
                        <input id={styles['space-down']}type="text" value={loginUser.email} onChange={handleOnChange} name="email" required placeholder='example@email.com' />
                    
                        <label htmlFor="password">Senha</label>
                        <input type="password" value={loginUser.password} onChange={handleOnChange} name="password" required placeholder='Digite sua senha' />
                        <a href="/forgot-password">Esqueceu a senha?</a>

                    </fieldset>
                    <footer className={styles.footer}>
                    <button type='submit'>Entrar</button>
                        <span>
                            <p>
                                Não possui cadastro?
                            </p>
                            <a href="/register">fazer cadastro</a>
                        </span>
                    </footer>
                </form>
            </div>
            <Footer />
        </div>
    )
}