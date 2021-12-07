const initialUsersData = [
  {
    userSchool: 'University of Toronto',
    username: 'admin',
    fullName: 'Admin',
    password: 'admin',
    isAdmin: true,
    following: ['user'],
    contact: 'None',
    profileImage:
      'https://res.cloudinary.com/dllebueou/image/upload/v1638861739/default_p5jwjn.jpg',
  },
  {
    userSchool: 'University of Toronto',
    username: 'user',
    fullName: 'User',
    password: 'user',
    isAdmin: false,
    following: ['admin'],
    contact: 'None',
    profileImage:
      'https://res.cloudinary.com/dllebueou/image/upload/v1638861739/default_p5jwjn.jpg',
  },
  {
    userSchool: 'University of Toronto',
    username: 'user2',
    fullName: 'User2',
    password: 'user2',
    isAdmin: false,
    following: ['admin', 'user'],
    contact: 'None',
    profileImage:
      'https://res.cloudinary.com/dllebueou/image/upload/v1638861739/default_p5jwjn.jpg',
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
          profileImage:
            'https://res.cloudinary.com/dllebueou/image/upload/v1638861739/default_p5jwjn.jpg',
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
            fullName: payload.fullName,
            contact: payload.contact,
            profileImage: payload.profileImage,
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
