import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Calendar, 
  Layers, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X, 
  Compass,
  Building
} from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { to: '/events', label: 'All Catalog', icon: <Calendar className="w-4 h-4" /> },
    { to: '/seminars', label: 'Seminars', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/workshops', label: 'Workshops', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090b]/90 border-b border-stone-800">
      
      {/* Top Academic Banner */}
      <div className="bg-[#80142B] text-white py-1 px-4 sm:px-8 text-xs border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-wide">
            <span className="bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded text-[10px] font-black uppercase">
              EDU Portal
            </span>
            <span className="hidden sm:inline text-amber-100/90 truncate text-xs font-normal">
              East Delta University Permanent Campus • Center for Professional Development (CPDC)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] shrink-0 font-medium">
            <span className="hidden md:inline text-amber-200">
              Admissions & Inquiries: 01311 10 45 31
            </span>
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live Academic Sessions 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#80142B] to-[#500c1b] border border-amber-400/40 flex items-center justify-center shadow-lg shadow-[#80142B]/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit',sans-serif] font-black text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                  EAST DELTA
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-[#80142B] text-amber-300 border border-amber-400/30 uppercase tracking-widest text-[9px]">
                  EDU
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-medium tracking-wide uppercase mt-0.5">
                Seminars & Workshops Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-900/80 p-1.5 rounded-full border border-stone-800">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#80142B] text-white shadow-md shadow-[#80142B]/40 border border-amber-400/30'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Campus Tag & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Permanent Campus, Ctg</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0e12] border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-semibold border transition-all ${
                    isActive
                      ? 'bg-[#80142B] text-white border-amber-400/40 shadow'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
