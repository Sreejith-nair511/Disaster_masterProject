"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AlertTriangle, BarChart3, Bell, Home, Map, MessageSquare, Phone, Settings } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Predictions",
    href: "/predictions",
    icon: BarChart3,
  },
  {
    name: "Maps",
    href: "/maps",
    icon: Map,
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: AlertTriangle,
  },
  {
    name: "Chatbot",
    href: "/chatbot",
    icon: MessageSquare,
  },
  {
    name: "Emergency",
    href: "/emergency",
    icon: Phone,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Button
            key={item.href}
            variant={isActive ? "default" : "ghost"}
            className={cn("justify-start gap-2", isActive && "bg-primary text-primary-foreground")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
