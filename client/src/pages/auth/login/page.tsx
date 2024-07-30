import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User2Icon, LockIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { InputIcon } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import authService from '@/services/auth'

const loginFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50)
})

export default function LoginPage() {
  const { toast } = useToast()

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const resp = await authService.login({
        name: values.username,
        password: values.password
      })
      console.log(resp, resp.data.accessToken)
      toast({
        title: 'Login successful! 🎉',
        description: 'You have successfully logged in.'
      })
    } catch (error) {
      console.error(error)
      let errorMessage = 'An error occurred while logging in.'
      if (error instanceof Error) errorMessage = error.message
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive'
      })
    }
  }

  return (
    <article>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={loginForm.control}
              name="username"
              render={() => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <InputIcon
                      {...loginForm.register('username')}
                      placeholder="Username"
                      icon={User2Icon}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={() => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputIcon
                      {...loginForm.register('password')}
                      placeholder="Password"
                      type="password"
                      icon={LockIcon}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-6">
            Login
          </Button>
        </form>
      </Form>
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
