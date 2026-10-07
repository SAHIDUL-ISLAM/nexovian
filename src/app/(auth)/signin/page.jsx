"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUserMd, FaUserInjured, FaPills, FaEye, FaEyeSlash } from "react-icons/fa";

const ROLES = [
  { id: "doctor", label: "Doctor", icon: FaUserMd },
  { id: "patient", label: "Patient", icon: FaUserInjured },
  { id: "pharma", label: "Pharma", icon: FaPills },
];

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // ✅ Store pending login including ROLE
    const pending = {
      email: email.trim(),
      password,
      role,       // 🔴 MUST be included
      remember,
    };

    sessionStorage.setItem("pendingLogin", JSON.stringify(pending));
    router.push("/verify");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE — Info Panel */}
        <div className="hidden md:flex flex-col justify-between bg-[#6550E4] text-white p-10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full" />

          <div className="relative">
            <h2 className="text-2xl font-bold mb-8">Nexovian</h2>
            <h3 className="text-3xl font-bold leading-tight mb-4">
              Smarter care,
              <br />
              connected data.
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              One secure platform for doctors, patients and pharma companies.
              Digital prescriptions, instant history and data-driven supply.
            </p>
          </div>

          <div className="relative flex items-center gap-2 text-xs text-white/70">
            <span>🔒</span>
            Your data is encrypted and consent-based
          </div>
        </div>

        {/* RIGHT SIDE — Form */}
        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-6">Sign in to continue to Nexovian</p>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 rounded-xl p-1 mb-6">
            {ROLES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition ${
                  role === id
                    ? "bg-[#6550E4] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                <Icon className="text-sm" />
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#6550E4] focus:ring-2 focus:ring-[#6550E4]/20 outline-none text-sm text-slate-700 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 focus:border-[#6550E4] focus:ring-2 focus:ring-[#6550E4]/20 outline-none text-sm text-slate-700 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#6550E4]"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-[#6550E4] font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-lg">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#6550E4] hover:bg-[#5340c9] text-white font-semibold transition shadow-md shadow-[#6550E4]/30 text-sm"
            >
              Sign in as {ROLES.find((r) => r.id === role)?.label}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-6">
            New to Nexovian?{" "}
            <Link href="/signup" className="text-[#6550E4] font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}