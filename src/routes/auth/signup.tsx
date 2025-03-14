import { createFileRoute } from '@tanstack/react-router'
import { Signup } from '~/components/auth/signup'

export const Route = createFileRoute('/auth/signup')({
  component: Signup,
})
