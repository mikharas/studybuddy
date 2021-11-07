import React, { useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  CardActionArea,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
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
  isLoggedIn,
  getEvent,
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
    Geocode.setApiKey('AIzaSyB_RUPihF4_K2RXvpCKHYB7GPwd2Nb7Y_U');
    Geocode.setRegion('can');
    Geocode.fromLatLng(
      `${refreshedEvent.location.lat}`,
      `${refreshedEvent.location.lng}`,
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setEvent({ ...refreshedEvent, location: address });
        console.log(address);
      },
      (error) => {
        console.error(error);
      },
    );
    Geocode.fromAddress('Bahen').then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  useEffect(() => refreshEvent(), []);

  const toggleAttending = () => {
    if (!isLoggedIn) {
      alert('You must log in to perform this action.');
      history.push('/login');
    } else if (!isAttending) {
      addAttendee(eventID, user);
    } else {
      removeAttendee(eventID, user);
    }
    refreshEvent();
  };

  return (
    <div>
      <div className="banner">
        <img src={banner} className="bannerImg" alt="banner" />
      </div>
      <div>
        <h1>{event.title}</h1>
      </div>
      <div className="attendee">
        <div className="avatarContainer">
          <Avatar alt="Alyssa Chan" src={hostIcon} />
        </div>
        <div className="attendeeName">{event.host}</div>
      </div>
      <div className="eventDescription">
        <Card>
          <CardContent>{event.description}</CardContent>
        </Card>
        {/* tags */}
      </div>
      <div className="eventContainer">
        <div className="buttonContainer">
          <div className="attendButton">
            <Button variant="contained" onClick={toggleAttending}>
              {isAttending ? 'Unattend' : 'Attend Publicly'}
            </Button>
          </div>
          <div className="attendButton">
            <Button variant="contained" onClick={toggleAttending}>
              {isAttending ? 'Unattend' : 'Attend Anonymously'}
            </Button>
          </div>
        </div>
        <div className="eventInformation">
          <ul>
            <li>
              <Card>
                <CardContent>
                  <div className="cardHeader">
                    {event.maxSpots - event.attendees.length}
                  </div>
                  <div className="cardInformation">spots left</div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card>
                <CardContent>
                  <div className="cardHeader">Location</div>
                  <div className="cardInformation">{event.location}</div>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card>
                <CardContent>
                  <div className="cardHeader">Time and Date</div>
                  <div className="cardInformation">{event.date}</div>
                </CardContent>
              </Card>
            </li>
          </ul>
        </div>
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
  );
};

export default EventDashboard;
