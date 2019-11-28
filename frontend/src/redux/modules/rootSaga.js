import { all, fork } from 'redux-saga/effects'
import authSagas from './auth/watchers'
import tripSagas from './trips/watchers'
import userSagas from './users/watchers'

export default function* rootSaga() {
  yield all([...tripSagas, ...authSagas, ...userSagas].map(fork))
}
