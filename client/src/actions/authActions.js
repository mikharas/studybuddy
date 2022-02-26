const axios = require('axios');

export const register =
  (username, password, isAdmin, profileImage) => async () => {
    try {
      let res = await axios({
        method: 'post',
        url: `/user`,
        data: {
          username,
          password,
          isAdmin,
          profileImage,
        },
      });

      alert('User successfully created!');
    } catch (error) {
      return error.response;
    }
  };

export const login = (username, password) => async (dispatch, getState) => {
  try {
    let res = await axios({
      method: 'post',
      url: `/login`,
      data: {
        username,
        password,
      },
    });

    const data = res.data;
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { username: data.currentUser, isAdmin: data.isAdmin },
    });
    return data;
  } catch (error) {
    alert('incorrect password or username');
    dispatch({
      type: 'LOGIN_FAIL',
    });
    return error.response;
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
