"use client";

import styles from "./page.module.css";
import { useState, } from "react";

export default function Home() {
  const [state, setState] = useState("");
  //local storage
 const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");

  return savedTodos ? JSON.parse(savedTodos) : [];
});
  
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddButton = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setErrorMessage("Please enter todo");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: inputValue.trim(),
      isDone: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputValue("");
    setErrorMessage("");
  };

  const handleToggle = (id) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, isDone: !todo.isDone }
      : todo
  );

  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

  const handleDelete = (id) => {
  const updatedTodos = todos.filter(
    (todo) => todo.id !== id
  );

  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

  const deleteCompletedTasks = () => {

   const updatedTodos =todos.filter((todo) => !todo.isDone);
  
  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const filteredTodos =
    state === "Active"
      ? todos.filter((todo) => !todo.isDone)
      : state === "Complete"
        ? todos.filter((todo) => todo.isDone)
        : todos;

  const totalTasks = todos.length;

  const completedTasks = todos.filter((todo) => todo.isDone).length;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>To-do List</h1>

        <form className={styles.form} onSubmit={handleAddButton}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
          />

          <button className={styles.add} type="submit">
            Add
          </button>
        </form>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.filter}>
          <button
            className={`${styles.all} ${
              state === "" || state === "All" ? styles.selected : ""
            }`}
            onClick={() => setState("All")}
          >
            All
          </button>

          <button
            className={`${styles.active} ${
              state === "Active" ? styles.selected : ""
            }`}
            onClick={() => setState("Active")}
          >
            Active
          </button>

          <button
            className={`${styles.completed} ${
              state === "Complete" ? styles.selected : ""
            }`}
            onClick={() => setState("Complete")}
          >
            Completed
          </button>
        </div>

        <div className={styles.tasksContainer}>
          {filteredTodos.length === 0 ? (
            <p className={styles.notask}>
              {todos.length === 0
                ? "No tasks added yet, Add one above"
                : "No matching tasks"}
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <div className={styles.task} key={todo.id}>
                <div className={styles.taskLeft}>
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggle(todo.id)}
                  />

                  <span className={todo.isDone ? styles.completedText : ""}>
                    {todo.title}
                  </span>
                </div>

                <button
                  className={styles.delete}
                  onClick={() => {
                    if (window.confirm("Ust gah u?")) {
                      handleDelete(todo.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className={styles.stats}>
            <p>
              {completedTasks} of {totalTasks} tasks completed
            </p>

            <button
              className={styles.clear}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear all completed tasks?",
                  )
                ) {
                  deleteCompletedTasks();
                }
              }}
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
