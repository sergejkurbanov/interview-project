import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteTrip } from 'redux/modules/trips/actions'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

const redTheme = createMuiTheme({ palette: { primary: red } })

const DeleteTrip = ({ id, destination }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleDelete = () => {
    dispatch(deleteTrip({ id }))
    handleClose()
  }

  return (
    <>
      <MuiThemeProvider theme={redTheme}>
        <Button color="primary" variant="contained" onClick={handleOpen}>
          <Typography>Delete</Typography>
        </Button>
      </MuiThemeProvider>

      <DialogWrapper
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete trip modal"
      >
        <DialogTitle>Deleting trip to {destination}</DialogTitle>
        <DialogContent>
          <Box mb={4}>
            <DialogContentText id="alert-dialog-description">
              Are you sure? The trip will be forever lost.
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <MuiThemeProvider theme={redTheme}>
            <Button color="primary" onClick={handleDelete} variant="contained">
              Delete
            </Button>
          </MuiThemeProvider>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}
const DialogWrapper = styled(Dialog)`
  margin: auto;
  max-width: 700px;
`

DeleteTrip.propTypes = {
  id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
}

export default DeleteTrip
