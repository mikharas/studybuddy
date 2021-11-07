import React, { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import './eventCreation.css';
import { useHistory } from 'react-router-dom';

const EventCreation = ({ user, events, isLoggedIn, createEvent }) => {
  const history = useHistory();

  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const dateRef = useRef('');
  const locationRef = useRef('');
  const spotsRef = useRef('');

  const createNewEvent = () => {
    if (!isLoggedIn) {
      alert('You must log in to perform this action.');
      history.push('/login');
    } else {
      createEvent(
        titleRef.current.value,
        descriptionRef.current.value,
        user,
        dateRef.current.value,
        locationRef.current.value,
        spotsRef.current.value,
      );
    }
  };

  if (!isLoggedIn) {
    alert('You must log in to perform this action.');
    history.push('/login');
  }

  return (
    <div className="eventCreation">
      <div className="eventList">
        <ul>
          {/* input for banner */}
          <li>
            <TextField id="outlined-title" label="Title" inputRef={titleRef} />
          </li>
          <li>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              maxRows={15}
              label="Description"
              inputRef={descriptionRef}
            />
          </li>
          <li>
            <TextField
              id="outlined-spots"
              label="Number of Spots"
              inputRef={spotsRef}
              // does not check for valid inputs
            />
          </li>
          <li>
            <TextField
              id="outlined-location"
              label="Location"
              inputRef={locationRef}
            />
          </li>
          <li>
            <TextField
              id="outlined-date"
              label="Time and Date"
              inputRef={dateRef}
            />
          </li>
          <li>
            <Button variant="contained" onClick={createNewEvent}>
              Create Event
              {/* <Link to={`/profile/${user}`}>
                    <Person fontSize="large" className={classes.profileIcon} />
                  </Link> */}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventCreation;
