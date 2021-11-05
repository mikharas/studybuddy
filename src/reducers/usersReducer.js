const initialUsersData = [
  {
    userSchool: 'University of Toronto',
    username: 'admin',
    fullName: 'Admin',
    password: 'admin',
    isAdmin: true,
    following: ['sarah'],
  },
  {
    userSchool: 'University of Toronto',
    username: 'sarah',
    fullName: 'Sarah Kim',
    password: 'sarah',
    isAdmin: false,
    following: ['admin'],
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
