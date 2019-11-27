import axios from 'helpers/axios'
import { toast } from 'react-toastify'
import { put, call } from 'redux-saga/effects'
import * as types from './types'

export function* createTrip({ payload }) {
  try {
    // Post the trip, send the updated user to the store
    const response = yield call(axios.post, '/trips', payload)

    // Show a status message
    toast.success('Trip successfully created.')
    payload.callback()

    // Dispatch a success action
    yield put({
      type: types.CREATE_TRIP_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    // Handle and display the error message
    const message = error.response && error.response.data.message
    toast.error(message || 'Error creating the trip. Please try again later.')

    // Dispatch an error action
    yield put({ type: types.CREATE_TRIP_ERROR })
  }
}

export function* updateTrip({ payload }) {
  try {
    const response = yield call(axios.put, `/trips/${payload.id}`, payload)

    toast.success('Trip successfully updated.')
    payload.callback()

    yield put({
      type: types.UPDATE_TRIP_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error updating the trip. Please try again later.')

    yield put({ type: types.UPDATE_TRIP_ERROR })
  }
}

export function* deleteTrip({ payload }) {
  try {
    const response = yield call(axios.delete, `/trips/${payload.id}`)

    toast.success('Trip successfully deleted.')

    yield put({
      type: types.DELETE_TRIP_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error updating the trip. Please try again later.')

    yield put({ type: types.DELETE_TRIP_ERROR })
  }
}
