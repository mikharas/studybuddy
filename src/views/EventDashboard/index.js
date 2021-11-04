import { connect } from 'react-redux';
import {
  getEvent,
  addAttendee,
  removeAttendee,
} from '../../actions/eventsActions';
import EventDashboard from './EventDashboard';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getEvent,
  addAttendee,
  removeAttendee,
})(EventDashboard);
