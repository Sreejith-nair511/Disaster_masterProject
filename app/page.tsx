import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DisasterOverview } from "@/components/disaster-overview"
import { RecentAlerts } from "@/components/recent-alerts"
import { IndiaMap } from "@/components/india-map"
import { PredictionTimeline } from "@/components/prediction-timeline"
import { ResourceStatus } from "@/components/resource-status"

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <DashboardHeader
          heading="Disaster Prediction Dashboard"
          description="Real-time monitoring and prediction for high-risk regions"
        />
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <DisasterOverview />
          <RecentAlerts />
          <IndiaMap />
          <PredictionTimeline />
          <ResourceStatus />
        </div>
      </SidebarInset>
      <MobileNav />
    </main>
  )
}
