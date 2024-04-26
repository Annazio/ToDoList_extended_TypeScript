import React, { useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';
import { TaskType } from './ToDoList';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "completed" | "active"

function  App() {
  
  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
  ]);
  
  let [filter, setFilter] = useState<FilterValuesType>("all")

  // const[tasks1, setTasks1] = useState(Array<TaskType>)
  // let tasks2: Array<TaskType> = можно сразу написать тип чтобы не ошибиться
  // let tasks2: Array<TaskType> = [
  //   {id: 1, title: "Terminator", isDone: true},
  //   {id: 2, title: "XXX", isDone: false},
  //   {id: 3, title: "Jentlments of fortune", isDone: true}
  // ]

  function removeTask(id: string){
     let filteredTasks = tasks.filter(el=>el.id !== id)
     setTasks(filteredTasks)
  }

function addTask(title: string){
  let newTask = {id: v1(), title: title, isDone: false}
  let newTasks = [newTask, ...tasks]
  setTasks(newTasks)
}

  function changeFilter(value: FilterValuesType){
    setFilter(value);
  }

  function changeStatus(taskId: string, isDone: boolean){
   let task = tasks.find(el => el.id === taskId )
   if(task){
   task.isDone = isDone
   }
   setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;
  if(filter === "completed"){
  tasksForTodoList = tasks.filter(el => el.isDone === true)
}
if(filter === "active"){
  tasksForTodoList = tasks.filter(el => el.isDone === false)
}

  return (
    <div>
    <ToDoList title="What to learn" 
              tasks={tasksForTodoList} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={filter}
              />
              
    {/* <ToDoList title="Movies" tasks={tasks2}/> */}
    {/* <ToDoList title="Songs"/> */}
    </div>
  );
}

export default App;

