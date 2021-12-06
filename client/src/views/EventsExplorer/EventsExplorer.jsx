import React from 'react';
import { makeStyles } from '@mui/styles';
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

const EventsExplorer = ({ user, events }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <Map events={events} user={user} />
      </div>
      <div className={classes.events}>
        {events.map((event) => (
          <Event
            {...event}
            isAttending={event.attendees.includes(user)}
            isHost={event.host === user}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsExplorer;
