import { createTheme } from '@mui/material';
import './fonts/typography.css';

const theme = createTheme({
  palette: {
    primary: {
      light: `#e4ebdd`,
      dark: `#212e26`,
      main: `#618770`,
      contrastText: `#fff`,
    },
    secondary: {
      main: `#96A4AC`,
      light: `#CFDAD6`,
      contrastText: `#fff`,
    },
    gray: {
      main: `#F6F6F5`,
      dark: '#dddddd',
      contrastText: `#4a4a49`,
    },
  },
});

theme.typography.h1 = {
  fontFamily: 'Avenir Black',
  fontSize: theme.spacing(7),
  [theme.breakpoints.down(`sm`)]: {
    fontSize: theme.spacing(5.5),
  },
  [theme.breakpoints.down(`xs`)]: {
    fontSize: theme.spacing(4),
  },
};

theme.typography.h2 = {
  ...theme.typography.h2,
  fontSize: theme.spacing(4),
  fontFamily: 'Avenir Roman',
  [theme.breakpoints.down(`sm`)]: {
    fontSize: theme.spacing(4),
  },
  [theme.breakpoints.down(`xs`)]: {
    fontSize: theme.spacing(3),
  },
};

theme.typography.h3 = {
  ...theme.typography.h3,
  fontFamily: 'Avenir',
  fontSize: theme.spacing(4),
  [theme.breakpoints.down(`sm`)]: {
    fontSize: theme.spacing(4),
  },
  [theme.breakpoints.down(`xs`)]: {
    fontSize: theme.spacing(3),
  },
};

theme.typography.h4 = {
  ...theme.typography.h4,
  fontFamily: 'Avenir Book',
  fontSize: theme.spacing(2.8),
};

theme.typography.h5 = {
  ...theme.typography.h5,
  fontFamily: 'Avenir',
  fontSize: theme.spacing(3),
  [theme.breakpoints.down(`xs`)]: {
    fontSize: theme.spacing(3.1),
  },
};

theme.typography.h6 = {
  ...theme.typography.h6,
  fontFamily: 'Avenir',
  fontSize: theme.spacing(2.5),
  fontWeight: 'lighter',
  [theme.breakpoints.down('xs')]: {
    fontSize: theme.spacing(2),
  },
};

theme.typography.body1 = {
  ...theme.typography.body1,
  fontFamily: 'Avenir Roman',
  fontSize: theme.spacing(2),
  [theme.breakpoints.down(`sm`)]: {
    fontSize: theme.spacing(2.1),
  },
  [theme.breakpoints.down(`xs`)]: {
    fontSize: theme.spacing(1.9),
  },
};

theme.typography.body2 = {
  ...theme.typography.body2,
  fontFamily: 'Avenir Book',
  fontSize: theme.spacing(2.1),
  [theme.breakpoints.down(`sm`)]: {
    fontSize: theme.spacing(1.9),
  },
};

theme.typography.subtitle2 = {
  ...theme.typography.subtitle2,
  color: '#9b9d9e',
  fontFamily: `Avenir Book`,
  fontSize: theme.spacing(2.5),
  fontWeight: `bold`,
  marginBottom: theme.spacing(2.7),
  [theme.breakpoints.down('md')]: {
    fontSize: theme.spacing(2.3),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2),
  },
};

export default theme;
