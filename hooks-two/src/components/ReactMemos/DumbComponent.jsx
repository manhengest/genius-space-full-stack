import React, { useState } from "react";

const DumbComponent = React.memo(() => {
    const [list, setList] = useState([1, 2, 3, 4, 5]);

    console.log("DumbComponent rendered");

    return (
        <div>
            <p>Dumb Component</p>
            <div>
                <p>List: {list.join(", ")}</p>
            </div>
            <div>
                <button onClick={() => setList([...list, list.length + 1])}>
                    Add Number
                </button>
            </div>
        </div>
    );
})

export default DumbComponent;