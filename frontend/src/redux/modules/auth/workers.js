import axios from 'helpers/axios'
import { toast } from 'react-toastify'
import { put, call } from 'redux-saga/effects'
import * as types from './types'

export function* signupUser({ payload }) {
  try {
    // Call the api, redirect user to login
    yield call(axios.post, '/users/sign-up', payload)

    payload.history.push('/log-in')
    toast.success('User successfully signed up. Proceed to log in.')

    yield put({ type: types.SIGNUP_USER_SUCCESS })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error signing up. Please try again later.')

    yield put({ type: types.SIGNUP_USER_ERROR })
  }
}

export function* loginUser({ payload }) {
  try {
    // Call the api, send the response to the store
    const response = yield call(axios.post, '/users/log-in', payload)

    yield put({
      type: types.LOGIN_USER_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error signing in. Please try again later.')

    yield put({ type: types.LOGIN_USER_ERROR })
  }
}

export function* logoutUser({ payload }) {
  try {
    // Call the api if needed
    if (!payload.skipApi) yield call(axios.post, '/users/log-out', payload)
    yield put({ type: types.LOGOUT_USER_SUCCESS })
  } catch (error) {
    yield put({ type: types.LOGOUT_USER_ERROR })
  }
}

export function* getSelf() {
  try {
    const response = yield call(axios.get, '/users/me')

    yield put({
      type: types.GET_SELF_SUCCESS,
      payload: { user: response.data.user },
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    toast.error(message || 'Error refreshing the user. Please try again later.')

    yield put({ type: types.GET_SELF_ERROR })
  }
}
