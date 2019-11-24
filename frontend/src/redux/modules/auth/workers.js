import axios from 'helpers/axios'
import { put, call } from 'redux-saga/effects'
import * as types from './types'

export function* signupUser({ payload }) {
  try {
    // Call the api, redirect user to login
    yield call(axios.post, '/users/sign-up', payload)
    payload.history.push('/log-in')
    yield put({ type: types.SIGNUP_USER_SUCCESS })
  } catch (error) {
    yield put({ type: types.SIGNUP_USER_ERROR, payload: { error } })
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
    yield put({ type: types.LOGIN_USER_ERROR, payload: { error } })
  }
}

export function* logoutUser({ payload }) {
  try {
    // Call the api if needed
    if (!payload.skipApi) yield call(axios.post, '/users/log-out', payload)
    yield put({ type: types.LOGOUT_USER_SUCCESS })
  } catch (error) {
    yield put({ type: types.LOGOUT_USER_ERROR, payload: { error } })
  }
}
