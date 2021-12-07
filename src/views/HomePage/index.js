import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { getEvents } from '../../actions/eventsActions';
import HomePage from './HomePage';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  events: state.events.events,
});

export default connect(mapStateToProps, {
  logout,
  getEvents,
})(HomePage);
