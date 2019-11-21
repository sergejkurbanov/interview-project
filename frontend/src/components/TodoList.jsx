import React from 'react'
import Todo from 'components/Todo'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, toggleTodo } from 'redux/modules/todos/actions'

const TodoList = () => {
  const todos = useSelector(state => state.todos.all)
  const dispatch = useDispatch()

  return (
    <>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          remove={() => dispatch(deleteTodo(todo))}
          complete={() => dispatch(toggleTodo(todo.id))}
          isCompleted={todo.isCompleted}
        >
          {todo.text}
        </Todo>
      ))}
    </>
  )
}

export default TodoList
