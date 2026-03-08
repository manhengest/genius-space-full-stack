import { useState, useMemo } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.scss"
import ListComponent from "./components/ListComponent.jsx";

const MIN_CHARS = 3;
const MAX_CHARS = 100;
const FILTER_ALL = "all";
const FILTER_ACTIVE = "active";
const FILTER_COMPLETED = "completed";

function App() {
    const [ task, setTask ] = useState("");
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ filter, setFilter ] = useState(FILTER_ALL);
    const [ validationError, setValidationError ] = useState("");
    const [ taskList, setTaskList ] = useState(() => [
        { id: crypto.randomUUID(), name: "Купити продукти", isDone: false },
        { id: crypto.randomUUID(), name: "Зробити домашнє завдання", isDone: false },
        { id: crypto.randomUUID(), name: "Підготувати презентацію", isDone: false },
    ]);

    const validateTask = (input) => {
        const trimmed = input.trim();
        if (trimmed.length === 0) {
            return "Завдання не може бути порожнім";
        }
        if (trimmed.length < MIN_CHARS) {
            return `Мінімальна кількість символів: ${MIN_CHARS}`;
        }
        if (trimmed.length > MAX_CHARS) {
            return `Максимальна кількість символів: ${MAX_CHARS}`;
        }
        return "";
    };

    const addTaskHandler = (input) => {
        const error = validateTask(input);
        if (error) {
            setValidationError(error);
            return;
        }
        setValidationError("");
        const newId = crypto.randomUUID();
        setTaskList([ ...taskList, { id: newId, name: input.trim(), isDone: false } ]);
        setTask("");
    };

    const onChangeHandler = (e) => {
        const { value } = e.target;
        setTask(value);
        setValidationError("");
    };

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            addTaskHandler(task);
        }
    };

    const markAsDone = (id) => {
        setTaskList(taskList.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ));
    };

    const deleteTask = (id) => {
        setTaskList(taskList.filter((todo) => todo.id !== id));
    };

    const filteredTaskList = useMemo(() => {
        let result = taskList;

        if (filter === FILTER_ACTIVE) {
            result = result.filter((todo) => !todo.isDone);
        } else if (filter === FILTER_COMPLETED) {
            result = result.filter((todo) => todo.isDone);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();
            result = result.filter((todo) =>
                todo.name.toLowerCase().includes(query)
            );
        }

        return result;
    }, [ taskList, filter, searchQuery ]);

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

            <div className="task-form">
                <input
                    type="text"
                    onChange={ onChangeHandler }
                    value={ task }
                    onKeyDown={ onKeyDownHandler }
                    placeholder="Введіть завдання..."
                    className={ validationError ? "input-invalid" : "" }
                />
                { validationError && <p className="input-error">{ validationError }</p> }
            </div>

            <div className="task-controls">
                <select
                    value={ filter }
                    onChange={ (e) => setFilter(e.target.value) }
                    className="task-filter"
                >
                    <option value={ FILTER_ALL }>Всі</option>
                    <option value={ FILTER_ACTIVE }>Активний</option>
                    <option value={ FILTER_COMPLETED }>Завершений</option>
                </select>

                <input
                    type="text"
                    placeholder="Пошук..."
                    value={ searchQuery }
                    onChange={ (e) => setSearchQuery(e.target.value) }
                    className="task-search"
                />
            </div>

            {
                filteredTaskList.length ?
                    <ListComponent
                        taskList={ filteredTaskList }
                        markAsDone={ markAsDone }
                        deleteTask={ deleteTask }
                    /> :
                    <p className="task-list__empty">
                        { taskList.length ? "Нічого не знайдено" : "No tasks added yet" }
                    </p>
            }

            <button onClick={ () => addTaskHandler(task) }>Add a task</button>

            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
