import { toast } from 'react-toastify'
import * as types from './types'

const defaultState = {
  all: [],
  isLoading: false,
}

const todosReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.GET_TODOS:
      return { ...state, isLoading: true }

    case types.GET_TODOS_SUCCESS:
      return { ...state, all: payload.data, isLoading: false }

    case types.GET_TODOS_ERROR: {
      const { error } = payload
      const message = error.response && error.response.data.message

      toast.error(message || 'Error loading todos. Please try again later.')
      return { ...state, all: payload.data, isLoading: false }
    }

    default:
      return state
  }
}

export default todosReducer
