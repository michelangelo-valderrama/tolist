import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="min-w-[24rem] max-w-sm min-h-[28rem] flex flex-col justify-between">
        <h1 className="font-serif text-8xl text-center">Tolist</h1>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
