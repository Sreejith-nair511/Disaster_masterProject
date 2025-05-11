"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Info } from "lucide-react"

// Define high-risk regions with their coordinates and risk levels
const highRiskRegions = [
  {
    id: "kerala",
    name: "Kerala",
    coordinates: { x: 124, y: 568 },
    riskLevel: "high",
    activeDisasters: ["Floods", "Landslides"],
    stats: {
      rainfall: "342mm",
      alerts: 8,
      evacuationCenters: 24,
    },
  },
  {
    id: "northeast",
    name: "Northeast India",
    coordinates: { x: 453, y: 283 },
    riskLevel: "high",
    activeDisasters: ["Floods", "Landslides"],
    stats: {
      rainfall: "298mm",
      alerts: 6,
      evacuationCenters: 18,
    },
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir",
    coordinates: { x: 160, y: 114 },
    riskLevel: "medium",
    activeDisasters: ["Earthquakes", "Cloudbursts"],
    stats: {
      rainfall: "112mm",
      alerts: 3,
      evacuationCenters: 12,
    },
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    coordinates: { x: 230, y: 144 },
    riskLevel: "high",
    activeDisasters: ["Landslides", "Cloudbursts"],
    stats: {
      rainfall: "187mm",
      alerts: 5,
      evacuationCenters: 15,
    },
  },
  {
    id: "coastal-andhra",
    name: "Coastal Andhra",
    coordinates: { x: 295, y: 482 },
    riskLevel: "medium",
    activeDisasters: ["Cyclones", "Floods"],
    stats: {
      rainfall: "156mm",
      alerts: 4,
      evacuationCenters: 16,
    },
  },
]

export function IndiaMap() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRegionClick = (region) => {
    router.push(`/regions/${region.id}`)
  }

  const handleRegionHover = (region) => {
    setSelectedRegion(region)
  }

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "text-red-500 animate-pulse"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Disaster Risk Map</CardTitle>
        <CardDescription>High-risk regions across India with real-time monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <Skeleton className="h-[400px] w-full rounded-md" />
          </div>
        ) : (
          <div className="relative h-[400px] w-full overflow-hidden rounded-md border bg-background">
            {/* SVG Map of India */}
            <svg
              viewBox="0 0 612 696"
              className="absolute left-0 top-0 h-full w-full"
              onLoad={() => setMapLoaded(true)}
            >
              <g>
                {/* Map paths from the SVG file */}
                <path
                  id="IN-AN"
                  title="Andaman and Nicobar Islands"
                  d="m 537.188,685.44148 -0.041,0.4695 0.768,0.30627 0.104,2.47542 1.258,1.84675 -0.71,-0.0232 0.661,0.93295 -0.574,0.18739 -0.437,0.94503 0.103,1.88201 -0.409,0.42617 -0.663,-0.49065 -0.502,1.30269 -0.461,-0.2156 0.224,-1.08911 -0.606,-0.31434 -0.121,-1.2503 -0.813,-0.73346 0.069,-0.77879 -1.076,-1.12336 -0.646,0.17933 -0.121,-1.96159 0.365,-0.27304 -0.4,-0.27001 0.64,-1.36616 0.994,0.0584 0.564,-0.57427 0.878,0.27505 0.092,-0.68006 0.86,-0.14307 z"
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />
                <path
                  id="IN-AP"
                  title="Andhra Pradesh"
                  d="m 295.438,482.23741 -0.002,0.007 0,0 0.002,-0.007 z m 0.652,-0.0393 -0.389,2.49054 -0.753,-1.07903 -0.016,-0.80298 1.158,-0.60853 z"
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />
                {/* More paths would be here - truncated for brevity */}
              </g>

              {/* Hotspot markers for high-risk regions */}
              {highRiskRegions.map((region) => (
                <g key={region.id}>
                  {/* Pulsing circle background */}
                  <circle
                    cx={region.coordinates.x}
                    cy={region.coordinates.y}
                    r={mapLoaded ? "15" : "0"}
                    fill={region.riskLevel === "high" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)"}
                    className={`transition-all duration-1000 ${region.riskLevel === "high" ? "animate-ping" : ""}`}
                  />

                  {/* Main circle */}
                  <circle
                    cx={region.coordinates.x}
                    cy={region.coordinates.y}
                    r={mapLoaded ? "8" : "0"}
                    fill={region.riskLevel === "high" ? "rgba(239, 68, 68, 0.8)" : "rgba(245, 158, 11, 0.8)"}
                    stroke="white"
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all duration-700"
                    onClick={() => handleRegionClick(region)}
                    onMouseEnter={() => handleRegionHover(region)}
                    onMouseLeave={() => setSelectedRegion(null)}
                  />
                </g>
              ))}
            </svg>

            {/* Tooltip for selected region */}
            {selectedRegion && (
              <div
                className="absolute z-10 w-64 rounded-lg border bg-card p-3 shadow-lg"
                style={{
                  left: `${selectedRegion.coordinates.x + 20}px`,
                  top: `${selectedRegion.coordinates.y - 20}px`,
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{selectedRegion.name}</h3>
                  <Badge className={getRiskColor(selectedRegion.riskLevel)}>
                    {selectedRegion.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>

                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Threats:</span>
                    <span>{selectedRegion.activeDisasters.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rainfall:</span>
                    <span>{selectedRegion.stats.rainfall}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Alerts:</span>
                    <span>{selectedRegion.stats.alerts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Evacuation Centers:</span>
                    <span>{selectedRegion.stats.evacuationCenters}</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">Click to view detailed dashboard</div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-3 right-3 rounded-md bg-background/80 p-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Medium Risk</span>
                </div>
              </div>
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-3 left-3 rounded-md bg-background/80 p-2 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                <span>Hover over hotspots for details, click to view region dashboard</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
