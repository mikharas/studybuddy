import React, { useRef } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';
import './eventCreation.css';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
      const generatedID = uuidv4();
      createEvent(
        generatedID,
        titleRef.current.value,
        descriptionRef.current.value,
        user,
        dateRef.current.value,
        locationRef.current.value,
        spotsRef.current.value,
      );
      history.push(`/event-dashboard/${generatedID}`);
    }
  };

  if (!isLoggedIn) {
    alert('You must log in to perform this action.');
    history.push('/login');
  }

  return (
    <div className="eventCreation">
      <Box className="formContainer">
        <h2> Create an event! </h2>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={6}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          >
            <TextField id="outlined-title" label="Title" inputRef={titleRef} />
            <TextField
              id="outlined-location"
              label="Location"
              inputRef={locationRef}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          >
            <TextField
              id="outlined-spots"
              label="Number of Spots"
              inputRef={spotsRef}
              // does not check for valid inputs
            />
            <TextField
              id="outlined-date"
              label="Time and Date"
              inputRef={dateRef}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ '& .MuiTextField-root': { m: 1, width: '52ch' } }}
          >
            <TextField
              id="outlined-multiline-flexible"
              multiline
              maxRows={15}
              label="Description"
              inputRef={descriptionRef}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ '& .MuiButton-root': { m: 1, width: '25ch' } }}
          >
            <Button variant="contained">
              Upload Image
              {/* Note this feature pulls from backend and as such does not work yet
               */}
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ '& .MuiButton-root': { m: 1, width: '25ch' } }}
          >
            <Button variant="contained" onClick={createNewEvent}>
              Create Event
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EventCreation;
