import { takeLeading, takeEvery } from 'redux-saga/effects'
import * as types from './types'
import * as workers from './workers'

function* watchGetUsers() {
  yield takeLeading(types.GET_USERS, workers.getUsers)
}

function* watchCreateUser() {
  yield takeEvery(types.CREATE_USER, workers.createUser)
}

function* watchUpdateUser() {
  yield takeEvery(types.UPDATE_USER, workers.updateUser)
}

function* watchDeleteUser() {
  yield takeEvery(types.DELETE_USER, workers.deleteUser)
}

const authSagas = [
  watchGetUsers,
  watchCreateUser,
  watchUpdateUser,
  watchDeleteUser,
]

export default authSagas
