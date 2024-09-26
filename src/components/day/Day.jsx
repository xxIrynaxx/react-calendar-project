import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Hour from '../hour/Hour';

const Day = ({ events, updateEvents, dayStart, dayEvents, dataDay }) => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => moment(event.dateFrom).hour() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            events={events}
            updateEvents={updateEvents}
            dayStart={dayStart}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  events: PropTypes.array,
  updateEvents: PropTypes.func.isRequired,
  dayEvents: PropTypes.array,
  dataDay: PropTypes.number.isRequired,
  dayStart: PropTypes.instanceOf(Date).isRequired,
};

Day.defaultProps = {
  events: [],
  dayEvents: [],
};

export default Day;
