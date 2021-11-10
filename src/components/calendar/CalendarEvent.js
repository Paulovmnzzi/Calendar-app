import React from 'react'

const CalendarEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <div className='single-event'>
            <span>{title} -  </span>
            <strong>{user.name}</strong>
        </div>
    )
}

export default CalendarEvent
