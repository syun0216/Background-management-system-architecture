import {
  USER_LOGIN,
  USER_LOGOUT
} from '../actions/userAction'
//cookie util
import {setToken,removeToken} from '../utils/auth'

const initialState = {
  user_token: null
}

export function auth(state = initialState,action) {
  switch (action.type) {
    case USER_LOGIN:
      setToken(action.user)
      return {
        ...state,
        user_token: action.user
      };
    case USER_LOGOUT:
      removeToken()
      return {
        ...state,
        user_token: null
      }
    default:
      return state
  }
}
