import { z } from 'zod'

export const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  terms: z.boolean().default(false),
})

export type SignupFormSchema = z.infer<typeof signupFormSchema>
