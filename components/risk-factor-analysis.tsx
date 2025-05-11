"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Simulated risk factor data
const riskFactorData = [
  { factor: "Rainfall", value: 85 },
  { factor: "Terrain", value: 70 },
  { factor: "Deforestation", value: 65 },
  { factor: "Infrastructure", value: 55 },
  { factor: "Population", value: 45 },
  { factor: "Drainage", value: 40 },
  { factor: "Soil Type", value: 35 },
]

export function RiskFactorAnalysis() {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Risk Factor Analysis</CardTitle>
        <CardDescription>Key factors contributing to disaster risk</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Risk Contribution (%)",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskFactorData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis
                dataKey="factor"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                width={100}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
