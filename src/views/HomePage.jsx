import React, { useContext } from 'react';
import { Button } from '@mui/material';
import authContext from '../authContext';

const HomePage = () => {
  const hi = '';
  const { setAuth } = useContext(authContext);
  const handleLogout = () => setAuth({ userId: null, isAdmin: false });
  return (
    <div>
      <h1>Hi, Find your study buddy today!</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomePage;
