import React from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import EventsExplorer from '../EventsExplorer';

const HomePage = ({ isLoggedIn, user }) => (
  <div>
    {isLoggedIn && (
      <h1>Hi {user && user.username}, Find your study buddy today!</h1>
    )}
  </div>
);

export default HomePage;
