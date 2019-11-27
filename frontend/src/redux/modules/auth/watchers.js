import { takeLeading } from 'redux-saga/effects'
import * as types from './types'
import * as workers from './workers'

function* watchSignupUser() {
  yield takeLeading(types.SIGNUP_USER, workers.signupUser)
}

function* watchLoginUser() {
  yield takeLeading(types.LOGIN_USER, workers.loginUser)
}

function* watchLogoutUser() {
  yield takeLeading(types.LOGOUT_USER, workers.logoutUser)
}

function* watchGetSelf() {
  yield takeLeading(types.GET_SELF, workers.getSelf)
}

const authSagas = [
  watchSignupUser,
  watchLoginUser,
  watchLogoutUser,
  watchGetSelf,
]

export default authSagas
