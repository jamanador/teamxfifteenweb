import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#80142B]/20 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
        <Compass className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          404 Error
        </span>
        <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-4xl text-white">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-sm mx-auto leading-relaxed">
          The page or academic directory link you are trying to access does not exist or has been relocated.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-2xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs shadow-lg border border-amber-400/30 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-300" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
