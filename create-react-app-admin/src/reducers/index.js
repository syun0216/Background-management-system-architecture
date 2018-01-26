import {combineReducers} from 'redux'
import {auth} from './userReducer'

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
