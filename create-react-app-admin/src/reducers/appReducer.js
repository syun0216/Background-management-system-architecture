import {SET_MENU_DATA} from '../actions/appAction'

const initialState = {
  sidebartData: []
}

export function sidebar(state=initialState,action) {
  switch(action.type) {
    case SET_MENU_DATA:
    return {
      ...state,
      sidebartData: state.sidebartData.concat(action.data)
    };
    default:return state
  }
}
