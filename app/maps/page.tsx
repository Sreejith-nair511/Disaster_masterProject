import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset } from "@/components/ui/sidebar"
import { MapsHeader } from "@/components/maps-header"
import { TerrainMap } from "@/components/terrain-map"
import { MapLayers } from "@/components/map-layers"
import { MapLegend } from "@/components/map-legend"

export default function MapsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AppSidebar />
      <SidebarInset className="pb-16 md:pb-0">
        <MapsHeader />
        <div className="grid gap-4 p-4 md:grid-cols-4">
          <div className="col-span-full md:col-span-3">
            <TerrainMap />
          </div>
          <div className="col-span-full md:col-span-1 space-y-4">
            <MapLayers />
            <MapLegend />
          </div>
        </div>
      </SidebarInset>
      <MobileNav />
    </main>
  )
}
