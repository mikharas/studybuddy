const axios = require('axios');

export const getUserData = (userID) => async (dispatch, getState) => {
  try {
    let res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_API_URL}/profile/${userID}`,
    });
    return res.data;
  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object
    return error.response;
  }
};

export const getUserAttendingEvents = (userID) => (dispatch, getState) => {
  const { events } = getState();
  return events.events.filter((e) => e.attendees.includes(userID));
};

export const addFollowing =
  (follower, following) => async (dispatch, getState) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_API_URL}/profile/${follower}/${following}`,
      });
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object
      return error.response;
    }
  };

export const removeFollowing = (follower, following) => async () => {
  try {
    const res = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_BACKEND_API_URL}/profile/${follower}/${following}`,
    });
  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object
    return error.response;
  }
};

export const editProfileInfo =
  (userID, userSchool, fullName, contact, profileImage) => async () => {
    // axios post on event
    // axios fetch all events again
    try {
      let res = await axios({
        method: 'patch',
        url: `${process.env.REACT_APP_BACKEND_API_URL}/profile/${userID}`,
        data: {
          contact,
          fullName,
          userSchool,
          profileImage,
        },
      });

      return res.data._id;
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object
      return error.response;
    }
  };

// export const removeUser = (userID) => (dispatch, getState) => {
//   dispatch({
//     type: 'REMOVE_USER',
//     payload: {
//       userID,
//     },
//   });
// };

export const getHostedEvents = (userID) => (dispatch, getState) => {
  const { events } = getState();
  return events.events.filter((e) => e.host === userID);
};

export const getManyUserData = (userIDs) => async () => {
  try {
    let res = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_API_URL}/users`,
    });
    const wantedUsers = res.data.filter((u) => userIDs.includes(u.username));
    return wantedUsers.map((u) => ({
      username: u.username,
      userSchool: u.userSchool,
    }));
  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object
    return error.response;
  }
};
