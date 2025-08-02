import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import MemoComponent from "./components/MemoComponent.jsx";
import { useState } from "react";
import ElementsComponent from "./components/ReactMemos/ElementsComponent.jsx";
import useWindowWidth from "./hooks/useWindowWidth.js";

function App() {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
    const [name, setName] = useState("John Doe");
    const { windowWidth } = useWindowWidth();

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
            <h1>Vite + React</h1>
            <div className="card">
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <div className="card">
                <MemoComponent numbers={numbers} name={name} />
                <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
                    Add Number
                </button>
                <button onClick={() => setName(name === "John Doe" ? "Jane Doe" : "John Doe")}>
                    Toggle Name
                </button>
            </div>
            <div className="card">
                <ElementsComponent />
            </div>
            <div className="card">
                <p>Window width: { windowWidth }px</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
