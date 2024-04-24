import React from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: number
  title: string
  isDone: boolean 
}

type PropsType ={
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] идентичная запись
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export default function ToDoList(props: PropsType) {
  return (
    <div>
      <div className="App">
        <h3>{props.title}</h3>
        <div>
          <input type="text" />
          <button>+</button>
        </div>
        <ul>
          {
            props.tasks.map(el => <li>
              <input type="checkbox" checked={el.isDone} />
              <span>{el.title}</span>
              <button onClick={()=>{props.removeTask(el.id)}}>x</button>
            </li>
            )
          }
        </ul>
      </div>
      <div>
        <button onClick={()=> props.changeFilter("all")}>All</button>
        <button onClick={()=> props.changeFilter("active")}>Active</button>
        <button onClick={()=> props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}
