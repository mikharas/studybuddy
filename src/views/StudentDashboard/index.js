import { connect } from 'react-redux';
import { getUserEvents, getUserData } from '../../actions/usersActions';
import { removeAttendee } from '../../actions/eventsActions';
import StudentDashboard from './StudentDashboard';

const mapStateToProps = (state, ownProps) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
    editable: isLoggedIn && state.auth.user.username === ownProps.userID,
  };
};

export default connect(mapStateToProps, {
  getUserEvents,
  getUserData,
  removeAttendee,
})(StudentDashboard);
