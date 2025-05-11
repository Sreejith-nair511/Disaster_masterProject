"use client"

import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import { Skeleton } from "@/components/ui/skeleton"

// Define region coordinates
const regionCoordinates = {
  kerala: { center: [10.8505, 76.2711], zoom: 7 },
  northeast: { center: [25.467, 91.3662], zoom: 6 },
  "jammu-kashmir": { center: [33.7782, 76.5762], zoom: 7 },
  uttarakhand: { center: [30.0668, 79.0193], zoom: 7 },
  "coastal-andhra": { center: [16.5089, 80.6419], zoom: 7 },
}

// Simulated disaster data for each region
const disasterData = {
  kerala: [
    {
      id: 1,
      type: "flood",
      location: [10.5276, 76.2144],
      radius: 20000,
      severity: "high",
      details: "Severe flooding in Thrissur district",
    },
    {
      id: 2,
      type: "landslide",
      location: [11.2588, 75.7804],
      radius: 10000,
      severity: "medium",
      details: "Potential landslides in Kozhikode hills",
    },
    {
      id: 3,
      type: "flood",
      location: [9.9312, 76.2673],
      radius: 15000,
      severity: "high",
      details: "Flooding in Ernakulam due to heavy rainfall",
    },
  ],
  northeast: [
    {
      id: 1,
      type: "flood",
      location: [26.1445, 91.7362],
      radius: 25000,
      severity: "high",
      details: "Brahmaputra river flooding in Guwahati",
    },
    {
      id: 2,
      type: "landslide",
      location: [25.5788, 91.8933],
      radius: 8000,
      severity: "medium",
      details: "Landslide risk in Shillong hills",
    },
  ],
  "jammu-kashmir": [
    {
      id: 1,
      type: "earthquake",
      location: [34.0837, 74.7973],
      radius: 30000,
      severity: "medium",
      details: "Seismic activity detected near Srinagar",
    },
    {
      id: 2,
      type: "cloudburst",
      location: [33.9456, 75.3418],
      radius: 12000,
      severity: "high",
      details: "Cloudburst warning in Anantnag district",
    },
  ],
  uttarakhand: [
    {
      id: 1,
      type: "landslide",
      location: [30.7333, 79.0667],
      radius: 15000,
      severity: "high",
      details: "High risk of landslides in Chamoli",
    },
    {
      id: 2,
      type: "cloudburst",
      location: [29.3919, 79.4542],
      radius: 10000,
      severity: "medium",
      details: "Potential cloudburst in Nainital region",
    },
  ],
  "coastal-andhra": [
    {
      id: 1,
      type: "cyclone",
      location: [16.0, 82.0],
      radius: 50000,
      severity: "high",
      details: "Cyclone forming in Bay of Bengal",
    },
    {
      id: 2,
      type: "flood",
      location: [16.5062, 80.648],
      radius: 20000,
      severity: "medium",
      details: "Potential flooding in Krishna delta",
    },
  ],
}

// Custom icon for markers
const createCustomIcon = (type) => {
  return L.divIcon({
    className: `disaster-icon ${type}`,
    html: getIconHtml(type),
    iconSize: [40, 40],
  })
}

// Get HTML for icon based on disaster type
const getIconHtml = (type) => {
  switch (type) {
    case "flood":
      return '<i class="lucide-droplets"></i>'
    case "earthquake":
      return '<i class="lucide-activity"></i>'
    case "landslide":
      return '<i class="lucide-mountain"></i>'
    case "cloudburst":
      return '<i class="lucide-cloud"></i>'
    case "cyclone":
      return '<i class="lucide-wind"></i>'
    default:
      return '<i class="lucide-alert-triangle"></i>'
  }
}

// Get color based on severity
const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "#ef4444"
    case "medium":
      return "#f59e0b"
    case "low":
      return "#3b82f6"
    default:
      return "#6b7280"
  }
}

export default function MapComponent({ region }) {
  const [mapReady, setMapReady] = useState(false)
  const { center, zoom } = regionCoordinates[region] || regionCoordinates.kerala
  const disasters = disasterData[region] || []

  useEffect(() => {
    setMapReady(true)
  }, [])

  if (!mapReady) {
    return <Skeleton className="h-[300px] w-full rounded-md" />
  }

  return (
    <div className="h-[300px] overflow-hidden rounded-md border">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {disasters.map((disaster) => (
          <div key={disaster.id}>
            <Circle
              center={disaster.location}
              radius={disaster.radius}
              pathOptions={{
                color: getSeverityColor(disaster.severity),
                fillColor: getSeverityColor(disaster.severity),
                fillOpacity: 0.2,
              }}
            />
            <Marker position={disaster.location} icon={createCustomIcon(disaster.type)}>
              <Popup>
                <div className="p-1">
                  <h3 className="text-sm font-medium capitalize">{disaster.type} Alert</h3>
                  <p className="text-xs text-muted-foreground">Severity: {disaster.severity}</p>
                  <p className="mt-1 text-xs">{disaster.details}</p>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
