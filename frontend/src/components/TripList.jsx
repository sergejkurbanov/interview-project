import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import FlightLandIcon from '@material-ui/icons/FlightLand'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TripForm from 'forms/TripForm'
import DeleteTrip from 'components/DeleteTrip'

const TripList = ({ trips, userId }) => {
  const [expanded, setExpanded] = useState(false)
  const formatDate = date => moment(date).format('DD/MM/YYYY')
  const getDayDiff = date => moment(date).diff(moment().startOf('day'), 'days')
  const handleChange = panel => (_, isExpanded) =>
    setExpanded(isExpanded ? panel : false)

  return (
    <>
      {trips.map(trip => {
        const inDays = getDayDiff(trip.startDate)

        return (
          <ExpansionPanel
            key={trip.id}
            expanded={expanded === trip.id}
            onChange={handleChange(trip.id)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                display="flex"
                alignItems="center"
                style={{ flexBasis: '80%' }}
              >
                <Typography>{trip.destination}</Typography>
              </Box>

              {/* Displays the days left for upcoming trips */}
              {inDays > 0 && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <FlightTakeoffIcon
                    color="primary"
                    style={{ fontSize: 30, marginRight: 10 }}
                  />
                  <Typography noWrap>{inDays} days</Typography>
                </Box>
              )}
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              {/* Trip comment */}
              <Box dislay="flex" width="100%" flexDirection="column">
                <Box p={1} mb={3} borderRadius={4} bgcolor="primary.main">
                  <Typography>{trip.comment}</Typography>
                </Box>

                {/* Trip start and end dates */}
                <Box
                  ml={1}
                  mb={1}
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                >
                  <FlightTakeoffIcon
                    color="primary"
                    style={{ fontSize: 30, marginRight: 10 }}
                  />
                  <Typography>{formatDate(trip.startDate)}</Typography>
                </Box>

                <Box
                  ml={1}
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                >
                  <FlightLandIcon
                    color="primary"
                    style={{ fontSize: 30, marginRight: 10 }}
                  />
                  <Typography>{formatDate(trip.endDate)}</Typography>
                </Box>

                {/* Trip actions */}
                <Box mt={4}>
                  <Box component="span" mr={2}>
                    <TripForm trip={trip} userId={userId} />
                  </Box>

                  <DeleteTrip
                    id={trip.id}
                    destination={trip.destination}
                    userId={userId}
                  />
                </Box>
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </>
  )
}

TripList.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      destination: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      comment: PropTypes.string,
    }),
  ),
  userId: PropTypes.string,
}

TripList.defaultProps = {
  trips: [],
  userId: '',
}

export default TripList
