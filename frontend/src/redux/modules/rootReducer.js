import { combineReducers } from 'redux'
import auth from './auth'
import trips from './trips'
import users from './users'

export default combineReducers({ auth, trips, users })
