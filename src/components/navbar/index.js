import { connect } from 'react-redux';
import { login, logout } from '../../actions/authActions';
import Navbar from './Navbar';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login, logout })(Navbar);
