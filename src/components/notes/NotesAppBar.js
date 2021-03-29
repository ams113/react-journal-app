import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment'

export const NotesAppBar = () => {
    
    const fileSelector = useRef( null );
    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notesReducer)

    const noteDate = moment( note.date );

    const handleSave = () => {

        dispatch( startSaveNote( note) );  
    }

    const handlePictureClick = () => {
        
        fileSelector.current.click()
    }

    const handleChange = ( event ) => {

        const file = event.target.files[0];

        if ( file ) {
            dispatch( startUploading( file ) )
        }
    }
    
    
    
    return (
        <div className="notes__appbar">
            <span> {noteDate.format('LL')} </span>

            <input 
                ref = { fileSelector }
                type="file"
                name="file"
                style={{ display: 'none'}}
                onChange={ handleChange }
            />
            <div>
                <button className="btn" onClick={ handlePictureClick }>
                    Picture
                </button>
                <button className="btn" onClick={ handleSave }>
                    Save
                </button>
            </div>
        </div>
    )
}
