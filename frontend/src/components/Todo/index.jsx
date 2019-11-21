import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Todo = ({ children, complete, remove, isCompleted }) => (
  <TodoWrapper
    onClick={() => {
      // If the user selected some text, don't toggle the todo
      const selectedText = getSelection().toString()
      if (!selectedText) complete()
    }}
  >
    <Typography>
      {isCompleted && '✅'}
      {children}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={e => {
        e.stopPropagation()
        remove()
      }}
    >
      <Typography>Remove todo</Typography>
    </Button>
  </TodoWrapper>
)

Todo.propTypes = {
  complete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}

const TodoWrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  margin: 0.5rem 0;
  background-color: ${props => props.theme['color-gray--light']};
  border-radius: ${props => props.theme['border-radius']};
  box-shadow: ${props => props.theme['box-shadow']};
  padding-left: 0.5rem;
  cursor: pointer;

  &:hover {
    box-shadow: ${props => props.theme['box-shadow--hover']};
  }
`

export default Todo
