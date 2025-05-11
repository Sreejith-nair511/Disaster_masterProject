"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-md border">
      <Skeleton className="h-[300px] w-full rounded-md" />
    </div>
  ),
})

export function RegionalRiskMap() {
  const [activeTab, setActiveTab] = useState("kerala")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Card className="col-span-full md:col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Regional Risk Map</CardTitle>
        <CardDescription>Current disaster risk levels across high-risk regions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kerala" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="kerala">Kerala</TabsTrigger>
            <TabsTrigger value="northeast">Northeast</TabsTrigger>
            <TabsTrigger value="jammu-kashmir">J&K</TabsTrigger>
            <TabsTrigger value="uttarakhand">Uttarakhand</TabsTrigger>
            <TabsTrigger value="coastal-andhra">Coastal Andhra</TabsTrigger>
          </TabsList>
          {isClient && (
            <>
              <TabsContent value="kerala">
                <MapComponent region="kerala" />
              </TabsContent>
              <TabsContent value="northeast">
                <MapComponent region="northeast" />
              </TabsContent>
              <TabsContent value="jammu-kashmir">
                <MapComponent region="jammu-kashmir" />
              </TabsContent>
              <TabsContent value="uttarakhand">
                <MapComponent region="uttarakhand" />
              </TabsContent>
              <TabsContent value="coastal-andhra">
                <MapComponent region="coastal-andhra" />
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
