"use client"

import { Suspense, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

// Dynamically import the 3D map component to avoid SSR issues
const TerrainMapCanvas = dynamic(() => import("./terrain-map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-md border">
      <Skeleton className="h-[500px] w-full rounded-md" />
    </div>
  ),
})

export function TerrainMap() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card>
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <div className="h-[500px] md:h-[600px] relative">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Skeleton className="h-full w-full rounded-md" />
              </div>
            }
          >
            <TerrainMapCanvas onLoaded={() => setIsLoaded(true)} />
          </Suspense>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <div className="text-center">
                <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                <p className="text-sm text-muted-foreground">Loading 3D terrain...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
