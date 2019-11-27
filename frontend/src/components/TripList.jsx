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

const TripList = ({ trips }) => {
  const [expanded, setExpanded] = useState(false)
  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      {trips.map(trip => {
        const inDays = moment(trip.startDate).diff(
          moment().startOf('day'),
          'days',
        )

        return (
          <ExpansionPanel
            key={trip.id}
            expanded={expanded === trip.id}
            onChange={handleChange(trip.id)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Box style={{ flexBasis: '80%' }}>
                <Typography>{trip.destination}</Typography>
              </Box>
              {inDays > 0 && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <FlightTakeoffIcon
                    color="primary"
                    style={{ fontSize: 30, marginRight: 10 }}
                  />
                  <Typography style={{ whiteSpace: 'nowrap' }}>
                    {inDays} days
                  </Typography>
                </Box>
              )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box dislay="flex" width="100%" flexDirection="column">
                <Box p={1} mb={3} borderRadius={4} bgcolor="primary.main">
                  <Typography>{trip.comment}</Typography>
                </Box>

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
                  <Typography>
                    {moment(trip.startDate).format('DD/MM/YYYY')}
                  </Typography>
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
                  <Typography>
                    {moment(trip.endDate).format('DD/MM/YYYY')}
                  </Typography>
                </Box>

                <Box mt={4}>
                  <Box component="span" mr={2}>
                    <TripForm trip={trip} />
                  </Box>

                  <DeleteTrip id={trip.id} destination={trip.destination} />
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
  ).isRequired,
}

export default TripList
