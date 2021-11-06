export const getEvent = (eventID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.id === eventID)[0];
};

export const createEvent =
  (title, description, host, date, location, maxSpots) =>
  (dispatch, getState) => {
    dispatch({
      type: 'CREATE_EVENT',
      payload: {
        title,
        description,
        host,
        date,
        location,
        maxSpots,
      },
    });
  };

export const addAttendee = (title, attendee) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_ATTENDEE',
    payload: {
      title,
      attendee,
    },
  });
};

export const removeAttendee = (title, attendee) => (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_ATTENDEE',
    payload: {
      title,
      attendee,
    },
  });
};
