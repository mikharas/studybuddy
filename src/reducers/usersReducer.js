const initialUsersData = [
  {
    username: 'admin',
    password: 'admin',
    isAdmin: true,
  },
];

const usersReducer = (state = initialUsersData, { type, payload }) => {
  switch (type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          username: payload.username,
          password: payload.password,
          isAdmin: payload.isAdmin,
        },
      ];
    default:
      return state;
  }
};

export default usersReducer;
