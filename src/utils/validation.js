export const checkEventTiming = (startMinute, endMinute) => {
  if (Number(startMinute) % 15 !== 0 || Number(endMinute) % 15 !== 0) {
    alert('The event time must be a multiple of 15');
    return true;
  }
  return false;
};

export const checkEventStart = (dateFrom, dateTo) => {
  if (dateFrom > dateTo) {
    alert('The event cannot end before it started');
    return true;
  }
  return false;
};

export const checkEventDuration = duration => {
  const maxEventDuration = 1000 * 60 * 60 * 6;
  if (duration > maxEventDuration) {
    alert('One event cannot last more than 6 hours.');
    return true;
  }
  return false;
};

export const checkEventTimeCrossing = (allEvents, currentEvent) => {
  const timeCrossing = allEvents.some(({ dateFrom, dateTo }) => {
    if (dateFrom <= currentEvent.dateFrom && dateTo >= currentEvent.dateFrom) {
      return true;
    }
    if (dateFrom >= currentEvent.dateFrom && dateFrom <= currentEvent.dateTo) {
      return true;
    }
    return false;
  });

  if (timeCrossing) {
    alert('Two events cannot overlap in time');
    return true;
  }
  return false;
};

export const checkDeleteEvent = timeDifferent => {
  const timeBeforeEventStart = 1000 * 60 * -15;
  if (timeDifferent < timeBeforeEventStart) {
    alert('You cannot delete an event earlier than 15 minutes before the start time.');
    return true;
  }
  return false;
};
