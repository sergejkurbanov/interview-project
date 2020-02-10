import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, updateUser } from 'redux/modules/users/actions'
import Loading from 'components/Loading'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import { ROLES } from '../config'

const UserForm = ({ user }) => {
  const isUpdate = !!user.id

  // Form fields
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState(user.role)
  const [password, setPassword] = useState(user.password)

  const memoResetFields = useCallback(() => {
    setName(user.name)
    setEmail(user.email)
    setPassword(user.password)
  }, [user.name, user.email, user.password])

  // Refresh form fields after user update
  useEffect(() => {
    memoResetFields()
  }, [user.updatedAt, memoResetFields])

  // Rest
  const [open, setOpen] = useState(false)
  const isLoading = useSelector(state => state.users.isLoading)
  const currentUser = useSelector(state => state.auth.current)
  const dispatch = useDispatch()
  const isAdmin = currentUser.role === ROLES.ADMIN.value
  const submitDisabled =
    !(name && email) || isLoading || (!isUpdate && !password)
  const isOtherUser = user.id !== currentUser.id

  const handleSubmit = e => {
    e.preventDefault()

    const payload = {
      id: user.id,
      name,
      email,
      role,
      password,
      callback: () => {
        memoResetFields()
        setOpen(false)
      },
    }

    return dispatch(isUpdate ? updateUser(payload) : createUser(payload))
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        <Typography>{isUpdate ? 'Update' : 'New user'}</Typography>
      </Button>
      <ModalWrapper
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="User form modal"
      >
        <UserFormWrapper onSubmit={handleSubmit}>
          <Typography variant="h2" gutterBottom>
            {isUpdate ? `Updating user ${user.name}` : 'Create a user'}
          </Typography>

          <TextField
            required
            value={name}
            onChange={e => setName(e.target.value)}
            label="Name"
            fullWidth
            autoFocus
            margin="normal"
            variant="outlined"
          />

          <TextField
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
          />

          {isOtherUser && (
            <Box width="100%" mt={1} mb={1}>
              <InputLabel id="role-select">Role</InputLabel>
              <Select
                fullWidth
                labelId="role-select"
                value={role}
                disabled={role === ROLES.ADMIN.value && !isAdmin}
                variant="outlined"
                onChange={e => setRole(e.target.value)}
              >
                {Object.values(ROLES).map(({ value, title }) => (
                  <MenuItem
                    disabled={value === ROLES.ADMIN.value && !isAdmin}
                    key={value}
                    value={value}
                  >
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {!isUpdate && (
            <TextField
              type="password"
              required
              value={password || ''}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
          )}

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
        </UserFormWrapper>
      </ModalWrapper>
    </>
  )
}

const UserFormWrapper = styled.form`
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

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    password: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
}

UserForm.defaultProps = {
  user: {
    id: '',
    name: '',
    email: '',
    role: '',
    password: '',
    updatedAt: null,
  },
}

export default UserForm
