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
  (userID, userSchool, fullName, contact) => (dispatch, getState) => {
    dispatch({
      type: 'EDIT_PROFILE',
      payload: {
        userID,
        userSchool,
        fullName,
        contact,
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

export const getUserEvents = (userID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.attendees.includes(userID));
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
  };
};

export const getManyUserData = (userIDs) => (dispatch, getState) => {
  const { users } = getState();
  const wantedUsers = users.filter((u) => userIDs.includes(u.username));
  return wantedUsers.map((u) => ({
    username: u.username,
    userSchool: u.userSchool,
  }));
};
