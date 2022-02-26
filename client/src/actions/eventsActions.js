const axios = require('axios');

export const getEvent = (eventID) => async (dispatch, getState) => {
  // fetch from axios
  try {
    let res = await axios({
      method: 'get',
      url: `/event-dashboard/${eventID}`,
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export const getEvents = () => async (dispatch, getState) => {
  // fetch from axios

  try {
    let res = await axios({
      method: 'get',
      url: `/event-dashboard`,
    });

    dispatch({
      type: 'SET_EVENTS',
      payload: {
        events: res.data,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const createEvent =
  (title, description, host, date, location, maxSpots, image) =>
  async (dispatch, getState) => {
    try {
      let res = await axios({
        method: 'post',
        url: `/event-dashboard`,
        data: {
          title,
          description,
          host,
          location,
          date,
          maxSpots,
          image,
        },
      });

      alert('Event successfully created!');
      return res.data._id;
    } catch (error) {
      return error.response;
    }
  };

export const editEvent =
  (eventID, title, description, host, date, location, maxSpots) =>
  async (dispatch, getState) => {
    // axios post on event
    // axios fetch all events again
    try {
      let res = await axios({
        method: 'patch',
        url: `/event-dashboard/${eventID}`,
        data: {
          title,
          description,
          host,
          location,
          date,
          maxSpots,
        },
      });

      return res.data._id;
    } catch (error) {
      return error.response;
    }
  };

export const addAttendee = (eventID, attendee) => async () => {
  try {
    let res = await axios({
      method: 'post',
      url: `/event-dashboard/${eventID}/attend`,
      data: {
        attendee,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const removeAttendee = (eventID, attendee) => async () => {
  try {
    let res = await axios({
      method: 'delete',
      url: `/event-dashboard/${eventID}/unattend`,
      data: {
        attendee,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const setFilter = (filter) => (dispatch, getState) => {
  dispatch({
    type: 'SET_FILTER',
    payload: {
      filter,
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
