import { Award, Building2, Linkedin, Mail, User } from 'lucide-react';

const SpeakerCard = ({ speaker }) => {
  if (!speaker) return null;

  return (
    <div className="bg-[#121217] rounded-2xl p-5 sm:p-6 border border-stone-800/80 shadow-md hover:border-amber-400/30 transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">

        {/* Avatar */}
        <div className="relative shrink-0">
          {speaker.avatarUrl ? (
            <div

              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-stone-700 shadow-md flex items-center justify-center text-stone-400"
              referrerPolicy="no-referrer "
            >
              <User className="w-8 h-8 text-amber-400" />

            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-800 border-2 border-stone-700 flex items-center justify-center text-stone-400">
              <User className="w-8 h-8 text-amber-400" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-[#80142B] text-white p-1 rounded-lg shadow-sm border border-amber-400/30">
            <Award className="w-3.5 h-3.5 text-amber-300" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 flex-1">
          <div>
            <h4 className="font-['Outfit',sans-serif] font-bold text-base sm:text-lg text-white">
              {speaker.name}
            </h4>
            <p className="text-xs font-semibold text-amber-400">
              {speaker.title}
            </p>
            {speaker.organization && (
              <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>{speaker.organization}</span>
              </p>
            )}
          </div>

          {speaker.credentials && (
            <div className="inline-block px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-stone-300 font-medium">
              {speaker.credentials}
            </div>
          )}

          {speaker.bio && (
            <p className="text-xs text-stone-300 leading-relaxed pt-1">
              {speaker.bio}
            </p>
          )}

          {/* Contact Links */}
          {(speaker.email || speaker.linkedin) && (
            <div className="flex items-center gap-3 pt-2">
              {speaker.email && (
                <a
                  href={`mailto:${speaker.email}`}
                  className="text-xs text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </a>
              )}
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-stone-400 hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
