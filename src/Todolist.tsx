import React, {useState, MouseEvent, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import './App.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string,todolistId:string) => void
    changeFilter: (value: FilterValuesType,id:string,) => void
    addTask: (titleValue: string,todolistId:string) => void
    doneOn: (id: string, isDone: boolean,todolistId:string) => void
    filter: FilterValuesType
    id:string
    removeTodoList:(id:string)=>void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const onClickOn = () => {

        if (title.trim() === '') {
            return setError('error requred field')
        }
        props.addTask(title.trim(),props.id)
        setTitle('')
        setError(null)
    }
    const onChangeOn = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressOn = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickOn()
        }
    }
    const removeTask = (id: string) => {
        props.removeTask(id,props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)

    }
    return <div>
        <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
        <div>
            <input value={title} onKeyPress={onKeyPressOn} className={error ? 'error' : ''} onChange={onChangeOn}/>
            <button onClick={onClickOn}>+</button>
            {error && <div className={'error-message'}>
                {error}
            </div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const checkedOn = (e: ChangeEvent<HTMLInputElement>) => {
                        props.doneOn(t.id, e.currentTarget.checked,props.id)
                    }
                    return (
                        <li key={t.id}  className={!t.isDone ? 'is-done' : "" }>
                            <input type="checkbox" onChange={checkedOn} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTask(t.id)}

                            >x
                            </button>
                        </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "all-active" : ""} onClick={() => {
                props.changeFilter("all",props.id)
            }}>
                All
            </button>
            <button className={props.filter === "active" ? "all-active" : ""} onClick={() => {
                props.changeFilter("active",props.id)
            }}>
                Active
            </button>
            <button className={props.filter === "completed" ? "all-active" : ""} onClick={() => {
                props.changeFilter("completed",props.id)
            }}>
                Completed
            </button>
        </div>
    </div>
}
