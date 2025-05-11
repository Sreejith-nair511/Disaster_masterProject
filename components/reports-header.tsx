import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Filter } from "lucide-react"

export function ReportsHeader() {
  return (
    <DashboardHeader
      heading="Community Reports"
      description="Submit and view disaster reports from the community"
      icon={<FileText className="h-5 w-5" />}
    >
      <div className="flex items-center gap-2">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </DashboardHeader>
  )
}
