"use client";

import { useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompanyDetails } from "./about";
import React from "react";
import { useRecommendationTableStore } from "@/stores/rootStore";

const ShimmerLoader = () => {
  return (
    <div className="space-y-6">
      <div className="w-full h-[30px] bg-gray-200 animate-pulse"></div>
      <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>
    </div>
  );
};

export function RecommendationsTable() {
  const {
    recommendations,
    loading,
    error,
    selectedCompanies,
    fetchRecommendations,
    toggleCompany,
  } = useRecommendationTableStore();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  if (error) {

    return <div className="text-center py-8 ">{error}</div>;
  }

  return (
    <div className="space-y-4 max-w-[70rem]">
      {loading ? (
        <ShimmerLoader />
      ) : (
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
            {recommendations.map((rec , index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{rec.name}</TableCell>
                  <TableCell>{rec.recommendation}</TableCell>
                  <TableCell>{rec.dateofrecommendation}</TableCell>
                  <TableCell>{rec.suggested_at_price.toFixed(1)}</TableCell>
                  <TableCell>{rec.current_price.toFixed(1)}</TableCell>
                  <TableCell>{rec.source}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleCompany(index,rec.name)}
                    >
                      {selectedCompanies.includes(index) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {selectedCompanies.includes(index) && (
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
  );
}
