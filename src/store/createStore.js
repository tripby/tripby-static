import { createStore as reduxCreateStore, combineReducers } from 'redux'
import auth from '../components/Auth0/reducer'

const rootReducer = combineReducers({
  auth,
})

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    /* eslint-disable no-underscore-dangle */
    typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    /* eslint-enable no-underscore-dangle */
  )

export default createStore
