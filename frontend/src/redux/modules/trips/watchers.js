import { takeEvery } from 'redux-saga/effects'
import * as types from './types'
import * as workers from './workers'

function* watchCreateTrip() {
  yield takeEvery(types.CREATE_TRIP, workers.createTrip)
}

function* watchCreateUserTrip() {
  yield takeEvery(types.CREATE_USER_TRIP, workers.createUserTrip)
}

function* watchUpdateTrip() {
  yield takeEvery(types.UPDATE_TRIP, workers.updateTrip)
}

function* watchUpdateUserTrip() {
  yield takeEvery(types.UPDATE_USER_TRIP, workers.updateUserTrip)
}

function* watchDeleteTrip() {
  yield takeEvery(types.DELETE_TRIP, workers.deleteTrip)
}

function* watchDeleteUserTrip() {
  yield takeEvery(types.DELETE_USER_TRIP, workers.deleteUserTrip)
}

const tripSagas = [
  watchCreateTrip,
  watchCreateUserTrip,
  watchUpdateTrip,
  watchUpdateUserTrip,
  watchDeleteTrip,
  watchDeleteUserTrip,
]

export default tripSagas
