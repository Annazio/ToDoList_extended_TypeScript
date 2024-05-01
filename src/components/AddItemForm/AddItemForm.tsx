import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
 
};

export default function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitel, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      props.addItem(newTaskTitel);
      setNewTaskTitle("");
      // addTask()
    }
  };

  const addTask = () => {
    if (newTaskTitel.trim() !== "") {
      props.addItem(newTaskTitel.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={newTaskTitel}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
