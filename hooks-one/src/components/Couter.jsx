import { useEffect } from "react";

const Counter = ({ count }) => {
    useEffect(() => {
        console.log("Hi from useEffect");
    }, [ count ]);

    return (
        <div className="card">
            <span>Count: { count }</span>
        </div>
    );
}

export default Counter;