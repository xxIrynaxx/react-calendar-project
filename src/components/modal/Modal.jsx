import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createEvent } from '../../gateway/eventsGateway';
import {
  checkEventDuration,
  checkEventStart,
  checkEventTimeCrossing,
  checkEventTiming,
} from '../../utils/validation';
import './modal.scss';

const Modal = ({ toggleModal, updateEvents, events }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:00'),
    endTime: moment().add(1, 'hour').format('HH:00'),
  });

  const validateEvent = (event, events) => {
    const { dateFrom, dateTo } = event;
    const diffTime = dateTo - dateFrom;

    return !(
      checkEventTiming(formValues.startTime.split(':')[1], formValues.endTime.split(':')[1]) ||
      checkEventStart(dateFrom, dateTo) ||
      checkEventDuration(diffTime) ||
      checkEventTimeCrossing(events, event)
    );
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const createEventHandler = async e => {
    e.preventDefault();

    const [year, month, day] = formValues.date.split('-');
    const [startHour, startMinute] = formValues.startTime.split(':');
    const [endHour, endMinute] = formValues.endTime.split(':');

    const event = {
      title: formValues.title,
      description: formValues.description,
      dateFrom: new Date(year, month - 1, day, startHour, startMinute),
      dateTo: new Date(year, month - 1, day, endHour, endMinute),
    };

    const validation = validateEvent(event, events);

    if (!validation) {
      return false;
    }

    await createEvent(event);
    await updateEvents();
    toggleModal();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={toggleModal}>
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={formValues.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={formValues.date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={formValues.startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={formValues.endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={formValues.description}
              onChange={handleChange}
            />
            <button type="submit" className="event-form__submit-btn" onClick={createEventHandler}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  updateEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Modal;
