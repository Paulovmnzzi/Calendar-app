import React from 'react'
import { useSelector } from 'react-redux'


const Navbar = () => {

    const {name} = useSelector(state => state.auth)

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-2'>
            {name &&  <span className='navbar-brand'>{name}</span>}

            <button className='btn  btn-outline-danger'>
                <i className='fa-solid fa-right-from-bracket me-1'></i>
                <span>Salir</span>
            </button>

        </div>
    )
}

export default Navbar
