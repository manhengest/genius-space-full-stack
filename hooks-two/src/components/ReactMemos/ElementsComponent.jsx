import { useState } from "react";
import DumbComponent from "./DumbComponent.jsx";

const ElementsComponent = () => {
    const [elements, setElements] = useState([1, 2, 3, 4, 5]);

    const removeElement = (index) => {
        setElements(elements.filter((_, i) => i !== index));
    };

    console.log("ElementsComponent rendered");

    return (
        <div>
            <ol>
                {elements.map((element, index) => (
                    <li key={index}>Element {element} <button onClick={() => removeElement(index)}>Remove {index}</button></li>
                ))}
            </ol>

            <DumbComponent />
        </div>
    );
}

export default ElementsComponent;