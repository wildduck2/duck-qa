import { createFileRoute, Outlet } from '@tanstack/react-router'
import { PanelRight } from 'lucide-react'
import { AppSidebar } from '~/components/chat/chat-side-bar/chat-side-bar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar'

export const Route = createFileRoute('/chat/_chat')({
  component: () => {
    return (
      <>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col gap-8">
            <div className="p-4">
              <SidebarTrigger variant="ghost" size="icon">
                <PanelRight />
              </SidebarTrigger>
            </div>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </>
    )
  },
})
