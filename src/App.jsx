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
  const [modalWindow, setModalWindow] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState(
    moment(new Date()).format('HH:00')
  );
  const [endTime, setEndTime] = useState(
    moment(new Date().setHours(new Date().getHours() + 1)).format('HH:00')
  );

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const updateEvents = () => {
    fetchEventList().then(eventsList => {
      const updateEventsList = eventsList.map(
        ({ id, description, title, dateFrom, dateTo }) => ({
          id,
          description,
          title,
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
        })
      );
      setEvents(updateEventsList);
    });
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const onSwitchWeek = event => {
    event.target.className === 'navigation__today-btn button'
      ? setWeekStartDate(new Date())
      : event.target.className === 'fas fa-chevron-left'
      ? setWeekStartDate(
          new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))
        )
      : setWeekStartDate(
          new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))
        );
  };

  const month =
    weekDates[0].getMonth() === weekDates[6].getMonth()
      ? moment(weekDates[0]).format('MMMM')
      : `${moment(weekDates[0]).format('MMMM')} - ${moment(weekDates[6]).format(
          'MMMM'
        )}`;

  const toggleModal = () => {
    setModalWindow(!modalWindow);
  };

  const setModalHandler = (day, startTime, endTime) => {
    setDate(day);
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const handlerDate = e => {
    setDate(e.target.value);
  };

  const handlerStartTime = e => {
    setStartTime(e.target.value);
  };

  const handlerEndTime = e => {
    setEndTime(e.target.value);
  };

  return (
    <>
      {modalWindow && (
        <Modal
          toggleModal={toggleModal}
          updateEvents={updateEvents}
          date={date}
          startTime={startTime}
          endTime={endTime}
          handlerDate={handlerDate}
          handlerStartTime={handlerStartTime}
          handlerEndTime={handlerEndTime}
          events={events}
        />
      )}
      <Header
        onSwitchWeek={onSwitchWeek}
        toggleModal={toggleModal}
        month={month}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        updateEvents={updateEvents}
      />
    </>
  );
};

export default App;
