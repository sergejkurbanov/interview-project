import React, { useRef } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactToPrint from 'react-to-print'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const TripPrint = ({ trips }) => {
  const tripsStartingNextMonth = trips.filter(trip => {
    const inDays = moment(trip.startDate).diff(moment().startOf('day'), 'days')

    return inDays < 31 && inDays > 0
  })

  const printRef = useRef()

  return (
    tripsStartingNextMonth.length > 0 && (
      <Box mt={2} display="flex" direction="row" alignItems="center">
        <Typography>
          Put your trips on your fridge! Don&apos;t miss a single trip in the
          next 30 days.
        </Typography>
        <ReactToPrint
          trigger={() => <Button color="primary">Print</Button>}
          content={() => printRef.current}
          pageStyle="@page { size: auto; margin: 0mm; } @media print { body { padding: 40px !important; } }"
        />
        <div style={{ display: 'none' }}>
          <TableWrapper ref={printRef}>
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell align="right">Start date</TableCell>
                <TableCell align="right">End date</TableCell>
                <TableCell align="right">Comment</TableCell>
              </TableRow>
            </TableHead>

            <TableBody style={{ color: 'black !important' }}>
              {tripsStartingNextMonth.map(trip => (
                <TableRow style={{ color: 'black !important' }} key={trip.id}>
                  <TableCell
                    style={{ color: 'black !important' }}
                    component="th"
                    scope="row"
                  >
                    {trip.destination}
                  </TableCell>
                  <TableCell align="right">
                    {moment(trip.startDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="right">
                    {moment(trip.endDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell
                    style={{ color: 'black !important' }}
                    align="right"
                  >
                    {trip.comment}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        </div>
      </Box>
    )
  )
}

const TableWrapper = styled(Table)`
  * {
    color: black;
  }
`

TripPrint.propTypes = {
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

export default TripPrint
