import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  LogOut,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';
import { logout, selectCurrentUser } from '../redux/features/auth/authSlice';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Signed out from Admin Panel.');
    navigate('/login');
  };

  const navItems = [
    {
      to: '/admin',
      label: 'Dashboard Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      end: true,
    },
    {
      to: '/admin/events',
      label: 'Events & Seminars',
      icon: <Calendar className="w-4 h-4" />,
      end: false,
    },
    {
      to: '/admin/users',
      label: 'User Management',
      icon: <Users className="w-4 h-4" />,
      end: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-stone-100 flex flex-col lg:flex-row">
      {/* Mobile Topbar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#121217] border-b border-stone-800 px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#80142B] to-[#500c1b] border border-amber-400/40 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-['Outfit',sans-serif] font-black text-sm text-white">
            EDU ADMIN PANEL
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#101015] border-r border-stone-800 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-stone-800/80">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#80142B] to-[#500c1b] border border-amber-400/40 flex items-center justify-center shadow-lg text-amber-400 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit',sans-serif] font-black text-sm text-white leading-none">
                  EAST DELTA
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-[#80142B] text-amber-300 border border-amber-400/30">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-medium mt-0.5 uppercase tracking-wide">
                Management Console
              </p>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-4 py-4 m-3 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#80142B] border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-xs shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
            <div className="flex items-center gap-1 text-[10px] text-amber-400/90 font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span className="capitalize">{user?.role || 'Admin'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Core Modules
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#80142B] text-white shadow-md shadow-[#80142B]/30 border border-amber-400/30 font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>
          ))}

          <div className="pt-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Portal Navigation
          </div>
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-900 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit Public Catalog</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-stone-800/80">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-red-950/80 hover:text-red-300 hover:border-red-500/40 border border-stone-800 text-stone-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
