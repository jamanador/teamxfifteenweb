import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  Award, 
  Building2, 
  CheckCircle,
  Users,
  Compass
} from 'lucide-react';
import { useGetEventsQuery } from '../../redux/features/events/eventsApi';
import { EVENTS_DATA as fallbackEvents } from '../../constants/events';
import EventCard from '../../components/EventCard';
import { EventGridSkeleton } from '../../components/skeletons/EventCardSkeleton';

const Home = () => {
  const navigate = useNavigate();

  const { data: eventsRes, isLoading } = useGetEventsQuery({
    limit: 0,
    sortBy: 'date',
    sortOrder: 'asc',
  });

  const allEvents = eventsRes?.data?.length ? eventsRes.data :[];

  // Get featured events or first 4 events for the spotlight
  const featuredEvents = allEvents.filter((e) => e.featured);
  const recentWorkshops = allEvents.filter((e) => e.type === 'workshop').slice(0, 2);
  const recentSeminars = allEvents.filter((e) => e.type === 'seminar').slice(0, 2);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#180409] via-[#0e0407] to-[#09090b] pt-12 pb-20 border-b border-stone-800/80">
        
        {/* Background glow accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#80142B]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#80142B]/50 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Academic & Career Acceleration Portal • 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Elevate Your Future with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                EDU Seminars & Workshops
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
              Welcome to the official hub of East Delta University for executive keynote seminars, behavioral masterclasses, and hands-on career bootcamps curated by CPDC and university faculties.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => navigate('/events')}
                className="px-6 py-3.5 rounded-2xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#80142B]/40 border border-amber-400/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Explore All Sessions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/seminars')}
                className="px-5 py-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-bold text-xs sm:text-sm border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Executive Seminars</span>
              </button>

              <button
                onClick={() => navigate('/workshops')}
                className="px-5 py-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-bold text-xs sm:text-sm border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Hands-on Workshops</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-stone-800/80 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
                <span className="block font-['Outfit',sans-serif] font-black text-xl text-white">8+</span>
                <span className="text-[11px] text-stone-400">Curated Academic Sessions</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
                <span className="block font-['Outfit',sans-serif] font-black text-xl text-amber-400">100%</span>
                <span className="text-[11px] text-stone-400">Industry Leaders & Faculty</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
                <span className="block font-['Outfit',sans-serif] font-black text-xl text-teal-400">Free</span>
                <span className="text-[11px] text-stone-400">Student Registrations</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
                <span className="block font-['Outfit',sans-serif] font-black text-xl text-white">CPDC</span>
                <span className="text-[11px] text-stone-400">Accredited Certificates</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Spotlight Sessions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Highlights</span>
            </div>
            <h2 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-white mt-1">
              Featured Seminars & Masterclasses
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Top-rated symposiums and skill bootcamps hosted at the EDU Permanent Campus.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Complete Roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid of Featured Events */}
        {isLoading ? (
          <EventGridSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id || event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Split Focus Tracks: Seminars vs Workshops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Executive Seminars Box */}
          <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#80142B] text-white border border-amber-400/30">
                  <BookOpen className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white">
                    Executive Seminars Track
                  </h3>
                  <p className="text-xs text-stone-400">
                    High-level industry keynotes, corporate recruitment & leadership
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/seminars')}
                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentSeminars.map((seminar) => (
                <div
                  key={seminar.id || seminar._id}
                  onClick={() => navigate(`/events/${seminar.id}`)}
                  className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800/90 border border-stone-800/80 hover:border-amber-400/40 transition-all cursor-pointer flex items-start gap-4"
                >
                  <img
                    src={seminar.coverImage}
                    alt={seminar.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate hover:text-amber-400">
                      {seminar.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-1">
                      {seminar.shortDescription}
                    </p>
                    <p className="text-[11px] text-amber-400/90 font-medium">
                      {seminar.displayDate} • {seminar.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-on Workshops Box */}
          <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-950 text-teal-200 border border-teal-600/50">
                  <Layers className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white">
                    Hands-on Workshops Track
                  </h3>
                  <p className="text-xs text-stone-400">
                    Interactive simulations, psychological blueprints & technical labs
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/workshops')}
                className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentWorkshops.map((workshop) => (
                <div
                  key={workshop.id || workshop._id}
                  onClick={() => navigate(`/events/${workshop.id}`)}
                  className="p-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800/90 border border-stone-800/80 hover:border-teal-400/40 transition-all cursor-pointer flex items-start gap-4"
                >
                  <img
                    src={workshop.coverImage}
                    alt={workshop.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate hover:text-teal-300">
                      {workshop.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-1">
                      {workshop.shortDescription}
                    </p>
                    <p className="text-[11px] text-teal-400/90 font-medium">
                      {workshop.displayDate} • {workshop.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* University Excellence Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#80142B] to-[#420a16] rounded-3xl p-8 sm:p-10 border border-amber-400/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
              Center for Professional Development and Change (CPDC)
            </span>
            <h3 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-white">
              Ready to Expand Your Academic & Career Horizons?
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl">
              Browse through all upcoming sessions, read comprehensive speaker curricula, and reserve your admission pass directly.
            </p>
          </div>

          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
