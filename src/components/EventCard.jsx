import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Layers, 
  ArrowRight,
  User
} from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return null;

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  const isWorkshop = event.type === 'workshop';

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#121217] rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#80142B]/10 hover:-translate-y-1"
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-900">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/40 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-3.5 left-3.5">
            {isWorkshop ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-950/90 text-teal-200 shadow-sm border border-teal-600/60 backdrop-blur-md">
                <Layers className="w-3 h-3 text-teal-300" />
                Workshop
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#80142B]/90 text-amber-200 shadow-sm border border-amber-400/40 backdrop-blur-md">
                <BookOpen className="w-3 h-3 text-amber-300" />
                Seminar
              </span>
            )}
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3.5">
            <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 text-stone-300 border border-stone-700/80 backdrop-blur-md">
              {event.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Meta Information */}
          <div className="space-y-1.5 pt-2 border-t border-stone-800/80 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium text-stone-200 truncate">{event.displayDate || event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-400 truncate">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-400 truncate">{event.roomNumber || event.location}</span>
            </div>
          </div>

          {/* Speaker / Facilitator preview */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
              <User className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              <span className="truncate">
                <span className="text-stone-500">By:</span> {event.speakers.map(s => s.name).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer with CTA */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-800/60 mt-2">
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>
            <strong className="text-stone-200">{event.registeredCount || 0}</strong>/{event.capacity} seats
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/${event.id}`);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
