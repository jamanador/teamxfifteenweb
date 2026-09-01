import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { selectCurrentUser, selectIsAuthenticated } from '../redux/features/auth/authSlice';

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121217] border border-amber-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-['Outfit',sans-serif] font-black text-2xl text-white">
              Access Restricted
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed">
              This area is restricted to administrators only. You are currently logged in as <strong className="text-amber-300">({user?.role})</strong>.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#80142B] hover:bg-[#9b1836] text-white font-bold text-xs transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-semibold text-xs transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login as Admin</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
