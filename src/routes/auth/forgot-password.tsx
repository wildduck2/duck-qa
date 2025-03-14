import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordPage } from '~/components/auth/forget-password'

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPasswordPage,
})

