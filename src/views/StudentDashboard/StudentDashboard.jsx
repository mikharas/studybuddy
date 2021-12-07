import React, { useRef, useState, useEffect } from 'react';
import '../styles/studentDashboard.css';
import { Button, Typography, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
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
  editProfileInfo,
  getHostedEvents,
}) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    userSchool: '',
    isAdmin: false,
    following: [],
    contact: '',
    userEvents: [],
    hostedEvents: [],
    profileImage: '',
  });

  const [following, setFollowing] = useState([]);

  const [activeUserData, setActiveUserData] = useState({
    username: '',
    isAdmin: false,
    following: [],
  });

  let image = getUserData(userID).profileImage;

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'duespamm');

    const result = await fetch(
      'https://api.cloudinary.com/v1_1/dllebueou/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const file = await result.json();

    image = file.secure_url;
  };

  const refreshUserData = () => {
    if (isLoggedIn) {
      const userEvents = getUserAttendingEvents(userID);
      const hostedEvents = getHostedEvents(userID);
      const userDataS = getUserData(userID);
      const {
        username: newUsername,
        following: newFollowing,
        isAdmin: admin,
      } = getUserData(user);
      const refreshedFollowing = getManyUserData(userDataS.following);
      setUserData({
        ...userDataS,
        userEvents,
        hostedEvents,
      });
      setActiveUserData({
        username: newUsername,
        following: newFollowing,
        isAdmin: admin,
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

  const fullNameRef = useRef();
  const schoolRef = useRef();
  const contactRef = useRef();

  const toggleEditing = (cancelled) => {
    if (isEditing && !cancelled) {
      editProfileInfo(
        userID,
        schoolRef.current.value,
        fullNameRef.current.value,
        contactRef.current.value,
        image,
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
          <Button className="followEditButton" onClick={toggleFollowing}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
        {editable && (
          <Button
            className="followEditButton"
            onClick={() => toggleEditing(false)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              className="followEditButton"
              onClick={() => toggleEditing(true)}
            >
              Cancel
            </Button>
            {/* Add remove user functionality in phase 2 */}
            <Button
              className="deleteBanButton" // onClick={removeUser}
            >
              Delete Account
            </Button>
          </>
        )}
        {/* Add remove user functionality in phase 2 */}
        {!editable && activeUserData.isAdmin && !userData.isAdmin && (
          <Button
            className="deleteBanButton" // onClick={banUser}
          >
            Ban
          </Button>
        )}

        <img src={userData.profileImage} className="avatar" alt="Avatar" />
        <ul className="userInfo">
          <li className="userFullName">
            {isEditing ? (
              <TextField
                id="outlined-fullname"
                variant="outlined"
                label="Full Name"
                defaultValue={userData.fullName}
                inputRef={fullNameRef}
                size="small"
                margin="dense"
              />
            ) : (
              <Typography variant="body1">{userData.fullName}</Typography>
            )}
          </li>
          <li>
            <Typography variant="body2">
              Username: {userData.username}
            </Typography>
          </li>
          <li>
            {isEditing ? (
              <TextField
                id="outlined-school"
                variant="outlined"
                label="School"
                defaultValue={userData.userSchool}
                inputRef={schoolRef}
                size="small"
                margin="dense"
              />
            ) : (
              <>
                <Typography variant="body2">
                  School: {userData.userSchool}
                </Typography>
              </>
            )}
          </li>
          <li>
            {isEditing ? (
              <TextField
                id="outlined-title"
                variant="outlined"
                label="Contact"
                defaultValue={userData.contact}
                inputRef={contactRef}
                size="small"
                margin="dense"
              />
            ) : (
              <>
                <Typography variant="body2">
                  Contact: {userData.contact}
                </Typography>
              </>
            )}
          </li>
          {isEditing && (
            <li>
              <Typography variant="body2">Upload image</Typography>
              <input type="file" onChange={uploadImage} />
            </li>
          )}
        </ul>
      </div>
      <div className="bottomContainer">
        <div className="eventsContainer">
          <Typography variant="h6" className="listHeader">
            {' '}
            {user === userID ? 'My Events' : 'Hosted events'}{' '}
          </Typography>
          <EventsList events={userData.hostedEvents} user={user} />
        </div>
        <div className="eventsContainer">
          <Typography variant="h6" className="listHeader">
            {' '}
            Attending Events:{' '}
          </Typography>
          <EventsList
            events={userData.userEvents.filter((e) => e.host !== userID)}
            user={user}
          />
        </div>
        <FollowingList followingList={following} />
      </div>
    </div>
  );
};

const FollowingList = ({ followingList }) => {
  const history = useHistory();
  return (
    <div className="following">
      <Typography variant="h6" className="listHeader">
        Following:{' '}
      </Typography>
      {followingList.map(({ username, userSchool, profileImage }) => (
        <StudentItem
          username={username}
          userSchool={userSchool}
          profileImage={profileImage}
        />
      ))}
    </div>
  );
};

export default StudentDashboard;
