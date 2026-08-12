import { useState } from "react";
import { Eye, EyeOff, Crown, Sparkles, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import type { Page } from "../../types";
import { authService } from "../../api";

export interface LoginPageProps {
  setPage: (page: Page) => void;
}

export function LoginPage({ setPage }: LoginPageProps) {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "signin") {
        await authService.login(email, password);
      } else {
        await authService.register(name, email, password);
      }
      setPage("dashboard");
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ornamental glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-[#C8A14B]/12 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#6A2332]/8 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logomark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A14B] to-[#9B7629] shadow-[0_8px_32px_rgba(200,161,75,0.4)] mb-4">
            <Crown size={28} className="text-white" />
          </div>
          <h1
            className="text-3xl text-[#222] dark:text-[#F5F0E8] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Empire &amp; Ink
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-1">
            {mode === "signin" ? "Welcome back to the Royal Studio" : "Join the Imperial Court"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-[#C8A14B]/25 bg-white/80 dark:bg-[#1A1814]/90 backdrop-blur-2xl p-8 shadow-[0_16px_60px_rgba(0,0,0,0.10)]">
          {/* Google Sign-In */}
          <button
            onClick={() => setPage("dashboard")}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-black/12 dark:border-white/12 bg-white dark:bg-white/5 hover:bg-black/4 dark:hover:bg-white/10 text-sm font-medium text-[#222] dark:text-[#F5F0E8] transition-all mb-5 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#C8A14B]/20" />
            <span className="text-[11px] text-[#6F6F6F] font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#C8A14B]/20" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {mode === "register" && (
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6F6F]" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/60"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6F6F]" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/60"
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6F6F]" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] placeholder:text-[#6F6F6F]/60"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6F6F6F] hover:text-[#222] dark:hover:text-white transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#C8A14B] text-white font-medium text-sm shadow-[0_4px_18px_rgba(200,161,75,0.4)] hover:bg-[#d4af56] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <Sparkles size={15} />
              {loading
                ? "Opening Royal Atelier..."
                : mode === "signin"
                ? "Enter the Atelier"
                : "Create Royal Account"}
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="text-center mt-5">
            <button
              onClick={() => setMode(mode === "signin" ? "register" : "signin")}
              className="text-xs text-[#6F6F6F] hover:text-[#C8A14B] transition-colors"
            >
              {mode === "signin"
                ? "New to Empire & Ink? Create an account"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        {/* Back to landing */}
        <div className="text-center mt-5">
          <button
            onClick={() => setPage("landing")}
            className="text-xs text-[#6F6F6F] hover:text-[#C8A14B] transition-colors"
          >
            ← Back to the Imperial Court
          </button>
        </div>
      </div>
    </div>
  );
}
