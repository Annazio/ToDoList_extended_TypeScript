import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean 
}

type PropsType ={
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] идентичная запись
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export default function ToDoList(props: PropsType) {

const [newTaskTitel, setNewTaskTitle] = useState("")
const [error, setError] = useState<string | null>(null)

const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setNewTaskTitle(e.currentTarget.value)
}

const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  setError(null)
  if(e.charCode === 13){
    props.addTask(newTaskTitel);
    setNewTaskTitle("")
  }
}

const addTask = ()=> {
  if(newTaskTitel.trim() !== ""){
  props.addTask(newTaskTitel.trim());
  setNewTaskTitle("")
  }else{
    setError("Title is required")
  }
}

 const onAllClickHandler =() =>{props.changeFilter("all")}
 const onActiveClickHandler =() =>{props.changeFilter("active")}
 const onCompletedClickHandler =() =>{props.changeFilter("completed")}
 

  return (
    <div>
      <div className="App">
        <h3>{props.title}</h3>
        <div>
          <input type="text" value={newTaskTitel} onChange={onNewTitleChangeHandler}
                                                  onKeyPress={onKeyPressHandler} 
                                                  className={ error ? "error" : ""}
                                                  />
          <button onClick={addTask}>+</button>
          {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
          {
            props.tasks.map(el =>{
             const onRemoveHandler =()=>{props.removeTask(el.id)}
             const onChangeHandler = (e: ChangeEvent<HTMLInputElement> )=> {
               props.changeTaskStatus(el.id, e.currentTarget.checked)
             }

            return <li key={el.id} className={el.isDone? "is-done" : ""}>
              <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
           })
          }
        </ul>
      </div>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ? "active-filter" : "completed"} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
