import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { setCredentials } from '../../redux/features/auth/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Please provide both email and password.');
      return;
    }

    const toastId = toast.loading('Authenticating...');
    try {
      const res = await login({ email: email.trim(), password }).unwrap();
      if (res?.data) {
        dispatch(setCredentials(res.data));
        toast.success(`Welcome back, ${res.data.user?.name || 'User'}!`, {
          id: toastId,
        });

        const userRole = res.data.user?.role;
        const redirectPath =
          location.state?.from?.pathname ||
          (userRole === 'admin' ? '/admin' : '/');

        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      const msg =
        err?.data?.message ||
        err?.message ||
        'Login failed. Please check your credentials.';
      toast.error(msg, { id: toastId });
    }
  };

  const handleQuickFill = (demoEmail, demoPassword, role) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    // toast.info(`Filled demo ${role} credentials.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#180409] via-[#0e0407] to-[#09090b] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#80142B]/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#121217] border border-stone-800 shadow-xl group hover:border-amber-400/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#80142B] to-[#500c1b] border border-amber-400/40 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-['Outfit',sans-serif] font-black text-sm text-white tracking-wide">
              EAST DELTA UNIVERSITY
            </span>
          </Link>

          <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-white pt-2">
            Welcome Back
          </h1>
          <p className="text-xs text-stone-400">
            Sign in to access your portal, manage events, and certificates.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#121217]/90 backdrop-blur-xl border border-stone-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Quick Demo Accounts Banner */}
          <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-400/20 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick Demo Sign-In</span>
            </div>
            <div className="grid  gap-2">
              <button
                type="button"
                onClick={() =>
                  handleQuickFill(
                    'admin@eastdelta.edu.bd',
                    'Admin@123456',
                    'Admin'
                  )
                }
                className="py-1.5 px-2.5 rounded-xl bg-[#80142B]/80 hover:bg-[#80142B] border border-amber-400/30 text-[11px] font-bold text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                <span>Admin Login</span>
              </button>
              {/* <button
                type="button"
                onClick={() =>
                  handleQuickFill(
                    'student@eastdelta.edu.bd',
                    'Student@123456',
                    'Student'
                  )
                }
                className="py-1.5 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-[11px] font-semibold text-stone-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Student Demo</span>
              </button> */}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@eastdelta.edu.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#80142B] hover:bg-[#9b1836] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#80142B]/30 border border-amber-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer pt-3"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-xs text-stone-400">
            Only admin can access here
            {/* <Link
              to="/register"
              className="text-amber-400 hover:underline font-semibold"
            >
              Register here
            </Link> */}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-stone-400 hover:text-white transition-colors"
          >
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
