import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { useGetEventsQuery } from '../../redux/features/events/eventsApi';
import { EVENTS_DATA as fallbackEvents } from '../../constants/events';
import EventCard from '../../components/EventCard';
import { EventGridSkeleton } from '../../components/skeletons/EventCardSkeleton';

const SeminarsPage = () => {
  const { data: eventsRes, isLoading } = useGetEventsQuery({
    type: 'seminar',
    limit: 0,
    sortBy: 'date',
    sortOrder: 'asc',
  });

  const allEvents = eventsRes?.data?.length
    ? eventsRes.data
    :[].filter((e) => e.type === 'seminar');

  const seminars = allEvents.filter((e) => e.type === 'seminar');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#80142B]/80 text-amber-300 text-xs font-semibold border border-amber-400/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic & Keynote Symposia</span>
        </div>
        <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-4xl text-white">
          Executive & Academic Seminars
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          Featuring keynote addresses, industry panels, executive recruitment insights, and technological career trajectories curated by EDU faculty wings and the Center for Professional Development (CPDC).
        </p>
      </div>

      {/* Grid of Seminars with Skeleton */}
      {isLoading ? (
        <EventGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {seminars.map((seminar) => (
            <EventCard key={seminar.id || seminar._id} event={seminar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeminarsPage;
