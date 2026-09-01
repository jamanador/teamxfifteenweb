import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Layers,
} from 'lucide-react';
import {
  useGetEventStatsQuery,
  useGetEventsQuery,
  useSeedEventsMutation,
} from '../../redux/features/events/eventsApi';
import { useGetUserStatsQuery } from '../../redux/features/users/usersApi';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: eventStatsRes, isLoading: isEventStatsLoading } =
    useGetEventStatsQuery();
  const { data: userStatsRes, isLoading: isUserStatsLoading } =
    useGetUserStatsQuery();
  const { data: eventsRes, isLoading: isEventsLoading } = useGetEventsQuery({
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [seedEvents, { isLoading: isSeeding }] = useSeedEventsMutation();

  const eventStats = eventStatsRes?.data || {
    totalEvents: 0,
    upcomingEvents: 0,
    featuredEvents: 0,
    totalCapacity: 0,
    totalRegistered: 0,
    overallOccupancyRate: '0%',
  };

  const userStats = userStatsRes?.data || {
    totalUsers: 0,
    totalAdmins: 0,
    totalRegularUsers: 0,
    activeUsers: 0,
  };

  const recentEvents = eventsRes?.data || [];

  const handleReSeed = async () => {
    if (
      window.confirm(
        'Are you sure you want to synchronize the default 8 EDU events?'
      )
    ) {
      try {
        await seedEvents(false).unwrap();
        alert('Events synchronized successfully!');
      } catch (err) {
        alert('Failed to synchronize data: ' + (err?.data?.message || err?.message));
      }
    }
  };

  if (isEventStatsLoading && isEventsLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#80142B] to-[#3a0813] border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Management Center • 2026</span>
          </div>
          <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-4xl text-white">
            Admin Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl">
            Monitor real-time session registrations, manage faculty keynotes, and oversee student user access.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/admin/events"
            className="py-3 px-4.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Events</span>
          </Link>
          <button
            onClick={handleReSeed}
            disabled={isSeeding}
            className="py-3 px-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 text-amber-400 ${isSeeding ? 'animate-spin' : ''}`}
            />
            <span>{isSeeding ? 'Syncing...' : 'Sync Default Events'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Events */}
        <div className="p-5 rounded-2xl bg-[#121217] border border-stone-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Total Events</span>
            <div className="p-2 rounded-xl bg-[#80142B]/80 text-amber-300 border border-amber-400/30">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-['Outfit',sans-serif] font-black text-3xl text-white">
              {eventStats.totalEvents}
            </h3>
            <p className="text-[11px] text-amber-400/90 font-medium">
              {eventStats.upcomingEvents} Upcoming Sessions
            </p>
          </div>
        </div>

        {/* Registered Attendees */}
        <div className="p-5 rounded-2xl bg-[#121217] border border-stone-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">
              Registered Attendees
            </span>
            <div className="p-2 rounded-xl bg-teal-950 text-teal-300 border border-teal-600/40">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-['Outfit',sans-serif] font-black text-3xl text-white">
              {eventStats.totalRegistered}
            </h3>
            <p className="text-[11px] text-stone-400">
              Across {eventStats.totalCapacity} total seat capacity
            </p>
          </div>
        </div>

        {/* Seat Occupancy Rate */}
        <div className="p-5 rounded-2xl bg-[#121217] border border-stone-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">
              Occupancy Rate
            </span>
            <div className="p-2 rounded-xl bg-amber-950 text-amber-300 border border-amber-600/40">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-['Outfit',sans-serif] font-black text-3xl text-amber-400">
              {eventStats.overallOccupancyRate}
            </h3>
            <p className="text-[11px] text-stone-400">
              High student participation
            </p>
          </div>
        </div>

        {/* Total Users */}
        <div className="p-5 rounded-2xl bg-[#121217] border border-stone-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">
              System Accounts
            </span>
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-600/40">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-['Outfit',sans-serif] font-black text-3xl text-white">
              {userStats.totalUsers}
            </h3>
            <p className="text-[11px] text-stone-400">
              {userStats.totalAdmins} Admin(s) • {userStats.activeUsers} Active
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/events"
          className="p-6 rounded-3xl bg-[#121217] hover:bg-stone-900/90 border border-stone-800 hover:border-amber-400/40 transition-all group flex items-start justify-between shadow-xl"
        >
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-[#80142B] text-white w-fit border border-amber-400/30">
              <Calendar className="w-6 h-6 text-amber-300" />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
              Manage Events & Seminars
            </h3>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Create, edit, remove, and review attendees for academic symposiums, workshops, and leadership seminars.
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-stone-500 group-hover:text-amber-400 transition-colors shrink-0 mt-1" />
        </Link>

        <Link
          to="/admin/users"
          className="p-6 rounded-3xl bg-[#121217] hover:bg-stone-900/90 border border-stone-800 hover:border-amber-400/40 transition-all group flex items-start justify-between shadow-xl"
        >
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-300 w-fit border border-indigo-600/40">
              <Users className="w-6 h-6 text-indigo-300" />
            </div>
            <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
              User & Role Management
            </h3>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Manage user accounts, assign admin/moderator roles, monitor active registrations, and maintain security.
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-stone-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-1" />
        </Link>
      </div>

      {/* Recent Sessions Table */}
      <div className="bg-[#121217] rounded-3xl border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-white">
              Recent Academic Sessions
            </h3>
            <p className="text-xs text-stone-400">
              Quick view of the most recently scheduled sessions on campus.
            </p>
          </div>
          <Link
            to="/admin/events"
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View All Roster</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-900/80 text-stone-400 uppercase text-[10px] font-bold tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-3.5 rounded-l-xl">Session Title</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Seats Taken</th>
                <th className="p-3.5 text-right rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {recentEvents.map((evt) => (
                <tr key={evt.id || evt._id} className="hover:bg-stone-900/50 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white max-w-xs truncate">{evt.title}</div>
                    <div className="text-[11px] text-stone-400 truncate">{evt.department}</div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        evt.type === 'workshop'
                          ? 'bg-teal-950 text-teal-300 border border-teal-600/40'
                          : 'bg-[#80142B] text-amber-200 border border-amber-400/30'
                      }`}
                    >
                      {evt.type}
                    </span>
                  </td>
                  <td className="p-3.5">{evt.category}</td>
                  <td className="p-3.5">
                    <div>{evt.displayDate || evt.date}</div>
                    <div className="text-[11px] text-stone-400">{evt.time}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-white">
                      {evt.registeredCount || 0}
                    </span>{' '}
                    / {evt.capacity}
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to={`/events/${evt.id}`}
                      className="text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
