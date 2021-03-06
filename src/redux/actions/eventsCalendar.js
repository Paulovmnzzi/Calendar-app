
import { fetchConToken } from '../../helpers/fetch';
import { types } from './../types/types';
import { prepareEvents } from './../../helpers/prepareEvents';
import Swal from 'sweetalert2';


export const startAddNew = (event) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth

        try {

            const resp = await fetchConToken('events/new', event, 'POST');
            const body = await resp.json();


            if (body.ok) {

                event.id = body.evento._id
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event))
                Swal.fire('Evento agregado exitosamente ! ', '' , "success")
            }

        } catch (error) {
            Swal.fire("Cuidado !", error, "warning")
        }

    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})


export const eventDeleter = () => ({ type: types.eventDeleter });


export const eventStartLoading = () => {
    return async(dispatch) => {
        
        try {
            
            const resp = await fetchConToken('events');
            const body = await resp.json();
            
            const events = prepareEvents(body.eventos);
            
            console.log(events)

            dispatch(eventLoading(events));
            
        } catch (error) {
            console.log(error)
        }
        
    }
}

const eventLoading = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const startUpdateEvent = (event) => {
    return async(dispatch) => {
        
        try {
            
            const resp = await fetchConToken(`events/${event._id}`, event, 'PUT');
            const body = await resp.json();
            
            if(body.ok){
                dispatch(eventUpdated(event));
                Swal.fire("Evento actualizado", body.msg, "success")
            }else{
                Swal.fire("Unauthorized", body.msg, "error")
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const startDeleteEvent = () => {
    return async(dispatch, getState) => {

        const {activeEvent: event} = getState().calendar

        try {
            
            const resp = await fetchConToken(`events/${event._id}`, {} ,'DELETE');
            const body = await resp.json();
            
            console.log(body)
            console.log(event)

            if(body.ok){
                dispatch(eventDeleter(event));
                Swal.fire("Evento eliminado", body.msg, "success")
            }else{
                Swal.fire("Unauthorized", body.msg, "error")
            }
            
        } catch (error) {
            console.log(error)
        }

    }
}
