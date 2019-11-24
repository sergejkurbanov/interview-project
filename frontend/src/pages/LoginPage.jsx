import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LoginForm from 'forms/LoginForm'

const LoginPage = () => {
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const user = useSelector(state => state.auth.current)

  if (user) return <Redirect to={from} />

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box boxShadow={4}>
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage
