import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset } from "@/components/ui/sidebar"
import { ReportsHeader } from "@/components/reports-header"
import { ReportForm } from "@/components/report-form"
import { CommunityReports } from "@/components/community-reports"

export default function ReportsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <ReportsHeader />
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <ReportForm />
          <CommunityReports />
        </div>
      </SidebarInset>
      <MobileNav />
    </main>
  )
}
