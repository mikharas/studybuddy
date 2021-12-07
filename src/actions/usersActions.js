// TODO: Calls to database using axios
// code below requires server call to get user data, which is dispatched to reducers
// to modify application state

export const addFollowing = (follower, following) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_FOLLOWING',
    payload: {
      following,
      follower,
    },
  });
};

export const removeFollowing =
  (follower, following) => (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_FOLLOWING',
      payload: {
        following,
        follower,
      },
    });
  };

export const editProfileInfo =
  (userID, userSchool, fullName, contact, profileImage) =>
  (dispatch, getState) => {
    dispatch({
      type: 'EDIT_PROFILE',
      payload: {
        userID,
        userSchool,
        fullName,
        contact,
        profileImage,
      },
    });
  };

// export const removeUser = (userID) => (dispatch, getState) => {
//   dispatch({
//     type: 'REMOVE_USER',
//     payload: {
//       userID,
//     },
//   });
// };

export const getUserAttendingEvents = (userID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.attendees.includes(userID));
};

export const getHostedEvents = (userID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.host === userID);
};

export const getUserData = (userID) => (dispatch, getState) => {
  const { users } = getState();
  const user = users.filter((u) => u.username === userID)[0];
  return {
    fullName: user.fullName,
    username: user.username,
    userSchool: user.userSchool,
    isAdmin: user.isAdmin,
    following: user.following,
    contact: user.contact,
    profileImage: user.profileImage,
  };
};

export const getManyUserData = (userIDs) => (dispatch, getState) => {
  const { users } = getState();
  const wantedUsers = users.filter((u) => userIDs.includes(u.username));
  return wantedUsers.map((u) => ({
    username: u.username,
    userSchool: u.userSchool,
    profileImage: u.profileImage,
  }));
};
