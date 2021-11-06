import React from 'react';
import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import './styles/eventDashboard.css';
import banner from './uoft_banner.png';
import hostIcon from './uoft.png';

class EventDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAttending: false,
      currentUser: { name: 'Robert Jones' },
      users: [{ name: 'John Smith' }, { name: 'Jane Doe' }],
      maxSpots: 5,
    };
  }

  toggleAttending = () => {
    const { isAttending } = this.state;
    const { maxSpots } = this.state;
    const { users } = this.state;

    if (maxSpots - users.length === 0) {
      alert('No more space available!');
    } else {
      if (!isAttending) {
        this.addAttendee();
      } else {
        this.removeAttendee();
      }
      this.setState({
        isAttending: !isAttending,
      });
    }
  };

  addAttendee = () => {
    const { currentUser } = this.state;
    const { users } = this.state;

    const userList = users;

    userList.push(currentUser);

    this.setState({
      users: userList,
    });
  };

  removeAttendee = () => {
    const { currentUser } = this.state;
    const { users } = this.state;

    const newList = users.filter((u) => u.name !== currentUser.name);
    this.setState({
      users: newList,
    });
  };

  render() {
    const { isAttending } = this.state;
    const { users } = this.state;
    const { maxSpots } = this.state;
    return (
      <div>
        <div className="banner">
          <img src={banner} className="bannerImg" alt="banner" />
        </div>
        <div>
          <h1>CSC309 Study Session</h1>
        </div>
        <div className="attendee">
          <div className="avatarContainer">
            <Avatar alt="Alyssa Chan" src={hostIcon} />
          </div>
          <div className="attendeeName">Hosted by Alyssa Chan</div>
        </div>
        <div className="eventDescription">
          <Card>
            <CardContent>
              I have a room booked in Robarts on the 11th floor. I am working on
              Phase 1 of the group project for CSC309. Feel free to join me!
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardContent>
          </Card>
          {/* tags */}
        </div>
        <div className="eventContainer">
          <div className="buttonContainer">
            <div className="attendButton">
              <Button variant="contained" onClick={this.toggleAttending}>
                {isAttending ? 'Unattend' : 'Attend Publicly'}
              </Button>
            </div>
            <div className="attendButton">
              <Button variant="contained" onClick={this.toggleAttending}>
                {isAttending ? 'Unattend' : 'Attend Anonymously'}
              </Button>
            </div>
          </div>
          <div className="eventInformation">
            <ul>
              <li>
                <Card>
                  <CardContent>
                    <div className="cardHeader">{maxSpots - users.length}</div>
                    <div className="cardInformation">spots left</div>
                  </CardContent>
                </Card>
              </li>
              <li>
                <Card>
                  <CardContent>
                    <div className="cardHeader">Location</div>
                    <div className="cardInformation">Robarts Library</div>
                  </CardContent>
                </Card>
              </li>
              <li>
                <Card>
                  <CardContent>
                    <div className="cardHeader">Time and Date</div>
                    <div className="cardInformation">October 25, 6:30 PM</div>
                  </CardContent>
                </Card>
              </li>
            </ul>
          </div>
        </div>
        <div className="attendeesContainer">
          <Card>
            <CardContent>
              <div className="cardHeader">Attendees</div>
              <List>
                {users.map((user) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={hostIcon} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default EventDashboard;
