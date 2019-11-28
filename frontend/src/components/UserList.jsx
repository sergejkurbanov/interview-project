import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import UserForm from 'forms/UserForm'
import TripForm from 'forms/TripForm'
import DeleteUser from 'components/DeleteUser'
import TripList from 'components/TripList'
import { ROLES } from '../config'

const UserList = ({ users }) => {
  const currentUser = useSelector(state => state.auth.current)
  const isAdmin = currentUser.role === ROLES.ADMIN.value
  const [expanded, setExpanded] = useState(false)
  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      {users.map(user => (
        <ExpansionPanel
          key={user.id}
          expanded={expanded === user.id}
          onChange={handleChange(user.id)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{user.name}</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            {/* User email */}
            <Box
              dislay="flex"
              width="100%"
              textAlign="left"
              flexDirection="column"
            >
              <Box p={1} mb={3} borderRadius={4} bgcolor="primary.main">
                <Typography>{user.email}</Typography>
              </Box>

              {/* User role */}
              <Box
                ml={1}
                mb={1}
                alignItems="center"
                display="flex"
                flexDirection="row"
              >
                <AccessibilityIcon
                  color="primary"
                  style={{ fontSize: 30, marginRight: 10 }}
                />
                <Typography>{ROLES[user.role].title}</Typography>
              </Box>

              {/* User entity actions */}
              <Box mt={4} mb={0}>
                {isAdmin && (
                  <Box component="span" mr={2}>
                    <TripForm userId={user.id} />
                  </Box>
                )}

                <Box component="span" mr={2}>
                  <UserForm user={user} />
                </Box>

                <DeleteUser id={user.id} name={user.name} />
              </Box>

              {/* List of user trips that is only visible to the admin users */}
              {isAdmin && user.trips.length > 0 && (
                <Box mt={4} boxShadow={8}>
                  <TripList trips={user.trips} userId={user.id} />
                </Box>
              )}
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  )
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
      trips: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          destination: PropTypes.string,
          startDate: PropTypes.string,
          endDate: PropTypes.string,
          comment: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
}

export default UserList
