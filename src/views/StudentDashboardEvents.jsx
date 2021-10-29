import React from 'react';
import './styles/studentDashboard.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line react/prefer-stateless-function
class EventsList extends React.Component {
  render() {
    const { events, removeEvent } = this.props;
    return (
      <div className="eventsContainer">
        <h3 className="listHeader"> Attending Events: </h3>
        <div className="userEventList">
          {events.map((userEvent) => (
            <div className="userEvent">
              <div className="eventThumbnailContainer">
                <img
                  src={userEvent.banner}
                  className="eventThumbnail"
                  alt="Robarts Library"
                />
              </div>
              <div className="eventContent">
                <h4 className="grey eventDate">{userEvent.date}</h4>
                <h4 className="eventText">{userEvent.title}</h4>
                <h5 className="grey eventText">{userEvent.location}</h5>
                <h5 className="grey eventAttendees">
                  {userEvent.attendees} attendees
                </h5>
              </div>
              {/* <div className="removeButton">
                                <Button style={{maxWidth: '15px', maxHeight: '20px', fontSize: '11px'}} 
                                variant="contained" 
                                onClick={ () => removeEvent(userEvent)}
                                > Remove </Button>
                            </div> */}
              <div className="removeButton">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeEvent(userEvent)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EventsList;
