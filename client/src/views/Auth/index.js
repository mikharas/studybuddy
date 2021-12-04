import { connect } from 'react-redux';
import { login, register } from '../../actions/authActions';

import Auth from './Auth';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = {
  login,
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
