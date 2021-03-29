import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const SideBar = () => {

    const { name } = useSelector( state => state.authReducer );
    const dispatch = useDispatch();

    const handleLogout = () => {
        
        dispatch( startLogout() );
    }

    const handleAddNew = () => {
        dispatch( startNewNote() )
        
    }
    
    
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-2">
                    <i className="far fa-user"></i>
                    <span>
                        { name }
                    </span>
                </h3>
                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>
            <div className="journal__new-entry" onClick={handleAddNew}>
                <i className="far fa-calendar-plus fa-4x"></i>
                <p>
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
