import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventsActions';
import EventCreation from './EventCreation';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  events: state.events,
});

export default connect(mapStateToProps, {
  createEvent,
})(EventCreation);
