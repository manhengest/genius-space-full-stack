import React, { Component } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
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
            <>
                <div>
                    <a href="https://vite.dev" target="_blank" rel="noreferrer">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noreferrer">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite + React ToDO</h1>

                <input
                    type="text"
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
                    <p className="task-list__empty">No tasks added yet</p>
                )}

                <button onClick={() => this.addTaskHandler(task)}>Add a task</button>

                <button
                    className="clear-btn"
                    onClick={this.clearTodoList}
                >
                    Clear Todo List
                </button>

                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </>
        );
    }
}

export default App;
