import { createFileRoute } from '@tanstack/react-router'
import Chat from '~/components/chat/chat'
import V0HomeInterface from '~/components/chat/chat-home-2'

export const Route = createFileRoute('/chat')({
  component: V0HomeInterface,
})
