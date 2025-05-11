"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZoomIn, ZoomOut, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulated prediction data
const predictionData = [
  { day: "Day 1", flood: 30, landslide: 10, earthquake: 5, cyclone: 2 },
  { day: "Day 2", flood: 40, landslide: 15, earthquake: 8, cyclone: 5 },
  { day: "Day 3", flood: 55, landslide: 25, earthquake: 10, cyclone: 8 },
  { day: "Day 4", flood: 70, landslide: 35, earthquake: 12, cyclone: 15 },
  { day: "Day 5", flood: 85, landslide: 45, earthquake: 15, cyclone: 25 },
  { day: "Day 6", flood: 75, landslide: 40, earthquake: 10, cyclone: 30 },
  { day: "Day 7", flood: 60, landslide: 30, earthquake: 8, cyclone: 20 },
]

const predictions = [
  {
    id: 1,
    type: "flood",
    location: "Wayanad, Kerala",
    probability: 85,
    timeframe: "3-5 days",
    severity: "high",
  },
  {
    id: 2,
    type: "landslide",
    location: "Munnar, Kerala",
    probability: 65,
    timeframe: "2-4 days",
    severity: "medium",
  },
  {
    id: 3,
    type: "earthquake",
    location: "Srinagar, J&K",
    probability: 35,
    timeframe: "5-7 days",
    severity: "low",
  },
  {
    id: 4,
    type: "cyclone",
    location: "Visakhapatnam, Andhra",
    probability: 72,
    timeframe: "6-8 days",
    severity: "high",
  },
]

export function PredictionTimeline() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeTab, setActiveTab] = useState("chart")

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.5)
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.5)
  }

  return (
    <Card className="col-span-full md:col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Prediction Timeline</CardTitle>
          <CardDescription>7-day forecast of disaster probabilities</CardDescription>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[180px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <div className="flex items-center justify-end space-x-2 pb-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 2}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <div style={{ height: `${200 * zoomLevel}px`, overflow: "auto" }}>
              <ChartContainer
                config={{
                  flood: {
                    label: "Flood Risk",
                    color: "hsl(var(--disaster-flood))",
                  },
                  landslide: {
                    label: "Landslide Risk",
                    color: "hsl(var(--disaster-landslide))",
                  },
                  earthquake: {
                    label: "Earthquake Risk",
                    color: "hsl(var(--disaster-earthquake))",
                  },
                  cyclone: {
                    label: "Cyclone Risk",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="min-h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={predictionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />
                    <Area
                      type="monotone"
                      dataKey="flood"
                      stackId="1"
                      stroke="var(--color-flood)"
                      fill="var(--color-flood)"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="landslide"
                      stackId="2"
                      stroke="var(--color-landslide)"
                      fill="var(--color-landslide)"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="earthquake"
                      stackId="3"
                      stroke="var(--color-earthquake)"
                      fill="var(--color-earthquake)"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="cyclone"
                      stackId="4"
                      stroke="var(--color-primary)"
                      fill="var(--color-primary)"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Top Predictions</h3>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>7-Day Forecast</span>
              </Badge>
            </div>

            <div className="space-y-3 mt-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-disaster-${prediction.type}/10`}
                  >
                    <span className={`text-xs font-bold text-disaster-${prediction.type}`}>
                      {prediction.probability}%
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium capitalize">{prediction.type} Prediction</h4>
                      <Badge
                        variant={
                          prediction.severity === "high"
                            ? "destructive"
                            : prediction.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {prediction.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {prediction.location} • {prediction.timeframe}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
