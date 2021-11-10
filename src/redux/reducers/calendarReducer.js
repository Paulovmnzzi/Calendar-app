import { types } from './../types/types';

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaño feli',
//     start: moment().toDate(),
//     end: moment().add(40, 'hours').toDate(),
//     user: {
//         id: 1235,
//         name: 'Paulo'
//     }
// }

const initialState = {
    events: [],
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
                    e => (e._id === action.payload._id) ? action.payload : e
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
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        default:
            return state;
    }


}