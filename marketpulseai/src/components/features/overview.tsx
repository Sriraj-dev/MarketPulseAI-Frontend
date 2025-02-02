"use client";
import React, {  useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import TableOfContents1 from "@/components/features/toc";
import { useMDXComponents } from "@/lib/mdxcomponents";
import { useStockSummaryStore } from "@/stores/rootStore";

const Overview = () => {
  const { mdxSources, loading, error, fetchStockSummary } = useStockSummaryStore();

  useEffect(() => {
    // Fetch only if data isn't already loaded
    if (mdxSources.length === 0 && !loading && !error) {
      fetchStockSummary();
    }
  }, [mdxSources, loading, error, fetchStockSummary]);


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
    return <div className="flex justify-center py-8">{error}</div>;
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
