import { db } from "../firebase/firebase-config"

export const loadNotes = async ( uid ) => {

    const notesSnapshot = await db.collection(`${ uid }/journal/notes`).get();

    const notes = [];

    notesSnapshot.forEach( doc => {
     
        notes.push({
            id: doc.id,
            ...doc.data()
        });

    })

    return notes;
    
}
