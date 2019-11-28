import * as types from './types'

export const getUsers = () => ({ type: types.GET_USERS })

export const createUser = payload => ({
  type: types.CREATE_USER,
  payload,
})

export const updateUser = payload => ({
  type: types.UPDATE_USER,
  payload,
})

export const deleteUser = payload => ({
  type: types.DELETE_USER,
  payload,
})
