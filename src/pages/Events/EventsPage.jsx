import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { EVENTS_DATA } from '../../constants/events';
import EventCard from '../../components/EventCard';

const EventsPage = () => {
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

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {EVENTS_DATA.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

    </div>
  );
};

export default EventsPage;
