import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);
    // El custom hook useForm me permite crear un formulario y nos retorna formValues y handleInputChange
    const [formValues, handleInputChange, reset] = useForm(note)
    //Desestructuramos el objeto formValues para obtener el valor de body y title
    const { body, title, id } = formValues;

    //ejecutar el reset solo si el id es diferente 
    //useRef me permite crear una referencia a un elemento del DOM que no va a redibujar el componente entero sino solo el elemento que estoy referenciando
    const activeId = useRef(note.id);

    const dispatch = useDispatch()
    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id;
        }

    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }))
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id))
    }
    
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                {
                    //Si la nota tiene url, mostramos la imagen
                    (note.url)
                    && (
                        <div className="notes__image">
                            <img
                                src={note.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>
            <button 
            className="btn btn-danger"
             onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
