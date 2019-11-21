import React from 'react'
import Grid from '@material-ui/core/Grid'
import SignupForm from 'forms/SignupForm'

const SignupPage = () => (
  <Grid container justify="center">
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <SignupForm />
    </Grid>
  </Grid>
)

export default SignupPage
