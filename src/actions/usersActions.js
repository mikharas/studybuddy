export const getUserEvents = (userID) => (dispatch, getState) => {
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
