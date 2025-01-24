import React from 'react'
import { ChevronRightIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

const Recommendations = () => {
  return (
    <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Recommendations
                <Link className="text-sm text-blue-600" 
                href="/performance"
                >See All</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Adani Enterprises",
                  tag: "Buy",
                  description: "Target price increase by Venture Securities suggests strong upside potential",
                },
                {
                  name: "Bajaj Finance",
                  tag: "Buy",
                  description: "Robust growth metrics with a 28% year-on-year rise in assets",
                },
                {
                  name: "JSW Energy",
                  tag: "Sell",
                  description: "Strong bullish momentum expected post-acquisition announcement",
                },
              ].map((rec) => (
                <div key={rec.name} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{rec.name}</h4>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          rec.tag === "Buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rec.tag}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
  )
}

export default Recommendations