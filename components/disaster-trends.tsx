"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Simulated trend data
const floodData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 25 },
  { month: "Apr", value: 30 },
  { month: "May", value: 45 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 80 },
  { month: "Aug", value: 75 },
  { month: "Sep", value: 60 },
  { month: "Oct", value: 40 },
  { month: "Nov", value: 25 },
  { month: "Dec", value: 15 },
]

const earthquakeData = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 8 },
  { month: "Mar", value: 12 },
  { month: "Apr", value: 7 },
  { month: "May", value: 10 },
  { month: "Jun", value: 15 },
  { month: "Jul", value: 8 },
  { month: "Aug", value: 12 },
  { month: "Sep", value: 9 },
  { month: "Oct", value: 11 },
  { month: "Nov", value: 7 },
  { month: "Dec", value: 6 },
]

const landslideData = [
  { month: "Jan", value: 2 },
  { month: "Feb", value: 5 },
  { month: "Mar", value: 10 },
  { month: "Apr", value: 15 },
  { month: "May", value: 25 },
  { month: "Jun", value: 35 },
  { month: "Jul", value: 45 },
  { month: "Aug", value: 40 },
  { month: "Sep", value: 30 },
  { month: "Oct", value: 20 },
  { month: "Nov", value: 10 },
  { month: "Dec", value: 5 },
]

const cloudburstData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 2 },
  { month: "Mar", value: 5 },
  { month: "Apr", value: 8 },
  { month: "May", value: 15 },
  { month: "Jun", value: 25 },
  { month: "Jul", value: 30 },
  { month: "Aug", value: 28 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 10 },
  { month: "Nov", value: 5 },
  { month: "Dec", value: 2 },
]

const cycloneData = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 3 },
  { month: "Mar", value: 2 },
  { month: "Apr", value: 5 },
  { month: "May", value: 15 },
  { month: "Jun", value: 10 },
  { month: "Jul", value: 5 },
  { month: "Aug", value: 8 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 30 },
  { month: "Nov", value: 25 },
  { month: "Dec", value: 10 },
]

export function DisasterTrends() {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Disaster Trends</CardTitle>
        <CardDescription>Annual patterns of disaster occurrences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="floods" className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="floods">Floods</TabsTrigger>
            <TabsTrigger value="earthquakes">Earthquakes</TabsTrigger>
            <TabsTrigger value="landslides">Landslides</TabsTrigger>
            <TabsTrigger value="cloudbursts">Cloudbursts</TabsTrigger>
            <TabsTrigger value="cyclones">Cyclones</TabsTrigger>
          </TabsList>
          <TabsContent value="floods">
            <ChartContainer
              config={{
                value: {
                  label: "Flood Risk Index",
                  color: "hsl(var(--disaster-flood))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={floodData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    stroke="var(--color-value)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="earthquakes">
            <ChartContainer
              config={{
                value: {
                  label: "Earthquake Risk Index",
                  color: "hsl(var(--disaster-earthquake))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earthquakeData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    stroke="var(--color-value)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="landslides">
            <ChartContainer
              config={{
                value: {
                  label: "Landslide Risk Index",
                  color: "hsl(var(--disaster-landslide))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={landslideData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    stroke="var(--color-value)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="cloudbursts">
            <ChartContainer
              config={{
                value: {
                  label: "Cloudburst Risk Index",
                  color: "hsl(var(--disaster-cloudburst))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cloudburstData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    stroke="var(--color-value)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="cyclones">
            <ChartContainer
              config={{
                value: {
                  label: "Cyclone Risk Index",
                  color: "hsl(var(--disaster-cyclone))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycloneData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    stroke="var(--color-value)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
