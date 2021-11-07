import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, useTheme } from '@mui/material';
import { Create, Person, Room } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(10),
  },
}));

const HomeInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <Box
        maxWidth="lg"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={5}
      >
        <Box gridColumn="span 4">
          <Room
            sx={{
              color: theme.palette.primary.main,
              fontSize: theme.spacing(10),
              marginBottom: theme.spacing(5),
            }}
          />
          <Typography variant="h5">
            Find events around you through the Events Explorer
          </Typography>
        </Box>
        <Box gridColumn="span 4">
          <div className={classes.featureItem}>
            <Person
              sx={{
                color: theme.palette.primary.main,
                fontSize: theme.spacing(10),
                marginBottom: theme.spacing(5),
              }}
            />
            <Typography variant="h5">Meet students around you</Typography>
          </div>
        </Box>
        <Box gridColumn="span 4">
          <div className={classes.featureItem}>
            <Create
              sx={{
                color: theme.palette.primary.main,
                fontSize: theme.spacing(10),
                marginBottom: theme.spacing(5),
              }}
            />
            <Typography variant="h5">Create your own events</Typography>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default HomeInfo;
