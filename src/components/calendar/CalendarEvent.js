import React from 'react'

const CalendarEvent = ({ event }) => {

    const { title, name } = event;

    return (
        <div>
            <span>{title}</span>
            <strong>{name}</strong>
        </div>
    )
}

export default CalendarEvent
