import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import './calendar.scss';

const Calendar = ({
  events,
  weekDates,
  updateEvents,
  toggleModal,
  setModalHandler,
}) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            updateEvents={updateEvents}
            toggleModal={toggleModal}
            setModalHandler={setModalHandler}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  events: PropTypes.array,
  weekDates: PropTypes.array,
  updateEvents: PropTypes.func,
  toggleModal: PropTypes.func,
  setModalHandler: PropTypes.func,
};

export default Calendar;
