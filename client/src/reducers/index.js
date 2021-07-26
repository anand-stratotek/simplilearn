import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  authReducer,
  alertReducer,
  courseReducer,
});
