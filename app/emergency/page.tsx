import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset } from "@/components/ui/sidebar"
import { EmergencyHeader } from "@/components/emergency-header"
import { EmergencyContacts } from "@/components/emergency-contacts"
import { SOSBroadcast } from "@/components/sos-broadcast"
import { EvacuationRoutes } from "@/components/evacuation-routes"

export default function EmergencyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <EmergencyHeader />
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <SOSBroadcast />
          <EmergencyContacts />
          <EvacuationRoutes />
        </div>
      </SidebarInset>
      <MobileNav />
    </main>
  )
}
