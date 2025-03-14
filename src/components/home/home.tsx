import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/utils/cn'
import { Prompting } from '../propmting'

export function Home() {
  return (
    <main className="flex justify-center items-center h-screen relative">
      <Prompting />
      <div className="absolute bottom-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link
          to="/chat"
          className={cn(
            buttonVariants({ className: 'px-24 rounded-md font-medium' }),
          )}
        >
          start now
          <ArrowRight />
        </Link>
      </div>
    </main>
  )
}
