import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>we do not have terms you moron we're gentelduckteam</div>
}
