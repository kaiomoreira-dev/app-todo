/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Footer } from '../../../footer/Footer';
import { Header } from '../../../header/Header';
import styles from './Verify-Email.module.css';
import verificationImg from '../../../../assets/verification.png';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export function VerifyEmail(){
    const [block, setBlock] = useState<boolean>(true)
    
    const { search } = useLocation();

    const navigate = useNavigate()

    const params = new URLSearchParams(search);
    const email = params.get('email') as string;
    const token = params.get('token');  

    async function verifyEmail(){
       try {
        setBlock(false);
            const emails = localStorage.getItem('emails') as unknown as string[];
           
            await fetch(`https://api-todo-oe5w.onrender.com/api/users/verify-email?email=${email}&token=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });

            async function redirect(){
                return new Promise((resolve) => {
                    setTimeout(()=>{
                    resolve(true)
                    }, 999999)
                })
            }

            emails.push(email);

            localStorage.setItem('emails', JSON.stringify(emails));
           
        redirect().then((result)=>{
            if (result) {
                navigate("/login")
            }
        })

       } catch (error) {
        console.log(error)
       }
    }
  

    useEffect(()=>{
        function verifyRouter(){
            const emails = localStorage.getItem('emails') as unknown as string[];

            // se email e token não existir no storage
            // exemplo https://localhost:300/reset-password
            if(!email || !token){
                navigate("/login")
            }
            
            // se email existir no storage ou token não existir
            if(emails.includes(email) || !token){
                navigate("/login")
            }
            verifyEmail();
        }
        verifyRouter();
    })

    return(
        <div className={block ? styles.none : styles.container}>
            <Header />
            <div className={styles['verification-content']}>
                <img src={verificationImg} alt="" />
                <strong>Verificação de E-mail Bem-Sucedida!</strong>
                <p>
                Parabéns! Seu e-mail foi verificado com sucesso. Agora você está pronto para aproveitar ao máximo nossa plataforma. Continue explorando e aproveitando todos os recursos que temos a oferecer. 
                </p>
            </div>
            <Footer />
        </div>
    )
}