import React from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { useGetEventsQuery } from '../../redux/features/events/eventsApi';
import { EVENTS_DATA as fallbackEvents } from '../../constants/events';
import EventCard from '../../components/EventCard';
import { EventGridSkeleton } from '../../components/skeletons/EventCardSkeleton';

const WorkshopsPage = () => {
  const { data: eventsRes, isLoading } = useGetEventsQuery({
    type: 'workshop',
    limit: 0,
    sortBy: 'date',
    sortOrder: 'asc',
  });

  const allEvents = eventsRes?.data?.length
    ? eventsRes.data
    :[].filter((e) => e.type === 'workshop');

  const workshops = allEvents.filter((e) => e.type === 'workshop');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 text-teal-200 text-xs font-semibold border border-teal-600/50">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive & Practical Labs</span>
        </div>
        <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-4xl text-white">
          Hands-on Workshops & Masterclasses
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          Intensive skill-building labs, psychology masterclasses, entrepreneurial venture pitching, and artistic craft workshops with practical learning deliverables.
        </p>
      </div>

      {/* Grid of Workshops with Skeleton */}
      {isLoading ? (
        <EventGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {workshops.map((workshop) => (
            <EventCard key={workshop.id || workshop._id} event={workshop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkshopsPage;
