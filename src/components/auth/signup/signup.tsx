import { Link } from '@tanstack/react-router'
import { cn } from '~/utils/cn'
import { buttonVariants } from '~/components/ui/button'
import { Icons } from '../chat/chat-side-bar/chat-side-bar'
import { GalleryVerticalEnd } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-7xl mx-auto mt-14">
      <div className="container flex h-14 items-center gap-2 md:gap-4 justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          duck-qa
        </Link>
        <nav className="gap-4 flex items-center">
          <Link
            to="/auth/signup"
            className={cn(
              buttonVariants({
                variant: 'secondary',
                className: '!px-5',
              }),
            )}
          >
            Signup
          </Link>
          <Link
            to="/auth/signin"
            className={cn(
              buttonVariants({
                className: '!px-5',
              }),
            )}
          >
            Signin
          </Link>
        </nav>
      </div>
    </header>
  )
}
