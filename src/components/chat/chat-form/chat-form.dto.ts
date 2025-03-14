import { z } from 'zod'
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from './chat-form.constants'

export const chatSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: 'Please enter a message' })
    .max(1000, { message: 'Message is too long (max 1000 characters)' }),
  attachments: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          (file) => ({ message: `${file.name} is larger than 5MB` }),
        )
        .refine(
          (file) =>
            ACCEPTED_FILE_TYPES.includes(file.type) ||
            file.name.endsWith('.ts') ||
            file.name.endsWith('.js'),
          (file) => ({ message: `${file.name} has an unsupported file type` }),
        ),
    )
    .max(5, { message: 'You can upload a maximum of 5 files' })
    .optional()
    .default([]),
})

export type ChatSchema = z.infer<typeof chatSchema>
