import { z } from 'zod'

export const forgetPasswordFormSchema = z.object({
  email: z.string().email(),
})

export type ForgetPasswordFormSchema = z.infer<typeof forgetPasswordFormSchema>
