import React from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cat from '../images/amgry_catto.png';

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
    flexDirection: 'column',
  },
  eventCard: {
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
    padding: theme.spacing(2),
    textAlign: 'left',
    justifyContent: 'center',
  },
}));

const EventItemCompact = ({
  title,
  attendees,
  date,
  maxSpots,
  isAttending,
  isHost,
}) => {
  const classes = useStyles();
  return (
    <Card elevation={0} className={classes.eventCard}>
      <div className={classes.eventCardInfo}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold' }}
          className={classes.eventDate}
        >
          {date}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold' }}
          className={classes.eventTitle}
        >
          {title}
        </Typography>
        <div className={classes.eventAttendee}>
          <Typography color="GrayText" variant="body1">
            {attendees.length} attendees
          </Typography>
          <Typography color="red" variant="body1">
            {maxSpots - attendees.length} spots left
          </Typography>
          {isHost && (
            <Typography sx={{ fontWeight: 'bold' }} color="red" variant="body1">
              Host
            </Typography>
          )}
          {!isHost && isAttending && (
            <Typography sx={{ fontWeight: 'bold' }} color="red" variant="body1">
              Attending
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventItemCompact;
