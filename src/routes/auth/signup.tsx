import { createFileRoute } from '@tanstack/react-router'
import { SignupPage } from '~/components/auth/signup'

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
})
