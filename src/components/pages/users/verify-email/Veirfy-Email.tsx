import { Footer } from '../../../footer/Footer';
import { Header } from '../../../header/Header';
import styles from './Verify-Email.module.css';
import verificationImg from '../../../../assets/verification.png';
import rocketImg from '../../../../assets/rocket.svg';
import todoImg from '../../../../assets/todo.svg';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

export function VerifyEmail(){
    const { search } = useLocation();

    const params = new URLSearchParams(search);
    const email = params.get('email');
    const token = params.get('token');  

   useEffect(()=>{
    async function verifyEmail(){
        const response = await fetch(`https://api-todo-oe5w.onrender.com/api/users/verify-email?email=${email}&token=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passowrd: '123456789' }),
        });

        const data = await response.json();
        console.log(data);
        localStorage.setItem('hasVisited', 'true')
    }

    async function blockScreen() {
        const hasVisited = localStorage.getItem('hasVisited')
        if(hasVisited !== 'true'){
          window.location.href = '/login'
          return
        }
      }
    verifyEmail()
    blockScreen()
   })

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