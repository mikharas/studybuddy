/* eslint-disable max-classes-per-file */
import React, { useState, useEffect } from 'react';
import '../styles/studentDashboard.css';
import { Button } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';
import profilePic from '../../images/default-avatar.png';
import robarts from '../../images/robarts.jpg';
import EventsList from './StudentDashboardEvents';
import StudentItem from '../../components/StudentItem';

const StudentDashboard = ({
  isLoggedIn,
  addFollowing,
  removeFollowing,
  userID,
  user,
  getUserAttendingEvents,
  getManyUserData,
  getUserData,
  editable,
}) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    userSchool: '',
    following: [],
    userAttendingEvents: [],
  });

  const [following, setFollowing] = useState([]);

  const [activeUserData, setActiveUserData] = useState({
    username: '',
    following: [],
  });

  const refreshUserData = () => {
    if (isLoggedIn) {
      const userAttendingEvents = getUserAttendingEvents(userID);
      const userDataS = getUserData(userID);
      const { username: newUsername, following: newFollowing } =
        getUserData(user);
      const refreshedFollowing = getManyUserData(userDataS.following);
      setUserData({
        ...userDataS,
        userAttendingEvents,
      });
      setActiveUserData({
        username: newUsername,
        following: newFollowing,
      });
      setFollowing(refreshedFollowing);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [userID]);

  const isFollowing = activeUserData.following.includes(userID);

  const toggleFollowing = () => {
    if (!isFollowing) {
      addFollowing(user, userID);
    } else {
      removeFollowing(user, userID);
    }
    refreshUserData();
  };

  if (!isLoggedIn) {
    alert('You must log in to perform this action!');
    history.push('/login');
  }
  return (
    <div className="profilePage">
      <div className="user">
        {!editable && (
          <Button onClick={toggleFollowing}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
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
        <EventsList events={userData.userAttendingEvents} user={user} />
        <FollowingList followingList={following} />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prefer-stateless-function
const FollowingList = ({ followingList }) => {
  const history = useHistory();
  return (
    <div className="following">
      <h3 className="listHeader">Following:</h3>
      {followingList.map(({ username, userSchool }) => (
        <StudentItem username={username} userSchool={userSchool} />
      ))}
    </div>
  );
};

export default StudentDashboard;
