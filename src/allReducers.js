import { combineReducers } from 'redux';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';
import eventsReducer from './reducers/eventsReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  events: eventsReducer,
});
