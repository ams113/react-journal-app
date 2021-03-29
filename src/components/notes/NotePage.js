import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NotePage = () => {

    const { active: note } = useSelector(state => state.notesReducer);
    const dispatch = useDispatch();
    const [formValues, handleInputChange, reset ] = useForm(note);
    const { title, body, id } = formValues;

    const activeId  = useRef( note.id )

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }
        
    }, [note, reset]);

    useEffect(() => {
        dispatch( 
            activeNote(
                formValues,
                { ...formValues }
            )
        );
    }, [formValues, dispatch])

    const handleDelete = () => {

        dispatch( startDeleting( id ) );
        
    }
    

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    className="notes__title-input"
                    placeholder="Some awesome title"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={handleInputChange}
                />

                <textarea
                    className="notes__textarea"
                    placeholder="What happened today?"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                <div className="notes__image">
                    {
                        ( note.url ) &&
                        <img
                            src={ note.url }
                            alt="note image"
                        />
                    }
                </div>
            </div>
            <button className="btn btn-danger" onClick={ handleDelete }>
                    Delete
            </button>
        </div>

    )
}
