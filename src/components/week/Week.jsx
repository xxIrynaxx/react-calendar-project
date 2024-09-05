import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import './week.scss';

const Week = ({
  events,
  weekDates,
  updateEvents,
  toggleModal,
  setModalHandler,
}) => {
  const createEventHandler = e => {
    if (e.target.className === 'calendar__time-slot') {
      const { time } = e.nativeEvent.path[0].dataset;
      const { day } = e.nativeEvent.path[1].dataset;
      const currentDay = day.length === 1 ? `0 + ${day}` : day;

      const startDay = moment(new Date()).format(`YYYY-MM-${currentDay}`);
      const startTime = moment(new Date().setHours(time - 1)).format('HH:00');
      const endTime = moment(new Date().setHours(time)).format('HH:00');

      setModalHandler(startDay, startTime, endTime);
      toggleModal();
    }
  };

  return (
    <div className="calendar__week" onClick={createEventHandler}>
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = events.filter(
          event => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            events={events}
            updateEvents={updateEvents}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  events: PropTypes.array,
  weekDates: PropTypes.array,
  updateEvents: PropTypes.func,
  toggleModal: PropTypes.func,
  setModalHandler: PropTypes.func,
};

export default Week;
