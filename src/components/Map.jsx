import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';
import { Room } from '@mui/icons-material';
import { useHistory } from 'react-router';
import EventItemCompact from './EventItemCompact';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
  },
  markerRed: {
    position: 'relative',
    color: 'red',
  },
  markerGreen: {
    position: 'relative',
    color: theme.palette.primary.main,
  },
  markerPopup: {
    borderRadius: '50%',
    position: 'absolute',
    bottom: 50,
    left: -70,
    width: theme.spacing(20),
    zIndex: 999,
    padding: theme.spacing(1),
  },
}));

const Marker = ({ event, $hover }) => {
  const classes = useStyles();

  return (
    <div className={classes.marker}>
      {$hover && (
        <Paper className={classes.markerPopup}>
          <EventItemCompact
            title={event.title}
            attendees={event.attendees.length}
            date={event.date}
            freespots={event.maxSpots - event.attendees.length}
          />
        </Paper>
      )}
      <Room fontSize="large" className={classes.markerGreen} />
    </div>
  );
};

const UserMarker = ({ $hover }) => {
  const classes = useStyles();

  return (
    <div className={classes.marker}>
      {$hover && (
        <Paper className={classes.markerPopup}>
          <Typography variant="body1">My Location</Typography>
        </Paper>
      )}
      <Room fontSize="large" className={classes.markerRed} />
    </div>
  );
};

const GoogleMap = ({ events }) => {
  const classes = useStyles();
  const history = useHistory();
  const [userLocation, setUserLocation] = useState({});
  const [curLoc, setCurLoc] = useState(events[0].location);

  const handleChildClick = (key, childProps) => {
    if (childProps.event) {
      setCurLoc({ lat: childProps.lat, lng: childProps.lng });
      history.push(`/event-dashboard/${childProps.event.id}`);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCurLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        alert('We could not get your location.');
      },
      {
        enableHighAccuracy: false,
        maximumAge: Infinity,
      },
    );
  }, []);
  return (
    <div className={classes.container}>
      <GoogleMapReact
        // move this out this later
        bootstrapURLKeys={{ key: 'AIzaSyB_RUPihF4_K2RXvpCKHYB7GPwd2Nb7Y_U' }}
        yesIWantToUseGoogleMapApiInternals
        onChildClick={handleChildClick}
        center={curLoc}
        zoom={15}
      >
        <UserMarker lat={userLocation.lat} lng={userLocation.lng} />
        {events.map((e) => (
          <Marker
            event={e}
            text={e.title}
            lat={e.location.lat}
            lng={e.location.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
