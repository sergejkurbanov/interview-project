import { all, fork } from 'redux-saga/effects'
import todoSagas from './todos/watchers'
import authSagas from './auth/watchers'

export default function* rootSaga() {
  yield all([...todoSagas, ...authSagas].map(fork))
}
