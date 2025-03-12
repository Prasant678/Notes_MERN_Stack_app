import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import NoteContext from '../Context/NoteContext';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = () => {
        // console.log("Updating the Note..", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        alert("Note Updated Successfully")
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <hr className='mt-5 mb-2 mx-5 text-white' />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-center mt-4">
                            <h4 className="modal-title text-white" id="exampleModalLabel">Edit Note</h4>
                        </div>
                        <div className="modal-body px-4">
                            <form className=''>
                                <div className="mb-2">
                                    <label htmlFor="etitle" className="form-label text-white">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="edescription" className="form-label text-white">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} minLength={10} required />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="etag" className="form-label text-white">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} minLength={3} required />
                                </div>
                                <div className="my-3">
                                    <button type="button" className="btn btn-secondary d-none" ref={refClose} data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.etitle.length < 3 || note.edescription.length < 10} onClick={handleClick} type="button" className="btn border-dark btn-primary">UPDATE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1 className='text-white mx-5'>Your Notes</h1>
                <div className="container mx-1">
                    {notes.length === 0 && "No Notes To Show"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>

        </div>
    )
}

export default Notes
