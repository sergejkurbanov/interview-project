import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signupUser } from 'redux/modules/auth/actions'
import Loading from 'components/Loading'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const isLoading = useSelector(state => state.auth.isSignupLoading)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return toast.error(
        "Passwords need to match! Make sure you've entered the same password twice.",
      )
    }

    return dispatch(signupUser({ email, password }))
  }

  return (
    <SignupFormWrapper onSubmit={handleSubmit}>
      <Typography variant="h2" gutterBottom>
        Sign Up
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

      <TextField
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        label="Confirm password"
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <Typography>
        <Box component="span" mr={1}>
          Already have an account?
        </Box>
        <Button color="primary" component={Link} to="/log-in" size="small">
          Log in!
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
          <Loading size={24} thickness={8} isLoading={isLoading} />
        ) : (
          <Typography>Sign up</Typography>
        )}
      </Button>
    </SignupFormWrapper>
  )
}

const SignupFormWrapper = styled.form`
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

export default SignupForm
