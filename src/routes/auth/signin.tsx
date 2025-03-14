import { createFileRoute } from '@tanstack/react-router'
import { SigninPage } from '~/components/auth/signin'

export const Route = createFileRoute('/auth/signin')({
  component: SigninPage,
})
