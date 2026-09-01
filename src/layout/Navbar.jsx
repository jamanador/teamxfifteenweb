import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Building,
  Calendar,
  Compass,
  GraduationCap,
  Layers,
  Menu,
  Sparkles,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from '../redux/features/auth/authSlice';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    toast.info('Signed out successfully');
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { to: '/events', label: 'All Catalog', icon: <Calendar className="w-4 h-4" /> },
    { to: '/seminars', label: 'Seminars', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/workshops', label: 'Workshops', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090b]/90 border-b border-stone-800">
      {/* Top Academic Banner */}
      <div className="bg-[#80142B] text-white py-1 px-4 sm:px-8 text-xs border-b border-amber-500/20 hidden lg:block">
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

          {/* Right Action Menu */}
          <div className="flex items-center gap-3">
            {/* Campus Tag */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Permanent Campus</span>
            </div>

            {/* Authentication Buttons & User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#80142B] border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block text-xs">
                    <div className="font-bold text-white leading-none truncate max-w-[100px]">
                      {user?.name?.split(' ')[0] || 'Account'}
                    </div>
                    <div className="text-[10px] text-amber-400 font-medium capitalize mt-0.5 flex items-center gap-0.5">
                      {user?.role === 'admin' && <ShieldCheck className="w-2.5 h-2.5" />}
                      <span>{user?.role || 'Member'}</span>
                    </div>
                  </div>
                </button>

                {/* Dropdown Box */}
                {userDropdownOpen && (
                  <div
                    onClick={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-[#121217] border border-stone-800 rounded-2xl p-2 shadow-2xl space-y-1 z-50 animate-in fade-in zoom-in-95"
                  >
                    <div className="px-3 py-2 border-b border-stone-800/80 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                      <p className="text-[10px] text-stone-400 truncate">{user?.email}</p>
                    </div>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-[#80142B] hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/80 hover:text-red-200 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs shadow-lg shadow-[#80142B]/30 border border-amber-400/30 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-300" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}

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

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Console</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
