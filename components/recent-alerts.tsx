"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, CloudRain, Droplets, Mountain, Wind } from "lucide-react"

const alerts = [
  {
    id: 1,
    title: "Flood Warning",
    location: "Wayanad, Kerala",
    timestamp: "2 hours ago",
    severity: "high",
    description: "Heavy rainfall expected to cause flooding in low-lying areas",
    icon: Droplets,
    color: "text-disaster-flood",
  },
  {
    id: 2,
    title: "Landslide Alert",
    location: "Munnar, Kerala",
    timestamp: "3 hours ago",
    severity: "medium",
    description: "Potential landslides due to continuous rainfall in hilly regions",
    icon: Mountain,
    color: "text-disaster-landslide",
  },
  {
    id: 3,
    title: "Cyclone Warning",
    location: "Coastal Andhra Pradesh",
    timestamp: "5 hours ago",
    severity: "high",
    description: "Cyclone forming in Bay of Bengal, expected to make landfall in 48 hours",
    icon: Wind,
    color: "text-disaster-cyclone",
  },
  {
    id: 4,
    title: "Heavy Rainfall Alert",
    location: "Uttarakhand",
    timestamp: "6 hours ago",
    severity: "medium",
    description: "Continuous heavy rainfall may lead to flash floods in mountainous regions",
    icon: CloudRain,
    color: "text-disaster-cloudburst",
  },
]

export function RecentAlerts() {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest disaster warnings and alerts</CardDescription>
        </div>
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  alert.severity === "high" ? "bg-destructive/10" : "bg-yellow-500/10"
                }`}
              >
                <alert.icon
                  className={`h-4 w-4 ${alert.severity === "high" ? "text-destructive" : "text-yellow-500"}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <Badge variant={alert.severity === "high" ? "destructive" : "outline"} className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {alert.location} • {alert.timestamp}
                </p>
                <p className="mt-1 text-xs">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" size="sm">
          View all alerts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
