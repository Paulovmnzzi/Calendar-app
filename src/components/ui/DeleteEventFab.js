import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleter, eventClearActiveEvent } from './../../redux/actions/eventsCalendar';
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
                dispatch(eventDeleter())
                dispatch(eventClearActiveEvent())
                Swal.fire(
                    'Deleted!',
                    'Your event has been deleted.',
                    'success'
                )
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
