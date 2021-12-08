import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardActionArea, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import Cat from '../images/amgry_catto.png';

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
    minWidth: theme.spacing(60),
    width: '100%',
    height: '100%',
  },
  eventCardImageContainer: {
    height: theme.spacing(15),
    width: '25%',
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
    textAlign: 'left',
    justifyContent: 'center',
    width: '70%',
  },
}));

const EventItem = ({
  _id,
  title,
  attendees,
  date,
  description,
  maxSpots,
  image,
  isAttending,
  isHost,
}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <CardActionArea onClick={() => history.push(`/event-dashboard/${_id}`)}>
      <Card elevation={0} className={classes.eventCard}>
        <div className={classes.eventCardImageContainer}>
          {typeof image === 'undefined' ? (
            <img
              alt="event"
              src="https://res.cloudinary.com/dllebueou/image/upload/v1638921742/default_event_foihwz.png"
              className={classes.eventCardImage}
            />
          ) : (
            <img alt="event" src={image} className={classes.eventCardImage} />
          )}
        </div>
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
          <Typography
            color="GrayText"
            variant="body1"
            className={classes.eventDescription}
          >
            {description}
          </Typography>
          <div className={classes.eventAttendee}>
            <Typography color="GrayText" variant="body1">
              {attendees.length} attendees
            </Typography>
            <Typography color="red" variant="body1">
              {maxSpots - attendees.length} spots left
            </Typography>
            {isHost && (
              <Typography
                sx={{ fontWeight: 'bold' }}
                color="red"
                variant="body1"
              >
                Host
              </Typography>
            )}
            {!isHost && isAttending && (
              <Typography
                sx={{ fontWeight: 'bold' }}
                color="red"
                variant="body1"
              >
                Attending
              </Typography>
            )}
          </div>
        </div>
      </Card>
    </CardActionArea>
  );
};

export default EventItem;
