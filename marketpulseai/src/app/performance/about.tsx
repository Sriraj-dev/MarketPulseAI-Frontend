"use client"

import dynamic from 'next/dynamic';


const ApexChart = dynamic(() => import("@/components/features/candle"), {
  ssr: false,
});

interface CompanyDetailsProps {
  name: string
  description: string
}

export function CompanyDetails({ name, description }: CompanyDetailsProps) {
  return (
    <div className="my-6 mx-4 p-2">
      <p className="hidden">{name} , {description}</p>
       
        <div className="flex md:flex-row flex-col gap-4">
          <div className="">
          <ApexChart />
          </div>
          <div className="">
          <h2 className="text-2xl font-bold my-4">About</h2>
            <p className="text-muted-foreground max-w-[40rem]">
              Adani Enterprises Limited, together with its subsidiaries, operates as a conglomerate company in India and
              internationally. It operates through Integrated Resources Management, Mining Services, Commercial Mining,
              New Energy Ecosystem, Airport, Road, and Others segments. The company offers transport and logistics
              services; and manufactures cement, hydrogen and its derivatives.
            </p>
            <button className="text-primary mt-2">Know More</button>
          </div>
        
        </div>
  
    </div>
  )
}

