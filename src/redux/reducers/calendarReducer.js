import moment from 'moment'
import { types } from './../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaño feli',
        start: moment().toDate(),
        end: moment().add(40, 'hours').toDate(),
        user: {
            id: 1235,
            name: 'Paulo'
        }
    }],
    activeEvent: null
}


export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew: 
        return {
            ...state,
            events: [
                ...state.events, //desestructuro todos los eventos
                action.payload //y le sumo el action payload
                //tenemos un nuevo event, pero con toda la info
            ]
        }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return {
                ...state, 
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }
        case types.eventDeleter: 
        return {
            ...state,
            events: state.events.filter(
                e => (e.id !== state.activeEvent.id) 
            ),
            activeEvent: null
        }
        default:
            return state;
    }


}