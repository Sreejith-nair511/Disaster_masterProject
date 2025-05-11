"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function MapLayers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map Layers</CardTitle>
        <CardDescription>Toggle visibility of different map layers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="terrain">Terrain</Label>
            <p className="text-xs text-muted-foreground">3D elevation model</p>
          </div>
          <Switch id="terrain" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="water">Water Bodies</Label>
            <p className="text-xs text-muted-foreground">Rivers, lakes and oceans</p>
          </div>
          <Switch id="water" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="disasters">Disaster Markers</Label>
            <p className="text-xs text-muted-foreground">Active and predicted disasters</p>
          </div>
          <Switch id="disasters" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="infrastructure">Infrastructure</Label>
            <p className="text-xs text-muted-foreground">Roads, buildings and facilities</p>
          </div>
          <Switch id="infrastructure" defaultChecked />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="opacity">Layer Opacity</Label>
            <span className="text-xs text-muted-foreground">75%</span>
          </div>
          <Slider id="opacity" defaultValue={[75]} max={100} step={1} />
        </div>
      </CardContent>
    </Card>
  )
}
