import { createFileRoute } from '@tanstack/react-router'
import { Header } from '~/components/header'
import { Home } from '~/components/home'

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <Header />
      <Home />
    </>
  ),
})
