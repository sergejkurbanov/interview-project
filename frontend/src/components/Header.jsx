import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from 'redux/modules/auth/actions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'

const Header = () => {
  const user = useSelector(state => state.auth.current)
  const dispatch = useDispatch()

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1">
            <Box fontWeight={700} fontSize={24}>
              Travel Maker
            </Box>
          </Typography>
          {user && (
            <Button size="small" onClick={() => dispatch(logoutUser())}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
