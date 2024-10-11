import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <main className="max-w-screen-sm mx-auto mt-8">
      <Outlet />
    </main>
  )
}

export default MainLayout
