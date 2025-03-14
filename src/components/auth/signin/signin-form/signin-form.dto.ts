import { z } from 'zod'

export const singinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type SinginFormSchema = z.infer<typeof singinFormSchema>
