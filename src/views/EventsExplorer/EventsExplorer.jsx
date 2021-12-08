import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Popover,
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import Event from '../../components/EventItem';
import Map from '../../components/Map';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 80px)',
  },
  map: {
    flex: 1,
    width: '50%',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  eventsList: {
    width: theme.spacing(80),
    padding: theme.spacing(5),
    overflow: 'scroll',
  },
  eventsFilter: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  eventsFilterItem: {},
  dateTimePopover: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
}));

const EventsExplorer = ({ user, events, setFilter, getEvents }) => {
  const classes = useStyles();
  const [filterObj, setFilterObj] = useState({
    showEndTime: false,
    startTime: moment(),
    endTime: moment(),
    keyword: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(async () => {
    await getEvents();
  }, []);
  return (
    <Box className={classes.container}>
      <Box className={classes.map}>
        <Map events={events} user={user} />
      </Box>
      <Box className={classes.eventsList}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box className={classes.eventsFilter}>
            <Box className={classes.eventsFilterItem}>
              <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
                <Typography variant="body1">Time</Typography>
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box className={classes.dateTimePopover}>
                  <Box>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={filterObj.startTime}
                      onChange={(newValue) =>
                        setFilterObj({
                          ...filterObj,
                          startTime: newValue,
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControlLabel
                      label="Set end time"
                      sx={{
                        marginLeft: '5px',
                      }}
                      control={
                        <Checkbox
                          checked={filterObj.showEndTime}
                          onChange={() => {
                            setFilterObj({
                              ...filterObj,
                              showEndTime: !filterObj.showEndTime,
                            });
                          }}
                        />
                      }
                    />
                  </Box>
                  {filterObj.showEndTime && (
                    <Box
                      sx={{
                        marginTop: '20px',
                      }}
                    >
                      <DateTimePicker
                        label="End Date and Time"
                        value={filterObj.endTime}
                        onChange={(newValue) =>
                          setFilterObj({
                            ...filterObj,
                            endTime: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Box>
                  )}
                </Box>
              </Popover>
            </Box>
            <Box className={classes.eventFilterItem}>
              <TextField
                id="filter-keyword"
                value={filterObj.keyword}
                onChange={(e) =>
                  setFilterObj({
                    ...filterObj,
                    keyword: e.target.value,
                  })
                }
                label="Search for a keyword!"
              />
            </Box>
            <Button
              onClick={() => setFilter(filterObj)}
              variant="contained"
              className={classes.eventsFilterItem}
            >
              <Typography variant="body1">Submit</Typography>
            </Button>
          </Box>
        </LocalizationProvider>
        <Box className={classes.events}>
          {events.map((event) => (
            <Event
              {...event}
              isAttending={event.attendees.includes(user)}
              isHost={event.host === user}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EventsExplorer;
