import React from 'react'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'


export const JournalScreen = () => {

    //sacar algo del store
    const { active } = useSelector(state => state.notes)

    return (
        <div className='journal__main-content'>

            <Sidebar />

            <main>

                {
                    (active)
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }


               {/* <NothingSelected /> */}


            </main>

        </div>
    )
}
