import { connect } from 'react-redux';
import { getUserEvents, getUserData } from '../../actions/usersActions';
import { removeAttendee } from '../../actions/eventsActions';
import StudentDashboard from './StudentDashboard';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getUserEvents,
  getUserData,
  removeAttendee,
})(StudentDashboard);
