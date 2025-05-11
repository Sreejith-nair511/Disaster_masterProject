"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Brain, RefreshCw } from "lucide-react"

export function DisasterPredictionEngine() {
  const [region, setRegion] = useState("kerala")
  const [disasterType, setDisasterType] = useState("flood")
  const [timeframe, setTimeframe] = useState("7")
  const [rainfallIntensity, setRainfallIntensity] = useState([50])
  const [seismicActivity, setSeismicActivity] = useState([20])
  const [windSpeed, setWindSpeed] = useState([30])
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState(null)

  const handlePredict = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const result = {
        probability: Math.floor(Math.random() * 100),
        severity: Math.random() > 0.5 ? "high" : "medium",
        timeToImpact: Math.floor(Math.random() * 48) + 1,
      }
      setPredictionResult(result)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Prediction Engine</CardTitle>
            <CardDescription>Simulate disaster scenarios and predict outcomes</CardDescription>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Brain className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <Select value={region} onValueChange={setRegion}>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Disaster Type</label>
          <Select value={disasterType} onValueChange={setDisasterType}>
            <SelectTrigger>
              <SelectValue placeholder="Select disaster type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="landslide">Landslide</SelectItem>
              <SelectItem value="cloudburst">Cloudburst</SelectItem>
              <SelectItem value="cyclone">Cyclone</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prediction Timeframe (days)</label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 day</SelectItem>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Rainfall Intensity</label>
            <span className="text-xs text-muted-foreground">{rainfallIntensity}%</span>
          </div>
          <Slider value={rainfallIntensity} onValueChange={setRainfallIntensity} max={100} step={1} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Seismic Activity</label>
            <span className="text-xs text-muted-foreground">{seismicActivity}%</span>
          </div>
          <Slider value={seismicActivity} onValueChange={setSeismicActivity} max={100} step={1} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Wind Speed</label>
            <span className="text-xs text-muted-foreground">{windSpeed}%</span>
          </div>
          <Slider value={windSpeed} onValueChange={setWindSpeed} max={100} step={1} />
        </div>

        {predictionResult && (
          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Prediction Result</h4>
              <Badge variant={predictionResult.severity === "high" ? "destructive" : "secondary"}>
                {predictionResult.severity} risk
              </Badge>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                <span className="font-medium">Probability:</span> {predictionResult.probability}%
              </p>
              <p className="text-sm">
                <span className="font-medium">Time to Impact:</span> {predictionResult.timeToImpact} hours
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePredict} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Generate Prediction"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
