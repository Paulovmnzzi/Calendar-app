import React from 'react'
import Navbar from '../ui/Navbar'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from './../../helpers/calendar-messages';

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { eventSetActive } from '../../redux/actions/eventsCalendar';
import AddNewFab from './../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';
import { eventClearActiveEvent } from './../../redux/actions/eventsCalendar';

const localizer = momentLocalizer(moment);


const CalendarScreen = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch();


    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
        return true;
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onSelectSlot = (e) => {
        if(activeEvent){
            dispatch(eventClearActiveEvent())
        }
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
    }


    return (
        <div>
            <Navbar />
            <div>
                <Calendar
                    components={{ event: CalendarEvent }}
                    endAccessor="end"
                    events={events}
                    eventPropGetter={eventStyleGetter}
                    localizer={localizer}
                    messages={messages}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onSelectSlot={onSelectSlot}
                    selectable={true}
                    // onView = {onViewChange}
                    startAccessor="start"
                    style={{ height: '90vh' }}
                // view={ lastView || 'month'}

                />

                <AddNewFab />

                {activeEvent && <DeleteEventFab />}

                <CalendarModal />


            </div>
        </div>
    )
}

export default CalendarScreen
