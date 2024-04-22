import React from "react";

export type TaskType = {
  id: number
  title: string
  isDone: boolean 
}

type PropsType ={
    title: string
    tasks: Array<TaskType>
    // tasks: TaskType[] идентичная запись
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
          <li>
            <input type="checkbox" checked={props.tasks[0].isDone} />
            <span>{props.tasks[0].title}</span>
          </li>
          <li>
            <input type="checkbox" checked={props.tasks[1].isDone} />
            <span>{props.tasks[1].title}</span>
          </li>
          <li>
            <input type="checkbox" checked={props.tasks[2].isDone} />
            <span>{props.tasks[2].title}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
