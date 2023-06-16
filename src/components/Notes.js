import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { MdDeleteOutline, MdEditNote } from 'react-icons/md'

const Notes = () => {
    const ref = useRef('');
    const context = useContext(noteContext);
    const { notes, deleteNote, getNote } = context;

    const [newNote, setNewNote] = useState({ title: "", description: '' });
    
    const SubmitNote = (e) => {
        e.preventDefault();
    }

    const onTextChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getNote();
    }, [])

    const updateNote = (note ) => {
        ref.current.click();
        // setNewNote({title:note.title, description:note.description})
        setNewNote(note) //both same as yk it 
    }

    const Noteitem = (props) => {
        const { note } = props;
        return (
            <div className="card my-3 mx-5" style={{ width: "18rem", borderColor: 'black', borderWidth: 2 }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <MdDeleteOutline cursor={'pointer'} size={25} onClick={() => deleteNote(note._id)} />
                        <MdEditNote cursor={'pointer'} size={25} onClick={() => updateNote(note)} />
                    </div>
                    <p className="card-text"> {note.description} </p>
                </div>
            </div>
        )
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={newNote.title} id="title" name='title' onChange={onTextChange} />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={newNote.description} id="description" name='description' onChange={onTextChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={SubmitNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row md-3' style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h2> Your Notes</h2>
                {
                    notes.map((note) => <Noteitem key={note._id} note={note} />)
                }
            </div>

        </>
    )
}

export default Notes