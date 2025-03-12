import React, {useContext} from 'react'
import NoteContext from '../Context/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3 mx-2' style={{ width : "25rem" }}>
            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title fw-bold text-light">{note.title}</h5>
                        <p className="card-text text-light">{note.description}</p>
                        <div className='text-white'>
                        <i className="fa-solid fa-tag mx-2 text-primary"/>{note.tag}</div>
                        <hr className='text-white'/>
                        <i className="fa-solid fa-trash m-3 text-danger" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success")}}></i>
                        <i className="fa-solid fa-pen-to-square m-3 text-warning" onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>

        </div>
    )
}

export default NoteItem
