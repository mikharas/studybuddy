import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { addAttendee, removeAttendee } from '../../actions/eventsActions';
import HomePage from './HomePage';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  events: state.events,
});

export default connect(mapStateToProps, {
  logout,
  addAttendee,
  removeAttendee,
})(HomePage);
