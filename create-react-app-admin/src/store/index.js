import {createStore} from 'redux'
// reducers
import rootReducer from '../reducers'

const store = createStore(rootReducer)

export default store
