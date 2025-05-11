"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, MapPin, Upload, Phone, Send, VibrateIcon as Vibration } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export function SOSBroadcast() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [location, setLocation] = useState("Wayanad, Kerala")
  const [emergencyType, setEmergencyType] = useState("flood")
  const [sosHistory, setSOSHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  // Load SOS history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("sos_history")
    if (savedHistory) {
      setSOSHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Get current geolocation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would reverse geocode these coordinates
          // For demo purposes, we'll just show the coordinates
          const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          setLocation(coords)
          toast({
            title: "Location Updated",
            description: `Your coordinates: ${coords}`,
          })
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to retrieve your location. Please enter manually.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      })
    }
  }

  const handleSendSOS = () => {
    setIsLoading(true)

    // Vibrate if supported (mobile devices)
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }

    // Simulate API call
    setTimeout(() => {
      // Create new SOS entry
      const newSOS = {
        id: Date.now(),
        type: emergencyType,
        location: location,
        timestamp: new Date().toISOString(),
        status: "Sent",
      }

      // Update history
      const updatedHistory = [newSOS, ...sosHistory].slice(0, 5) // Keep only last 5
      setSOSHistory(updatedHistory)

      // Save to localStorage
      localStorage.setItem("sos_history", JSON.stringify(updatedHistory))

      setIsLoading(false)
      setIsSent(true)

      toast({
        title: "SOS Broadcast Sent",
        description: "Emergency services have been notified of your situation.",
      })

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSent(false)
      }, 3000)
    }, 2000)
  }

  const emergencyContacts = [
    { name: "Police", number: "100" },
    { name: "NDRF", number: "1078" },
    { name: "Ambulance", number: "108" },
  ]

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SOS Broadcast</CardTitle>
            <CardDescription>Send emergency alerts to authorities and nearby users</CardDescription>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Emergency Type</label>
          <Select defaultValue={emergencyType} onValueChange={setEmergencyType}>
            <SelectTrigger>
              <SelectValue placeholder="Select emergency type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="landslide">Landslide</SelectItem>
              <SelectItem value="cloudburst">Cloudburst</SelectItem>
              <SelectItem value="cyclone">Cyclone</SelectItem>
              <SelectItem value="other">Other Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Location</label>
          <div className="flex items-center gap-2">
            <Input placeholder="Current location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Button variant="outline" size="icon" onClick={getCurrentLocation} title="Get current location">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Allow location access for accurate positioning</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Emergency Details</label>
          <Textarea placeholder="Describe your emergency situation..." className="min-h-[80px]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Call Emergency Services</label>
          <div className="flex flex-wrap gap-2">
            {emergencyContacts.map((contact) => (
              <Button
                key={contact.name}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  toast({
                    title: `Calling ${contact.name}`,
                    description: `Dialing ${contact.number}...`,
                  })
                }}
              >
                <Phone className="h-3 w-3" />
                <span>
                  {contact.name}: {contact.number}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Attach Media (Optional)</label>
          <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
            <div className="flex flex-col items-center">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground">Photos help emergency services assess the situation</p>
            </div>
          </div>
        </div>

        {showHistory && sosHistory.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Recent SOS History</label>
            <div className="max-h-[120px] space-y-2 overflow-auto rounded-md border p-2">
              {sosHistory.map((sos) => (
                <div key={sos.id} className="flex items-center justify-between rounded-md bg-muted/50 p-2 text-xs">
                  <div>
                    <span className="font-medium capitalize">{sos.type}</span> - {sos.location}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(sos.timestamp).toLocaleTimeString()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg bg-muted p-3">
          <h4 className="text-sm font-medium">Important Note</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            This SOS will be sent to emergency services and nearby users who can potentially help. Only use in genuine
            emergency situations.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full gap-2"
          variant="destructive"
          size="lg"
          onClick={handleSendSOS}
          disabled={isLoading || isSent}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Sending SOS...
            </>
          ) : isSent ? (
            <>
              <Send className="h-4 w-4" />
              SOS Sent Successfully
            </>
          ) : (
            <>
              <Vibration className="h-4 w-4" />
              Send SOS Broadcast
            </>
          )}
        </Button>

        <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide History" : "Show SOS History"}
        </Button>
      </CardFooter>
    </Card>
  )
}
