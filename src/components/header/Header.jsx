import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './header.scss';

const Header = ({ toggleModal, weekStartDate, setWeekStartDate, weekDates }) => {
  const onSwitchWeek = event => {
    event.target.className === 'navigation__today-btn button'
      ? setWeekStartDate(new Date())
      : event.target.className === 'fas fa-chevron-left'
      ? setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() - 7)))
      : setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() + 7)));
  };

  const month =
    weekDates[0].getMonth() === weekDates[6].getMonth()
      ? moment(weekDates[0]).format('MMMM')
      : `${moment(weekDates[0]).format('MMMM')} - ${moment(weekDates[6]).format('MMMM')}`;

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={() => toggleModal()}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={onSwitchWeek}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onSwitchWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onSwitchWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{month}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  weekStartDate: PropTypes.instanceOf(Date).isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default Header;
