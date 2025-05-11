"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Bell, Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

export function ChatbotHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Suraksha Sathi</h1>
        <Badge variant="outline" className="ml-2">
          AI Assistant
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        <div className="hidden md:block">
          <UserNav />
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
