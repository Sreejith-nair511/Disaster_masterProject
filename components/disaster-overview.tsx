"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Mountain, Wind } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const disasterTypes = [
  {
    name: "Floods",
    icon: Droplets,
    color: "text-disaster-flood",
    bgColor: "bg-disaster-flood/10",
    activeCount: 3,
    warningCount: 7,
    trend: "increasing",
  },
  {
    name: "Earthquakes",
    icon: Mountain,
    color: "text-disaster-earthquake",
    bgColor: "bg-disaster-earthquake/10",
    activeCount: 0,
    warningCount: 2,
    trend: "stable",
  },
  {
    name: "Cloudbursts",
    icon: Cloud,
    color: "text-disaster-cloudburst",
    bgColor: "bg-disaster-cloudburst/10",
    activeCount: 1,
    warningCount: 4,
    trend: "increasing",
  },
  {
    name: "Landslides",
    icon: Mountain,
    color: "text-disaster-landslide",
    bgColor: "bg-disaster-landslide/10",
    activeCount: 2,
    warningCount: 5,
    trend: "stable",
  },
  {
    name: "Cyclones",
    icon: Wind,
    color: "text-disaster-cyclone",
    bgColor: "bg-disaster-cyclone/10",
    activeCount: 1,
    warningCount: 3,
    trend: "decreasing",
  },
]

export function DisasterOverview() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Disaster Overview</CardTitle>
        <CardDescription>Current active disasters and warnings across monitored regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {disasterTypes.map((disaster) => (
            <div key={disaster.name} className={`flex flex-col rounded-lg p-4 ${disaster.bgColor}`}>
              <div className="mb-2 flex items-center justify-between">
                <disaster.icon className={`h-5 w-5 ${disaster.color}`} />
                <Badge
                  variant={
                    disaster.trend === "increasing"
                      ? "destructive"
                      : disaster.trend === "decreasing"
                        ? "outline"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {disaster.trend === "increasing" ? "↑" : disaster.trend === "decreasing" ? "↓" : "→"}
                </Badge>
              </div>
              <h3 className="text-sm font-medium">{disaster.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="text-lg font-bold">{disaster.activeCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                  <p className="text-lg font-bold">{disaster.warningCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
