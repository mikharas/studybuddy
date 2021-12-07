import React, { useRef, useState } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';
import './eventCreation.css';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const EventCreation = ({ user, events, isLoggedIn, createEvent }) => {
  const history = useHistory();

  let image = '';

  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const dateRef = useRef('');
  const locationRef = useRef('');
  const spotsRef = useRef('');

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'duespamm');

    const result = await fetch(
      'https://api.cloudinary.com/v1_1/dllebueou/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const file = await result.json();

    image = file.secure_url;
  };

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
        image,
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
          spacing={2}
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
          <Grid item xs={6}>
            <strong> Upload image </strong>
          </Grid>
          <Grid item xs={6} sx={{ marginLeft: 7 }}>
            <input type="file" onChange={uploadImage} />
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
