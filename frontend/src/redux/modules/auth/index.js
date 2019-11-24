import { toast } from 'react-toastify'
import * as types from './types'

const defaultState = {
  current: null,
  isSignupLoading: false,
  isLoginLoading: false,
}

const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    // Sign up actions
    case types.SIGNUP_USER:
      return { ...state, isSignupLoading: true }

    case types.SIGNUP_USER_SUCCESS: {
      toast.success('User successfully signed up. Proceed to log in.')
      return { ...state, isSignupLoading: false }
    }

    case types.SIGNUP_USER_ERROR: {
      const { error } = payload
      const message = error.response && error.response.data.message

      toast.error(message || 'Error signing up. Please try again later.')
      return { ...state, isSignupLoading: false }
    }

    // Login actions
    case types.LOGIN_USER:
      return { ...state, isLoginLoading: true }

    case types.LOGIN_USER_SUCCESS: {
      return { ...state, current: payload.user, isLoginLoading: false }
    }

    case types.LOGIN_USER_ERROR: {
      const { error } = payload
      const message = error.response && error.response.data.message

      toast.error(message || 'Error signing in. Please try again later.')
      return { ...state, isLoginLoading: false }
    }

    // Logout actions
    case types.LOGOUT_USER:
      return { ...state, current: null }

    default:
      return state
  }
}

export default authReducer
