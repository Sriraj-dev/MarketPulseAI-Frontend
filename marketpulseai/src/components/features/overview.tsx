import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Overview = () => {
  return (
    <div className="md:col-span-2">
    <Card>
      <CardHeader>
        <CardTitle>Market Overview on January 21, 2025</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Indian equity markets experienced significant turmoil, with both the Nifty and Sensex plunging sharply
          amid a prevailing atmosphere of volatility and concern. The Nifty fell 1.37%, closing at 23,024.65,
          while the BSE Sensex dropped 1.6%, finishing at 75,838.36.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Key Drivers of Market Movement</h3>
          <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
            <li>Sectoral Performance: All sectoral indices succumbed to selling pressure</li>
            <li>Earnings Impact: The market's downturn was exacerbated by weak corporate earnings</li>
            <li>International Context: The markets reacted to global cues</li>
            <li>Regulatory Comments: Key speeches at the Association of Investment Bankers convention</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default Overview