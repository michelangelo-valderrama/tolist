import { Link } from 'react-router-dom'
import { LockIcon, User2Icon, MailIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { InputIcon } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  return (
    <article>
      <div className="space-y-4">
        <div>
          <Label>Email</Label>
          <InputIcon placeholder="Email" icon={MailIcon} />
        </div>
        <div className="flex gap-x-2">
          <div>
            <Label>Username</Label>
            <InputIcon placeholder="Username" icon={User2Icon} />
          </div>
          <div>
            <Label>Password</Label>
            <InputIcon placeholder="Password" type="password" icon={LockIcon} />
          </div>
        </div>
      </div>
      <Button className="w-full mt-6">Signup</Button>
      <p className="space-x-2 text-muted-foreground mt-3 text-center">
        <span>Already have an account?</span>
        <Link to="/auth/login" tabIndex={-1}>
          <Button variant="link" className="px-1.5 text-base" size="sm">
            Login
          </Button>
        </Link>
      </p>
    </article>
  )
}
