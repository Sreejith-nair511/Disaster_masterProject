"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const regions = [
  {
    value: "all",
    label: "All Regions",
  },
  {
    value: "kerala",
    label: "Kerala",
  },
  {
    value: "northeast",
    label: "Northeast India",
  },
  {
    value: "jammu-kashmir",
    label: "Jammu & Kashmir",
  },
  {
    value: "uttarakhand",
    label: "Uttarakhand",
  },
  {
    value: "coastal-andhra",
    label: "Coastal Andhra",
  },
]

export function RegionSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("all")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const region = searchParams.get("region")
    if (region) {
      setValue(region)
    }
  }, [searchParams])

  return (
    <div className="p-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? regions.find((region) => region.value === value)?.label : "Select region..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search region..." />
            <CommandList>
              <CommandEmpty>No region found.</CommandEmpty>
              <CommandGroup>
                {regions.map((region) => (
                  <CommandItem
                    key={region.value}
                    value={region.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                      router.push(`${pathname}?region=${currentValue}`)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === region.value ? "opacity-100" : "opacity-0")} />
                    {region.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
