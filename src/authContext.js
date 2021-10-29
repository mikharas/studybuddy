import { createContext } from 'react';

const AuthContext = createContext({
  auth: {
    userId: null,
    isAdmin: false,
  },
  setAuth: () => {},
});

export default AuthContext;
