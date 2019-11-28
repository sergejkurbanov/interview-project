import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExploreIcon from '@material-ui/icons/Explore'

const Unauthorized = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box mt={8} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">Unauthorized</Typography>
          <Box mt={4}>
            <Button color="primary" component={Link} to="/" size="large">
              <ExploreIcon
                color="primary"
                style={{ fontSize: 30, marginRight: 10 }}
              />
              Explore a different destination
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Unauthorized
