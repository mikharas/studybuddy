import React, { useState, useEffect } from 'react';
import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import './eventDashboard.css';
import banner from './uoft_banner.png';
import hostIcon from './uoft.png';

const EventDashboard = ({
  eventID,
  user,
  getEvent,
  addAttendee,
  removeAttendee,
}) => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    host: '',
    location: '',
    maxSpots: undefined,
    date: undefined,
    attendees: [],
  });
  const [isAttending, setIsAttending] = useState();

  const refreshEvent = () => {
    const refreshedEvent = getEvent(eventID);
    setEvent({ ...refreshedEvent });
    setIsAttending(refreshedEvent.attendees.includes(user.username));
  };

  useEffect(() => refreshEvent(), []);

  const toggleAttending = () => {
    if (!isAttending) {
      addAttendee(eventID, user.username);
    } else {
      removeAttendee(eventID, user.username);
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
              {event.attendees.map((a) => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={a} src={hostIcon} />
                  </ListItemAvatar>
                  <ListItemText primary={a} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDashboard;
