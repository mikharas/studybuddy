import React from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';
import EventsExplorer from '../EventsExplorer';

const HomePage = ({ logout, user }) => {
  const handleLogout = () => logout();
  return (
    <div>
      <h1>Hi {user.username}, Find your study buddy today!</h1>
      {user.isAdmin && (
        <h2
          className={css`
            color: red;
          `}
        >
          ADMIN
        </h2>
      )}
      <EventsExplorer />
    </div>
  );
};

export default HomePage;
