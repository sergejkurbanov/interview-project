import React from 'react'
import Helmet from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import Header from 'components/Header'
import PrivateRoute from 'components/PrivateRoute'
import routes from '../routes'

const App = () => {
  const user = useSelector(state => state.auth.current)

  return (
    <>
      <Header />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Travel Maker</title>
      </Helmet>
      <Container>
        <Switch>
          {routes.map(({ pvt, ...rest }) =>
            pvt ? (
              <PrivateRoute key={rest.path} user={user} {...rest} />
            ) : (
              <Route key={rest.path} {...rest} />
            ),
          )}
        </Switch>
      </Container>
    </>
  )
}

export default App
