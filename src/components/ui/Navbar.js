import React from 'react'


const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-2'>
            <span className='navbar-brand'>Paulo</span>

            <button className='btn  btn-outline-danger'>
                <i className='fa-solid fa-right-from-bracket me-1'></i>
                <span>Salir</span>
            </button>

        </div>
    )
}

export default Navbar
