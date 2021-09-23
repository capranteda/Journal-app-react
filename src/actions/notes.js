import { db } from "../firebase/firebase-config";
import { types } from './../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from './../helpers/fileUpload';

//react-journal
//	https://api.cloudinary.com/v1_1/dtcrf75em

export const startNewNote = (note) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));

    }
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
};

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        // Si la nota no tiene url borramos el campo para que no genere conflicto en la base de datos
        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        //Quitamos la propiedad id para que no se duplique en la base de datos
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success');
    }
}

//Actualizar unicamente la nota que cambia
export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    //Como es una tarea asincrona, usamos thunk
    //Thunk nos permite retornar una funcion que recibe como parametro dispatch
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }

        });

        //Subir el archivo a Cloudinary
        const fileUrl = await fileUpload(file);
        //Tomamos el url de la imagen y lo guardamos en la nota
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();

    }

}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});


//SweetAlert sirve para mostrar una alerta en pantalla
//dipatch es una funcion que recibe una accion y la ejecuta
//getState() El store contiene todo el árbol de estados de tu aplicación. La única forma de cambiar el estado que contiene es despachando una acción.