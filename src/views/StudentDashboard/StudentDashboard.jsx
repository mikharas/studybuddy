/* eslint-disable max-classes-per-file */
import React, { useState, useEffect } from 'react';
import '../styles/studentDashboard.css';
import {
  CardActionArea,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import IconButton from '@mui/material/IconButton';
import { Redirect, useHistory } from 'react-router-dom';
import profilePic from '../../images/default-avatar.png';
import robarts from '../../images/robarts.jpg';
import EventsList from './StudentDashboardEvents';

const events = [
  {
    banner: robarts,
    title: 'CSC309 Study Session',
    date: 'MON, OCT 25 @ 6:30 PM EDT',
    location: 'Robarts Library, University of Toronto',
    attendees: 2,
  },
];

const userFollowingList = [
  {
    avatar: profilePic,
    fullName: 'Jane Doe',
    username: 'admin',
    userSchool: 'University of Toronto (St. George)',
  },
];

const StudentDashboard = ({
  isLoggedIn,
  userID,
  getUserEvents,
  getUserData,
  removeAttendee,
  editable,
}) => {
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    userSchool: '',
    following: [],
    userEvents: [],
  });
  const refreshUserData = () => {
    if (isLoggedIn) {
      const userEvents = getUserEvents(userID);
      const userDataS = getUserData(userID);
      setUserData({
        ...userDataS,
        userEvents,
      });
    }
  };

  const handleRemoveAttendee = (eventID) => {
    removeAttendee(eventID, userID);
    refreshUserData();
  };

  useEffect(() => {
    refreshUserData();
  }, [userID]);

  if (!isLoggedIn) {
    alert('You must log in to perform this action!');
    return <Redirect to="/" />;
  }
  return (
    <div className="profilePage">
      <div className="user">
        <img src={robarts} className="avatar" alt="Avatar" />
        <ul className="userInfo">
          <li className="userFullName">
            <b>{userData.fullName}</b>
          </li>
          <li>
            <b>Username:</b> {userData.username}
            {editable && (
              <IconButton aria-label="Edit username">
                <EditTwoToneIcon style={{ fontSize: 'small' }} />
              </IconButton>
            )}
          </li>
          <li>
            <b>School:</b> {userData.userSchool}
            {editable && (
              <IconButton aria-label="Edit username">
                <EditTwoToneIcon style={{ fontSize: 'small' }} />
              </IconButton>
            )}
          </li>
          <li>
            <b>Contacts:</b> None
            {editable && (
              <IconButton aria-label="Edit username">
                <EditTwoToneIcon style={{ fontSize: 'small' }} />
              </IconButton>
            )}
          </li>
        </ul>
      </div>
      <div className="bottomContainer">
        <EventsList
          events={userData.userEvents}
          removeAttendee={handleRemoveAttendee}
          editable={editable}
        />
        <FollowingList
          followingList={userData.following}
          refreshUserData={refreshUserData}
        />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prefer-stateless-function
const FollowingList = ({ followingList, refreshUserData }) => {
  const history = useHistory();
  return (
    <div className="following">
      <h3 className="listHeader">Following:</h3>
      {followingList.map((user) => (
        <CardActionArea
          onClick={() => {
            refreshUserData();
            history.push(`/profile/${user}`);
          }}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user} secondary={user.userSchool} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </CardActionArea>
      ))}
    </div>
  );
};

export default StudentDashboard;
