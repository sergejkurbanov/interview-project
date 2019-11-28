import * as types from './types'

export const createTrip = payload => ({
  type: types.CREATE_TRIP,
  payload,
})

export const createUserTrip = payload => ({
  type: types.CREATE_USER_TRIP,
  payload,
})

export const updateTrip = payload => ({
  type: types.UPDATE_TRIP,
  payload,
})

export const updateUserTrip = payload => ({
  type: types.UPDATE_USER_TRIP,
  payload,
})

export const deleteTrip = payload => ({
  type: types.DELETE_TRIP,
  payload,
})

export const deleteUserTrip = payload => ({
  type: types.DELETE_USER_TRIP,
  payload,
})
