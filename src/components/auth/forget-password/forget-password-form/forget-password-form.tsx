'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'

import { cn } from '~/utils/cn'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  forgetPasswordFormSchema,
  ForgetPasswordFormSchema,
} from './forget-password-form.dto'
import { submitForgetPasswordForm } from './forget-password-form.libs'

export function ForgotPasswordForm() {
  const form = useForm<ForgetPasswordFormSchema>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForgetPasswordForm)}
          className="grid gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>

          <div className="text-center text-sm">
            Remember your password?{' '}
            <Link
              to="/auth/signin"
              className="font-medium text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
