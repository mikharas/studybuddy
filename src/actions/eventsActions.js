// TODO: Calls to databse using axios;

export const getEvent = (eventID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.id === eventID)[0];
};

export const createEvent =
  (id, title, description, host, date, location, maxSpots) =>
  (dispatch, getState) => {
    dispatch({
      type: 'CREATE_EVENT',
      payload: {
        id,
        title,
        description,
        host,
        date,
        location,
        maxSpots,
      },
    });
    alert('Event successfully created!');
  };

export const editEvent =
  (eventID, title, description, date, location, maxSpots) =>
  (dispatch, getState) => {
    dispatch({
      type: 'EDIT_EVENT',
      payload: {
        eventID,
        title,
        description,
        date,
        location,
        maxSpots,
      },
    });
  };

export const addAttendee = (eventID, attendee) => (dispatch, getState) => {
  const event = getState().events.find((e) => e.id === eventID);
  if (event.host === attendee) {
    alert('You are the host of this event');
    return;
  }
  dispatch({
    type: 'ADD_ATTENDEE',
    payload: {
      eventID,
      attendee,
    },
  });
};

export const removeAttendee = (eventID, attendee) => (dispatch, getState) => {
  const event = getState().events.find((e) => e.id === eventID);
  if (event.host === attendee) {
    alert('You are the host of this event');
    return;
  }
  dispatch({
    type: 'REMOVE_ATTENDEE',
    payload: {
      eventID,
      attendee,
    },
  });
};
