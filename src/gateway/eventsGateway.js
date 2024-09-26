const baseUrl = 'https://669e3b999a1bda368005ee12.mockapi.io/api/v1/events';

export const fetchEventList = () => {
  return fetch(baseUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Internal Server Error. Can't display events`);
      }
      return res.json();
    })
    .catch(error => {
      console.error('Error fetching event list:', error.message);
      throw error;
    });
};

export const createEvent = data => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Internal Server Error. Can't display events`);
      }
    })
    .catch(error => {
      console.error('Error creating event:', error.message);
      throw error;
    });
};

export const deleteEvent = id => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Internal Server Error. Can't display events`);
      }
    })
    .catch(error => {
      console.error(`Error deleting event with id ${id}:`, error.message);
      throw error;
    });
};
