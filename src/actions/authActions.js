// TODO: Calls to database using axios

export const register =
  (username, password, isAdmin) => (dispatch, getState) => {
    const allUsers = getState().users;
    const userExists = allUsers.find((user) => user.username === username);
    if (userExists) {
      alert('Username taken');
      dispatch({
        type: 'REGISTER_FAIL',
      });
    } else {
      dispatch({
        type: 'ADD_USER',
        payload: {
          username,
          password,
          isAdmin,
        },
      });
      dispatch({
        type: 'REGISTER_SUCCESS',
      });
      alert('Successfully created user, please log in!');
    }
  };

export const login = (username, password) => (dispatch, getState) => {
  const allUsers = getState().users;
  const user = allUsers.find((u) => u.username === username);
  if (!user) {
    alert('no such user');
    dispatch({
      type: 'LOGIN_FAIL',
    });
  } else if (user.password !== password) {
    alert('incorrect password');
    dispatch({
      type: 'LOGIN_FAIL',
    });
  } else {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { username: user.username, isAdmin: user.isAdmin },
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
