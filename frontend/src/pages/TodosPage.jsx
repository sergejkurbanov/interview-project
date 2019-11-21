import React, { useEffect } from 'react'
import { getTodos } from 'redux/modules/todos/actions'
import { useDispatch, useSelector } from 'react-redux'
import Header from 'components/Header/index'
import TodoList from 'components/TodoList'
import Loading from 'components/Loading'
import TodoForm from 'forms/TodoForm'

const TodosPage = () => {
  const isLoading = useSelector(state => state.todos.isLoading)
  const user = useSelector(state => state.auth.current)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodos(user))
  }, [dispatch, user])

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />
      <TodoForm />
      <TodoList />
    </>
  )
}

export default TodosPage
