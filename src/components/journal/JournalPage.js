import React from 'react'
import { useSelector } from 'react-redux'
import { NotePage } from '../notes/NotePage'
import { NothingSelected } from './NothingSelected'
import { SideBar } from './SideBar'

export const JournalPage = () => {

    const { active } = useSelector(state => state.notesReducer) 
    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <SideBar />

            <main>
                {
                    ( active )
                        ? ( <NotePage /> )
                        : ( <NothingSelected /> )
                }
               
            </main>
        </div>
    )
}
