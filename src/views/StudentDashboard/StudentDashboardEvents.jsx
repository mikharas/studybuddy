import React from 'react';
import '../styles/studentDashboard.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Event from '../../components/EventItem';

// eslint-disable-next-line react/prefer-stateless-function
class EventsList extends React.Component {
  render() {
    const { events, user } = this.props;
    return (
      <div className="eventsContainer">
        <h3 className="listHeader"> Attending Events: </h3>
        <div className="userEventList">
          {events.map((event) => (
            <Event
              {...event}
              isHost={user === event.host}
              isAttending={event.attendees.includes(user)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default EventsList;
