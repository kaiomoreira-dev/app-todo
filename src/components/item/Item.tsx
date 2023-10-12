import { useState } from 'react';
import styles from './Item.module.css';

interface IPropdItem{
    id: string,
    description: string,
    completed: boolean
}

export function Item({id, completed, description}: IPropdItem){

    const [hoveredCheck, setHoveredCheck] = useState(false)
    const [hoveredTrash, setHoveredTrash] = useState(false)

    const checkTrue = "./src/assets/check-true.svg"
    const checkFalse = "./src/assets/check-false.svg"
    const hoverCheckFalse = "./src/assets/hover-check-false.svg"
    const hoverCheckTrue= "./src/assets/hover-check-true.svg"

    const trash = "./src/assets/trash.svg"
    const hoverTrash = "./src/assets/hover-trash.svg"

    //[x] criar função para mudar o o estado ckeckbox mouse house está ativado
    function handleMouseEnterCheck(){
        setHoveredCheck(true)
    }

    //[x] criar função para mudar o estado do ckeckbox do mouse hover está desativado
    function handleMouseLeaveCheck(){
        setHoveredCheck(false)
    }

    //[x] criar função para mudar o estado da trash do mouse hover está desativado
    function handleMouseEnterTrash(){
        setHoveredTrash(true)
    }

    //[x] criar função para mudar o estado da trash do mouse hover está desativado
    function handleMouseLeaveTrash(){
        setHoveredTrash(false)
    }

    //[] criar função para deletar a tarefa
    async function handleDeleteTodo(){
        try {
            await fetch(`https://api-todo-oe5w.onrender.com/api/todos/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')} `
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    //[x] criar função para marcar a tarefa como concluida
    async function handleMarkTodoAsCompleted(){
        try {
            const responseMarkTodoAsCompleted = await fetch(`https://api-todo-oe5w.onrender.com/api/todos/mark-completed/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({}),
        })

        await responseMarkTodoAsCompleted.json()

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className={styles.card}>
            <button className={styles.checkTrue} >
                <img 
                src={hoveredCheck ? (completed ? hoverCheckTrue : hoverCheckFalse) : (completed ? checkTrue : checkFalse)} 
                alt="" 
                onMouseEnter={handleMouseEnterCheck}
                onMouseLeave={handleMouseLeaveCheck}
                onClick={handleMarkTodoAsCompleted}
                />
            </button>
            
            <p className={completed ? styles['title-through'] : styles['title-normal']}>{description}
            </p>

            <button className={styles.checkTrue}>
                <img 
                src={hoveredTrash ? hoverTrash : trash} 
                alt=""
                onMouseEnter={handleMouseEnterTrash}
                onMouseLeave={handleMouseLeaveTrash} 
                onClick={handleDeleteTodo}
                />
            </button>
        </div>
    )
}