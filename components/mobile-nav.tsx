"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Map, AlertTriangle, BarChart2, FileText } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t bg-background md:hidden">
      <NavItem href="/" icon={<Home className="h-5 w-5" />} label="Home" isActive={pathname === "/"} />
      <NavItem
        href="/predictions"
        icon={<BarChart2 className="h-5 w-5" />}
        label="Predict"
        isActive={pathname === "/predictions"}
      />
      <NavItem href="/maps" icon={<Map className="h-5 w-5" />} label="Maps" isActive={pathname === "/maps"} />
      <NavItem
        href="/emergency"
        icon={<AlertTriangle className="h-5 w-5" />}
        label="SOS"
        isActive={pathname === "/emergency"}
      />
      <NavItem
        href="/reports"
        icon={<FileText className="h-5 w-5" />}
        label="Reports"
        isActive={pathname === "/reports"}
      />
    </div>
  )
}

function NavItem({ href, icon, label, isActive }) {
  return (
    <Link href={href} className="flex w-full flex-col items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "flex h-12 w-12 flex-col items-center justify-center rounded-full",
          isActive && "bg-muted text-primary",
        )}
      >
        {icon}
      </Button>
      <span className="mt-1 text-[10px] font-medium">{label}</span>
    </Link>
  )
}
