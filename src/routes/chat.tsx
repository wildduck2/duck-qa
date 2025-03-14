import { createFileRoute } from '@tanstack/react-router'
import Chat from '~/components/chat/chat'

export const Route = createFileRoute('/chat')({
  component: Chat,
})
