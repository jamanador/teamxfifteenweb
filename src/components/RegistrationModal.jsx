import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  X,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Copy,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRegisterForEventMutation } from '../redux/features/events/eventsApi';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

const RegistrationModal = ({ event, isOpen, onClose }) => {
  const currentUser = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    studentId: currentUser?.studentId || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    department: currentUser?.department || 'Computer Science & Engineering',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [passNumber, setPassNumber] = useState('');

  const [registerForEvent, { isLoading }] = useRegisterForEventMutation();

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error('Full name and email are required.');
      return;
    }

    const toastId = toast.loading('Reserving your seat...');
    try {
      const payload = {
        id: event.id || event._id,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        studentId: formData.studentId.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        department: formData.department,
      };

      await registerForEvent(payload).unwrap();
      const generatedPass =
        'EDU-' + Math.floor(100000 + Math.random() * 900000);
      setPassNumber(generatedPass);
      setIsRegistered(true);
      toast.success('Seat confirmed! Pass generated.', { id: toastId });
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        'Registration failed. Please check your details.';
      toast.error(msg, { id: toastId });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passNumber);
    setCopied(true);
    toast.success('Pass code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsRegistered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121217] border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isRegistered ? (
          /* Registration Form */
          <div>
            <div className="mb-6 space-y-1">
              <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#80142B] text-amber-200 border border-amber-400/30">
                Seat Reservation
              </span>
              <h2 className="font-['Outfit',sans-serif] font-black text-xl sm:text-2xl text-white">
                Register for Session
              </h2>
              <p className="text-xs text-stone-400 line-clamp-1">
                {event.title}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Student ID / Roll
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 231014022"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    EDU Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@eastdelta.edu.bd"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Academic Wing / Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  <option value="Computer Science & Engineering">
                    Computer Science & Engineering
                  </option>
                  <option value="School of Business Administration">
                    School of Business Administration
                  </option>
                  <option value="Electrical & Electronic Engineering">
                    Electrical & Electronic Engineering
                  </option>
                  <option value="Department of English">
                    Department of English
                  </option>
                  <option value="Department of Economics">
                    Department of Economics
                  </option>
                  <option value="Other / External Participant">
                    Other / External Participant
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#80142B] hover:bg-[#9b1836] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#80142B]/30 border border-amber-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Registering Seat...</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 text-amber-300" />
                      <span>Confirm Registration & Generate Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Admission Pass */
          <div className="text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-['Outfit',sans-serif] font-black text-xl text-white">
                Registration Confirmed!
              </h3>
              <p className="text-xs text-stone-400">
                Your admission pass has been registered on the server for this session.
              </p>
            </div>

            {/* Ticket Box */}
            <div className="bg-stone-900 border border-amber-400/30 rounded-2xl p-5 text-left space-y-3 relative">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Official Admission Pass
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {passNumber}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white line-clamp-1">
                {event.title}
              </h4>

              <div className="space-y-1 text-xs text-stone-300">
                <p>
                  <strong>Attendee:</strong> {formData.fullName}{' '}
                  {formData.studentId && `(${formData.studentId})`}
                </p>
                <div className="flex items-center gap-2 text-stone-400 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{event.displayDate || event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span>{event.roomNumber || event.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-700 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Pass Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Pass Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
