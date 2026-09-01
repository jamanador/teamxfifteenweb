import React from 'react';

export const StatsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-[#121217] border border-stone-800 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 bg-stone-800 rounded" />
            <div className="w-8 h-8 rounded-xl bg-stone-800" />
          </div>
          <div className="space-y-1">
            <div className="h-8 w-24 bg-stone-800 rounded-lg" />
            <div className="h-3 w-32 bg-stone-900 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardSkeleton;
