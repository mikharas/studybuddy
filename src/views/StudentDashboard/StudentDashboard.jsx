import React, { useRef, useState, useEffect } from 'react';
import '../styles/studentDashboard.css';
import {
  Button,
  CardActionArea,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
} from '@mui/material';
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
  getUserEvents,
  getManyUserData,
  getUserData,
  editable,
  editProfileInfo,
}) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    userSchool: '',
    following: [],
    userEvents: [],
  });

  const [following, setFollowing] = useState([]);

  const [activeUserData, setActiveUserData] = useState({
    username: '',
    following: [],
  });

  const refreshUserData = () => {
    if (isLoggedIn) {
      const userEvents = getUserEvents(userID);
      const userDataS = getUserData(userID);
      const { username: newUsername, following: newFollowing } =
        getUserData(user);
      const refreshedFollowing = getManyUserData(userDataS.following);
      setUserData({
        ...userDataS,
        userEvents,
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
  const [isEditing, setIsEditing] = useState(false);

  const toggleFollowing = () => {
    if (!isFollowing) {
      addFollowing(user, userID);
    } else {
      removeFollowing(user, userID);
    }
    refreshUserData();
  };

  const fullNameRef = useRef('');
  const usernameRef = useRef('');
  const schoolRef = useRef('');

  const toggleEditing = (save) => {
    if (isEditing && save) {
      editProfileInfo(
        userID,
        schoolRef.current,
        usernameRef.current,
        fullNameRef.current,
      );
    }
    setIsEditing(!isEditing);
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
        {editable && (
          <Button onClick={toggleEditing(true)}>
            {isEditing ? 'Save Changes' : 'Edit'}
          </Button>
        )}
        {isEditing && <Button onClick={toggleEditing(false)}>Cancel</Button>}

        <img src={robarts} className="avatar" alt="Avatar" />
        <ul className="userInfo">
          <li className="userFullName">
            {isEditing ? (
              <TextField
                id="outlined-title"
                defaultValue={userData.fullName}
                inputRef={fullNameRef}
              />
            ) : (
              <b>{userData.fullName}</b>
            )}
          </li>
          <li>
            <b>Username:</b>
            {isEditing ? (
              <TextField
                id="outlined-title"
                defaultValue={userData.username}
                inputRef={usernameRef}
              />
            ) : (
              // <IconButton aria-label="Edit username">
              //   <EditTwoToneIcon style={{ fontSize: 'small' }} />
              // </IconButton>
              userData.username
            )}
          </li>
          <li>
            <b>School:</b>
            {isEditing ? (
              <TextField
                id="outlined-title"
                defaultValue={userData.userSchool}
                inputRef={schoolRef}
              />
            ) : (
              userData.userSchool
            )}
          </li>
          {/* <li>
            <b>Contacts:</b> None
            {isEditing
            ? <TextField
                id="outlined-title"
                defaultValue={userData.userSchool}
                inputRef={userSchoolRef}
              /> 
              : userData.userSchool
            }
          </li> */}
        </ul>
      </div>
      <div className="bottomContainer">
        <EventsList events={userData.userEvents} />
        <FollowingList followingList={following} />
      </div>
    </div>
  );
};

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
