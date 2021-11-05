const initialUsersData = [
  {
    userSchool: 'University of Toronto',
    username: 'admin',
    fullName: 'Johnny',
    password: 'admin',
    isAdmin: true,
    following: [],
  },
];

const usersReducer = (state = initialUsersData, { type, payload }) => {
  switch (type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          userSchool: 'University of Toronto',
          username: payload.username,
          fullName: payload.username,
          password: payload.password,
          isAdmin: payload.isAdmin,
          following: [],
        },
      ];
    default:
      return state;
  }
};

export default usersReducer;
