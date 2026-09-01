import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  itemName = 'this item',
  itemType = 'item',
  isLoading = false,
  warningMessage = 'This action cannot be undone and will permanently remove this record from the database.',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#121217] border border-red-900/40 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-lg shadow-red-950/50">
            <Trash2 className="w-6 h-6" />
          </div>

          <div className="space-y-1 min-w-0 pr-6">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-950 text-red-300 border border-red-800/40">
              Permanent Deletion
            </span>
            <h3 className="font-['Outfit',sans-serif] font-black text-lg text-white">
              {title}
            </h3>
          </div>
        </div>

        {/* Details & Target Item */}
        <div className="space-y-3">
          <p className="text-xs text-stone-300 leading-relaxed">
            Are you sure you want to permanently delete this {itemType}?
          </p>

          <div className="p-3 rounded-2xl bg-stone-900/90 border border-stone-800 text-xs">
            <span className="text-[10px] font-bold uppercase text-stone-500 block mb-0.5">
              Target {itemType}
            </span>
            <p className="font-bold text-white truncate">{itemName}</p>
          </div>

          {/* Warning banner */}
          <div className="p-3 rounded-2xl bg-red-950/40 border border-red-500/20 text-red-200 text-[11px] flex items-start gap-2 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{warningMessage}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-800/80">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs shadow-lg shadow-red-950/60 border border-red-500/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm & Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
