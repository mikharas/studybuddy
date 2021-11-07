import React from 'react';
import { makeStyles } from '@mui/styles';
import Map from './map.png';
import Event from '../../components/EventItem';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
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

const EventsExplorer = ({ events }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <img className={classes.mapImage} alt="map" src={Map} />
      </div>
      <div className={classes.events}>
        {events.map((event) => (
          <Event
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            attendees={event.attendees.length}
            freespots={event.maxSpots - event.attendees.length}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsExplorer;
