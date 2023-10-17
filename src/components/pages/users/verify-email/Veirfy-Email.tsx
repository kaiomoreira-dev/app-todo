/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Footer } from '../../../footer/Footer';
import { Header } from '../../../header/Header';
import styles from './Verify-Email.module.css';
import verificationImg from '../../../../assets/verification.png';
import rocketImg from '../../../../assets/rocket.svg';
import todoImg from '../../../../assets/todo.svg';
import { useLocation } from 'react-router';

export function VerifyEmail(){
    const { search } = useLocation();

    const params = new URLSearchParams(search);
    const email = params.get('email');
    const token = params.get('token');  

    async function verifyEmail(){
       try {
            const response = await fetch(`https://api-todo-oe5w.onrender.com/api/users/verify-email?email=${email}&token=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });

            const data = await response.json();
            console.log(data)
            console.log(response.status)

            async function redirect(){
                console.log('aqui')

                return new Promise((resolve) => {
                    setTimeout(()=>{
                    resolve(true)
                }, 20000)
                } )
            }
            redirect().then((result)=>{
                if (result) {
                    window.location.href = '/login';
                }
            })
       } catch (error) {
        console.log(error)
       }
    }
    verifyEmail()
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles['verification-content']}>
                <img src={verificationImg} alt="" />
                <strong>Verificação de E-mail Bem-Sucedida!</strong>
                <p>
                Parabéns! Seu e-mail foi verificado com sucesso. Agora você está pronto para aproveitar ao máximo nossa plataforma. Continue explorando e aproveitando todos os recursos que temos a oferecer. 
                </p>
                <span className={styles.icon}>
                 Equipe
                 <img src={rocketImg} alt="" />
                 <img src={todoImg} alt="" />
                </span>
            </div>
            <Footer />
        </div>
    )
}