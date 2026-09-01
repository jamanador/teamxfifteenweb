import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Trash2,
  AlertCircle,
  Mail,
  Building,
  GraduationCap,
} from 'lucide-react';
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from '../../redux/features/users/usersApi';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';

const AdminUsersPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const { data: usersRes, isLoading } = useGetAllUsersQuery({
    search: searchTerm || undefined,
    role: filterRole || undefined,
    status: filterStatus || undefined,
    limit: 0,
  });

  const [updateRole, { isLoading: isUpdatingRole }] =
    useUpdateUserRoleMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeletingUser }] =
    useDeleteUserMutation();

  const users = usersRes?.data || [];

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateRole({ id: userId, role: newRole }).unwrap();
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      alert(
        'Failed to update role: ' + (err?.data?.message || err?.message)
      );
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateStatus({ id: userId, status: newStatus }).unwrap();
      alert(`User status updated to ${newStatus}`);
    } catch (err) {
      alert(
        'Failed to update status: ' + (err?.data?.message || err?.message)
      );
    }
  };

  const handleDeleteUser = async (user) => {
    if (user._id === currentUser?._id) {
      alert('You cannot delete your own logged-in admin account.');
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to permanently delete user "${user.name}" (${user.email})?`
      )
    ) {
      try {
        await deleteUser(user._id).unwrap();
        alert('User account deleted successfully.');
      } catch (err) {
        alert(
          'Failed to delete user: ' + (err?.data?.message || err?.message)
        );
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>Access & Permissions Control</span>
          </div>
          <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-white mt-1">
            User Management
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Oversee registered accounts, assign administrative privileges, and manage portal access.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121217] p-3 rounded-2xl border border-stone-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="admin">Admins</option>
            <option value="moderator">Moderators</option>
            <option value="user">Students / Users</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active Accounts</option>
            <option value="blocked">Blocked Accounts</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#121217] rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-900/90 text-stone-400 uppercase text-[10px] font-bold tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-4">User Details</th>
                <th className="p-4">Department & ID</th>
                <th className="p-4">Role Permission</th>
                <th className="p-4">Account Status</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500 text-xs">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((usr) => {
                  const isSelf = usr._id === currentUser?._id;
                  return (
                    <tr
                      key={usr._id}
                      className="hover:bg-stone-900/40 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center font-black text-xs text-amber-300 shrink-0">
                            {usr.name?.charAt(0) || 'U'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{usr.name}</span>
                              {isSelf && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-black uppercase">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-stone-400 truncate">
                              {usr.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium truncate max-w-xs">
                          {usr.department || 'Not specified'}
                        </div>
                        {usr.studentId && (
                          <div className="text-[11px] text-stone-400">
                            ID: {usr.studentId}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          value={usr.role}
                          disabled={isSelf || isUpdatingRole}
                          onChange={(e) =>
                            handleRoleChange(usr._id, e.target.value)
                          }
                          className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50 disabled:opacity-60 cursor-pointer"
                        >
                          <option value="user">User / Student</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          disabled={isSelf || isUpdatingStatus}
                          onClick={() =>
                            handleStatusChange(
                              usr._id,
                              usr.status === 'active' ? 'blocked' : 'active'
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors cursor-pointer disabled:opacity-60 ${
                            usr.status === 'active'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40 hover:bg-red-950 hover:text-red-300'
                              : 'bg-red-950 text-red-300 border border-red-600/40 hover:bg-emerald-950 hover:text-emerald-300'
                          }`}
                          title="Click to toggle active/blocked status"
                        >
                          {usr.status || 'active'}
                        </button>
                      </td>
                      <td className="p-4 text-stone-400 text-[11px]">
                        {usr.createdAt
                          ? new Date(usr.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Recent'}
                      </td>
                      <td className="p-4 text-right">
                        {!isSelf && (
                          <button
                            onClick={() => handleDeleteUser(usr)}
                            disabled={isDeletingUser}
                            title="Delete user account"
                            className="p-2 rounded-lg bg-stone-900 hover:bg-red-950 hover:text-red-300 border border-stone-800 text-stone-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
