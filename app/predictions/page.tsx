import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset } from "@/components/ui/sidebar"
import { PredictionsHeader } from "@/components/predictions-header"
import { DisasterPredictionEngine } from "@/components/disaster-prediction-engine"
import { PredictionTimeline } from "@/components/prediction-timeline"
import { RiskFactorAnalysis } from "@/components/risk-factor-analysis"

export default function PredictionsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <PredictionsHeader />
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <DisasterPredictionEngine />
          <PredictionTimeline />
          <RiskFactorAnalysis />
        </div>
      </SidebarInset>
      <MobileNav />
    </main>
  )
}
