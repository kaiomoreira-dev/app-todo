import styles from './Header.module.css'

export function Header(){
    return(
        <header className={styles.header}>
            <span className={styles['space-icon']}><img src="./src/assets/rocket.svg" alt="" /></span>
            <img src="./src/assets/todo.svg" alt="" />
        </header>
    )
}