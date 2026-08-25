import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Layers, 
  Share2, 
  Building2, 
  CheckCircle2, 
  Check, 
  Ticket, 
  User,
  GraduationCap
} from 'lucide-react';
import { EVENTS_DATA } from '../../constants/events';
import SpeakerCard from '../../components/SpeakerCard';
import RegistrationModal from '../../components/RegistrationModal';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const event = EVENTS_DATA.find((e) => e.id === id);

  // If event not found
  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-amber-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-['Outfit',sans-serif] font-bold text-2xl text-white">
            Session Not Found
          </h2>
          <p className="text-sm text-stone-400">
            The requested seminar or workshop could not be located in the 2026 academic catalog.
          </p>
        </div>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#80142B] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Sessions</span>
        </Link>
      </div>
    );
  }

  const isWorkshop = event.type === 'workshop';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="pb-20 space-y-10">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-[#121217] border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Details */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {isWorkshop ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-950 text-teal-200 border border-teal-600/60 shadow-sm">
                  <Layers className="w-3.5 h-3.5 text-teal-300" />
                  Workshop
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#80142B] text-amber-200 border border-amber-400/40 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  Academic Seminar
                </span>
              )}

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 border border-stone-800 text-stone-300">
                {event.category}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 border border-stone-800 text-stone-400">
                {event.department}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                {event.title}
              </h1>
              {event.subtitle && (
                <p className="text-sm sm:text-base text-amber-400/90 font-medium">
                  {event.subtitle}
                </p>
              )}
            </div>

            {/* Cover Image */}
            <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217]/80 via-transparent to-transparent" />
            </div>

            {/* Overview / Full Description */}
            <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800/90 space-y-4">
              <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white">
                Session Overview & Curriculum
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                {event.fullDescription || event.shortDescription}
              </p>
            </div>

            {/* Key Learning Outcomes */}
            {event.learningOutcomes && event.learningOutcomes.length > 0 && (
              <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800/90 space-y-4">
                <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  <span>Key Learning Outcomes & Takeaways</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {event.learningOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-xs text-stone-200 flex items-start gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Breakdown */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="bg-[#121217] rounded-3xl p-6 sm:p-8 border border-stone-800/90 space-y-4">
                <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Session Timeline & Schedule</span>
                </h3>
                <div className="space-y-3 pt-2">
                  {event.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#80142B] text-amber-300 font-bold text-[11px]">
                            {item.time}
                          </span>
                          <h4 className="font-semibold text-xs text-white">
                            {item.activity}
                          </h4>
                        </div>
                        {item.description && (
                          <p className="text-xs text-stone-400 pl-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.speakerName && (
                        <div className="text-[11px] font-semibold text-amber-400/90 shrink-0">
                          Lead: {item.speakerName}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Key Metadata & Registration */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Registration Pass Card */}
            <div className="bg-[#121217] rounded-3xl p-6 sm:p-7 border border-amber-400/30 shadow-2xl space-y-6">
              <div className="space-y-1 border-b border-stone-800 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Admissions Status
                </span>
                <h3 className="font-['Outfit',sans-serif] font-bold text-xl text-white">
                  Registration Open
                </h3>
                <p className="text-xs text-stone-400">
                  {event.fee}
                </p>
              </div>

              {/* Quick Details List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3 text-stone-300">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-stone-500 font-medium">Date</span>
                    <span className="font-semibold text-white">{event.displayDate || event.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-stone-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-stone-500 font-medium">Timing</span>
                    <span className="font-semibold text-white">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-stone-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-stone-500 font-medium">Venue</span>
                    <span className="font-semibold text-white">{event.roomNumber || event.location}</span>
                    <span className="block text-[11px] text-stone-400">East Delta University Campus</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-stone-300">
                  <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-stone-500 font-medium">Seat Availability</span>
                    <span className="font-semibold text-white">{event.registeredCount || 0} / {event.capacity} seats taken</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-stone-300">
                  <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-stone-500 font-medium">Host / Organizer</span>
                    <span className="font-semibold text-white">{event.organizer || event.department}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#80142B]/30 border border-amber-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-amber-300" />
                <span>Reserve Seat & Get Pass</span>
              </button>
            </div>

            {/* University Verification Card */}
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Official CPDC Accreditation</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Registered attendees who complete this session will receive official university participation certificates.
              </p>
            </div>

          </div>

        </div>

        {/* Dedicated Section at Bottom: Keynote Speakers & Facilitators */}
        {/* Requirement: "Show the author information and description at the bottom—no separate author page." */}
        <section className="border-t border-stone-800 pt-12 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <User className="w-3.5 h-3.5" />
              <span>Session Leadership</span>
            </div>
            <h3 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-white">
              Facilitators, Keynote Speakers & Authors
            </h3>
            <p className="text-xs text-stone-400 max-w-xl">
              Comprehensive biographies, academic credentials, and professional background of the keynote leads conducting this session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.speakers && event.speakers.length > 0 ? (
              event.speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))
            ) : (
              <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 text-stone-400 text-xs">
                Facilitator details managed by {event.department}.
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Registration Modal */}
      <RegistrationModal
        event={event}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

    </div>
  );
};

export default EventDetailsPage;
