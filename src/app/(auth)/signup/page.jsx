"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FaUserMd,
    FaUserInjured,
    FaPills,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaIdBadge,
    FaBuilding,
    FaShieldAlt,
} from "react-icons/fa";

const roles = [
    { id: "doctor", label: "Doctor", icon: <FaUserMd /> },
    { id: "patient", label: "Patient", icon: <FaUserInjured /> },
    { id: "pharma", label: "Pharma", icon: <FaPills /> },
];

// Extra field that depends on the selected role
const roleField = {
    doctor: { name: "license", label: "Medical registration no.", placeholder: "e.g. A-12345", icon: <FaIdBadge /> },
    pharma: { name: "company", label: "Company name", placeholder: "Your company name", icon: <FaBuilding /> },
};

const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0 to 4
};
const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["bg-slate-300", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-green-600"];

function Field({ label, icon, error, children }) {
    return (
        <div>
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div
                className={`mt-1 flex items-center gap-3 rounded-xl border px-4 h-12 bg-white focus-within:ring-2 focus-within:ring-[#6550E4]/40 ${
                    error ? "border-red-500" : "border-slate-300"
                }`}
            >
                <span className="text-slate-400">{icon}</span>
                {children}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

const inputClass = "w-full bg-transparent outline-none text-slate-900";

export default function SignUpPage() {
    const router = useRouter();
    const [role, setRole] = useState("doctor");
    const [form, setForm] = useState({
        name: "", email: "", phone: "", license: "", company: "", password: "", confirm: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const extra = roleField[role];
    const strength = getStrength(form.password);

    const validate = () => {
        const e = {};
        if (form.name.trim().length < 3) e.name = "Enter your full name";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
        if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
        if (extra && form[extra.name].trim().length < 2) e[extra.name] = `${extra.label} is required`;
        if (form.password.length < 8) e.password = "Use at least 8 characters";
        if (form.confirm !== form.password) e.confirm = "Passwords do not match";
        if (!agree) e.agree = "You must accept the terms to continue";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            // TODO: replace with your real sign-up request, for example
            // await fetch("/api/register", { method: "POST", body: JSON.stringify({ ...form, role }) });
            await new Promise((r) => setTimeout(r, 1000));
            router.push("/signin");
        } catch (err) {
            setErrors({ form: "Could not create your account. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid lg:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl bg-white">
                {/* Left: brand panel */}
                <div className="hidden lg:flex lg:col-span-2 relative flex-col justify-between bg-[#6550E4] text-white p-10 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10" />
                    <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10" />

                    <h2 className="relative text-2xl font-bold tracking-wide">Nexovian</h2>

                    <div className="relative">
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Join the
                            <br />
                            network.
                        </h1>
                        <p className="text-white/80 leading-relaxed">
                            Create your account in a minute and start managing
                            prescriptions, records and insights in one place.
                        </p>
                    </div>

                    <div className="relative flex items-center gap-2 text-sm text-white/80">
                        <FaShieldAlt /> Encrypted and consent-based
                    </div>
                </div>

                {/* Right: form */}
                <div className="lg:col-span-3 p-6 sm:p-10">
                    <h2 className="text-3xl font-bold text-slate-900">Create your account</h2>
                    <p className="text-slate-500 mt-1 mb-6">Choose your role to get started</p>

                    {/* Role tabs */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl mb-6">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => {
                                    setRole(r.id);
                                    setErrors({});
                                }}
                                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
                                    role === r.id
                                        ? "bg-[#6550E4] text-white shadow"
                                        : "text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                                {r.icon}
                                <span className="hidden sm:inline">{r.label}</span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {errors.form && <div className="alert alert-error text-sm py-2">{errors.form}</div>}

                        <Field label="Full name" icon={<FaUser />} error={errors.name}>
                            <input name="name" value={form.name} onChange={update}
                                placeholder="Your full name" autoComplete="name" className={inputClass} />
                        </Field>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="Email" icon={<FaEnvelope />} error={errors.email}>
                                <input type="email" name="email" value={form.email} onChange={update}
                                    placeholder="you@example.com" autoComplete="email" className={inputClass} />
                            </Field>
                            <Field label="Phone" icon={<FaPhone />} error={errors.phone}>
                                <input type="tel" name="phone" value={form.phone} onChange={update}
                                    placeholder="01XXXXXXXXX" autoComplete="tel" className={inputClass} />
                            </Field>
                        </div>

                        {/* Role-specific field */}
                        {extra && (
                            <Field label={extra.label} icon={extra.icon} error={errors[extra.name]}>
                                <input name={extra.name} value={form[extra.name]} onChange={update}
                                    placeholder={extra.placeholder} className={inputClass} />
                            </Field>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="Password" icon={<FaLock />} error={errors.password}>
                                <input type={showPassword ? "text" : "password"} name="password"
                                    value={form.password} onChange={update} placeholder="At least 8 characters"
                                    autoComplete="new-password" className={inputClass} />
                                <button type="button" onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="text-slate-400 hover:text-slate-700">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </Field>
                            <Field label="Confirm password" icon={<FaLock />} error={errors.confirm}>
                                <input type={showPassword ? "text" : "password"} name="confirm"
                                    value={form.confirm} onChange={update} placeholder="Repeat password"
                                    autoComplete="new-password" className={inputClass} />
                            </Field>
                        </div>

                        {/* Password strength */}
                        {form.password && (
                            <div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i}
                                            className={`h-1.5 flex-1 rounded-full ${i <= strength ? strengthColor[strength] : "bg-slate-200"}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Strength: {strengthLabel[strength]}</p>
                            </div>
                        )}

                        {/* Terms */}
                        <div>
                            <label className="flex items-start gap-2 cursor-pointer text-sm text-slate-600">
                                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
                                    className="checkbox checkbox-sm mt-0.5" />
                                <span>
                                    I agree to the{" "}
                                    <Link href="/terms" className="text-[#6550E4] font-medium hover:underline">Terms</Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-[#6550E4] font-medium hover:underline">Privacy Policy</Link>,
                                    and consent to my data being handled securely.
                                </span>
                            </label>
                            {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
                        </div>

                        <button type="submit" disabled={loading}
                            className="btn w-full h-12 rounded-xl bg-[#6550E4] hover:bg-[#5340c9] text-white border-none text-base disabled:opacity-70">
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                `Create ${roles.find((r) => r.id === role).label} account`
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-[#6550E4] font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}