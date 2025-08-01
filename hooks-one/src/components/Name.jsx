import { useRef, useState } from "react";

const Names = () => {
    const wrapper = useRef(null);
    const [ names, setNames ] = useState([ "John", "Jane", "Doe", "James", "Rick" ]);

    const handleClick = () => {
        wrapper.current.innerHTML = names[Math.floor(Math.random() * names.length)];
    };

    return <div>
        <div ref={ wrapper }/>

        <button onClick={ handleClick }>Say Hi!</button>
    </div>
}

export default Names;