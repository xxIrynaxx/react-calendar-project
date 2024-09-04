import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

const Header = ({ month, toggleModal, onSwitchWeek }) => (
  <header className="header">
    <button className="button create-event-btn" onClick={toggleModal}>
      <i className="fas fa-plus create-event-btn__icon"></i>Create
    </button>
    <div className="navigation">
      <button className="navigation__today-btn button" onClick={onSwitchWeek}>
        Today
      </button>
      <button
        className="icon-button navigation__nav-icon"
        onClick={onSwitchWeek}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        className="icon-button navigation__nav-icon"
        onClick={onSwitchWeek}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      <span className="navigation__displayed-month">{month}</span>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  month: PropTypes.string,
  tooggleWeekHandler: PropTypes.func,
  updateEvents: PropTypes.func,
};
