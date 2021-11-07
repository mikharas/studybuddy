import React from 'react';
import '../styles/studentDashboard.css';
import Event from '../../components/EventItem';

// eslint-disable-next-line react/prefer-stateless-function
class EventsList extends React.Component {
  render() {
    const { events } = this.props;
    return (
      <div className="userEventList">
        {events.map(({ id, title, attendees, date, description, maxSpots }) => (
          <Event
            id={id}
            title={title}
            attendees={attendees.length}
            date={date}
            description={description}
            freespots={maxSpots - attendees.length}
          />
        ))}
      </div>
    );
  }
}

export default EventsList;
