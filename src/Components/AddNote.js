import React, {useContext, useState} from 'react';
import NoteContext from '../Context/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note Added Successfully", "success");
    }

    const onchange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="mt-3 mb-2 d-flex justify-content-center text-white">
                <h1>Add Note</h1>
            </div>
            <div className='container d-flex justify-content-center'>
            <form className='my-2' style={{width: "45rem"}}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-white">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} placeholder='Enter title' value={note.title} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-white">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onchange} placeholder='Enter description' value={note.description} minLength={10} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label text-white">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} placeholder='Enter tag' value={note.tag} minLength={3} required/>
                </div>
                <button disabled={note.title.length<3 || note.description.length<10} type="submit" className="btn border-dark btn-primary" onClick={handleClick}>ADD NOTE</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
