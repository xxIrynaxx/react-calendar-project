import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchCreateEvent } from '../../gateway/eventsGateway';
import './modal.scss';
import {
  checkEventDuration,
  checkEventStart,
  checkEventTimeCrossing,
  checkEventTiming,
} from '../../validityCheck/validation.js';

const Modal = ({
  toggleModal,
  updateEvents,
  date,
  startTime,
  endTime,
  handlerDate,
  handlerStartTime,
  handlerEndTime,
  events,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const changeValueHandler = e =>
    e.target.name === 'title' ? setTitleValue(e.target.value) : setDescriptionValue(e.target.value);

  const createEventHandler = async e => {
    e.preventDefault();
    const [year, month, day] = date.split('-');
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    if (checkEventTiming(startMinute, endMinute)) {
      return false;
    }

    const event = {
      title: titleValue,
      description: descriptionValue,
      dateFrom: new Date(year, month - 1, day, startHour, startMinute),
      dateTo: new Date(year, month - 1, day, endHour, endMinute),
    };

    const { dateFrom, dateTo } = event;
    console.log(dateFrom);
    console.log(dateTo);
    if (checkEventStart(dateFrom, dateTo)) {
      return false;
    }

    const diffTime = dateTo - dateFrom;

    if (checkEventDuration(diffTime)) {
      return false;
    }

    if (checkEventTimeCrossing(events, event)) {
      return false;
    }

    toggleModal();
    await fetchCreateEvent(event);
    await updateEvents();
    return true;
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
              value={titleValue}
              onChange={changeValueHandler}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handlerDate}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handlerStartTime}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handlerEndTime}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={descriptionValue}
              onChange={changeValueHandler}
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
  toggleModal: PropTypes.func,
  updateEvents: PropTypes.func,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  handlerDate: PropTypes.func,
  handlerStartTime: PropTypes.func,
  handlerEndTime: PropTypes.func,
  events: PropTypes.array,
};

export default Modal;
