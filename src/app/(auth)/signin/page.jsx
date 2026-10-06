"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FaUserMd,
    FaUserInjured,
    FaPills,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
} from "react-icons/fa";

const roles = [
    { id: "doctor", label: "Doctor", icon: <FaUserMd /> },
    { id: "patient", label: "Patient", icon: <FaUserInjured /> },
    { id: "pharma", label: "Pharma", icon: <FaPills /> },
];

export default function SignInPage() {
    const router = useRouter();
    const [role, setRole] = useState("doctor");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address";
        if (password.length < 6) e.password = "Password must be at least 6 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    sessionStorage.setItem(
        "pendingLogin",
        JSON.stringify({ email, password, role, remember })
    );
    router.push("/verify");
};

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white">
                {/* Left: brand panel (hidden on small screens) */}
                <div className="hidden lg:flex relative flex-col justify-between bg-[#6550E4] text-white p-10 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10" />
                    <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10" />

                    <h2 className="relative text-2xl font-bold tracking-wide">Nexovian</h2>

                    <div className="relative">
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Smarter care,
                            <br />
                            connected data.
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            One secure platform for doctors, patients and pharma
                            companies. Digital prescriptions, instant history and
                            data-driven supply.
                        </p>
                    </div>

                    <div className="relative flex items-center gap-2 text-sm text-white/80">
                        <FaShieldAlt /> Your data is encrypted and consent-based
                    </div>
                </div>

                {/* Right: form */}
                <div className="p-6 sm:p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
                    <p className="text-slate-500 mt-1 mb-6">
                        Sign in to continue to Nexovian
                    </p>

                    {/* Role tabs */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl mb-6">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
                                    role === r.id
                                        ? "bg-[#6550E4] text-white shadow"
                                        : "text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {r.icon}
                                <span className="hidden xs:inline sm:inline">{r.label}</span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {errors.form && (
                            <div className="alert alert-error text-sm py-2">{errors.form}</div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <div
                                className={`mt-1 flex items-center gap-3 rounded-xl border px-4 h-12 bg-white focus-within:ring-2 focus-within:ring-[#6550E4]/40 ${
                                    errors.email ? "border-red-500" : "border-slate-300"
                                }`}
                            >
                                <FaEnvelope className="text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full bg-transparent outline-none text-slate-900"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <div
                                className={`mt-1 flex items-center gap-3 rounded-xl border px-4 h-12 bg-white focus-within:ring-2 focus-within:ring-[#6550E4]/40 ${
                                    errors.password ? "border-red-500" : "border-slate-300"
                                }`}
                            >
                                <FaLock className="text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full bg-transparent outline-none text-slate-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="text-slate-400 hover:text-slate-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember + forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="checkbox checkbox-sm"
                                />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className="text-[#6550E4] font-medium hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn w-full h-12 rounded-xl bg-[#6550E4] hover:bg-[#5340c9] text-white border-none text-base disabled:opacity-70"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                `Sign in as ${roles.find((r) => r.id === role).label}`
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        New to Nexovian?{" "}
                        <Link href="/signup" className="text-[#6550E4] font-semibold hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}