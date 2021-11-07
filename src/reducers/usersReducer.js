const initialUsersData = [
  {
    userSchool: 'University of Toronto',
    username: 'admin123',
    fullName: 'Admin',
    password: 'admin123',
    isAdmin: true,
    following: ['sarah'],
    contact: 'None',
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
          contact: payload.contact,
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
    case 'EDIT_PROFILE':
      return state.map((u) => {
        if (payload.userID === u.username) {
          return {
            ...u,
            userSchool: payload.userSchool,
            username: payload.username,
            fullName: payload.fullName,
            contact: payload.contact,
          };
        }
        return u;
      });
    // case 'REMOVE_USER':
    //   return state.filter((u) =>  {
    //     return u.username !=== payload.userID
    //   });

    default:
      return state;
  }
};

export default usersReducer;
