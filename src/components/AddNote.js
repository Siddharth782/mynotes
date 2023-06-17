import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [newNote, setNewNote] = useState({ title: "", description: '' });

    const SubmitNote = (e) => {
        e.preventDefault();
        addNote(newNote.title,newNote.description)
        setNewNote({ title: "", description: '' })
    }

    const onTextChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={SubmitNote}>
            <h3 className='my-2'>Add a new Note</h3>
            <div className="my-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title"  value={newNote.title} name='title' onChange={onTextChange} minLength={5} />
            </div>
            <div className="my-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={newNote.description} name='description' onChange={onTextChange} minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddNote