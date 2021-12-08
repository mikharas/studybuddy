import { connect } from 'react-redux';
import {
  getEvent,
  editEvent,
  addAttendee,
  removeAttendee,
  addQuestion,
  editQuestion,
  deleteQuestion,
} from '../../actions/eventsActions';
import { getManyUserData } from '../../actions/usersActions';
import EventDashboard from './EventDashboard';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getEvent,
  editEvent,
  getManyUserData,
  addAttendee,
  removeAttendee,
  addQuestion,
  editQuestion,
  deleteQuestion,
})(EventDashboard);
