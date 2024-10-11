import { createBrowserRouter } from 'react-router-dom'
import HomePage from './home/home.page'
import MainLayout from '@/layouts/main.layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      }
    ]
  }
])

export default router
