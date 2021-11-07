import { connect } from 'react-redux';
import {
  addFollowing,
  removeFollowing,
  getUserEvents,
  getHostedEvents,
  getUserData,
  getManyUserData,
  editProfileInfo,
} from '../../actions/usersActions';
import StudentDashboard from './StudentDashboard';

const mapStateToProps = (state, ownProps) => {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    editable: isLoggedIn && user === ownProps.userID,
    user,
  };
};

export default connect(mapStateToProps, {
  addFollowing,
  removeFollowing,
  getUserEvents,
  getHostedEvents,
  getUserData,
  getManyUserData,
  editProfileInfo,
})(StudentDashboard);
