"use client";
import React, { useState, useEffect, useRef } from "react";
import { getStocksummary } from "@/api/marketData";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import TableOfContents1 from "@/components/features/toc";
import { useMDXComponents } from "@/lib/mdxcomponents";

function extractTOC(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  // Log to check if content is being split correctly
  while ((match = headingRegex.exec(content)) !== null) {
    toc.push({
      level: match[1].length, // Match level (number of `#`)
      title: match[2], // Match title
      id: match[2]
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, ""), // Clean up ID (remove non-word chars)
    });
  }

  return toc;
}

const Overview = () => {
  const [mdxSources, setMdxSources] = useState<any[]>([]); 
  const [allTOC, setAllTOC] = useState<any[]>([]);

  useEffect(() => {
    const fetchStockSummary = async () => {
      try {
        const data = await getStocksummary();

        // Handle different data formats
        const analysis = data.market_analysis.flatMap(
          (analysis) => analysis.data.analysis
        );

        // Serialize the Markdown content for each analysis item
        const serializedContentPromises = analysis.map(async (item : any) => {
          if (item) {
            const toc = extractTOC(item); // Extract TOC for each section
            const serialized = await serialize(item); // Serialize the content (Markdown to JSX)
            return { serialized, toc }; // Return both serialized content and TOC
          }
          return null;
        });
        const results = await Promise.all(serializedContentPromises);

        const validResults = results.filter(Boolean);

        setMdxSources(validResults.map((result : any) => result.serialized));
        setAllTOC(validResults.flatMap((result : any) => result.toc));
      } catch (error) {
        console.error("Error fetching stock summary:", error);
      }
    };

    fetchStockSummary();
  }, []);

  const components = useMDXComponents();
  return (
    <div className="flex flex-col md:flex-row lg:border-r border-[#EFF8F3]">
      {/* Navbar with clickable sections */}

      <div className="flex flex-col  lg:px-0 md:px-8 px-2 md:flex-row  gap-8">
        <div className="mt-10 w-full md:w-1/4 pr-4 mb-4 md:mb-0 lg:block hidden">
          <aside className=" sticky top-10  p-1">
            <TableOfContents1 items={allTOC} />
          </aside>
        </div>
        <div className="w-full lg:w-3/4 pl-0 lg:pl-4  ">
          {mdxSources.map((mdxSource, index) => (
            <div key={index}>
              <MDXRemote {...mdxSource} components={components} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Overview;
