import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

const App = () => {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTodo([...todo, { text: task, isCompleted: false }]);
      setTask("");
      toast.success("Task added successfully!");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todo];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodo(newTodos);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTask = todo.filter((_, i) => i !== index);
      setTodo(updatedTask);
      toast.info("Task deleted successfully!");
    }
  };

  const editTask = (index) => {
    setIsEditing(index);
    setEditText(todo[index].text);
  };

  const saveTask = (index) => {
    const updatedTodos = [...todo];
    updatedTodos[index].text = editText;
    setTodo(updatedTodos);
    setIsEditing(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2 className={styles.heading}>To-Do List</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.inputTask}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="add a task"
          />
          <button className={styles.addBtn} onClick={addTask}>
            Add Task
          </button>
        </div>
        <ol className={styles.taskList}>
          {todo.map((data, index) => (
            <li
              key={index}
              className={`${styles.taskItem} ${
                data.isCompleted ? styles.completed : ""
              }`}
            >
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    className={styles.editInput}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => saveTask(index)}
                    className={styles.saveBtn}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className={styles.taskText}>{data.text}</span>
                  <button
                    onClick={() => editTask(index)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleComplete(index)}
                    className={styles.completeBtn}
                  >
                    {data.isCompleted ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
