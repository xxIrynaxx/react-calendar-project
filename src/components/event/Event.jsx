import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteEvent } from '../../gateway/eventsGateway';
import './event.scss';

const Event = ({ height, marginTop, title, description, time, id, updateEvents }) => {
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

  const deleteEventHandler = async e => {
    e.stopPropagation();

    setEvent({
      showBtn: !event.showBtn,
      showEvent: true,
    });

    await deleteEvent(id);
    updateEvents();

    setEvent({
      showBtn: false,
      showEvent: false,
    });
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
            <div className="event__description-scroll">
              <span className="event__description">{description}</span>
            </div>

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

Event.propTypes = {
  height: PropTypes.number,
  id: PropTypes.string,
  marginTop: PropTypes.number,
  time: PropTypes.string,
  title: PropTypes.string,
  updateEvents: PropTypes.func,
  dateFrom: PropTypes.object,
};

export default Event;
