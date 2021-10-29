import { combineReducers } from 'redux';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
});
