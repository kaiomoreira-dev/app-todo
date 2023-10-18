import styles from './Header.module.css'
import rocketImg from '../../assets/rocket.svg'
import todoImg from '../../assets/todo.svg'

export function Header(){
    return(
        <header className={styles.header}>
            <a href="/">
            <span className={styles['space-icon']}><img src={rocketImg} alt="" /></span>
            <img src={todoImg} alt="" />
            </a>
        </header>
    )
}