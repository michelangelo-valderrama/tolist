import { Link } from 'react-router-dom'
import { User2Icon, LockIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputIcon } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <article>
      <div className="space-y-4">
        <div>
          <Label>Username</Label>
          <InputIcon placeholder="Username" icon={User2Icon} />
        </div>
        <div>
          <Label>Password</Label>
          <InputIcon placeholder="Password" type="password" icon={LockIcon} />
        </div>
      </div>
      <Button className="w-full mt-6">Login</Button>
      <p className="space-x-2 text-muted-foreground mt-3 text-center">
        <span>Don't have an account?</span>
        <Link to="/auth/signup" tabIndex={-1}>
          <Button variant="link" className="px-1.5 text-base" size="sm">
            Sign up
          </Button>
        </Link>
      </p>
    </article>
  )
}
