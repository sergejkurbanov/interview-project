import { all, fork } from 'redux-saga/effects'
import tripSagas from './trips/watchers'
import authSagas from './auth/watchers'

export default function* rootSaga() {
  yield all([...tripSagas, ...authSagas].map(fork))
}
