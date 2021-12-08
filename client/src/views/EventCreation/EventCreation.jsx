import React, { useRef, useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import './eventCreation.css';
import { useHistory } from 'react-router-dom';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const EventCreation = ({ user, isLoggedIn, createEvent }) => {
  const history = useHistory();

  let image = '';

  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const [dateTime, setDateTime] = useState();
  const [locationCoord, setLocationCoord] = useState();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
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

  const createNewEvent = async () => {
    if (!isLoggedIn) {
      alert('You must log in to perform this action.');
      history.push('/login');
    } else {
      const id = await createEvent(
        titleRef.current.value,
        descriptionRef.current.value,
        user,
        moment(dateTime, 'ddd MMM DD yyyy HH:mm').toString(),
        locationCoord,
        spotsRef.current.value,
        image,
      );
      history.push(`/event-dashboard/${id}`);
    }
  };

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
          <Typography className="suggestion-text" variant="body1">
            {mainText}
          </Typography>
        </li>
      );
    });

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
              fullWidth
              color="secondary"
              variant="outlined"
              label="Location"
              value={value}
              disabled={!ready}
              onChange={(e) => setValue(e.target.value)}
            />
            {status === 'OK' && (
              <ul className="suggestions">{renderSuggestions()}</ul>
            )}
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Date and Time"
                value={dateTime}
                format="yyyy-MM-dd:HH:mm"
                onChange={(newValue) => setDateTime(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
