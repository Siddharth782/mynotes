import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const URL = "http://localhost:8000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)

    const getNote = async () =>{
        const response = await fetch(`${URL}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NDg5MzFiOGZmYzNiZGMyMmI4OGM3In0sImlhdCI6MTY4NjQxODYyMH0.lQBvbwuwoHBzqtauEsN9vqdewOR6i84EENTMqtnXf9c"
            }
        });
        const jsonData = await response.json();
        console.log(jsonData)
        setNotes(jsonData)
    }

    const addNote = async (title, description) => {
        // the user would be added automatically from the token sent in the header 
        const response = await fetch(`${URL}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NDg5MzFiOGZmYzNiZGMyMmI4OGM3In0sImlhdCI6MTY4NjQxODYyMH0.lQBvbwuwoHBzqtauEsN9vqdewOR6i84EENTMqtnXf9c"
            },
            body: JSON.stringify({ title, description })
        });
        const jsonData = await response.json();
        console.log(jsonData);
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

    const deleteNote = async (id) => {
        await fetch(`${URL}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NDg5MzFiOGZmYzNiZGMyMmI4OGM3In0sImlhdCI6MTY4NjQxODYyMH0.lQBvbwuwoHBzqtauEsN9vqdewOR6i84EENTMqtnXf9c"
            },
        });
        getNote();
    }

    const updateNote = async (id, title, description) => {
        const response = await fetch(`${URL}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NDg5MzFiOGZmYzNiZGMyMmI4OGM3In0sImlhdCI6MTY4NjQxODYyMH0.lQBvbwuwoHBzqtauEsN9vqdewOR6i84EENTMqtnXf9c"
            },
            body: JSON.stringify({ title, description })
        });
        const jsonData = await response.json();

        console.log(jsonData);

        for (let index = 0; index < notes.length; index++) {
            let element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
            }
        }
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState