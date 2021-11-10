import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../redux/actions/auth';


const Navbar = () => {

    const {name} = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-2'>
            {name &&  <span className='navbar-brand'>{name}</span>}

            <button className='btn  btn-outline-danger' onClick={handleLogout}>
                <i className='fa-solid fa-right-from-bracket me-1'></i>
                <span>Salir</span>
            </button>

        </div>
    )
}

export default Navbar
