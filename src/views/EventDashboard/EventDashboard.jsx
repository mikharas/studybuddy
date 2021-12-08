import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  List,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import './eventDashboard.css';
import Geocode from 'react-geocode';
import { useHistory } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import banner from '../../images/uoft_banner.png';
import hostIcon from '../../images/uoft.png';
import StudentItem from '../../components/StudentItem';
import QuestionItem from '../../components/QuestionItem';

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
  addQuestion,
  editQuestion,
  deleteQuestion,
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
    questions: [],
    image: '',
  });
  const [attendees, setAttendees] = useState([]);
  const [isAttending, setIsAttending] = useState();
  const [locationCoord, setLocationCoord] = useState();
  const [hostimage, setHostimage] = useState();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const handleLocSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setLocationCoord({ lat, lng });
        })
        .catch((error) => {
          console.error(error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id: placeId,
        structured_formatting: {
          main_text: mainText,
          seconday_text: secondaryText,
        },
      } = suggestion;

      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
          key={placeId}
          onClick={handleLocSelect(suggestion)}
          className="suggestions"
        >
          <strong>{mainText}</strong> <small>{secondaryText}</small>
        </li>
      );
    });

  let canEdit;
  if (user === undefined) {
    canEdit = false;
  } else if (isAdmin || user === event.host) {
    canEdit = true;
  } else {
    canEdit = false;
  }

  const [isEditMode, setIsEditMode] = useState(false);

  const refreshEvent = async () => {
    const refreshedEvent = await getEvent(eventID);
    if (!refreshedEvent) {
      history.push('/404');
      history.go(0);
      return;
    }
    setDateTime(refreshedEvent.date);
    const refreshedAttendees = await getManyUserData(refreshedEvent.attendees);
    // setHostimage(
    //   refreshedAttendees[refreshedAttendees.length - 1].profileImage,
    // );
    if (isLoggedIn) {
      setIsAttending(refreshedEvent.attendees.includes(user));
    }
    setAttendees(refreshedAttendees);
    Geocode.setApiKey('AIzaSyB_RUPihF4_K2RXvpCKHYB7GPwd2Nb7Y_U');
    Geocode.setRegion('can');
    Geocode.fromLatLng(
      `${refreshedEvent.location.lat}`,
      `${refreshedEvent.location.lng}`,
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setLocationCoord({
          lat: refreshedEvent.location.lat,
          lng: refreshedEvent.location.lng,
        });
        setEvent({
          ...refreshedEvent,
          location: address,
          questions: [],
        });
        setValue(address);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  useEffect(() => refreshEvent(), []);

  const openGoogleMaps = () => {
    window.open(`https://maps.google.com?q=${event.location}`);
  };
  const toggleAttending = async () => {
    if (!isLoggedIn) {
      alert('You must log in to perform this action.');
      history.push('/login');
    } else if (event.maxSpots - event.attendees.length === 0) {
      alert('No more space available!');
    } else if (!isAttending) {
      await addAttendee(eventID, user);
    } else {
      await removeAttendee(eventID, user);
    }
    refreshEvent();
  };

  const questionPrompt = () => {
    if (!isLoggedIn) {
      alert('You must log in to perform this action.');
      history.push('/login');
    } else {
      const newQ = prompt('Post your question:');
      if (newQ === null || newQ === '') {
        return;
      }
      const { length } = event.questions;
      if (length === 0) {
        const newID = 1;
        addQuestion(eventID, { id: newID, q: newQ, a: '' });
      } else {
        const newID = event.questions[length - 1].id + 1;
        addQuestion(eventID, { id: newID, q: newQ, a: '' });
      }
    }
    refreshEvent();
  };

  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const [dateTime, setDateTime] = useState();
  const spotsRef = useRef('');

  const toggleEditMode = () => {
    if (isEditMode) {
      editEvent(
        eventID,
        titleRef.current.value,
        descriptionRef.current.value,
        user,
        moment(dateTime, 'ddd MMM DD yyyy HH:mm').toString(),
        locationCoord,
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
            <Avatar alt={event.host} src={hostimage} />
          </div>
          <div className="attendeeName">Hosted by {event.host}</div>
        </div>
      </div>
      <div className="eventInfoContainer">
        <div className="attendeesContainer">
          <Card>
            <CardContent>
              <div className="cardHeader">Attendees</div>
              <List>
                {attendees.map(({ username, userSchool, profileImage }) => (
                  <StudentItem
                    username={username}
                    userSchool={userSchool}
                    profileImage={profileImage}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
        <div className="middleContainer">
          <div className="banner">
            <img src={event.image} className="bannerImg" alt="banner" />
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
          <div className="questionsContainer">
            <Card>
              <CardContent>
                <div className="cardHeader">Questions & Answers</div>
                {user !== event.host && (
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={questionPrompt}
                    >
                      Got a question?
                    </Button>
                  </Box>
                )}
                <List>
                  {user === event.host &&
                    event.questions.map(({ id, q, a }) => (
                      <>
                        <QuestionItem question={q} answer={a} />
                        <Button
                          size="small"
                          onClick={() => {
                            const newA = prompt(q);
                            if (newA === null || newA === '') {
                              return;
                            }
                            editQuestion(eventID, { id, q, a: newA });
                            refreshEvent();
                          }}
                        >
                          {a !== '' ? 'Edit Response' : 'Respond'}
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            deleteQuestion(eventID, { id, q, a });
                            refreshEvent();
                          }}
                        >
                          Delete Question
                        </Button>
                      </>
                    ))}
                  {user !== event.host &&
                    event.questions.map(({ q, a }) => (
                      <QuestionItem
                        question={q}
                        answer={a}
                        addQuestion={addQuestion}
                        eventID={eventID}
                      />
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
                    <>
                      <TextField
                        id="outlined-location"
                        value={value}
                        disabled={!ready}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
                    </>
                  ) : (
                    <CardActionArea onClick={openGoogleMaps}>
                      <Typography variant="body1">{event.location}</Typography>
                    </CardActionArea>
                  )}
                </div>
              </Grid>
              <Grid item>
                <div className="cardHeader">Time and Date</div>
                <div className="cardInformation">
                  {isEditMode ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Start Date and Time"
                        value={dateTime}
                        format="yyyy-MM-dd:HH:mm"
                        onChange={(newValue) => setDateTime(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
    </div>
  );
};

export default EventDashboard;
