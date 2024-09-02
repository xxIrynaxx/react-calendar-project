import React, { useState } from 'react';

import Navigation from './../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import events from '../../gateway/events.js';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [events, setEvents] = useState([]);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
