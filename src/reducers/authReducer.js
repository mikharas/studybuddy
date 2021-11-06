const initialAuthData = [
  {
    isLoggedIn: false,
    user: null,
  },
];

const authReducer = (state = initialAuthData, { type, payload }) => {
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: payload.username,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'REGISTER_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
