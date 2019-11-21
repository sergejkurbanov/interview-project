import * as types from './types'

export const signupUser = ({ email, password }) => ({
  type: types.SIGNUP_USER,
  payload: { email, password },
})

export const loginUser = ({ email, password }) => ({
  type: types.LOGIN_USER,
  payload: { email, password },
})

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
})
