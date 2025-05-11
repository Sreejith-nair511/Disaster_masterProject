"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, MapPin, Calendar, CheckCircle, AlertTriangle, Filter } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CommunityReports() {
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRegion, setFilterRegion] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem("community_reports") || "[]")

    // If no saved reports, create some sample data
    if (savedReports.length === 0) {
      const sampleReports = [
        {
          id: 1,
          type: "flood",
          location: "Wayanad, Kerala",
          description: "Water level rising rapidly in Kabini river. Several houses submerged.",
          contactNumber: "9876543210",
          imageUrl: "/placeholder.svg?height=200&width=300",
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          status: "verified",
        },
        {
          id: 2,
          type: "landslide",
          location: "Munnar, Kerala",
          description: "Major landslide on the highway. Road blocked, vehicles stranded.",
          contactNumber: "",
          imageUrl: "/placeholder.svg?height=200&width=300",
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          status: "verified",
        },
        {
          id: 3,
          type: "earthquake",
          location: "Srinagar, J&K",
          description: "Mild tremors felt in the area. No major damage reported yet.",
          contactNumber: "8765432109",
          imageUrl: null,
          timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
          status: "pending",
        },
      ]

      localStorage.setItem("community_reports", JSON.stringify(sampleReports))
      setReports(sampleReports)
    } else {
      setReports(savedReports)
    }
  }, [])

  useEffect(() => {
    // Apply filters and search
    let result = [...reports]

    // Filter by type
    if (filterType !== "all") {
      result = result.filter((report) => report.type === filterType)
    }

    // Filter by region
    if (filterRegion !== "all") {
      result = result.filter((report) => report.location.toLowerCase().includes(filterRegion.toLowerCase()))
    }

    // Search term
    if (searchTerm) {
      result = result.filter(
        (report) =>
          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredReports(result)
  }, [reports, filterType, filterRegion, searchTerm])

  const toggleReportStatus = (id) => {
    if (!isAdmin) return

    const updatedReports = reports.map((report) => {
      if (report.id === id) {
        return {
          ...report,
          status: report.status === "verified" ? "pending" : "verified",
        }
      }
      return report
    })

    setReports(updatedReports)
    localStorage.setItem("community_reports", JSON.stringify(updatedReports))
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins} min ago`
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} hr ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getStatusBadge = (status) => {
    if (status === "verified") {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      )
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Community Feed</CardTitle>
            <CardDescription>Recent disaster reports from the community</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-1 h-3 w-3" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin ? "User Mode" : "Admin Mode"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="landslide">Landslide</SelectItem>
                  <SelectItem value="cloudburst">Cloudburst</SelectItem>
                  <SelectItem value="cyclone">Cyclone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="jammu">Jammu & Kashmir</SelectItem>
                  <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="andhra">Coastal Andhra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ReportsList
              reports={filteredReports}
              formatTimestamp={formatTimestamp}
              getStatusBadge={getStatusBadge}
              toggleReportStatus={toggleReportStatus}
              isAdmin={isAdmin}
            />
          </TabsContent>

          <TabsContent value="verified">
            <ReportsList
              reports={filteredReports.filter((r) => r.status === "verified")}
              formatTimestamp={formatTimestamp}
              getStatusBadge={getStatusBadge}
              toggleReportStatus={toggleReportStatus}
              isAdmin={isAdmin}
            />
          </TabsContent>

          <TabsContent value="pending">
            <ReportsList
              reports={filteredReports.filter((r) => r.status === "pending")}
              formatTimestamp={formatTimestamp}
              getStatusBadge={getStatusBadge}
              toggleReportStatus={toggleReportStatus}
              isAdmin={isAdmin}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ReportsList({ reports, formatTimestamp, getStatusBadge, toggleReportStatus, isAdmin }) {
  if (reports.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-8 text-center">
        <div>
          <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium">No reports found</h3>
          <p className="mt-1 text-xs text-muted-foreground">No reports match your current filters</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4 pt-2">
        {reports.map((report) => (
          <div key={report.id} className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {report.type}
                </Badge>
                {getStatusBadge(report.status)}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatTimestamp(report.timestamp)}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm">{report.description}</p>
            </div>

            {report.imageUrl && (
              <div className="mt-2">
                <img
                  src={report.imageUrl || "/placeholder.svg"}
                  alt="Report"
                  className="h-32 w-full rounded-md object-cover"
                />
              </div>
            )}

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {report.location}
              </div>

              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => toggleReportStatus(report.id)}>
                  {report.status === "verified" ? "Mark Unverified" : "Verify Report"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
