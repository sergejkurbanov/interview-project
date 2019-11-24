import axios from 'axios'
import { logoutUser } from 'redux/modules/auth/actions'

// Create a custom axios instance with our defaults
const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const setAxiosInterceptors = store =>
  myAxios.interceptors.response.use(
    // Let successful responses pass through
    response => response,
    async error => {
      // Reject any errors that are not 401 - Unauthorized
      if (error.response.status !== 401) return Promise.reject(error)

      // If it's the refresh that's failing, log the user out
      if (error.config.url.endsWith('refresh')) {
        store.dispatch(logoutUser({ skipApi: true }))
        return Promise.reject(error)
      }

      // Otherwise try to refresh the token and retry the original request
      await myAxios.get('/users/refresh')
      return myAxios.request(error.config)
    },
  )

export default myAxios
