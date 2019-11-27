import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSelf } from 'redux/modules/auth/actions'
import Header from 'components/Header'
import TripForm from 'forms/TripForm'
import TripList from 'components/TripList'
import TripFilters from 'components/TripFilters'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ExploreIcon from '@material-ui/icons/Explore'

const TripsPage = () => {
  const user = useSelector(state => state.auth.current)
  const dispatch = useDispatch()
  const [visibleTrips, setVisibleTrips] = useState(user.trips)

  useEffect(() => {
    dispatch(getSelf())
  }, [dispatch])

  return (
    <>
      <Header />

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
    </>
  )
}

export default TripsPage
