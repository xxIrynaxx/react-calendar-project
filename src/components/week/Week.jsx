import React from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import './week.scss';

const Week = ({ events, weekDates, updateEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.filter(event => {
          const eventStart = new Date(event.dateFrom);
          const eventEnd = new Date(event.dateTo);

          return (
            (eventStart >= dayStart && eventStart < dayEnd) ||
            (eventEnd > dayStart && eventEnd <= dayEnd) ||
            (eventStart < dayStart && eventEnd > dayEnd)
          );
        });

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayStart={dayStart}
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
};

export default Week;
