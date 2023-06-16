import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [newNote, setNewNote] = useState({ title: "", description: '' });

    const SubmitNote = (e) => {
        e.preventDefault();
        addNote(newNote.title,newNote.description)
    }

    const onTextChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value })
    }

    return (
        <form>
            <div className="my-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' onChange={onTextChange} />
            </div>
            <div className="my-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name='description' onChange={onTextChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={SubmitNote}>Submit</button>
        </form>
    )
}

export default AddNote