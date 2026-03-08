import { useLayoutEffect, useRef, useState } from "react";

const Info = () => {
    const wrapper = useRef(null);
    const [ info, setInfo ] = useState([]);

    useLayoutEffect(() => {
        console.log("useLayoutEffect called");
        wrapper.current.innerHTML = info.join("");
    }, [ info ]);

    const addText = () => {
        setInfo((prevInfo) => [ ...prevInfo, "<p>New text...</p>" ]);
    }

    return <div>
        <p>useLayoutEffect component</p>
        <div ref={ wrapper }/>
        <button onClick={ addText }>Add text</button>
    </div>
}

export default Info;