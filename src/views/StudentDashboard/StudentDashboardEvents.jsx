import React from 'react';
import '../styles/studentDashboard.css';
import Event from '../../components/EventItem';

// eslint-disable-next-line react/prefer-stateless-function
class EventsList extends React.Component {
  render() {
    const { events, user } = this.props;
    return (
      <div className="userEventList">
        {events.map((event) => (
          <Event
            {...event}
            isHost={user === event.host}
            isAttending={event.attendees.includes(user)}
          />
        ))}
      </div>
    );
  }
}

export default EventsList;
