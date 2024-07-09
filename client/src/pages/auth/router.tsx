import type { RouteObject } from 'react-router-dom'
import AuthLayout from './layout'
import LoginPage from './login/page'
import SignupPage from './signup/page'

const authRouter: RouteObject = {
  path: '/auth',
  element: <AuthLayout />,
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
