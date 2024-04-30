import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import AddItemForm from "./components/AddItemForm/AddItemForm";

export type TaskType = {
  id: string
  title: string
  isDone: boolean 
}

type PropsType ={ 
    id: string
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] идентичная запись
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

export default function ToDoList(props: PropsType) {

 const onAllClickHandler =() =>{props.changeFilter("all", props.id)}
 const onActiveClickHandler =() =>{props.changeFilter("active", props.id)}
 const onCompletedClickHandler =() =>{props.changeFilter("completed", props.id)}
 const removeTodoList = () => {props.removeTodoList(props.id)
 }

  return (
    <div>
      <div className="App">
        <h3>{props.title}
        <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm id={props.id} addTask={props.addTask}/>
        <ul>
          {
            props.tasks.map(el =>{
             const onRemoveHandler =()=>{props.removeTask(el.id, props.id)}
             const onChangeHandler = (e: ChangeEvent<HTMLInputElement> )=> {
               props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
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
