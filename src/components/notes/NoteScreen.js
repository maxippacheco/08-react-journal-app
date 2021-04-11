import React, { useEffect, useRef } from 'react'
import {NotesAppBar} from '../notes/NotesAppBar'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from '../../hooks/useForm'
import {activeNote, startDeleting} from '../../actions/notes'

export const NoteScreen = () => {
    
    const dispatch = useDispatch()

    const {active:note} = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title, id} = formValues;
   
    const activeId =  useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset(note)
            activeId.current = note.id
        }
        
    }, [note, reset])

    useEffect(() => {
        
        dispatch(activeNote( formValues.id, {...formValues} ))
        
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id))
    }

    return (
        <div className='notes__main-content'>
            <NotesAppBar />
        
            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__tite-input'
                    autoComplete='off'
                    name='title'
                    value = {title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='What happened today'
                    className='notes_textarea'
                    name='body'
                    value = {body}
                    onChange={handleInputChange}

                ></textarea>

                {
                    (note.url) &&

                    (
                    
                        <div className='notes__image'>
                            <img 
                                src={note.url}

                                alt='el atardecer'
                            />
                        </div>
                    
                    )
                }
            </div>

                <button 
                    className='btn btn-danger'
                    onClick={handleDelete}
                >
                    Delete
                </button>
        </div>


    )
}
