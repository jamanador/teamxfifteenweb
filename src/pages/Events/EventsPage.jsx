import React, { useState } from 'react';
import { Calendar, Sparkles, Search, Filter } from 'lucide-react';
import { useGetEventsQuery } from '../../redux/features/events/eventsApi';
import { EVENTS_DATA as fallbackEvents } from '../../constants/events';
import EventCard from '../../components/EventCard';
import { EventGridSkeleton } from '../../components/skeletons/EventCardSkeleton';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const { data: eventsRes, isLoading, isFetching } = useGetEventsQuery({
    search: searchTerm || undefined,
    type: selectedType !== 'all' ? selectedType : undefined,
    limit: 0,
    sortBy: 'date',
    sortOrder: 'asc',
  });

  const events = eventsRes?.data?.length ? eventsRes.data :[];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      !searchTerm ||
      evt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.department?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'all' || evt.type?.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#80142B]/80 text-amber-300 text-xs font-semibold border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Academic Catalog</span>
        </div>
        <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-4xl text-white">
          All Seminars & Workshops
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
          Explore the official directory of academic symposiums, executive seminars, and hands-on masterclasses hosted at East Delta University.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121217] p-3 rounded-2xl border border-stone-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search seminars, workshops, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'seminar', label: 'Seminars' },
            { id: 'workshop', label: 'Workshops' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedType === tab.id
                  ? 'bg-[#80142B] text-white border border-amber-400/40 shadow'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Events with Skeleton */}
      {isLoading ? (
        <EventGridSkeleton count={6} />
      ) : filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-[#121217] rounded-3xl border border-stone-800 space-y-2">
          <p className="text-sm font-bold text-white">No sessions found</p>
          <p className="text-xs text-stone-400">
            Try adjusting your search criteria or filter tags.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id || event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
