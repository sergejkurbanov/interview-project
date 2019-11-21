import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { createTodo } from 'redux/modules/todos/actions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const TodoForm = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    const sanitizedValue = value.trim()
    if (!sanitizedValue) return

    dispatch(createTodo(sanitizedValue))
    setValue('')
  }

  return (
    <TodoFormWrapper onSubmit={handleSubmit}>
      <TextField
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter a new todo..."
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        <Typography>Add todo</Typography>
      </Button>
    </TodoFormWrapper>
  )
}

const TodoFormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.8rem;
  margin-bottom: 1rem;
`

export default TodoForm
