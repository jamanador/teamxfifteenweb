import React from 'react';

export const EventCardSkeleton = () => {
  return (
    <div className="bg-[#121217] rounded-3xl border border-stone-800/80 overflow-hidden shadow-xl animate-pulse flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="h-48 sm:h-52 w-full bg-stone-900/90 relative">
        <div className="absolute top-4 left-4 h-6 w-24 bg-stone-800 rounded-full" />
        <div className="absolute top-4 right-4 h-6 w-16 bg-stone-800 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Department / Category line */}
          <div className="h-3 w-1/3 bg-stone-800/80 rounded" />
          {/* Title */}
          <div className="h-5 w-5/6 bg-stone-800 rounded" />
          <div className="h-4 w-4/6 bg-stone-800/70 rounded" />
          {/* Description line */}
          <div className="space-y-1.5 pt-2">
            <div className="h-3 w-full bg-stone-900 rounded" />
            <div className="h-3 w-4/5 bg-stone-900 rounded" />
          </div>
        </div>

        {/* Metadata info */}
        <div className="pt-4 border-t border-stone-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-28 bg-stone-800/70 rounded" />
            <div className="h-3 w-20 bg-stone-800/70 rounded" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="h-3 w-32 bg-stone-800/60 rounded" />
            <div className="h-4 w-16 bg-stone-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const EventGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <EventCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default EventCardSkeleton;
