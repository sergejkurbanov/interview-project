import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { logoutUser } from 'redux/modules/auth/actions'
import Button from '@material-ui/core/Button'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <HeaderWrapper>
      <Typography variant="h1" gutterBottom>
        Travel maker
      </Typography>

      <Typography variant="h3" gutterBottom>
        It is said a puppy is fed every time someone plans a trip.
      </Typography>

      <LogoutButtonWrapper
        size="small"
        color="primary"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </LogoutButtonWrapper>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  padding: 1rem 0.5rem 2rem;
  background-color: ${props => props.theme['color-primary']};
`

const LogoutButtonWrapper = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

export default Header
