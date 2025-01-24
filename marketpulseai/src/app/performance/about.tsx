"use client"

import ApexChart from "@/components/features/candle"
import { Card, CardContent } from "@/components/ui/card"

interface CompanyDetailsProps {
  name: string
  description: string
}

export function CompanyDetails({ name, description }: CompanyDetailsProps) {
  return (
    <Card className="my-6 ">
        <h2 className="text-2xl font-bold my-4">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
          <ApexChart />
          </div>
          <div className="md:col-span-2">
            <p className="text-muted-foreground">
              Adani Enterprises Limited, together with its subsidiaries, operates as a conglomerate company in India and
              internationally. It operates through Integrated Resources Management, Mining Services, Commercial Mining,
              New Energy Ecosystem, Airport, Road, and Others segments. The company offers transport and logistics
              services; and manufactures cement, hydrogen and its derivatives.
            </p>
            <button className="text-primary mt-2">Know More</button>
          </div>
        
        </div>
  
    </Card>
  )
}

