import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const data = {
        "name": "Harry",
        "character": "Stupid"
    }
    const [state, setState] = useState(data)

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Sidd",
                "character": "Intelligent"
            })
        }, 4000);
    }

    return (
        <noteContext.Provider value={{ state, update }}> 
        {/* we can pass more than one functions or data */}
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState