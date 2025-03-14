import { createFileRoute } from '@tanstack/react-router'
import { ChatPage } from '~/components/chat'

export const Route = createFileRoute('/chat/_chat/')({
  component: ChatPage,
})
