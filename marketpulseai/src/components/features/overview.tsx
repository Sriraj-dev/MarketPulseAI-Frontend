"use client";
import React, { useState, useEffect } from "react";
import { getStocksummary } from "@/api/marketData";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import TableOfContents1 from "@/components/features/toc";
import { useMDXComponents } from "@/lib/mdxcomponents";

const Overview = () => {
  const [mdxSources, setMdxSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string>(""); // Handle error state

  useEffect(() => {
    const fetchStockSummary = async () => {
      try {
        const data = await getStocksummary();

        const analysis = data.market_analysis.map((item: any) => ({
          type: item.type,
          analysis: item.data.analysis,
        }));

        const marketnews = data.market_analysis.map((item: any) => ({
          type: item.type,
          analysis: item.data.marketnews,
        }));

        const allData = [...marketnews, ...analysis];

        // Serialize the Markdown content and attach the type
        const serializedContentPromises = allData.map(async (item: any) => {
          if (item.analysis) {
            const serialized = await serialize(item.analysis); // Serialize the Markdown text
            return { type: item.type, content: serialized }; // Attach type to the serialized content
          }
          return null;
        });
        const results = await Promise.all(serializedContentPromises);

        // Filter out any null or undefined results
        const validResults = results.filter(Boolean);

        setMdxSources(validResults);
      } catch (error) {
        setError("Error fetching stock summary");
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockSummary();
  }, []);

  const components = useMDXComponents();

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row lg:border-r border-[#EFF8F3]">
        <div className="flex flex-col lg:px-0 md:px-8 px-2 md:flex-row gap-4 w-full">
          <div className="mt-10 w-full md:w-1/6 mb-4 md:mb-0 lg:block hidden">
            <aside className="sticky top-10 p-1">
              <TableOfContents1 />
            </aside>
          </div>
          <div className="w-full lg:w-5/6 pl-0 lg:pl-4">
            {/* Skeleton Loader */}
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-start gap-4 p-2">
                  <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row lg:border-r border-[#EFF8F3]">
      <div className="flex flex-col lg:px-0 md:px-8 px-2 md:flex-row gap-4">
        <div className="mt-10 w-full md:w-1/6 mb-4 md:mb-0 lg:block hidden">
          <aside className="sticky top-10 p-1">
            <TableOfContents1 />
          </aside>
        </div>
        <div className="w-full lg:w-5/6 pl-0 lg:pl-4">
          {mdxSources.map((mdxSource, index) => (
            <div key={index} id={mdxSource.type}>
              <MDXRemote {...mdxSource.content} components={components} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
