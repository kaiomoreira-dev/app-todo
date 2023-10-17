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
            });
            
            if(response.ok){
                const firstVisitTimestamp = localStorage.get('firtVisitTimestamp');

                if(!firstVisitTimestamp){
                    localStorage.setItem('firstVisitTimestamp', Date.now() as unknown as string);
                }else{
                    const currentTime = Date.now();
                    const oneMinute = 60 * 1000;

                    if (currentTime - parseInt(firstVisitTimestamp, 10) > oneMinute) {
                        window.location.href = '/login';
                    } else {
                        localStorage.setItem('visitedVerifyEmailPage', 'true');
                    }
                }
            }
       } catch (error) {
            window.location.href = '/login';
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