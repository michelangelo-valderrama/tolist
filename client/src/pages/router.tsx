import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import NotFound from './404'
import Page from './page'
import authRouter from './auth/router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [{ path: '/', element: <Page /> }, authRouter]
  }
])

export default router
