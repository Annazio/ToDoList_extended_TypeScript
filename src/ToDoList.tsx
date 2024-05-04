import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Style } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  // tasks: TaskType[] идентичная запись
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
};

export default function ToDoList(props: PropsType) {
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div className="todolist">
      <div className="App" >
        <h3>
          <EditableSpan title={props.title} onChange={changeTodoListTitle} />
          <IconButton onClick={removeTodoList} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul>
          {props.tasks.map((el) => {
            const onRemoveHandler = () => {
              props.removeTask(el.id, props.id);
            };
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeTaskStatus(el.id, e.currentTarget.checked, props.id);
            };

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(el.id, newValue, props.id);
            };

            return (
              <li key={el.id} className={el.isDone ? "is-done" : ""}>
                <Checkbox
                  checked={el.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan
                  title={el.title}
                  onChange={onChangeTitleHandler}
                />
                <IconButton onClick={onRemoveHandler} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {/* <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={
            props.filter === "completed" ? "active-filter" : "completed"
          }
          onClick={onCompletedClickHandler}
        > */}

        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
        color="secondary"
          variant={
            props.filter === "completed" ? "contained" : "text"
          }
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
        
      </div>
    </div>
  );
}
