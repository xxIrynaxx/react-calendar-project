import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { fetchEventList } from './gateway/eventsGateway.js';
import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const updateEvents = () => {
    fetchEventList().then(eventsList => {
      const updateEventsList = eventsList.map(({ id, description, title, dateFrom, dateTo }) => ({
        id,
        description,
        title,
        dateFrom: moment(dateFrom),
        dateTo: moment(dateTo),
      }));
      setEvents(updateEventsList);
    });
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <Modal toggleModal={toggleModal} updateEvents={updateEvents} events={events} />
      )}
      <Header
        toggleModal={toggleModal}
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        weekDates={weekDates}
      />
      <Calendar weekDates={weekDates} events={events} updateEvents={updateEvents} />
    </>
  );
};

export default App;
