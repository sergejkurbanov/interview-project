import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import SignupForm from 'forms/SignupForm'

const SignupPage = () => (
  <Grid container justify="center">
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Box boxShadow={4}>
        <SignupForm />
      </Box>
    </Grid>
  </Grid>
)

export default SignupPage
