import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import LogoutButton from './subcomponents/LogoutButton'

const Header = () => (
  <HeaderWrapper>
    <Typography variant="h1" gutterBottom>
      My todos
    </Typography>
    I heard a puppy is fed every time someone makes a todo app.
    <LogoutButton />
  </HeaderWrapper>
)

const HeaderWrapper = styled.header`
  padding: 1rem 0.5rem 2rem;
  background-color: ${props => props.theme['color-primary']};
`

export default Header
