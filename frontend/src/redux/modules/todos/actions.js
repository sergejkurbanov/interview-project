import * as types from './types'

export const createTodo = text => ({
  type: types.CREATE_TODO,
  payload: { text },
})

export const toggleTodo = id => ({
  type: types.COMPLETE_TODO,
  payload: { id },
})

export const deleteTodo = id => ({ type: types.DELETE_TODO, payload: { id } })

export const getTodos = user => ({ type: types.GET_TODOS, payload: { user } })
