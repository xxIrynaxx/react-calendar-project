import React from 'react';
import PropTypes from 'prop-types';

import { days } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => {
        const currentDay =
          dayDate.getDate() === new Date().getDate() &&
          dayDate.getMonth() === new Date().getMonth() &&
          dayDate.getFullYear() === new Date().getFullYear()
            ? 'day-label__day-number_today'
            : 'day-label__day-number';

        const currentDayName =
          dayDate.getDate() === new Date().getDate() &&
          dayDate.getMonth() === new Date().getMonth() &&
          dayDate.getFullYear() === new Date().getFullYear()
            ? 'day-label__day-name_today'
            : 'day-label__day-name';

        return (
          <div key={dayDate} className="calendar__day-label day-label">
            <span className={currentDayName}>{days[dayDate.getDay()]}</span>
            <span className={currentDay}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.array,
};

export default Navigation;
