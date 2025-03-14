'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Github } from 'lucide-react'

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
import { Separator } from '~/components/ui/separator'
import { singinFormSchema, SinginFormSchema } from './signin-form.dto'
import { submitGihubSingin, submitSigninForm } from './signin-form.libs'

export function SigninForm() {
  const form = useForm<SinginFormSchema>({
    resolver: zodResolver(singinFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <div className={cn('flex flex-col gap-6')}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your credentials below to sign in to your account
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitSigninForm)}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
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
            {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={submitGihubSingin}
            disabled={form.formState.isSubmitting}
          >
            <Github className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/auth/signup"
              className="font-medium text-primary underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
