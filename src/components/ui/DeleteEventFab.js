import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent, startDeleteEvent } from './../../redux/actions/eventsCalendar';
import Swal from 'sweetalert2'

const DeleteEventFab = () => {

    const dispatch = useDispatch();


    const handleEventDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteEvent())
                dispatch(eventClearActiveEvent())
            }
        })


    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleEventDelete}
        >
            <i className='fas fa-trash'></i>
            {/* <span>  Borrar evento</span> */}
        </button>
    )
}

export default DeleteEventFab
