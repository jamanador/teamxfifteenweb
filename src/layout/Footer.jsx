import {
  BookOpen,
  Calendar,
  ExternalLink,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#09090c] border-t border-stone-800/80 text-stone-400 text-xs mt-16">

      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Col 1: University Brand & Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#80142B] border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-['Outfit',sans-serif] font-black text-white text-base tracking-wide">
                  EAST DELTA UNIVERSITY
                </h3>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  Excellence in Higher Education
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Official Seminars & Hands-on Workshops Portal of East Delta University. Empowering scholars with cutting-edge academic symposia, corporate career dialogues, and practical industry skills.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="inline-block px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] text-amber-300 font-semibold">
                Permanent Campus, Ctg
              </span>
              <span className="inline-block px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] text-teal-300 font-semibold">
                CPDC Accredited
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] font-bold text-white text-sm uppercase tracking-wider">
              Browse Catalogs
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#80142B]" />
                  <span>All Catalog (Seminars & Workshops)</span>
                </Link>
              </li>
              <li>
                <Link to="/seminars" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Executive Seminars</span>
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-teal-400" />
                  <span>Hands-on Workshops</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Wings */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] font-bold text-white text-sm uppercase tracking-wider">
              Academic Wings & Clubs
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Center for Professional Development (CPDC)</li>
              <li>School of Science, Engineering & Technology</li>
              <li>School of Business Administration</li>
              <li>EDU Career & Placement Club</li>
              <li>EDU Computing Club (EUCC)</li>
              <li>Hult Prize On-Campus Committee</li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] font-bold text-white text-sm uppercase tracking-wider">
              Campus Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>East Delta University Permanent Campus, Abdullah Al Noman Road, Noman Society, East Nasirabad, Khulshi, Chattogram.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+880 1311 104531 / 01311 104532</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>cpdc@eastdelta.edu.bd</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="https://eastdelta.edu.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors underline flex items-center gap-1"
                >
                  <span>eastdelta.edu.bd</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800/60 py-5 bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© 2026 Team X-fifteen_Web. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Official University Campus Portal</span>
            <span>•</span>
            <span>Center for Professional Development and Change (CPDC)</span>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
