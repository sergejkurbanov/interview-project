import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSelf } from 'redux/modules/auth/actions'
import TripForm from 'forms/TripForm'
import TripList from 'components/TripList'
import TripFilters from 'components/TripFilters'
import TripPrint from 'components/TripPrint'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExploreIcon from '@material-ui/icons/Explore'
import { ROLES } from '../config'

const TripsPage = () => {
  const user = useSelector(state => state.auth.current)
  const dispatch = useDispatch()
  const [visibleTrips, setVisibleTrips] = useState(user.trips)
  const isManager = user.role === ROLES.MANAGER.value
  const isAdmin = user.role === ROLES.ADMIN.value

  useEffect(() => {
    dispatch(getSelf())
  }, [dispatch])

  if (isAdmin || isManager) return <Redirect to="/users" />

  return (
    <Grid container direction="column">
      <Grid item>
        <Box mb={4}>
          <Box mt={4} mb={4}>
            <Typography variant="h3" gutterBottom>
              It is said a puppy is fed every time someone plans a trip.
            </Typography>
          </Box>

          <Box mb={2}>
            <TripForm />
          </Box>

          <Box mb={2}>
            <TripFilters trips={user.trips} setTrips={setVisibleTrips} />
          </Box>

          <TripList trips={visibleTrips} />

          {user.trips.length === 0 && (
            <Box mt={4} alignItems="center" display="flex" flexDirection="row">
              <ExploreIcon
                color="primary"
                style={{ fontSize: 30, marginRight: 10 }}
              />
              <Typography>
                Let&apos;s add some trips by clicking the button above!
              </Typography>
            </Box>
          )}

          <TripPrint trips={user.trips} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default TripsPage
