import { Prompting } from '../propmting'
import { Button } from '~/components/ui/button'

export function Home() {
  return (
    <main className="flex justify-center items-center h-screen relative">
      <Prompting />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button>Start</Button>
      </div>
    </main>
  )
}
