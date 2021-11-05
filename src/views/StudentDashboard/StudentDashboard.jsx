/* eslint-disable max-classes-per-file */
import React, { useState, useEffect } from 'react';
import '../styles/studentDashboard.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import IconButton from '@mui/material/IconButton';
import { Redirect } from 'react-router-dom';
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
  user,
  getUserEvents,
  getUserData,
  removeAttendee,
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
      const userEvents = getUserEvents(user.username);
      const userDataS = getUserData(user.username);
      setUserData({
        ...userDataS,
        userEvents,
      });
    }
  };

  const handleRemoveAttendee = (eventID) => {
    removeAttendee(eventID, user.username);
    refreshUserData();
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  if (!isLoggedIn) {
    alert("You aren't logged in!");
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
            <IconButton aria-label="Edit username">
              <EditTwoToneIcon style={{ fontSize: 'small' }} />
            </IconButton>
          </li>
          <li>
            <b>School:</b> {userData.userSchool}
            <IconButton aria-label="Edit username">
              <EditTwoToneIcon style={{ fontSize: 'small' }} />
            </IconButton>
          </li>
          <li>
            <b>Contacts:</b> None
            <IconButton aria-label="Edit username">
              <EditTwoToneIcon style={{ fontSize: 'small' }} />
            </IconButton>
          </li>
        </ul>
      </div>
      <div className="bottomContainer">
        <EventsList
          events={userData.userEvents}
          removeAttendee={handleRemoveAttendee}
        />
        <FollowingList followingList={userData.following} />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prefer-stateless-function
class FollowingList extends React.Component {
  render() {
    const { followingList } = this.props;
    return (
      <div className="following">
        <h3 className="listHeader">Following:</h3>
        {followingList.map((user) => (
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user.fullName}
                secondary={user.userSchool}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </div>
    );
  }
}

export default StudentDashboard;
