import { put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import todosApi from 'api/todos'
import * as types from './types'

export function* deleteTodo({ payload }) {
  try {
    yield call(() => todosApi.deleteTodo(payload.id))
    yield put({ type: types.DELETE_TODO_SUCCESS })
  } catch (error) {
    yield put({ type: types.DELETE_TODO_ERROR, payload: { error } })
  }
}

export function* toggleTodo({ payload }) {
  try {
    yield call(() => todosApi.toggleTodo(payload.id))
    yield put({ type: types.COMPLETE_TODO_SUCCESS })
  } catch (error) {
    yield put({ type: types.COMPLETE_TODO_ERROR, payload: { error } })
  }
}

export function* createTodo({ payload }) {
  try {
    yield call(() => todosApi.createTodo(payload.text))
    yield put({ type: types.CREATE_TODO_SUCCESS })
  } catch (error) {
    yield put({ type: types.CREATE_TODO_ERROR, payload: { error } })
  }
}

export const createGetTodosChannel = user =>
  eventChannel(emit => {
    const unsubscribe = todosApi.createGetTodosSocket(user, emit)

    return unsubscribe
  })
