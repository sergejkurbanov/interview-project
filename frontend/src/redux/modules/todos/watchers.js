import { takeEvery } from 'redux-saga/effects'
import * as types from './types'
import * as workers from './workers'

function* watchDeleteTodo() {
  yield takeEvery(types.DELETE_TODO, workers.deleteTodo)
}

function* watchToggleTodo() {
  yield takeEvery(types.COMPLETE_TODO, workers.toggleTodo)
}

function* watchCreateTodo() {
  yield takeEvery(types.CREATE_TODO, workers.createTodo)
}

function* watchGetTodos() {
  yield takeEvery(types.GET_TODOS, workers.getTodos)
}

const todoSagas = [
  watchDeleteTodo,
  watchToggleTodo,
  watchCreateTodo,
  watchGetTodos,
]

export default todoSagas
