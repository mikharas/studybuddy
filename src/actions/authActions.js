const axios = require('axios');

export const register =
  (username, password, isAdmin, profileImage) => async () => {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_API_URL}/user`,
        data: {
          username,
          password,
          isAdmin,
          profileImage,
        },
      });

      console.log(res.data);
      alert('Event successfully created!');
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object
      return error.response;
    }
  };

export const login = (username, password) => async (dispatch, getState) => {
  try {
    let res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND_API_URL}/login`,
      data: {
        username,
        password,
      },
    });

    const data = res.data;
    console.log(data);
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
    console.log(error.response); // this is the main part. Use the response property from the error object
    return error.response;
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
