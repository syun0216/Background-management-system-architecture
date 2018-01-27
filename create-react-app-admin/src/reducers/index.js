import {combineReducers} from 'redux'
import {auth} from './userReducer'
import {sidebar} from './appReducer'
const rootReducer = combineReducers({
  auth,
  sidebar
});

export default rootReducer;
