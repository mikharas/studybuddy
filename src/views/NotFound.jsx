import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  navbar: {
    background: theme.palette.primary.main,
  },
  profileIcon: {
    color: 'white',
  },
  profileIconButton: {
    marginRight: theme.spacing(3),
  },
  whiteText: {
    textDecoration: 'none',
    color: 'white',
  },
}));

function NotFound() {
  const classes = useStyle();
  return (
    <div>
      <h1>
        <Typography variant="h6">404</Typography>
      </h1>
      <h2>The page you have requested cannot be located</h2>
      <div className="attendButton">
        <Button variant="contained">
          <Link to="/" className={classes.whiteText}>
            <Typography variant="h6">Return Home</Typography>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
