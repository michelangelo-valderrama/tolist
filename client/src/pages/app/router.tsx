import type { RouteObject } from 'react-router-dom'
import AppLayout from './layout'
import AppPage from './page'
import ProfilePage from './profile/page'
import ProjectPage from './project/page'
import TagsPage from './tags/page'

const appRouter: RouteObject = {
  path: '/app',
  element: <AppLayout />,
  children: [
    {
      path: '',
      element: <AppPage />
    },
    {
      path: 'profile',
      element: <ProfilePage />
    },
    {
      path: 'project/:projectId',
      element: <ProjectPage />
    },
    {
      path: 'tags',
      element: <TagsPage />
    }
  ]
}

export default appRouter
