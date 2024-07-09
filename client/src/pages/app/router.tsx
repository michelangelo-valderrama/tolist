import type { RouteObject } from 'react-router-dom'
import AppLayout from './layout'
import AppPage from './page'

const appRouter: RouteObject = {
  path: '/app',
  element: <AppLayout />,
  children: [
    {
      path: '',
      element: <AppPage />
    }
  ]
}

export default appRouter
