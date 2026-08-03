"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { TodoButton } from "./components/todo-button";
const getDataFromLocal = () => {
  const todos =
    typeof window !== "undefined" ? localStorage.getItem("todos") : undefined;
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
};
export default function Home() {
  const [state, setState] = useState("");
  //local storage
  const [todos, setTodos] = useState(getDataFromLocal());

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
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteCompletedTasks = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filteredTodos =
    state === "Active"
      ? todos.filter((todo) => !todo.isDone)
      : state === "Completed"
        ? todos.filter((todo) => todo.isDone)
        : todos;

  const totalTasks = todos?.length;

  const completedTasks = todos.filter((todo) => todo.isDone)?.length;
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const handleEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editValue.trim() } : todo,
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setEditingId(null);
    setEditValue("");
  };

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
          {/* <button
            className={`${styles.all} ${
              state === "" || state === "All" ? styles.selected : ""
            }`}
            onClick={() => setState("All")}
          >
            All
          </button> */}
          <TodoButton
            onClick={() => setState("All")}
            text="All"
            stateValue={state}
            className={styles.all}
          />

          {/* <button
            className={`${styles.active} ${
              state === "Active" ? styles.selected : ""
            }`}
            onClick={() => setState("Active")}
          >
            Active
          </button> */}
          <TodoButton
            onClick={() => setState("Active")}
            text="Active"
            stateValue={state}
            className={styles.active}
          />
          <TodoButton
            onClick={() => setState("Completed")}
            text="Completed"
            stateValue={state}
            className={styles.completed}
          />
          {/* <button
            className={`${styles.completed} ${
              state === "Complete" ? styles.selected : ""
            }`}
            onClick={() => setState("Complete")}
          >
            Completed
          </button> */}
        </div>

        <div className={styles.tasksContainer}>
          {filteredTodos?.length === 0 ? (
            <p className={styles.notask}>
              {todos?.length === 0
                ? "No tasks yet, Add one above!"
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

                  {editingId === todo.id ? (
                    <input
                      value={editValue}
                      autoFocus
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleEdit(todo.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEdit(todo.id);
                        }

                        if (e.key === "Escape") {
                          setEditingId(null);
                          setEditValue("");
                        }
                      }}
                    />
                  ) : (
                    <span
                      className={todo.isDone ? styles.completedText : ""}
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditValue(todo.title);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {todo.title}
                    </span>
                  )}
                </div>

                <button
                  className={styles.delete}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this task?",
                      )
                    ) {
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

        {todos?.length > 0 && (
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
        <div className={styles.footer}>
          <p>Powered by</p>
          <p className={styles.pineconetext}>Pinecone Academy</p>
        </div>
      </div>
    </main>
  );
}
