import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
// import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/ui';
import { eventClearActiveEvent, startAddNew, startUpdateEvent } from './../../redux/actions/eventsCalendar';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours')


const initEvent = {
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}



const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui)

    const { activeEvent } = useSelector(state => state.calendar)

    const [dateStart, setDateStart] = useState(now.toDate());

    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }else {
            setFormValues(initEvent);
        }

    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: [target.value].toString(),
        })
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setDateEnd(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha de finalizaci??n debe ser mayor a la de inicio', 'error')
        }

        if (title.toString().trim().length < 2) {
            setTitleValid(false);
        }

        //grabaci??n en base de datos.
        if(activeEvent){
            dispatch(startUpdateEvent(formValues));
        } else {
            dispatch(startAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();

    }

        const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }


    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={800}
            contentLabel="Example Modal"
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> { (activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <strong>Fecha y hora inicio</strong>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <strong>Fecha y hora fin</strong>

                    <div className='calendar-modal'>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={dateEnd}
                            format="y-MM-dd h:mm:ss a"
                            amPmAriaLabel="Select AM/PM"
                            className='form-control'
                        />
                    </div>

                </div>

                <hr />
                <div className="form-group">
                    <strong>Titulo y notas</strong>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="T??tulo del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}

export default CalendarModal
