import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const TripFilters = ({ trips, setTrips }) => {
  const [filter, setFilter] = useState('all')

  const memoHandleChange = useCallback(
    newFilter => {
      setFilter(newFilter)

      switch (newFilter) {
        case 'all': {
          return setTrips(trips)
        }

        case 'past': {
          return setTrips(
            trips.filter(trip =>
              moment()
                .startOf('day')
                .isAfter(moment(trip.endDate), 'day'),
            ),
          )
        }

        case 'ongoing': {
          return setTrips(
            trips.filter(
              trip =>
                moment()
                  .startOf('day')
                  .isSameOrAfter(moment(trip.startDate), 'day') &&
                moment(trip.endDate).isSameOrAfter(
                  moment().startOf('day'),
                  'day',
                ),
            ),
          )
        }

        case 'future': {
          return setTrips(
            trips.filter(trip =>
              moment(trip.startDate).isAfter(moment().startOf('day'), 'day'),
            ),
          )
        }

        default: {
          return setTrips(trips)
        }
      }
    },
    [trips, setTrips],
  )

  useEffect(() => {
    memoHandleChange(filter)
  }, [trips, filter, memoHandleChange])

  return (
    trips.length > 0 && (
      <ButtonGroupWrapper size="small">
        <Button
          className={filter === 'all' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => memoHandleChange('all')}
        >
          All
        </Button>
        <Button
          className={filter === 'past' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => memoHandleChange('past')}
        >
          Past
        </Button>
        <Button
          className={filter === 'ongoing' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => memoHandleChange('ongoing')}
        >
          Ongoing
        </Button>
        <Button
          className={filter === 'future' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => memoHandleChange('future')}
        >
          Future
        </Button>
      </ButtonGroupWrapper>
    )
  )
}

const ButtonGroupWrapper = styled(ButtonGroup)`
  .contained {
    color: ${props => props.theme.palette.primary.contrastText};
    background-color: ${props => props.theme.palette.primary.main};
  }
`

TripFilters.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      destination: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      comment: PropTypes.string,
    }),
  ).isRequired,
  setTrips: PropTypes.func.isRequired,
}

export default TripFilters
