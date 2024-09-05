import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Line from '../line/Line';
import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';
import './hour.scss';

const Hour = ({ events, updateEvents, dataDay, dataHour, hourEvents }) => {
  const [isLine, setLine] = useState();
  const [lineStyle, setLineStyle] = useState({
    marginTop: new Date().getMinutes() - 1,
  });

  useEffect(() => {
    const isHour = new Date().getHours() === dataHour;
    const isDay = new Date().getDate() === dataDay;
    const line = isHour && isDay;
    setLine(line);

    const interval = setInterval(() => {
      setLine(line);
      setLineStyle({
        marginTop: lineStyle.marginTop + 1,
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {isLine && <Line lineStyle={lineStyle} />}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
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
  dataDay: PropTypes.number,
  dataHour: PropTypes.number,
};

export default Hour;
