// TODO: Calls to database using axios;
// code below requires server call to get event data, which is dispatched to reducers
// to modify application state

export const getEvent = (eventID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.id === eventID)[0];
};

export const createEvent =
  (id, title, description, host, date, location, maxSpots, image) =>
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
        image,
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

export const addQuestion = (eventID, question) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_QUESTION',
    payload: {
      eventID,
      question,
    },
  });
};

export const editQuestion = (eventID, question) => (dispatch, getState) => {
  dispatch({
    type: 'EDIT_QUESTION',
    payload: {
      eventID,
      question,
    },
  });
};

export const deleteQuestion = (eventID, question) => (dispatch, getState) => {
  dispatch({
    type: 'DELETE_QUESTION',
    payload: {
      eventID,
      question,
    },
  });
};
