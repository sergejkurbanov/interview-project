import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  createTrip,
  createUserTrip,
  updateTrip,
  updateUserTrip,
} from 'redux/modules/trips/actions'
import Loading from 'components/Loading'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { toast } from 'react-toastify'

const TripForm = ({ trip, userId }) => {
  const isUpdate = !!trip.id
  const handleDate = date => (date ? moment(date) : null)

  // Form fields
  const [destination, setDestination] = useState(trip.destination)
  const [startDate, setStartDate] = useState(handleDate(trip.startDate))
  const [endDate, setEndDate] = useState(handleDate(trip.endDate))
  const [comment, setComment] = useState(trip.comment)

  const memoResetFields = useCallback(() => {
    setDestination(trip.destination)
    setStartDate(handleDate(trip.startDate))
    setEndDate(handleDate(trip.endDate))
    setComment(trip.comment)
  }, [trip.destination, trip.startDate, trip.endDate, trip.comment])

  // Date field validations
  const [isStartDateValid, setStartDateValid] = useState(isUpdate)
  const [isEndDateValid, setEndDateValid] = useState(isUpdate)

  const handleStartDate = date => {
    setStartDateValid(date.isValid())
    setStartDate(date)
  }
  const handleEndDate = date => {
    setEndDateValid(date.isValid())
    setEndDate(date)
  }

  // Refresh form fields after trip update
  useEffect(() => {
    memoResetFields()
  }, [trip.updatedAt, memoResetFields])

  // Rest
  const [open, setOpen] = useState(false)
  const isLoading = useSelector(state => state.trips.isLoading)
  const dispatch = useDispatch()
  const submitDisabled =
    !(destination && isStartDateValid && isEndDateValid && comment) || isLoading

  const handleSubmit = e => {
    e.preventDefault()

    // Check that the dates are chronologically correct
    if (endDate.isBefore(startDate)) {
      return toast.error(
        'Make sure that the Start date comes before the End date.',
      )
    }

    // Construct the payload
    const payload = {
      userId,
      tripId: trip.id,
      destination,
      startDate,
      endDate,
      comment,
      callback: () => {
        memoResetFields()
        setOpen(false)
      },
    }

    if (userId) {
      return dispatch(
        isUpdate ? updateUserTrip(payload) : createUserTrip(payload),
      )
    }
    return dispatch(isUpdate ? updateTrip(payload) : createTrip(payload))
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        <Typography>{isUpdate ? 'Update' : 'New trip'}</Typography>
      </Button>
      <ModalWrapper
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Trip form modal"
      >
        <TripFormWrapper onSubmit={handleSubmit}>
          <Typography variant="h2" gutterBottom>
            {isUpdate
              ? `Updating trip to ${trip.destination}`
              : 'Create a trip'}
          </Typography>

          <TextField
            required
            value={destination}
            onChange={e => setDestination(e.target.value)}
            label="Destination"
            fullWidth
            autoFocus
            margin="normal"
            variant="outlined"
          />

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              required
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              label="Start date"
              value={startDate}
              onChange={handleStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
              maxDateMessage="Planning ahead, huh?"
              minDateMessage="Must have been one hell of a trip!"
            />

            <KeyboardDatePicker
              disableToolbar
              required
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              label="End date"
              value={endDate}
              onChange={handleEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
              maxDateMessage="Planning ahead, huh?"
              minDateMessage="Must have been one hell of a trip!"
            />
          </MuiPickersUtilsProvider>

          <TextField
            required
            value={comment}
            onChange={e => setComment(e.target.value)}
            label="Comment"
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="form__button"
            disabled={submitDisabled}
          >
            {isLoading ? (
              <Loading isLoading={isLoading} />
            ) : (
              <Typography>{isUpdate ? 'Update' : 'Create'}</Typography>
            )}
          </Button>
        </TripFormWrapper>
      </ModalWrapper>
    </>
  )
}

const TripFormWrapper = styled.form`
  margin-top: ${props => props.theme.spacing(8)}px;
  margin-bottom: ${props => props.theme.spacing(8)}px;
  background-color: ${props => props.theme.palette.background.paper};
  padding: ${props => props.theme.spacing(4)}px;
  display: flex;
  flex-direction: column;
  outline: 0;

  .form__button {
    margin-top: ${props => props.theme.spacing(3)}px;
  }
`

const ModalWrapper = styled(Modal)`
  margin: auto;
  padding: 0 ${props => props.theme.spacing(2)}px;
  max-width: 700px;
  overflow: scroll;

  @media (min-width: ${props => props.theme.breakpoints.values.sm}px) {
    padding: 0 ${props => props.theme.spacing(8)}px;
  }
`

TripForm.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string,
    destination: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    comment: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  userId: PropTypes.string,
}

TripForm.defaultProps = {
  trip: {
    id: '',
    destination: '',
    startDate: null,
    endDate: null,
    comment: '',
    updatedAt: null,
  },
  userId: '',
}

export default TripForm
