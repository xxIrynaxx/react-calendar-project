import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteEvent } from '../../gateway/eventsGateway';
import './event.scss';

const Event = ({ height, marginTop, title, description, time, id, updateEvents }) => {
  const [showBtn, setShowBtn] = useState(false);

  const changeHandler = () => {
    setShowBtn(prevState => !prevState);
  };

  const deleteEventHandler = async e => {
    e.stopPropagation();

    await deleteEvent(id);
    updateEvents();
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return (
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
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  marginTop: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  updateEvents: PropTypes.func.isRequired,
};

Event.defaultProps = {
  description: '',
};

export default Event;
