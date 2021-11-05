import React from 'react';
import '../styles/studentDashboard.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Event from '../../components/EventItem';

// eslint-disable-next-line react/prefer-stateless-function
class EventsList extends React.Component {
  render() {
    const { events, removeAttendee, editable } = this.props;
    return (
      <div className="eventsContainer">
        <h3 className="listHeader"> Attending Events: </h3>
        <div className="userEventList">
          {events.map(
            ({ id, title, attendees, date, description, maxSpots }) => (
              <Event
                id={id}
                title={title}
                attendees={attendees.length}
                date={date}
                description={description}
                freespots={maxSpots - attendees.length}
              />
            ),
          )}
        </div>
      </div>
    );
  }
}

export default EventsList;
