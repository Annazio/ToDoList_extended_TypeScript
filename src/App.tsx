import React, { useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';
import { TaskType } from './ToDoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type FilterValuesType = "all" | "completed" | "active"

type TodolistType ={
 id: string
 title: string
 filter: FilterValuesType
}

type TaskStateType ={
  [key: string]: Array<TaskType>
}

function  App() {
  
  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>> ([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
      [todolistId2]: [
        {id: v1(), title: "Book", isDone: false},
        {id: v1(), title: "Milk", isDone: true},
       
      ]
  })

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter(el => el.id !== todolistId)
    setTodolists(filteredTodoList)
    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }

  // const[tasks1, setTasks1] = useState(Array<TaskType>)
  // let tasks2: Array<TaskType> = можно сразу написать тип чтобы не ошибиться
  // let tasks2: Array<TaskType> = [
  //   {id: 1, title: "Terminator", isDone: true},
  //   {id: 2, title: "XXX", isDone: false},
  //   {id: 3, title: "Jentlments of fortune", isDone: true}
  // ]

  function removeTask(id: string, todolistId: string){
    let tasks = tasksObj[todolistId]
     let filteredTasks = tasks.filter(el=>el.id !== id)
     tasksObj[todolistId] = filteredTasks
     setTasks({...tasksObj})
  }

  function changeTodoListTitle(id: string, newTitle: string){
   const todolist = todolists.find(el=> el.id === id)
   if(todolist){
    todolist.title = newTitle
    setTodolists([...todolists])
   }
  }

function addTask(title: string, todolistId: string){
  let task = {id: v1(), title: title, isDone: false}
  let tasks= tasksObj[todolistId]
  let newTasks = [task, ...tasks]
  tasksObj[todolistId] = newTasks
  setTasks({...tasksObj})
}

  function changeFilter(value: FilterValuesType, todolistId: string){
    let todolist = todolists.find(el => el.id === todolistId)
    if(todolist){
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string){
    let tasks= tasksObj[todolistId]
   let task = tasks.find(el => el.id === taskId )
   if(task){
   task.isDone = isDone
   setTasks({...tasksObj})
   }
   ;
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string){
    // достаем нужный массив по тодолистид
    let tasks= tasksObj[todolistId]
    // найдем нужный таск
   let task = tasks.find(el => el.id === taskId )
   if(task){
   task.title = newTitle;
   setTasks({...tasksObj})
   }
   ;
  }



 function addTodoList(title: string) {
  let todolist: TodolistType ={
    id: v1(),
    filter: "all",
    title: title
  }  
  setTodolists([todolist, ...todolists])
  setTasks({
    ...tasksObj,
    [todolist.id]: []
  })
 }


  return (

    <div>
<Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
</Box>
<Container fixed>
  
<Grid container style={ {padding: "10px"} }>
      <AddItemForm addItem={addTodoList} />
      </Grid>

         <Grid container spacing={10}>
      {

        todolists.map(el => {
          let tasksForTodoList = tasksObj[el.id];
          if(el.filter === "completed"){
          tasksForTodoList = tasksForTodoList.filter(el => el.isDone === true)
        }
        if(el.filter === "active"){
          tasksForTodoList = tasksForTodoList.filter(el => el.isDone === false)
        }
 
          return <Grid item>
            <Paper style={ {padding: "10px"} }>
          <ToDoList 
          key={el.id}
          id={el.id}
          title={el.title} 
          tasks={tasksForTodoList} 
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          filter={el.filter}
          removeTodoList={removeTodoList}
          changeTaskTitle={changeTaskTitle}
          changeTodoListTitle={changeTodoListTitle}
          />
          </Paper>
          </Grid>
        })
      }
      
    </Grid>
              
    </Container>
    </div>
  );
}

export default App;

