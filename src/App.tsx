import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import styled from 'styled-components'
import {HexColorPicker } from 'react-colorful'

export type FilterValuesType = "all" | "active" | "completed";
type PropsToDoList = {
    id:string
    title:string
    filter:FilterValuesType
}
function App() {

const[color,serColor] = useState('#b312e3')

    function removeTask(id: string,todolistId:string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId]=filteredTasks
        setTasksObj({...tasksObj});
    }



const addTask = (titleValue:string,todolistId:string) => {
        let task = { id: v1(), title: titleValue, isDone: false}
        let tasks = tasksObj[todolistId]
    let newTasks = [task,...tasks]
     tasksObj[todolistId] = newTasks

    setTasksObj({...tasksObj})

}
     const doneOn = (id:string,isDone:boolean,todolistId:string) => {
         let tasks = tasksObj[todolistId]
        // tasks.map(el => el.id === id ? {...el,isDone: isDone}:el)
         let task = tasks.find(el => el.id === id)
         if(task)
             task.isDone = isDone
         setTasksObj({...tasksObj})
    }
    let todolistId1 = v1()
    let todolistId2 = v1()
    const [toDoList, setToDoList] = useState<Array<PropsToDoList>>( [
        {id: todolistId1, title: "What to learn", filter:  "active" },
        {id: todolistId2, title: "Prohodimec", filter: 'completed'}
    ]);
    function changeFilter(value: FilterValuesType,id:string) {
        setToDoList(toDoList.map(el => el.id === id ? {...el,filter: value}:el))
        // setFilter(value);
    }
    function removeTodoList (id:string) {
        let  filteredtask =   toDoList.filter(t => t.id !== id);
        setToDoList(filteredtask);
        delete tasksObj[id]
        setTasksObj({...tasksObj})
    }


    const [tasksObj, setTasksObj] = useState({
        [todolistId1]:[
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistId2]:[
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "BOOK", isDone: true },
            { id: v1(), title: "WHITE", isDone: false },
            { id: v1(), title: "POKER", isDone: false },
        ]
    });
    return (

        <div className="App" >
            <HexColorPicker color={color} onChange={serColor}/>
            <StyledShowDiv color={color}>

            { toDoList.map(tl=> {
                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }

                return <Todolist
                    title={tl.title}
                    removeTodoList={removeTodoList}
                    key={tl.id}
                    id={tl.id}
                    doneOn={doneOn}
                      filter={tl.filter}

                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />})}
            </StyledShowDiv>
        </div>
    );
}
let StyledShowDiv = styled.div<{color:string}>`
background-color: ${props => props.color};
  
  width: auto;
  height: auto;
  border-radius:3.1%;
  padding: 30px;
  display: flex;
  gap: 50px;
;
`
export default App;
