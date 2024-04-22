import React from 'react';
import './App.css';
import ToDoList from './ToDoList';
import { TaskType } from './ToDoList';

function  App() {
  
  let tasks1: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false}
  ]

  // let tasks2: Array<TaskType> = можно сразу написать тип чтобы не ошибиться
  let tasks2: Array<TaskType> = [
    {id: 1, title: "Terminator", isDone: true},
    {id: 2, title: "XXX", isDone: false},
    {id: 3, title: "Jentlments of fortune", isDone: true}
  ]

  return (
    <div>
    <ToDoList title="What to learn" tasks={tasks1}/>
    <ToDoList title="Movies" tasks={tasks2}/>
    {/* <ToDoList title="Songs"/> */}
    </div>
  );
}
 
export default App;

