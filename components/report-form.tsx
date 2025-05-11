"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, MapPin, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ReportForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [location, setLocation] = useState("")
  const [disasterType, setDisasterType] = useState("")
  const [description, setDescription] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would reverse geocode these coordinates
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
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, we would send the data to the server
      // For demo, we'll just store in IndexedDB

      // Create a report object
      const report = {
        id: Date.now(),
        type: disasterType,
        location: location,
        description: description,
        contactNumber: contactNumber,
        imageUrl: previewUrl,
        timestamp: new Date().toISOString(),
        status: "pending",
      }

      // Store in IndexedDB or localStorage
      const existingReports = JSON.parse(localStorage.getItem("community_reports") || "[]")
      localStorage.setItem("community_reports", JSON.stringify([report, ...existingReports]))

      // Reset form
      setDisasterType("")
      setLocation("")
      setDescription("")
      setContactNumber("")
      setSelectedImage(null)
      setPreviewUrl(null)

      setIsSubmitting(false)

      toast({
        title: "Report Submitted",
        description: "Thank you for your report. It will be reviewed by our team.",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Disaster Report</CardTitle>
        <CardDescription>Report a disaster or hazardous situation in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="disaster-type">Disaster Type</Label>
            <Select value={disasterType} onValueChange={setDisasterType} required>
              <SelectTrigger id="disaster-type">
                <SelectValue placeholder="Select disaster type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="landslide">Landslide</SelectItem>
                <SelectItem value="cloudburst">Cloudburst</SelectItem>
                <SelectItem value="cyclone">Cyclone</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Button type="button" variant="outline" size="icon" onClick={getCurrentLocation}>
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the situation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Upload Image/Video (Optional)</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
                <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="mb-2 h-32 w-auto rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1"
                        onClick={() => {
                          setSelectedImage(null)
                          setPreviewUrl(null)
                        }}
                      >
                        <span>×</span>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload image or video</p>
                    </>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">
              Contact Number (Optional)
              <span className="ml-1 text-xs text-muted-foreground">For rescue team callback</span>
            </Label>
            <Input
              id="contact"
              type="tel"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !disasterType || !location || !description}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Submitting...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Submit Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
