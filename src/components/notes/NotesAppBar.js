import React from 'react';
import { startSaveNote } from '../../actions/notes';
import { useDispatch, useSelector } from 'react-redux';
import { startUploading } from './../../actions/notes';


export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        //Capturamos la imagen
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file))
        }

    }



    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            {/* Para hacer un input de archivo que no se vea */}
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

// useSelector() is a hook that allows us to access the state of the store.