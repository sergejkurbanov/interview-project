/* eslint-disable react/jsx-curly-newline */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/log-in',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}

PrivateRoute.defaultProps = {
  user: null,
  location: {
    pathname: '',
  },
}

export default PrivateRoute
