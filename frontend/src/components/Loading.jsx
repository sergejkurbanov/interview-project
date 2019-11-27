import React from 'react'
import PropTypes from 'prop-types'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loading = ({ isLoading, ...rest }) => (
  <Fade in={isLoading} unmountOnExit>
    <CircularProgress {...rest} />
  </Fade>
)

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  thickness: PropTypes.number,
}

Loading.defaultProps = {
  size: 24,
  thickness: 8,
}

export default Loading
