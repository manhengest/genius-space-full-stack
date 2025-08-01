import { useRef } from "react";

const Focus = () => {
    const input = useRef(null);

    const onFocusHandler = () => {
        if (input.current) {
            input.current.focus();
        }
    }

    const onBlurHandler = () => {
        if (input.current) {
            input.current.blur();
        }
    }

    return <div>
        <div><input ref={ input } type="text"/></div>

        <button onClick={ onFocusHandler }>Focus</button>
        <button onClick={ onBlurHandler }>Blur</button>
    </div>
}

export default Focus;