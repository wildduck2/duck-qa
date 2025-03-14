import { createFileRoute } from '@tanstack/react-router'
import { Signin } from '~/components/auth/signin'

export const Route = createFileRoute('/auth/signin')({
  component: Signin,
})
