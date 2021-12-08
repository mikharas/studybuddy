import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActionArea,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  eventDate: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  eventDescription: {
    marginBottom: theme.spacing(1.4),
  },
  eventAttendee: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
  },
  eventCard: {
    borderTop: `solid 0.5px ${theme.palette.gray.dark}`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  eventCardImageContainer: {
    height: theme.spacing(15),
    width: theme.spacing(20),
  },
  eventCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  eventCardInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    textAlign: 'left',
    justifyContent: 'center',
  },
}));

const StudentItem = ({ username, userSchool, profileImage }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <CardActionArea onClick={() => history.push(`/profile/${username}`)}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={username} src={profileImage} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" color="GrayText">
              {userSchool}
            </Typography>
          }
          secondary={
            <Typography
              sx={{ display: 'inline', fontWeight: 'bold' }}
              variant="body2"
            >
              {username}
            </Typography>
          }
        />
      </ListItem>
    </CardActionArea>
  );
};

export default StudentItem;
