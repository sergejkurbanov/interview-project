import * as types from './types'
import * as tripTypes from '../trips/types'

const defaultState = {
  all: [],
  isLoading: false,
}

const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    // Get users actions
    case types.GET_USERS:
      return { ...state, isLoading: true }

    case types.GET_USERS_SUCCESS:
      return { ...state, all: payload.users, isLoading: false }

    case types.GET_USERS_ERROR:
      return { ...state, isLoading: false }

    // Create user actions
    case types.CREATE_USER:
      return { ...state, isLoading: true }

    case types.CREATE_USER_SUCCESS:
      return { ...state, all: [...state.all, payload.user], isLoading: false }

    case types.CREATE_USER_ERROR:
      return { ...state, isLoading: false }

    case tripTypes.CREATE_USER_TRIP_SUCCESS:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id === payload.user.id) return payload.user

          return user
        }),
        isLoading: false,
      }

    // Update user actions
    case types.UPDATE_USER:
      return { ...state, isLoading: true }

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id === payload.user.id) return payload.user

          return user
        }),
        isLoading: false,
      }

    case types.UPDATE_USER_ERROR:
      return { ...state, isLoading: false }

    case tripTypes.UPDATE_USER_TRIP_SUCCESS:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id === payload.user.id) return payload.user

          return user
        }),
        isLoading: false,
      }

    // Delete user actions
    case types.DELETE_USER:
      return { ...state, isLoading: true }

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        all: state.all.filter(user => user.id !== payload.id),
        isLoading: false,
      }

    case tripTypes.DELETE_USER_TRIP_SUCCESS:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id === payload.user.id) return payload.user

          return user
        }),
        isLoading: false,
      }

    case types.DELETE_USER_ERROR:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default authReducer
