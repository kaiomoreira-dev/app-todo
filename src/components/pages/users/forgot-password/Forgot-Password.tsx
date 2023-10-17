import { Footer } from '../../../footer/Footer'
import { Header } from '../../../header/Header'
import styles from './Forgot-Password.module.css'

export function ForgotPassword(){
    return(
        <div className={styles.container}>
            <Header/>
            <main className={styles['main-content']}>
                <form action="">
                    <fieldset>
                    <div className={styles['title-content']}>
                        <span>Redefinição de senha</span>
                        <p>
                            Para recuperar sua senha, digite seu e-mail abaixo. Que nos enviaremos um link para você acessar e redefinir sua senha.
                        </p>    
                    </div>
                    <label htmlFor="email">E-mail</label>
                    {/* value={loginUser.email} onChange={handleOnChange} */}
                    <input id={styles['space-down']}type="text"  name="email" required placeholder='example@email.com' />
                    </fieldset>
                    <footer>
                        <button>Cancelar</button>
                        <button>Pesquisar</button>
                    </footer>
                </form>
            </main>
            <Footer/>
        </div>
    )
}