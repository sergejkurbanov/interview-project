import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import TodosPage from 'pages/TodosPage'

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
