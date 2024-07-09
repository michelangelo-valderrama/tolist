import { Button } from '@/components/ui/button'

function App() {
  return (
    <main>
      <div className="h-dvh flex items-center justify-center">
        <div className="min-w-[24rem] min-h-80 flex flex-col justify-between">
          <h1 className="font-serif text-8xl text-center">Tolist</h1>
          <div className="w-full *:w-full space-y-4">
            <Button>Login</Button>
            <Button variant="outline">Sign Up</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
