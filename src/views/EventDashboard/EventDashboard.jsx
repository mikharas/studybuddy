import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  List,
  Card,
  CardContent,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import './eventDashboard.css';
import Geocode from 'react-geocode';
import { useHistory } from 'react-router-dom';
import banner from '../../images/uoft_banner.png';
import hostIcon from '../../images/uoft.png';
import StudentItem from '../../components/StudentItem';

const EventDashboard = ({
  eventID,
  user,
  isAdmin,
  isLoggedIn,
  getEvent,
  editEvent,
  getManyUserData,
  addAttendee,
  removeAttendee,
}) => {
  const history = useHistory();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    host: '',
    location: '',
    maxSpots: undefined,
    date: undefined,
    attendees: [],
  });
  const [attendees, setAttendees] = useState([]);
  const [isAttending, setIsAttending] = useState();

  let canEdit;
  if (user === undefined) {
    canEdit = false;
  } else if (isAdmin || user === event.host) {
    canEdit = true;
  } else {
    canEdit = false;
  }

  const [isEditMode, setIsEditMode] = useState(false);

  const refreshEvent = () => {
    const refreshedEvent = getEvent(eventID);
    // TODO: refactor this later
    if (!refreshedEvent) {
      history.push('/404');
      history.go(0);
      return;
    }
    const refreshedAttendees = getManyUserData(refreshedEvent.attendees);
    if (isLoggedIn) {
      setIsAttending(refreshedEvent.attendees.includes(user));
    }
    setAttendees(refreshedAttendees);
    setEvent({ ...refreshedEvent, location: 'DUMMY ADDRESS' });
    // TODO: Here, we use geocode to convert event location coordinates
    // to a common address, and display that
  };

  useEffect(() => refreshEvent(), []);

  const toggleAttending = () => {
    if (!isLoggedIn) {
      alert('You must log in to perform this action.');
      history.push('/login');
    } else if (event.maxSpots - event.attendees.length === 0) {
      alert('No more space available!');
    } else if (!isAttending) {
      addAttendee(eventID, user);
    } else {
      removeAttendee(eventID, user);
    }
    refreshEvent();
  };

  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const dateRef = useRef('');
  const locationRef = useRef('');
  const spotsRef = useRef('');

  const toggleEditMode = () => {
    if (isEditMode) {
      editEvent(
        eventID,
        titleRef.current.value,
        descriptionRef.current.value,
        dateRef.current.value,
        locationRef.current.value,
        spotsRef.current.value,
      );
    }
    setIsEditMode(!isEditMode);
    refreshEvent();
  };

  return (
    <div className="eventDashboard">
      <div className="eventTitle">
        {isEditMode ? (
          <TextField
            id="outlined-title"
            defaultValue={event.title}
            inputRef={titleRef}
          />
        ) : (
          <h1>{event.title}</h1>
        )}
        <div className="attendee">
          <div className="avatarContainer">
            <Avatar alt={event.host} src={hostIcon} />
          </div>
          <div className="attendeeName">Hosted by {event.host}</div>
        </div>
      </div>
      <div className="leftContainer">
        <div className="banner">
          <img src={banner} className="bannerImg" alt="banner" />
        </div>
        <div className="eventDescription">
          <Card>
            <CardContent>
              {isEditMode ? (
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={15}
                  defaultValue={event.description}
                  inputRef={descriptionRef}
                  style={{ width: 715 }}
                />
              ) : (
                event.description
              )}
            </CardContent>
          </Card>
          {/* tags */}
        </div>
        <div className="attendeesContainer">
          <Card>
            <CardContent>
              <div className="cardHeader">Attendees</div>
              <List>
                {attendees.map(({ username, userSchool }) => (
                  <StudentItem username={username} userSchool={userSchool} />
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="rightContainer">
        <Box className="eventInformation">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <div className="cardHeader">
                {isEditMode ? (
                  <TextField
                    id="outlined-spots"
                    defaultValue={event.maxSpots - event.attendees.length}
                    inputRef={spotsRef}
                  />
                ) : (
                  event.maxSpots - event.attendees.length
                )}
              </div>
              <div className="cardInformation">spots left</div>
            </Grid>
            <Grid item>
              <div className="cardHeader">Location</div>
              <div className="cardInformation">
                {isEditMode ? (
                  <TextField
                    id="outlined-location"
                    defaultValue={event.location}
                    inputRef={locationRef}
                  />
                ) : (
                  event.location
                )}
              </div>
            </Grid>
            <Grid item>
              <div className="cardHeader">Time and Date</div>
              <div className="cardInformation">
                {isEditMode ? (
                  <TextField
                    id="outlined-date"
                    defaultValue={event.date}
                    inputRef={dateRef}
                  />
                ) : (
                  event.date
                )}
              </div>
            </Grid>
            {user !== event.host && !isEditMode && (
              <Grid item>
                <Button variant="contained" onClick={toggleAttending}>
                  {isAttending ? 'Unattend' : 'Attend'}
                </Button>
              </Grid>
            )}
            {canEdit && (
              <Grid item>
                <Button variant="contained" onClick={toggleEditMode}>
                  {isEditMode ? 'Done' : 'Edit Event'}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default EventDashboard;
