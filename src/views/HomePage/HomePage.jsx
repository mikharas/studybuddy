import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import Event from '../../components/EventItem';
import Map from '../../components/Map';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 80px)',
  },
  map: {
    flex: 1,
    width: '50%',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  events: {
    borderRadius: '50%',
    width: theme.spacing(80),
    padding: theme.spacing(5),
  },
}));

const Homepage = ({ isLoggedIn, user, events }) => {
  const classes = useStyles();
  return (
    <>
      <div>
        {isLoggedIn && <h1>Hi {user}, Find your study buddy today!</h1>}
      </div>
      <div className={classes.container}>
        <div className={classes.events} float="right">
          <h1>
            <Typography variant="h2">Upcoming Events</Typography>
          </h1>
          {events.map((event) => (
            <Event
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              attendees={event.attendees.length}
              freespots={event.maxSpots - event.attendees.length}
              isAttending={event.attendees.includes(user)}
            />
          ))}
        </div>
        <div className={classes.events} float="left">
          <div>
            <h1>
              <Typography variant="h2">Your Events</Typography>
            </h1>
            {isLoggedIn &&
              events.map((event) =>
                event.attendees.includes(user) ? (
                  <Event
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    attendees={event.attendees.length}
                    freespots={event.maxSpots - event.attendees.length}
                    isAttending={event.attendees.includes(user)}
                  />
                ) : null,
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
