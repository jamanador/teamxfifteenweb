import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
      <div className="w-10 h-10 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-xs font-semibold text-stone-400 tracking-wider uppercase">
        Loading EDU Portal...
      </p>
    </div>
  );
};

export default Loader;
