import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { collapseClasses, Typography } from '@mui/material';
import { School } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing(7),
  },
  middleSection: {
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(20),
  },
  title: {
    '&:after': {
      content: `""`,
      margin: `0 auto`,
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(3),
      display: `block`,
      width: theme.spacing(10),
      height: `3px`,
      background: 'white',
      zIndex: -1,
    },
  },
  wave: {
    border: `none`,
  },
}));

const HomeHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <div className={classes.middleSection}>
        <div className={classes.textContainer}>
          <School
            sx={{
              color: 'white',
              fontSize: theme.spacing(8),
            }}
          />
          <Typography
            className={classes.title}
            sx={{ color: 'white' }}
            variant="h1"
          >
            Want to study? Grab a buddy!
          </Typography>
          <Typography sx={{ color: 'white' }} variant="h2">
            Find your study buddy today
          </Typography>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 250"
        className={classes.wave}
      >
        <path
          fill={theme.palette.primary.main}
          fillOpacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,144C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>
  );
};

export default HomeHeader;
