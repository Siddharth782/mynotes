import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "64855ec5db41359ce339f62f",
            "user": "64848931b8ffc3bdc22b88c7",
            "title": "fuck me",
            "description": "I hate my life",
            "__v": 0
        },
        {
            "_id": "64855f33bc4a410b7da21972",
            "user": "64848931b8ffc3bdc22b88c7",
            "title": "fuck me",
            "description": "I hate my life",
            "__v": 0
        },
        {
            "_id": "64857d19231fd077610a4ded",
            "user": "64848931b8ffc3bdc22b88c7",
            "title": "Love you",
            "description": "I love you my life",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    const addNote = (title, description) => {
        // the user would be added automatically from the token sent in the header 
        console.log("adding a new note")
        let note = {
            "_id": "64857d19231fd077610a4dcd",
            "user": "64848931b8ffc3bdc22b88c7",
            "title": title,
            "description": description,
            "__v": 0
        }

        setNotes(notes.concat(note))
        // concat returns an array wheras push updates the array 
    }

    return (
        <noteContext.Provider value={{ notes, addNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState