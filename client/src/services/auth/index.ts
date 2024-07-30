import { POST } from '@/lib/fecth'

interface LoginProps {
  name: string
  password: string
}

async function login(props: LoginProps) {
  return POST<{
    accessToken: string
  }>('/users/login', props)
}

const authService = {
  login
}

export default authService
