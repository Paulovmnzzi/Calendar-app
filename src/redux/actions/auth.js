import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch"
import { types } from './../types/types';


export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST');

        const body = await resp.json();

        console.log(body)

        if (body.ok) { //este body.ok lo definimos en el backend con true or false dependiendo la situación 
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('error', body.msg, 'error')
        }

    }
}
const login = (user) => ({

    type: types.authLogin,
    payload: user

})

export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');

        const body = await resp.json();

        console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('error', body.msg, 'error')
        }

    }
}

export const startCheking = () => {
    return async (dispatch) => {


        const resp = await fetchConToken('auth/renew');

        const body = await resp.json();

        console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
        }

    }
}

const checkingFinish = () => ({type: types.authCheckingFinish})
