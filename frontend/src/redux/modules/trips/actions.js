import * as types from './types'

export const createTrip = payload => ({
  type: types.CREATE_TRIP,
  payload,
})

export const updateTrip = payload => ({
  type: types.UPDATE_TRIP,
  payload,
})

export const deleteTrip = payload => ({
  type: types.DELETE_TRIP,
  payload,
})
