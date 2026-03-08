import { useState } from "react"

import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"

import Counter from "./components/Couter.jsx";
import Info from "./components/Info.jsx";
import Name from "./components/Name.jsx";
import ApplicationForm from "./components/ApplicationForm.jsx";
import Focus from "./components/Focus.jsx";

function App() {
    const [ count, setCount ] = useState(0);

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
                <Counter count={ count }/>
                <button onClick={ () => setCount((count) => count + 1) }>
                    plus one +++
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <div className="card">
                <Info/>
            </div>
            <div className="card">
                <Name/>
            </div>
            <div className="card">
                <ApplicationForm/>
            </div>
            <div className="card">
                <Focus/>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
