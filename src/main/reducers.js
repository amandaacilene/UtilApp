import { combineReducers } from 'redux'
import UtilReducer from '../util/utilReducer'
import utilReducer from '../util/utilReducer';

const rootReducer = combineReducers({
  util: utilReducer
})

export default rootReducer