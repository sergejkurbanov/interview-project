import React, { useEffect } from 'react'
import { getTodos } from 'redux/modules/todos/actions'
import { useDispatch } from 'react-redux'
import Header from 'components/Header/index'

const TodosPage = () => {
  // const isLoading = useSelector(state => state.todos.isLoading)
  // const user = useSelector(state => state.auth.current)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  return (
    <>
      <Header />
      <button type="button" onClick={() => dispatch(getTodos())}>
        click me
      </button>
      homwpage
    </>
  )
}

export default TodosPage
