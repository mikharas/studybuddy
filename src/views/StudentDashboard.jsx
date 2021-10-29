/* eslint-disable max-classes-per-file */
import React from 'react';
import './styles/studentDashboard.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import IconButton from '@mui/material/IconButton';
import profilePic from '../images/default-avatar.png';
import robarts from '../images/robarts.jpg';
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

class StudentDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: profilePic,
      fullName: 'John Smith',
      username: 'user',
      userSchool: 'University of Toronto (St. George)',
      userEvents: events,
      following: userFollowingList,
    };
  }

  removeEvent = (userEvent) => {
    const { userEvents } = this.state;
    const filteredEvents = userEvents.filter((e) => e !== userEvent);
    this.setState({
      userEvents: filteredEvents,
    });
  };

  render() {
    const { avatar, fullName, username, userSchool, userEvents, following } =
      this.state;
    return (
      <div className="profilePage">
        <div className="user">
          <img src={avatar} className="avatar" alt="Avatar" />
          <ul className="userInfo">
            <li className="userFullName">
              <b>{fullName}</b>
            </li>
            <li>
              <b>Username:</b> {username}
              <IconButton aria-label="Edit username">
                <EditTwoToneIcon style={{ fontSize: 'small' }} />
              </IconButton>
            </li>
            <li>
              <b>School:</b> {userSchool}
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
          <EventsList events={userEvents} removeEvent={this.removeEvent} />
          <FollowingList followingList={following} />
        </div>
      </div>
    );
  }
}

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
