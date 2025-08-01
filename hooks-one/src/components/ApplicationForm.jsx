import { useReducer, useRef } from "react";

const ApplicationForm = () => {
    const initialState = { name: "", lastName: "", birthYear: "" };
    const name = useRef(null);
    const lastName = useRef(null);
    const birthYear = useRef(null);

    function reducer(state, action) {
        switch (action.type) {
            case "name": {
                return {
                    ...state,
                    name: action.name,
                };
            }
            case "lastName": {
                return {
                    ...state,
                    lastName: action.lastName,
                };
            }
            case "birthYear": {
                return {
                    ...state,
                    birthYear: action.birthYear,
                };
            }
        }
        throw Error("Unknown action: " + action.type);
    }

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const handleClick = (type) => {
        const refs = { name, lastName, birthYear };
        const ref = refs[type];

        if (ref) {
            dispatch({ type, [type]: ref.current.value });
            ref.current.value = "";
        }
    };

    return <div>
        <p>useReducer component</p>
        <div>
            <p>Name: { state.name }</p>
            <p>Last Name: { state.lastName }</p>
            <p>Birth Year: { state.birthYear }</p>
        </div>
        <div>
            <div>
                <input ref={ name } type="text" placeholder="name"/>
            </div>
            <button onClick={ () => handleClick("name") }>Add name</button>
        </div>
        <div>
            <div>
                <input ref={ lastName } type="text" placeholder="last name"/>
            </div>
            <button onClick={ () => handleClick("lastName") }>Add last name</button>
        </div>
        <div>
            <div>
                <input ref={ birthYear } type="text" placeholder="birth year"/>
            </div>
            <button onClick={ () => handleClick("birthYear") }>Add birth year</button>
        </div>
    </div>
}

export default ApplicationForm;