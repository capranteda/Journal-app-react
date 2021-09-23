
import { types } from './../types/types';


const initialState = {
    notes: [],
    active: null,
}

//En react los reducers son funciones que reciben un estado y una accion y devuelven un nuevo estado
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesAddNew:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload,
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload],
            }
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note)
            }
        case types.notesDelete:

            return {
                ...state,
                //Colocamos la nota activa en null para que no se muestre
                active: null,
                notes: state.notes.filter(
                    note => note.id !== action.payload
                )
            }
        case types.notesLogoutCleaning:
            return {
                ...state,
                notes: [],
                active: null
            }
        default:
            return state
    }
}


