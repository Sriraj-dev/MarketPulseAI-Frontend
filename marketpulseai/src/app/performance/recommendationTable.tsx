"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSuggestions } from "@/api/marketData"
import type { StockRecommendation } from "@/models/marketModel"
import { CompanyDetails } from "./about"
import React from "react"

const ShimmerLoader = () => {
  return (
    <div className="space-y-6">
      <div className="w-full h-[30px] bg-gray-200 animate-pulse"></div>
      <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>
    </div>
  );
};

export function RecommendationsTable() {
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getSuggestions()
        setRecommendations(data)
      } catch (error) {
        setError("Error fetching recommendations. Please try again later.")
        console.error("Error details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  const toggleCompany = (companyName: string) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(companyName)
        ? prevSelected.filter((name) => name !== companyName) // Remove from array
        : [...prevSelected, companyName] // Add to array
    )
  }

  return (
    <div className="space-y-4 max-w-[70rem]">
         {loading ? 
      
      (<ShimmerLoader />) : (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Recommendation</TableHead>
            <TableHead className="font-bold">Suggested On</TableHead>
            <TableHead className="font-bold">Suggested At</TableHead>
            <TableHead className="font-bold">Current Price</TableHead>
            <TableHead className="font-bold">Source</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recommendations.map((rec) => (
            <React.Fragment key={rec.name}>
              <TableRow>
                <TableCell>{rec.name}</TableCell>
                <TableCell>{rec.recommendation}</TableCell>
                <TableCell>{rec.dateofrecommendation}</TableCell>
                <TableCell>{rec.suggested_at_price}</TableCell>
                <TableCell>{rec.current_price}</TableCell>
                <TableCell>{rec.source}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCompany(rec.name)}
                  >
                    {selectedCompanies.includes(rec.name) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              {selectedCompanies.includes(rec.name) && (
                <TableRow>
                  <TableCell colSpan={7} className="p-4 bg-muted">
                    <CompanyDetails rec={rec} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      )}
     
    </div>
  )
}
