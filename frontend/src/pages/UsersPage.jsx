import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from 'redux/modules/users/actions'
import UserForm from 'forms/UserForm'
import Loading from 'components/Loading'
import UserList from 'components/UserList'
import UnauthorizedPage from 'pages/UnauthorizedPage'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ROLES } from '../config'

const UsersPage = () => {
  const user = useSelector(state => state.auth.current)
  const users = useSelector(state => state.users.all)
  const dispatch = useDispatch()
  const isManager = user.role === ROLES.MANAGER.value
  const isAdmin = user.role === ROLES.ADMIN.value
  const isAuthorized = isManager || isAdmin

  useEffect(() => {
    if (isAuthorized) dispatch(getUsers())
  }, [dispatch, isAuthorized])

  if (!isAuthorized) return <UnauthorizedPage />

  return (
    <Grid container direction="column">
      <Grid item>
        <Box mt={4} mb={4}>
          <Typography variant="h3" gutterBottom>
            User administration of the Travel Maker
          </Typography>
        </Box>

        <Box mb={2}>
          <UserForm />
        </Box>

        <Box textAlign="center">
          {!users ? <Loading isLoading /> : <UserList users={users} />}
        </Box>
      </Grid>
    </Grid>
  )
}

export default UsersPage
