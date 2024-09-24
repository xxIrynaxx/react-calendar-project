import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../day/Day';
import './week.scss';

const Week = ({ events, weekDates, updateEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = moment(dayStart).add(24, 'hours').toDate();

        const dayEvents = events.filter(event => {
          const eventStart = moment(event.dateFrom);
          const eventEnd = moment(event.dateTo);

          return (
            (eventStart >= dayStart && eventStart < dayEnd) ||
            (eventEnd > dayStart && eventEnd <= dayEnd) ||
            (eventStart < dayStart && eventEnd > dayEnd)
          );
        });

        return (
          <Day
            key={moment(dayStart).date()}
            dataDay={moment(dayStart).date()}
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
