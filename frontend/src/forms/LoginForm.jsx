import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from 'redux/modules/auth/actions'
import Loading from 'components/Loading'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLoading = useSelector(state => state.auth.isLoginLoading)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  return (
    <LoginFormWrapper boxShadow={2} onSubmit={handleSubmit}>
      <Typography variant="h2" gutterBottom>
        Log In
      </Typography>

      <TextField
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        label="Email"
        fullWidth
        autoFocus
        margin="normal"
        variant="outlined"
      />

      <TextField
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        label="Password"
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <Typography>
        <Box component="span" mr={1}>
          Don&apos;t have an account?
        </Box>
        <Button color="primary" component={Link} to="/sign-up" size="small">
          Sign up!
        </Button>
      </Typography>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="form__button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading size={24} thickness={8} isLoading />
        ) : (
          <Typography>Log in</Typography>
        )}
      </Button>
    </LoginFormWrapper>
  )
}

const LoginFormWrapper = styled.form`
  margin-top: ${props => props.theme.spacing(8)}px;
  background-color: ${props => props.theme.palette.background.paper};
  padding: ${props => props.theme.spacing(4)}px;

  .form__link {
    color: ${props => props.theme.palette.primary.main};
    white-space: nowrap;
  }

  .form__button {
    margin-top: ${props => props.theme.spacing(3)}px;
  }
`

export default LoginForm
