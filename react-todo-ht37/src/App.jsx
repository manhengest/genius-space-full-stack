import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.scss"
import ListComponent from "./components/ListComponent.jsx";

function App() {
    const [ task, setTask ] = useState("");
    const [ taskList, setTaskList ] = useState(() => [
        { id: crypto.randomUUID(), name: "Купити продукти", isDone: false },
        { id: crypto.randomUUID(), name: "Зробити домашнє завдання", isDone: false },
        { id: crypto.randomUUID(), name: "Підготувати презентацію", isDone: false },
    ]);

    const addTaskHandler = (input) => {
        if (input.trim() === "") {
            alert("Task cannot be empty");
            return;
        }
        const newId = crypto.randomUUID();
        setTaskList([ ...taskList, { id: newId, name: input.trim(), isDone: false } ]);
        setTask("");
    };
    const onChangeHandler = (e) => {
        const { value } = e.target;
        setTask(value);
    }
    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            addTaskHandler(task);
        }
    }
    const markAsDone = (id) => {
        setTaskList(taskList.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    };
    const deleteTask = (id) => {
        setTaskList(taskList.filter((todo) => todo.id !== id));
    }

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={ viteLogo } className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={ reactLogo } className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React ToDO</h1>

            <input
                type="text"
                onChange={ onChangeHandler }
                value={ task }
                onKeyPress={ (e) => onKeyPressHandler(e) }
            />

            {
                taskList.length ?
                    <ListComponent
                        taskList={ taskList }
                        markAsDone={ markAsDone }
                        deleteTask={ deleteTask }
                    /> :
                    <p className="task-list__empty">No tasks added yet</p>
            }

            <button onClick={ () => addTaskHandler(task) }>Add a task</button>

            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
