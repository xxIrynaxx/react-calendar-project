import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDeleteEvent } from '../../gateway/eventsGateway';
import './event.scss';
import { checkDeleteEvent } from '../../validityCheck/validation.js';

const Event = ({
  height,
  marginTop,
  title,
  time,
  dateFrom,
  id,
  updateEvents,
}) => {
  const [event, setEvent] = useState({
    showBtn: false,
    showEvent: true,
  });
  const changeHandler = () => {
    setEvent({
      showBtn: !event.showBtn,
      showEvent: true,
    });
  };

  const deleteEventHandler = e => {
    e.stopPropagation();
    const diffTime = new Date() - dateFrom;

    if (checkDeleteEvent(diffTime)) {
      setEvent({
        showBtn: !event.showBtn,
        showEvent: true,
      });
      return;
    }

    setEvent({
      showBtn: false,
      showEvent: false,
    });

    fetchDeleteEvent(id);
    updateEvents();
  };

  const eventStyle = {
    height,
    marginTop,
  };

  const { showEvent, showBtn } = event;

  return (
    <>
      {showEvent && (
        <>
          <div style={eventStyle} className="event" onClick={changeHandler}>
            <div className="event__title">{title}</div>
            <div className="event__time">{time}</div>
            {showBtn && (
              <button className="delete-event-btn" onClick={deleteEventHandler}>
                <i className="fas fa-trash-alt">Delete</i>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Event;

Event.propTypes = {
  height: PropTypes.number,
  id: PropTypes.string,
  marginTop: PropTypes.number,
  time: PropTypes.string,
  title: PropTypes.string,
  updateEvents: PropTypes.func,
  dateFrom: PropTypes.object,
};
