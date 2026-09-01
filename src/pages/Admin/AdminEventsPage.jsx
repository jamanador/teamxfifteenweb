import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  BookOpen,
  Users,
  MapPin,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from '../../redux/features/events/eventsApi';
import { TableSkeleton } from '../../components/skeletons/TableSkeleton';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const initialEventForm = {
  id: '',
  title: '',
  subtitle: '',
  type: 'seminar',
  category: 'Mind Mastery & Psychology',
  department: 'Center for Professional Development and Change (CPDC)',
  organizer: 'East Delta University',
  date: new Date().toISOString().split('T')[0],
  displayDate: '',
  time: '3:00 PM – 5:00 PM',
  location: 'East Delta University Permanent Campus',
  roomNumber: 'Auditorium & Novus Studio',
  fee: 'Free Registration',
  capacity: 100,
  registeredCount: 0,
  coverImage:
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  tags: 'Psychology, Leadership, Strategy',
  shortDescription: '',
  fullDescription: '',
  learningOutcomes: '',
  featured: false,
  status: 'upcoming',
};

const AdminEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState(initialEventForm);
  const [errorMessage, setErrorMessage] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const { data: eventsRes, isLoading } = useGetEventsQuery({
    search: searchTerm || undefined,
    type: filterType || undefined,
    limit: 0,
    sortBy: 'date',
    sortOrder: 'asc',
  });

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const events = eventsRes?.data || [];

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setFormData({
      ...initialEventForm,
      id: `edu-event-${Date.now()}`,
    });
    setErrorMessage('');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setFormData({
      id: evt.id,
      title: evt.title || '',
      subtitle: evt.subtitle || '',
      type: evt.type || 'seminar',
      category: evt.category || '',
      department: evt.department || '',
      organizer: evt.organizer || '',
      date: evt.date || '',
      displayDate: evt.displayDate || '',
      time: evt.time || '',
      location: evt.location || '',
      roomNumber: evt.roomNumber || '',
      fee: evt.fee || 'Free Registration',
      capacity: evt.capacity || 100,
      registeredCount: evt.registeredCount || 0,
      coverImage: evt.coverImage || '',
      tags: Array.isArray(evt.tags) ? evt.tags.join(', ') : evt.tags || '',
      shortDescription: evt.shortDescription || '',
      fullDescription: evt.fullDescription || '',
      learningOutcomes: Array.isArray(evt.learningOutcomes)
        ? evt.learningOutcomes.join('\n')
        : evt.learningOutcomes || '',
      featured: !!evt.featured,
      status: evt.status || 'upcoming',
    });
    setErrorMessage('');
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingEvent(null);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const formattedTags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const formattedOutcomes = formData.learningOutcomes
      ? formData.learningOutcomes.split('\n').map((o) => o.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      tags: formattedTags,
      learningOutcomes: formattedOutcomes,
    };

    try {
      if (editingEvent) {
        await updateEvent({
          id: editingEvent.id || editingEvent._id,
          ...payload,
        }).unwrap();
        toast.success(`"${formData.title}" updated successfully!`);
      } else {
        await createEvent(payload).unwrap();
        toast.success(`New session "${formData.title}" published!`);
      }
      handleCloseModal();
    } catch (err) {
      const msg =
        err?.data?.message || err?.message || 'Failed to save event. Please check all fields.';
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const handleOpenDelete = (evt) => {
    setEventToDelete(evt);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await deleteEvent(eventToDelete.id || eventToDelete._id).unwrap();
      toast.success(`Session "${eventToDelete.title}" deleted.`);
      setDeleteModalOpen(false);
      setEventToDelete(null);
    } catch (err) {
      toast.error('Failed to delete event: ' + (err?.data?.message || err?.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>Academic Events & Seminars</span>
          </div>
          <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-white mt-1">
            Events Management
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Create, update, remove, and monitor all academic sessions across EDU.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="py-3 px-4.5 rounded-xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#80142B]/30 border border-amber-400/30 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121217] p-3 rounded-2xl border border-stone-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, department, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          >
            <option value="">All Types (Seminars & Workshops)</option>
            <option value="seminar">Seminars Only</option>
            <option value="workshop">Workshops Only</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : (
        <div className="bg-[#121217] rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-900/90 text-stone-400 uppercase text-[10px] font-bold tracking-wider border-b border-stone-800">
                <tr>
                  <th className="p-4">Session & Details</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-stone-500 text-xs">
                      No sessions match the current search filters.
                    </td>
                  </tr>
                ) : (
                  events.map((evt) => (
                    <tr
                      key={evt.id || evt._id}
                      className="hover:bg-stone-900/40 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={evt.coverImage}
                            alt={evt.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-700 bg-stone-900"
                          />
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <div className="font-bold text-white text-sm line-clamp-1">
                              {evt.title}
                            </div>
                            <div className="text-[11px] text-amber-400/90 font-medium truncate">
                              {evt.category} • {evt.department}
                            </div>
                            {evt.featured && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-black text-[9px] uppercase border border-amber-400/30">
                                Featured Highlight
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
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
                      <td className="p-4">
                        <div className="font-semibold text-white">
                          {evt.displayDate || evt.date}
                        </div>
                        <div className="text-[11px] text-stone-400">{evt.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">
                          {evt.registeredCount || 0} / {evt.capacity}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {evt.capacity - (evt.registeredCount || 0)} seats remaining
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase">
                          {evt.status || 'upcoming'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/events/${evt.id}`}
                            target="_blank"
                            title="View on public site"
                            className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(evt)}
                            title="Edit session"
                            className="p-2 rounded-lg bg-stone-900 hover:bg-amber-950/80 hover:text-amber-300 border border-stone-800 text-stone-400 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(evt)}
                            title="Delete session"
                            className="p-2 rounded-lg bg-stone-900 hover:bg-red-950/80 hover:text-red-300 border border-stone-800 text-stone-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Academic Session"
        itemName={eventToDelete?.title || 'Selected session'}
        itemType="academic session"
        isLoading={isDeleting}
        warningMessage="Deleting this session will cancel all existing seat reservations and remove its agenda from the public portal."
      />

      {/* Create / Edit Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#121217] border border-stone-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#80142B] text-amber-200 border border-amber-400/30">
                {editingEvent ? 'Edit Session' : 'Create Session'}
              </span>
              <h2 className="font-['Outfit',sans-serif] font-black text-xl sm:text-2xl text-white">
                {editingEvent ? 'Update Event Details' : 'Publish New Academic Event'}
              </h2>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Event Slug ID *
                  </label>
                  <input
                    type="text"
                    name="id"
                    required
                    disabled={!!editingEvent}
                    placeholder="e.g. edu-ai-summit-2026"
                    value={formData.id}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Session Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  >
                    <option value="seminar">Seminar (Academic & Keynote)</option>
                    <option value="workshop">Workshop (Hands-on & Lab)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Inside the Corporate World: Skills, Strategy, Success"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Subtitle / Theme
                </label>
                <input
                  type="text"
                  name="subtitle"
                  placeholder="e.g. #CampusToCorporate — Navigating Top-Tier Corporate Hierarchies"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    placeholder="e.g. Career & Corporate Strategy"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Academic Wing / Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    required
                    placeholder="e.g. Center for Professional Development and Change (CPDC)"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Date (YYYY-MM-DD) *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Display Date
                  </label>
                  <input
                    type="text"
                    name="displayDate"
                    placeholder="e.g. Thursday, October 15, 2026"
                    value={formData.displayDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    name="time"
                    required
                    placeholder="e.g. 3:00 PM – 5:00 PM"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Room / Venue
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    placeholder="e.g. Grand Auditorium & Novus Studio"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Seat Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    min={1}
                    required
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Fee / Admission
                  </label>
                  <input
                    type="text"
                    name="fee"
                    placeholder="e.g. Free Registration"
                    value={formData.fee}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  name="coverImage"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="e.g. AI, Software, Career, RemoteWork"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Short Description *
                </label>
                <textarea
                  name="shortDescription"
                  rows={2}
                  required
                  placeholder="Brief 1-2 sentence overview for cards..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Full Description & Curriculum *
                </label>
                <textarea
                  name="fullDescription"
                  rows={4}
                  required
                  placeholder="Detailed multi-paragraph event agenda..."
                  value={formData.fullDescription}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Learning Outcomes (one per line)
                </label>
                <textarea
                  name="learningOutcomes"
                  rows={3}
                  placeholder="Point 1&#10;Point 2&#10;Point 3"
                  value={formData.learningOutcomes}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-stone-900 border-stone-700 text-[#80142B] focus:ring-0"
                />
                <label htmlFor="featured" className="text-xs font-semibold text-stone-200">
                  Feature this session on Homepage Spotlight
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-6 py-2.5 rounded-xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs shadow-lg shadow-[#80142B]/30 border border-amber-400/30 disabled:opacity-50 cursor-pointer"
                >
                  {isCreating || isUpdating
                    ? 'Saving...'
                    : editingEvent
                    ? 'Save Changes'
                    : 'Publish Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;
