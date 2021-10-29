import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import HomePage from './HomePage';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(HomePage);
