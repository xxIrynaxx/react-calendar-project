import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Line from '../line/Line';
import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';
import { format, getHours } from 'date-fns';
import './hour.scss';

const Hour = ({ events, updateEvents, dayStart, dataHour, hourEvents }) => {
  const isToday = format(dayStart, 'MM dd yyyy') === format(new Date(), 'MM dd yyyy');
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isToday && dataHour === getHours(new Date()) ? <Line /> : null}
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${moment(dateFrom).hour()}:${formatMins(moment(dateFrom).minute())}`;
        const eventEnd = `${moment(dateTo).hour()}:${formatMins(moment(dateTo).minute())}`;

        return (
          <Event
            key={id}
            id={id}
            height={moment(dateTo).diff(moment(dateFrom), 'minutes')}
            marginTop={moment(dateFrom).minute()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            events={events}
            updateEvents={updateEvents}
            dateFrom={dateFrom}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  events: PropTypes.array,
  updateEvents: PropTypes.func,
  hourEvents: PropTypes.array,
  dataHour: PropTypes.number,
  dayStart: PropTypes.instanceOf(Date),
};

export default Hour;
