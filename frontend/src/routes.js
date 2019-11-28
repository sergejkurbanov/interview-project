import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import TripsPage from 'pages/TripsPage'
import UsersPage from 'pages/UsersPage'
import NotFoundPage from 'pages/NotFoundPage'

// Specify app routes with a path, a component and whether it's exact or private or not
const routes = [
  {
    path: '/',
    component: TripsPage,
    exact: true,
    pvt: true,
  },
  {
    path: '/users',
    component: UsersPage,
    pvt: true,
  },
  {
    path: '/sign-up',
    component: SignupPage,
  },
  {
    path: '/log-in',
    component: LoginPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
]

export default routes
