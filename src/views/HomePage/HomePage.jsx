import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import Event from '../../components/EventItem';
import HomeHeader from '../../components/HomeHeader';
import HomeInfo from '../../components/HomeInfo';

const useStyles = makeStyles((theme) => ({
  eventsContainer: {
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 80px)',
    justifyContent: 'center',
  },
  events: {
    borderRadius: '50%',
    width: theme.spacing(80),
    padding: theme.spacing(5),
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Homepage = ({ isLoggedIn, user, events }) => {
  const classes = useStyles();
  return (
    <>
      <HomeHeader />
      <HomeInfo />
      <div className={classes.eventsContainer}>
        <div className={classes.events} float="right">
          <h1>
            <Typography variant="h2">You might be interested in...</Typography>
          </h1>
          {events.map(
            (event) =>
              !event.attendees.includes(user) && (
                <Event
                  {...event}
                  isAttending={event.attendees.includes(user)}
                  isHost={event.host === user}
                />
              ),
          )}
        </div>
        {isLoggedIn && (
          <div className={classes.events} float="left">
            <div>
              <h1>
                <Typography variant="h2">Your upcoming events</Typography>
              </h1>
              {events.map(
                (event) =>
                  event.attendees.includes(user) && (
                    <Event
                      {...event}
                      isAttending={event.attendees.includes(user)}
                      isHost={event.host === user}
                    />
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
