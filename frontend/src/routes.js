import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import TodosPage from 'pages/TodosPage'

// Specify app routes with a path, a component and whether it's exact or private or not
const routes = [
  {
    path: '/',
    component: TodosPage,
    exact: true,
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
]

export default routes
