import React from 'react';

export const EventDetailsSkeleton = () => {
  return (
    <div className="pb-20 space-y-10 animate-pulse">
      {/* Top Bar Skeleton */}
      <div className="bg-[#121217] border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="h-4 w-20 bg-stone-800 rounded" />
          <div className="h-7 w-20 bg-stone-800 rounded-xl" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-stone-800 rounded-full" />
              <div className="h-6 w-32 bg-stone-800 rounded-full" />
              <div className="h-6 w-40 bg-stone-800 rounded-full" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-8 w-4/5 bg-stone-800 rounded-lg" />
              <div className="h-5 w-3/5 bg-stone-800/70 rounded-lg" />
            </div>

            {/* Cover Image */}
            <div className="h-64 sm:h-96 w-full rounded-3xl bg-stone-900 border border-stone-800" />

            {/* Overview Box */}
            <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-3">
              <div className="h-5 w-40 bg-stone-800 rounded" />
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full bg-stone-900 rounded" />
                <div className="h-3.5 w-full bg-stone-900 rounded" />
                <div className="h-3.5 w-3/4 bg-stone-900 rounded" />
              </div>
            </div>

            {/* Outcomes Box */}
            <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-3">
              <div className="h-5 w-48 bg-stone-800 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-stone-900 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Pass Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#121217] rounded-3xl p-6 sm:p-7 border border-stone-800 space-y-6">
              <div className="space-y-2 border-b border-stone-800 pb-4">
                <div className="h-3 w-20 bg-stone-800 rounded" />
                <div className="h-6 w-36 bg-stone-800 rounded" />
                <div className="h-3.5 w-28 bg-stone-800/70 rounded" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-5 h-5 bg-stone-800 rounded-md shrink-0" />
                    <div className="space-y-1 flex-1">
                      <div className="h-2.5 w-16 bg-stone-900 rounded" />
                      <div className="h-3.5 w-3/4 bg-stone-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-12 w-full bg-stone-800 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;
