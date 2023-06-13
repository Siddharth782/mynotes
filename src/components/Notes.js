import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { MdDeleteOutline, MdEditNote } from 'react-icons/md'
const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;

    const Noteitem = (props) => {
        const { note } = props;
        return (
            <div className="card my-3 mx-5" style={{ width: "18rem", borderColor: 'black', borderWidth: 2 }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <MdDeleteOutline cursor={'pointer'} size={25} />
                        <MdEditNote cursor={'pointer'} size={25} />
                    </div>
                    <p className="card-text"> {note.description} </p>
                </div>
            </div>
        )
    }


    return (
        <div className='row md-3' style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h2> Your Notes</h2>
            {
                notes.map((note) => <Noteitem key={note._id} note={note} />)
            }
        </div>
    )
}

export default Notes