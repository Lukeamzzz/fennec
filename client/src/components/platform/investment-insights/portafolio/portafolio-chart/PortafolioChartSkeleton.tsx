import React from "react";

const PortafolioChartSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
    {/* Title Skeleton */}
    <div className="mb-6">
      <div className="h-7 w-60 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-100 rounded" />
    </div>
    {/* Chart Skeleton */}
    <div className="relative max-w-80 mx-auto mb-6 flex items-center justify-center">
      <div className="h-[250px] w-[250px] bg-gray-100 rounded-full" />
    </div>
    {/* Property Summary Skeleton */}
    <div>
      <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex justify-between items-center mb-3">
          <div>
            <div className="h-4 w-32 bg-gray-100 rounded mb-1" />
            <div className="h-3 w-20 bg-gray-50 rounded" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-16 bg-gray-100 rounded mr-4" />
            <div className="h-5 w-10 bg-gray-50 rounded" />
          </div>
        </div>
      ))}
      <div className="mt-6 w-full h-10 bg-gray-100 rounded-lg" />
      <div className="mt-2 w-full h-10 bg-gray-50 rounded-lg" />
    </div>
  </div>
);

export default PortafolioChartSkeleton;
