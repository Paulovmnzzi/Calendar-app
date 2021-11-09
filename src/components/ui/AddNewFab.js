import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from './../../redux/actions/ui';

const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleNewModal = () => {
        dispatch(uiOpenModal())
    }

    return (
        <button
            className='btn-outline-primary btn fab'
            onClick={handleNewModal}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}

export default AddNewFab
