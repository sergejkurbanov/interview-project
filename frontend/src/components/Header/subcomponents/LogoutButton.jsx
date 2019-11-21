import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'redux/modules/auth/actions'

const LogoutButton = () => {
  const dispatch = useDispatch()

  return (
    <LogoutButtonWrapper onClick={() => dispatch(logoutUser())}>
      Logout
    </LogoutButtonWrapper>
  )
}

const LogoutButtonWrapper = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  text-decoration: underline;

  svg {
    margin-left: 0.3rem;
  }

  &:hover {
    color: ${props => props.theme['color-gray--dark']};
  }
`

export default LogoutButton
