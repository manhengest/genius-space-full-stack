import React, { Component } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styles from "./App.module.css";
import ListComponent from "./components/ListComponent.jsx";

const STORAGE_KEY = "react-todo-ht38-tasks";

const getInitialTasks = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return getDefaultTasks();
        }
    }
    return getDefaultTasks();
};

const getDefaultTasks = () => [
    { id: crypto.randomUUID(), name: "Купити продукти", isDone: false },
    { id: crypto.randomUUID(), name: "Зробити домашнє завдання", isDone: false },
    { id: crypto.randomUUID(), name: "Підготувати презентацію", isDone: false },
];

class App extends Component {
    state = {
        task: "",
        taskList: getInitialTasks(),
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.taskList !== this.state.taskList) {
            this.saveToStorage();
        }
    }

    saveToStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.taskList));
    };

    clearTodoList = () => {
        localStorage.removeItem(STORAGE_KEY);
        this.setState({ taskList: [] });
    };

    addTaskHandler = (input) => {
        if (input.trim() === "") {
            alert("Task cannot be empty");
            return;
        }
        const newTask = {
            id: crypto.randomUUID(),
            name: input.trim(),
            isDone: false,
        };
        this.setState(
            (prev) => ({
                taskList: [...prev.taskList, newTask],
                task: "",
            })
        );
    };

    onChangeHandler = (e) => {
        this.setState({ task: e.target.value });
    };

    onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            this.addTaskHandler(this.state.task);
        }
    };

    markAsDone = (id) => {
        this.setState((prev) => ({
            taskList: prev.taskList.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            ),
        }));
    };

    deleteTask = (id) => {
        this.setState((prev) => ({
            taskList: prev.taskList.filter((todo) => todo.id !== id),
        }));
    };

    render() {
        const { task, taskList } = this.state;

        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <a href="https://vite.dev" target="_blank" rel="noreferrer">
                        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noreferrer">
                        <img src={reactLogo} className={`${styles.logo} ${styles.logoReact}`} alt="React logo" />
                    </a>
                </div>
                <h1 className={styles.title}>Vite + React ToDO</h1>

                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter a task..."
                    onChange={this.onChangeHandler}
                    value={task}
                    onKeyDown={this.onKeyDownHandler}
                />

                {taskList.length ? (
                    <ListComponent
                        taskList={taskList}
                        markAsDone={this.markAsDone}
                        deleteTask={this.deleteTask}
                    />
                ) : (
                    <p className={styles.empty}>No tasks added yet</p>
                )}

                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => this.addTaskHandler(task)}>
                        Add a task
                    </button>
                    <button className={`${styles.button} ${styles.buttonDanger}`} onClick={this.clearTodoList}>
                        Clear Todo List
                    </button>
                </div>

                <p className={styles.footer}>
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        );
    }
}

export default App;
