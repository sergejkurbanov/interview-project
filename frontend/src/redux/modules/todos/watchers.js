import { takeEvery, put, take } from 'redux-saga/effects'
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

function* watchTodoUpdates() {
  const action = yield take(types.GET_TODOS)
  const getTodosChannel = workers.createGetTodosChannel(action.payload.user)

  while (true) {
    try {
      const newTodos = yield take(getTodosChannel)
      yield put({ type: types.GET_TODOS_SUCCESS, payload: { data: newTodos } })
    } catch (error) {
      yield put({ type: types.GET_TODOS_ERROR, payload: { error } })
    }
  }
}

const todoSagas = [
  watchDeleteTodo,
  watchToggleTodo,
  watchCreateTodo,
  watchTodoUpdates,
]

export default todoSagas
