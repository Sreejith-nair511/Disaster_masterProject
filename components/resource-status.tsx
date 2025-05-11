"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Ambulance, Building, Droplets, ShieldAlert, Truck } from "lucide-react"

const resources = [
  {
    name: "Emergency Response Teams",
    icon: ShieldAlert,
    available: 85,
    total: 100,
    status: "operational",
  },
  {
    name: "Rescue Vehicles",
    icon: Truck,
    available: 42,
    total: 50,
    status: "operational",
  },
  {
    name: "Medical Units",
    icon: Ambulance,
    available: 28,
    total: 35,
    status: "limited",
  },
  {
    name: "Evacuation Centers",
    icon: Building,
    available: 18,
    total: 25,
    status: "operational",
  },
  {
    name: "Water Supply Units",
    icon: Droplets,
    available: 12,
    total: 20,
    status: "critical",
  },
]

export function ResourceStatus() {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Resource Status</CardTitle>
        <CardDescription>Current availability of emergency resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <resource.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{resource.name}</span>
                </div>
                <Badge
                  variant={
                    resource.status === "operational"
                      ? "outline"
                      : resource.status === "limited"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {resource.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={(resource.available / resource.total) * 100} className="h-2" />
                <span className="text-xs text-muted-foreground">
                  {resource.available}/{resource.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
