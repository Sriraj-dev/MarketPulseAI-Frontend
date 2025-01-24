"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CompanyDetails } from "./about"

interface Recommendation {
  name: string
  recommendation: string
  suggestedOn: string
  suggestedAt: string
  currentPrice: string
  source: string
  description: string
}

export function RecommendationsTable({ recommendations }: { recommendations: Recommendation[] }) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead>Suggested On</TableHead>
              <TableHead>Suggested At</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Source</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((rec, index) => (
              <>
                <TableRow key={index}>
                  <TableCell>{rec.name}</TableCell>
                  <TableCell>{rec.recommendation}</TableCell>
                  <TableCell>{rec.suggestedOn}</TableCell>
                  <TableCell>{rec.suggestedAt}</TableCell>
                  <TableCell>{rec.currentPrice}</TableCell>
                  <TableCell>{rec.source}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCompany(selectedCompany === rec.name ? null : rec.name)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                {selectedCompany === rec.name && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <CompanyDetails name={rec.name} description={rec.description} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

