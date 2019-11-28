import axios from 'helpers/axios'
import { toast } from 'react-toastify'
import { put, call } from 'redux-saga/effects'
import * as types from './types'

export function* getUsers() {
  try {
    const response = yield call(axios.get, '/users')

    yield put({
      type: types.GET_USERS_SUCCESS,
      payload: { users: response.data.users },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error fetching the users. Please try again later.')

    yield put({ type: types.GET_USERS_ERROR })
  }
}

export function* createUser({ payload }) {
  try {
    // Post the user, send the updated user to the store
    const response = yield call(axios.post, '/users', payload)

    // Show a status message
    toast.success('User successfully created.')
    payload.callback()

    // Dispatch a success action
    yield put({
      type: types.CREATE_USER_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    // Handle and display the error message
    const message = error.response && error.response.data.message
    toast.error(message || 'Error creating the user. Please try again later.')

    // Dispatch an error action
    yield put({ type: types.CREATE_USER_ERROR })
  }
}

export function* updateUser({ payload }) {
  try {
    const response = yield call(axios.put, `/users/${payload.id}`, payload)

    toast.success('User successfully updated.')
    payload.callback()

    yield put({
      type: types.UPDATE_USER_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error updating the user. Please try again later.')

    yield put({ type: types.UPDATE_USER_ERROR })
  }
}

export function* deleteUser({ payload }) {
  try {
    yield call(axios.delete, `/users/${payload.id}`)

    toast.success('User successfully deleted.')

    yield put({
      type: types.DELETE_USER_SUCCESS,
      payload: { id: payload.id },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error updating the user. Please try again later.')

    yield put({ type: types.DELETE_USER_ERROR })
  }
}
