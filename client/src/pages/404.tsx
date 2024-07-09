export default function NotFound() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="min-w-[24rem] min-h-80 flex flex-col justify-between">
        <h1 className="font-serif text-8xl text-center">404</h1>
        <div className="w-full space-y-4 *:block">
          <p className="text-center">Page not found</p>
        </div>
      </div>
    </div>
  )
}
