import { Link } from '@tanstack/react-router'
import { cn } from '~/utils/cn'
import { buttonVariants } from '~/components/ui/button'
import { Icons } from '../chat/chat-side-bar/chat-side-bar'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-7xl mx-auto mt-14">
      <div className="container flex h-14 items-center gap-2 md:gap-4 justify-between">
        <Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold lg:inline-block">duck-qa</span>
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
