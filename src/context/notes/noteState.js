import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const URL = "http://localhost:8000"
    const [notes, setNotes] = useState()

    const getNote = async () => {
        const response = await fetch(`${URL}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NDg5MzFiOGZmYzNiZGMyMmI4OGM3In0sImlhdCI6MTY4NjQxODYyMH0.lQBvbwuwoHBzqtauEsN9vqdewOR6i84EENTMqtnXf9c"
            }
        });
        const jsonData = await response.json();
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
        const note = await response.json();

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

    const updateNote = async ({id, title, description}) => {
        const response = await fetch(`${URL}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NDg5MzFiOGZmYzNiZGMyMmI4OGM3In0sImlhdCI6MTY4NjQxODYyMH0.lQBvbwuwoHBzqtauEsN9vqdewOR6i84EENTMqtnXf9c"
            },
            body: JSON.stringify({ title, description })
        });
        const jsonData = await response.json();

        console.log(jsonData);

        // this is used to make a deep copy as we can't update notes directly in React
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            let element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes);

    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState