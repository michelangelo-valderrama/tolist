import type { RouteObject } from 'react-router-dom'
import Layout from './layout'
import LoginPage from './login/page'
import SignupPage from './signup/page'

const authRouter: RouteObject = {
  path: '/auth',
  element: <Layout />,
  children: [
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'signup',
      element: <SignupPage />
    }
  ]
}

export default authRouter
