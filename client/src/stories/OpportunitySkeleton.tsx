import React from "react";

const OpportunitySkeleton: React.FC = () => (
  <div className="bg-[#FFF9F6] rounded-xl flex flex-col h-[480px] w-[340px] flex-shrink-0 animate-pulse p-3">
    <div className="flex justify-between items-start mb-1">
      <div className="h-5 w-32 bg-gray-200 rounded" />
      <div className="h-5 w-12 bg-orange-100 rounded-full" />
    </div>
    <div className="flex items-center gap-1 text-gray-500 mb-2">
      <div className="h-4 w-4 bg-gray-200 rounded-full" />
      <div className="h-4 w-24 bg-gray-200 rounded" />
    </div>
    <div className="flex-1 flex flex-col">
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
      </div>
      <div className="mb-4">
        <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <div className="h-4 w-12 bg-gray-200 rounded-full" />
        <div className="h-4 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
    <div className="w-full py-2 bg-gray-200 rounded-xl mt-auto" />
  </div>
);

export default OpportunitySkeleton;
