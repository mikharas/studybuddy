// TODO: Calls to data base using axios

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

export const getUserAttendingEvents = (userID) => (dispatch, getState) => {
  const { events } = getState();
  return events.filter((e) => e.attendees.includes(userID));
};

export const getUserData = (userID) => (dispatch, getState) => {
  const { users } = getState();
  const user = users.filter((u) => u.username === userID)[0];
  return {
    fullname: user.fullname,
    username: user.username,
    userSchool: user.userSchool,
    following: user.following,
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
