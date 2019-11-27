import * as types from './types'
import * as tripTypes from '../trips/types'

const defaultState = {
  current: null,
  isLoading: false,
  isSignupLoading: false,
  isLoginLoading: false,
}

const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    // Sign up actions
    case types.SIGNUP_USER:
      return { ...state, isSignupLoading: true }

    case types.SIGNUP_USER_SUCCESS:
      return { ...state, isSignupLoading: false }

    case types.SIGNUP_USER_ERROR:
      return { ...state, isSignupLoading: false }

    // Login actions
    case types.LOGIN_USER:
      return { ...state, isLoginLoading: true }

    case types.LOGIN_USER_SUCCESS:
      return { ...state, current: payload.user, isLoginLoading: false }

    case types.LOGIN_USER_ERROR:
      return { ...state, isLoginLoading: false }

    // Get self actions
    case types.GET_SELF:
      return { ...state, isLoading: true }

    case types.GET_SELF_SUCCESS:
      return { ...state, current: payload.user, isLoading: false }

    case types.GET_SELF_ERROR:
      return { ...state, isLoading: false }

    // Logout actions
    case types.LOGOUT_USER:
      return { ...state, current: null }

    // Trip actions
    case tripTypes.CREATE_TRIP_SUCCESS:
      return { ...state, current: payload.user }

    case tripTypes.UPDATE_TRIP_SUCCESS:
      return { ...state, current: payload.user }

    case tripTypes.DELETE_TRIP_SUCCESS:
      return { ...state, current: payload.user }

    default:
      return state
  }
}

export default authReducer
