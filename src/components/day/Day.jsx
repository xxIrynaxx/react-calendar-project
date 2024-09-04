import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({ events, updateEvents, dataDay, dayEvents }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(
          event => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            events={events}
            updateEvents={updateEvents}
            dataDay={dataDay}
          />
        );
      })}
    </div>
  );
};

export default Day;

Day.propTypes = {
  events: PropTypes.array,
  updateEvents: PropTypes.func,
  dayEvents: PropTypes.array,
  dataDay: PropTypes.number,
};
