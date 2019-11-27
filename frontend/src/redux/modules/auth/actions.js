import * as types from './types'

export const signupUser = ({ name, email, password, history }) => ({
  type: types.SIGNUP_USER,
  payload: { name, email, password, history },
})

export const loginUser = ({ email, password }) => ({
  type: types.LOGIN_USER,
  payload: { email, password },
})

export const logoutUser = (payload = {}) => ({
  type: types.LOGOUT_USER,
  payload: { skipApi: payload.skipApi },
})

export const getSelf = () => ({ type: types.GET_SELF })
