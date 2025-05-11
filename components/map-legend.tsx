"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MapLegend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map Legend</CardTitle>
        <CardDescription>Understand map symbols and colors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Disaster Types</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-disaster-flood"></div>
              <span className="text-xs">Floods</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-disaster-earthquake"></div>
              <span className="text-xs">Earthquakes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-disaster-landslide"></div>
              <span className="text-xs">Landslides</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-disaster-cloudburst"></div>
              <span className="text-xs">Cloudbursts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-disaster-cyclone"></div>
              <span className="text-xs">Cyclones</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Risk Levels</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-red-500"></div>
              <span className="text-xs">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              <span className="text-xs">Low Risk</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Terrain Features</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-green-700"></div>
              <span className="text-xs">Forest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-blue-600"></div>
              <span className="text-xs">Water Bodies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-gray-400"></div>
              <span className="text-xs">Urban Areas</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
