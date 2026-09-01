import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Users,
  Search,
  ShieldCheck,
  UserPlus,
  Trash2,
  AlertCircle,
  X,
  Mail,
  Lock,
  User,
  Phone,
  Building,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetAllUsersQuery,
  useCreateAdminMutation,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from '../../redux/features/users/usersApi';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { TableSkeleton } from '../../components/skeletons/TableSkeleton';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const initialAdminForm = {
  name: '',
  email: '',
  password: '',
  department: 'Administration',
  phone: '',
  bio: 'Administrator for East Delta University Portal',
};

const AdminUsersPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [adminFormData, setAdminFormData] = useState(initialAdminForm);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { data: usersRes, isLoading } = useGetAllUsersQuery({
    search: searchTerm || undefined,
    role: filterRole || undefined,
    status: filterStatus || undefined,
    limit: 0,
  });

  const [createAdmin, { isLoading: isCreatingAdmin }] = useCreateAdminMutation();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const users = usersRes?.data || [];

  const handleAdminFormChange = (e) => {
    setAdminFormData({
      ...adminFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!adminFormData.name || !adminFormData.email || !adminFormData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await createAdmin(adminFormData).unwrap();
      toast.success(`Admin account created for ${adminFormData.name}!`);
      setIsAddAdminOpen(false);
      setAdminFormData(initialAdminForm);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || 'Failed to create admin account.'
      );
    }
  };

  const handleRoleChange = async (userId, newRole, userName) => {
    try {
      await updateRole({ id: userId, role: newRole }).unwrap();
      toast.success(`Updated role for ${userName} to ${newRole.toUpperCase()}`);
    } catch (err) {
      toast.error(
        'Failed to update role: ' + (err?.data?.message || err?.message)
      );
    }
  };

  const handleStatusChange = async (userId, newStatus, userName) => {
    try {
      await updateStatus({ id: userId, status: newStatus }).unwrap();
      toast.success(
        `Account for ${userName} is now ${newStatus.toUpperCase()}`
      );
    } catch (err) {
      toast.error(
        'Failed to update status: ' + (err?.data?.message || err?.message)
      );
    }
  };

  const handleOpenDelete = (usr) => {
    if (usr._id === currentUser?._id) {
      toast.error('You cannot delete your own logged-in admin account.');
      return;
    }
    setUserToDelete(usr);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete._id).unwrap();
      toast.success(`User ${userToDelete.name} removed successfully.`);
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error(
        'Failed to delete user: ' + (err?.data?.message || err?.message)
      );
    }
  };

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
            Manage student registrations, monitor portal access, and provision administrators.
          </p>
        </div>

        {/* Add New Admin Button */}
        <button
          onClick={() => setIsAddAdminOpen(true)}
          className="py-3 px-4.5 rounded-xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#80142B]/30 border border-amber-400/30 cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4 text-amber-300" />
          <span>Add New Admin</span>
        </button>
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
            <option value="admin">Administrators</option>
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
      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : (
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
                      No users match the search criteria.
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
                              handleRoleChange(usr._id, e.target.value, usr.name)
                            }
                            className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50 disabled:opacity-60 cursor-pointer"
                          >
                            <option value="user">User / Student</option>
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
                                usr.status === 'active' ? 'blocked' : 'active',
                                usr.name
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
                              onClick={() => handleOpenDelete(usr)}
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
      )}

      {/* Delete User Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User Account"
        itemName={userToDelete ? `${userToDelete.name} (${userToDelete.email})` : 'Selected user'}
        itemType="user account"
        isLoading={isDeletingUser}
        warningMessage="This user's login access and associated session registrations will be permanently deleted."
      />

      {/* Add New Admin Modal */}
      {isAddAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121217] border border-stone-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddAdminOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#80142B] text-amber-200 border border-amber-400/30">
                Admin Provisioning
              </span>
              <h2 className="font-['Outfit',sans-serif] font-black text-xl text-white">
                Create Administrator
              </h2>
              <p className="text-xs text-stone-400">
                Only existing administrators can provision new admin accounts.
              </p>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Professor Rahman"
                    value={adminFormData.name}
                    onChange={handleAdminFormChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Admin Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="admin.name@eastdelta.edu.bd"
                    value={adminFormData.email}
                    onChange={handleAdminFormChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Temporary Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Min 6 characters"
                    value={adminFormData.password}
                    onChange={handleAdminFormChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Administration"
                    value={adminFormData.department}
                    onChange={handleAdminFormChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+880 1..."
                    value={adminFormData.phone}
                    onChange={handleAdminFormChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddAdminOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingAdmin}
                  className="px-6 py-2.5 rounded-xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs shadow-lg shadow-[#80142B]/30 border border-amber-400/30 disabled:opacity-50 cursor-pointer"
                >
                  {isCreatingAdmin ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
