import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardActionArea, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Map from './map.png';
import Cat from './amgry_catto.png';

const useStyles = makeStyles((theme) => ({
  eventDate: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  eventDescription: {
    marginBottom: theme.spacing(1.4),
  },
  eventAttendee: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
  },
  eventCard: {
    borderTop: `solid 0.5px ${theme.palette.gray.dark}`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  eventCardImageContainer: {
    height: theme.spacing(15),
    width: theme.spacing(20),
  },
  eventCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  eventCardInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    textAlign: 'left',
    justifyContent: 'center',
  },
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

const Event = ({ id, title, attendees, date, description, freespots }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <CardActionArea onClick={() => history.push(`/event-dashboard/${id}`)}>
      <Card elevation={0} className={classes.eventCard}>
        <div className={classes.eventCardImageContainer}>
          <img alt="cat" src={Cat} className={classes.eventCardImage} />
        </div>
        <div className={classes.eventCardInfo}>
          <Typography variant="body1" className={classes.eventDate}>
            {date}
          </Typography>
          <Typography variant="body1" className={classes.eventTitle}>
            {title}
          </Typography>
          <Typography
            color="GrayText"
            variant="body1"
            className={classes.eventDescription}
          >
            {description}
          </Typography>
          <div className={classes.eventAttendee}>
            <Typography color="GrayText" variant="body1">
              {attendees} attendees
            </Typography>
            <Typography color="red" variant="body1">
              {freespots} spots left
            </Typography>
          </div>
        </div>
      </Card>
    </CardActionArea>
  );
};

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
