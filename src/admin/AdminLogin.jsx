import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  LogIn
} from 'lucide-react';
import { EventoraLogo } from '../components/common/Icons';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const { login, quickDemoLogin } = useAdminAuth();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const triggerErrorShake = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleFillDemo = (customUser = 'admin', customPass = 'admin123') => {
    setUsername(customUser);
    setPassword(customPass);
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!username.trim()) {
      triggerErrorShake('Please enter your username or email address.');
      return;
    }
    if (!password.trim()) {
      triggerErrorShake('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(username, password, rememberMe);
      if (res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.user);
        }
      } else {
        triggerErrorShake(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      triggerErrorShake('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDemoAccess = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await quickDemoLogin();
      if (res.success && onLoginSuccess) {
        onLoginSuccess(res.user);
      }
    } catch (err) {
      triggerErrorShake('Failed to launch demo session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070C18] text-[#EFEAE2] flex flex-col justify-between selection:bg-[#DFC07B] selection:text-[#0A0E1A] relative overflow-x-hidden font-sans">
      
      {/* Ambient Luxury Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#DFC07B]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#182542]/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#DFC07B]/5 blur-2xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #DFC07B 1px, transparent 0)`,
            backgroundSize: '36px 36px' 
          }} 
        />
      </div>

      {/* Top Bar with Return Navigation */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-between">
        <button
          onClick={onBackToSite}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#DFC07B] transition-all hover:-translate-x-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Live Website</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DFC07B]/10 border border-[#DFC07B]/30 text-[11px] font-medium text-[#ECCB7F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#DFC07B]" />
          <span>Atelier Secure Environment</span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-6 sm:py-10">
        <div 
          className={`bg-[#0A0E1A]/95 border border-[#DFC07B]/30 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl transition-all duration-300 relative ${
            shake ? 'translate-x-[-8px] animate-wiggle' : ''
          }`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(223, 192, 123, 0.08)'
          }}
        >
          {/* Top Gold Corner Accent Line */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#DFC07B] to-transparent opacity-80" />

          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="relative mb-3.5 p-2 rounded-full bg-gradient-to-b from-[#2A2318] to-[#14120F] border border-[#DFC07B]/80 shadow-lg">
              <EventoraLogo className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            
            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-wide text-white">
                Eventora
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#DFC07B]/20 text-[#ECCB7F] text-[10px] font-bold uppercase tracking-wider border border-[#DFC07B]/40">
                Admin
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A0988A] max-w-xs font-normal">
              Atelier Management Portal &bull; Sign in to access submitted enquiries, manage events, and update atelier contact settings.
            </p>
          </div>

          {/* Quick Demo Credentials Info Pill */}
          <div className="mb-6 p-3.5 rounded-2xl bg-[#0E1528] border border-[#DFC07B]/30 text-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#DFC07B] font-semibold text-[11px] uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Demo Access Credentials</span>
              </div>
              <button
                type="button"
                onClick={() => handleFillDemo('admin', 'admin123')}
                className="text-[11px] text-[#ECCB7F] underline underline-offset-2 hover:text-white transition-colors cursor-pointer font-medium"
              >
                Auto-fill
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#D8CFBF] bg-black/30 p-2 rounded-xl font-mono">
              <div>
                <span className="text-[#8C7E6C] block text-[10px] uppercase font-sans">Username</span>
                <span className="text-white font-semibold">admin</span>
              </div>
              <div>
                <span className="text-[#8C7E6C] block text-[10px] uppercase font-sans">Password</span>
                <span className="text-white font-semibold">admin123</span>
              </div>
            </div>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username / Email Field */}
            <div>
              <label 
                htmlFor="admin-username" 
                className="block text-xs font-semibold text-[#D8CFBF] uppercase tracking-wider mb-1.5"
              >
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#DFC07B]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="admin or admin@eventora.com"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#DFC07B] focus:bg-[#10172A] focus:outline-none focus:ring-1 focus:ring-[#DFC07B] text-white text-xs sm:text-sm placeholder-white/30 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="admin-password" 
                  className="block text-xs font-semibold text-[#D8CFBF] uppercase tracking-wider"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => handleFillDemo('admin', 'admin123')}
                  className="text-[11px] text-[#A0988A] hover:text-[#DFC07B] transition-colors"
                >
                  Forgot? (use admin123)
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#DFC07B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="admin123"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#DFC07B] focus:bg-[#10172A] focus:outline-none focus:ring-1 focus:ring-[#DFC07B] text-white text-xs sm:text-sm placeholder-white/30 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/50 hover:text-[#DFC07B] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#DFC07B] focus:ring-[#DFC07B] accent-[#DFC07B] cursor-pointer"
                />
                <span className="text-xs text-[#A0988A]">Remember session on this device</span>
              </label>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] hover:from-[#F3D794] hover:to-[#B6934A] text-[#0A0E1A] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#DFC07B]/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A0E1A] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Atelier Access...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Authenticate to Admin Portal</span>
                </>
              )}
            </button>

            {/* 1-Click Instant Demo Button */}
            <button
              type="button"
              onClick={handleDirectDemoAccess}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#ECCB7F] border border-[#DFC07B]/30 hover:border-[#DFC07B]/60 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span>One-Click Instant Demo Access</span>
            </button>

          </form>

          {/* Secure indicator note */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-[#786E5E]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DFC07B]/80" />
            <span>Restricted console &bull; Eventora Atelier Protocol</span>
          </div>

        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-[#60574A] px-4">
        <span>&copy; {new Date().getFullYear()} Eventora Atelier. Protected administrative interface.</span>
      </footer>

    </div>
  );
}
