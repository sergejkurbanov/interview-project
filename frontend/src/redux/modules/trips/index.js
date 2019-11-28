import * as types from './types'

const defaultState = {
  isLoading: false,
}

const tripsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    // Create trip actions
    case types.CREATE_TRIP:
      return { ...state, isLoading: true }

    case types.CREATE_TRIP_SUCCESS:
      return { ...state, isLoading: false }

    case types.CREATE_TRIP_ERROR:
      return { ...state, isLoading: false }

    // Create user trip actions
    case types.CREATE_USER_TRIP:
      return { ...state, isLoading: true }

    case types.CREATE_USER_TRIP_SUCCESS:
      return { ...state, isLoading: false }

    case types.CREATE_USER_TRIP_ERROR:
      return { ...state, isLoading: false }

    // Update trip actions
    case types.UPDATE_TRIP:
      return { ...state, isLoading: true }

    case types.UPDATE_TRIP_SUCCESS:
      return { ...state, isLoading: false }

    case types.UPDATE_TRIP_ERROR:
      return { ...state, isLoading: false }

    // Update user trip actions
    case types.UPDATE_USER_TRIP:
      return { ...state, isLoading: true }

    case types.UPDATE_USER_TRIP_SUCCESS:
      return { ...state, isLoading: false }

    case types.UPDATE_USER_TRIP_ERROR:
      return { ...state, isLoading: false }

    // Delete trip actions
    case types.DELETE_TRIP:
      return { ...state, isLoading: true }

    case types.DELETE_TRIP_SUCCESS:
      return { ...state, isLoading: false }

    case types.DELETE_TRIP_ERROR:
      return { ...state, isLoading: false }

    // Delete trip actions
    case types.DELETE_USER_TRIP:
      return { ...state, isLoading: true }

    case types.DELETE_USER_TRIP_SUCCESS:
      return { ...state, isLoading: false }

    case types.DELETE_USER_TRIP_ERROR:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default tripsReducer
