"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, AlertTriangle } from "lucide-react"

export function EvacuationRoutes() {
  const [selectedRegion, setSelectedRegion] = useState("kerala")
  const [routeDetails, setRouteDetails] = useState(false)

  const evacuationRoutes = {
    kerala: [
      {
        id: 1,
        name: "Wayanad Hill Route",
        type: "Primary",
        distance: "12 km",
        status: "Clear",
        description: "Evacuation route through eastern hills, accessible by vehicle and on foot.",
      },
      {
        id: 2,
        name: "Kozhikode Coastal Path",
        type: "Secondary",
        distance: "18 km",
        status: "Partially Blocked",
        description: "Coastal evacuation route with potential flooding in sections.",
      },
      {
        id: 3,
        name: "Munnar Emergency Exit",
        type: "Emergency",
        distance: "8 km",
        status: "Clear",
        description: "High-altitude evacuation path for landslide-prone areas.",
      },
    ],
    northeast: [
      {
        id: 1,
        name: "Guwahati River Bypass",
        type: "Primary",
        distance: "15 km",
        status: "Clear",
        description: "Main evacuation route avoiding flood-prone river areas.",
      },
      {
        id: 2,
        name: "Shillong Highland Path",
        type: "Secondary",
        distance: "22 km",
        status: "Clear",
        description: "Mountain evacuation route for northeastern communities.",
      },
    ],
    "jammu-kashmir": [
      {
        id: 1,
        name: "Srinagar Valley Exit",
        type: "Primary",
        distance: "25 km",
        status: "Clear",
        description: "Main valley evacuation route for earthquake scenarios.",
      },
      {
        id: 2,
        name: "Anantnag Emergency Path",
        type: "Emergency",
        distance: "14 km",
        status: "Monitoring",
        description: "Alternative route for cloudburst and flash flood events.",
      },
    ],
    uttarakhand: [
      {
        id: 1,
        name: "Chamoli Mountain Escape",
        type: "Primary",
        distance: "16 km",
        status: "Clear",
        description: "Primary evacuation route for landslide-prone mountain areas.",
      },
      {
        id: 2,
        name: "Nainital Lake Bypass",
        type: "Secondary",
        distance: "11 km",
        status: "Clear",
        description: "Secondary route avoiding potential lake flooding zones.",
      },
    ],
    "coastal-andhra": [
      {
        id: 1,
        name: "Coastal Cyclone Escape",
        type: "Primary",
        distance: "30 km",
        status: "Clear",
        description: "Main inland evacuation route for coastal communities.",
      },
      {
        id: 2,
        name: "Krishna Delta Bypass",
        type: "Secondary",
        distance: "20 km",
        status: "Monitoring",
        description: "Alternative route for flood-prone delta regions.",
      },
    ],
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Clear":
        return "bg-green-500/10 text-green-500"
      case "Partially Blocked":
        return "bg-amber-500/10 text-amber-500"
      case "Blocked":
        return "bg-red-500/10 text-red-500"
      case "Monitoring":
        return "bg-blue-500/10 text-blue-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "Primary":
        return "bg-blue-500/10 text-blue-500"
      case "Secondary":
        return "bg-purple-500/10 text-purple-500"
      case "Emergency":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Evacuation Routes</CardTitle>
            <CardDescription>Available evacuation paths for emergency situations</CardDescription>
          </div>
          <Navigation className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kerala">Kerala</SelectItem>
            <SelectItem value="northeast">Northeast India</SelectItem>
            <SelectItem value="jammu-kashmir">Jammu & Kashmir</SelectItem>
            <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
            <SelectItem value="coastal-andhra">Coastal Andhra</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-3">
          {evacuationRoutes[selectedRegion]?.map((route) => (
            <div key={route.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{route.name}</span>
                </div>
                <Badge variant="outline" className={getStatusColor(route.status)}>
                  {route.status}
                </Badge>
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className={getTypeColor(route.type)}>
                  {route.type}
                </Badge>
                <span>{route.distance}</span>
              </div>

              {routeDetails && (
                <div className="mt-2 text-xs">
                  <p className="text-muted-foreground">{route.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={() => setRouteDetails(!routeDetails)}>
          {routeDetails ? "Hide Details" : "Show Route Details"}
        </Button>

        <div className="rounded-md bg-amber-500/10 p-2 text-xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
            <p className="text-amber-500">
              Routes may change based on real-time conditions. Always follow official instructions during emergencies.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
