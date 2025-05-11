"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ambulance, Building, Phone, Search, Shield } from "lucide-react"

// Sample emergency contacts
const emergencyContacts = {
  kerala: [
    {
      id: 1,
      name: "State Emergency Operations Center",
      number: "1070",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 2,
      name: "District Emergency Operations Center",
      number: "1077",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 3,
      name: "Police Control Room",
      number: "100",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 4,
      name: "Fire & Rescue",
      number: "101",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 5,
      name: "Ambulance Service",
      number: "108",
      type: "medical",
      icon: Ambulance,
    },
    {
      id: 6,
      name: "Kerala State Disaster Management Authority",
      number: "0471-2364424",
      type: "emergency",
      icon: Building,
    },
    {
      id: 7,
      name: "Medical College Hospital, Thiruvananthapuram",
      number: "0471-2528386",
      type: "medical",
      icon: Ambulance,
    },
    {
      id: 8,
      name: "Medical College Hospital, Kozhikode",
      number: "0495-2350216",
      type: "medical",
      icon: Ambulance,
    },
  ],
  northeast: [
    {
      id: 1,
      name: "Assam State Disaster Management Authority",
      number: "1070",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 2,
      name: "Guwahati Police Control Room",
      number: "100",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 3,
      name: "Assam Fire & Emergency Services",
      number: "101",
      type: "emergency",
      icon: Shield,
    },
    {
      id: 4,
      name: "Ambulance Service",
      number: "108",
      type: "medical",
      icon: Ambulance,
    },
    {
      id: 5,
      name: "Gauhati Medical College Hospital",
      number: "0361-2529457",
      type: "medical",
      icon: Ambulance,
    },
  ],
}

export function EmergencyContacts() {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>Important contacts for emergency situations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input placeholder="Search contacts..." />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="kerala" className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="kerala">Kerala</TabsTrigger>
            <TabsTrigger value="northeast">Northeast</TabsTrigger>
            <TabsTrigger value="jammu-kashmir">J&K</TabsTrigger>
            <TabsTrigger value="uttarakhand">Uttarakhand</TabsTrigger>
            <TabsTrigger value="coastal-andhra">Coastal Andhra</TabsTrigger>
          </TabsList>

          <TabsContent value="kerala" className="space-y-4">
            {emergencyContacts.kerala.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      contact.type === "emergency" ? "bg-destructive/10" : "bg-blue-500/10"
                    }`}
                  >
                    <contact.icon
                      className={`h-4 w-4 ${contact.type === "emergency" ? "text-destructive" : "text-blue-500"}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="northeast" className="space-y-4">
            {emergencyContacts.northeast.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      contact.type === "emergency" ? "bg-destructive/10" : "bg-blue-500/10"
                    }`}
                  >
                    <contact.icon
                      className={`h-4 w-4 ${contact.type === "emergency" ? "text-destructive" : "text-blue-500"}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="jammu-kashmir">
            <div className="flex h-40 items-center justify-center rounded-lg border">
              <p className="text-sm text-muted-foreground">Select a different region to view contacts</p>
            </div>
          </TabsContent>

          <TabsContent value="uttarakhand">
            <div className="flex h-40 items-center justify-center rounded-lg border">
              <p className="text-sm text-muted-foreground">Select a different region to view contacts</p>
            </div>
          </TabsContent>

          <TabsContent value="coastal-andhra">
            <div className="flex h-40 items-center justify-center rounded-lg border">
              <p className="text-sm text-muted-foreground">Select a different region to view contacts</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
