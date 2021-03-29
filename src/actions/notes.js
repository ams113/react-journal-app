import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {

    return async ( dispatch, getState ) => {
        const { uid } = getState().authReducer;
        
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };   

        const fireDoc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch( activeNote( fireDoc.id, newNote ));
        dispatch( addNewNote( fireDoc.id, newNote ));
        
    }
}

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
        
    }
}

export const startSaveNote = ( note ) => {

    return async ( dispatch, getState ) => {
        const { uid } = getState().authReducer;

        if( !note.url ) {
            delete note.url
        }

        //* Detete id in the note to save doc in FireStore
            const noteFire = { ...note };
            delete noteFire.id;

        try {
            
            await db.doc(`${ uid }/journal/notes/${ note.id }`)
                    .update( noteFire );

            // dispatch( startLoadingNotes( uid ));
            dispatch( refreshNote( note.id, note ));
            Swal.fire('Saved', note.title, 'success');

        } catch (error) {
            console.log( error );
        } 
    }
}

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active: note } = getState().notesReducer;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();                
            }
        })
        const fileUrl = await fileUpload( file );


        note.url = fileUrl;

        dispatch( startSaveNote( note ) ); 

        Swal.close();
        
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
        const uid = getState().authReducer.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`)
                .delete();
        
        dispatch( deleteNote( id ));
    }
}

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})


export const deleteNote = ( id ) => ({

    type: types.notesDelete,
    payload: {
        id
    }
    
})

export const refreshNote = ( id, note) => ({

    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

export const activeNote = ( id, note ) => ({
    
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const notesLogout = () => ({
    type: types.notesLogoutClean
})



