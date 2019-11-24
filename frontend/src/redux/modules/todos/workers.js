import { put, call } from 'redux-saga/effects'
import axios from 'helpers/axios'
import * as types from './types'

export function* deleteTodo() {
  try {
    yield call(() => {})
    yield put({ type: types.DELETE_TODO_SUCCESS })
  } catch (error) {
    yield put({ type: types.DELETE_TODO_ERROR, payload: { error } })
  }
}

export function* toggleTodo() {
  try {
    yield call(() => {})
    yield put({ type: types.COMPLETE_TODO_SUCCESS })
  } catch (error) {
    yield put({ type: types.COMPLETE_TODO_ERROR, payload: { error } })
  }
}

export function* createTodo() {
  try {
    yield call(() => {})
    yield put({ type: types.CREATE_TODO_SUCCESS })
  } catch (error) {
    yield put({ type: types.CREATE_TODO_ERROR, payload: { error } })
  }
}

export function* getTodos() {
  try {
    yield call(axios.get, '/users/me')
    yield put({ type: types.GET_TODOS_SUCCESS, payload: { data: 'hi' } })
  } catch (error) {
    yield put({ type: types.GET_TODOS_ERROR, payload: { error } })
  }
}
