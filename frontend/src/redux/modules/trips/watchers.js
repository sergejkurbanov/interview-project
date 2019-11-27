import { takeEvery } from 'redux-saga/effects'
import * as types from './types'
import * as workers from './workers'

function* watchCreateTrip() {
  yield takeEvery(types.CREATE_TRIP, workers.createTrip)
}

function* watchUpdateTrip() {
  yield takeEvery(types.UPDATE_TRIP, workers.updateTrip)
}

function* watchDeleteTrip() {
  yield takeEvery(types.DELETE_TRIP, workers.deleteTrip)
}

const tripSagas = [watchDeleteTrip, watchUpdateTrip, watchCreateTrip]

export default tripSagas
