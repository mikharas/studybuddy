const initialUsersData = [
  {
    userSchool: 'University of Toronto',
    username: 'admin',
    fullName: 'Admin',
    password: 'admin123',
    isAdmin: true,
    following: ['sarah'],
  },
  {
    userSchool: 'University of Toronto',
    username: 'sarah',
    fullName: 'Sarah Kim',
    password: 'sarah123',
    isAdmin: false,
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
    case 'ADD_FOLLOWING':
      return state.map((u) => {
        if (payload.follower === u.username) {
          const newFollowing = u.following.slice();
          newFollowing.push(payload.following);
          return {
            ...u,
            following: newFollowing,
          };
        }
        return u;
      });
    case 'REMOVE_FOLLOWING':
      return state.map((u) => {
        if (payload.follower === u.username) {
          return {
            ...u,
            following: u.following.filter(
              (following) => following !== payload.following,
            ),
          };
        }
        return u;
      });
    default:
      return state;
  }
};

export default usersReducer;
