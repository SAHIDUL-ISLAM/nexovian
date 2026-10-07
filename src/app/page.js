"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: "📝",
      title: "Digital Prescription",
      desc: "Doctors write digital prescriptions that patients can never lose or misread.",
    },
    {
      icon: "📊",
      title: "Health Analytics",
      desc: "Track patient health trends, prescriptions, and medical history over time.",
    },
    {
      icon: "🔐",
      title: "Secure & Encrypted",
      desc: "End-to-end encryption ensures patient data stays private and safe.",
    },
  ];

  const roles = [
    {
      icon: "🩺",
      title: "For Doctors",
      desc: "Write prescriptions digitally, view patient history, and get smart insights.",
      href: "/doctor",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: "🧑‍🦱",
      title: "For Patients",
      desc: "Access your health records anytime, anywhere — no more paper prescriptions.",
      href: "/patient",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: "💊",
      title: "For Pharma",
      desc: "Get anonymized market analytics and demand forecasting insights.",
      href: "/pharma",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "Digital Prescriptions" },
    { value: "500+", label: "Verified Doctors" },
    { value: "50K+", label: "Patient Records" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-4 py-1.5 rounded-full border border-teal-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Bangladesh's Digital Pharma Platform
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
            Smart Prescription &{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Health Data Platform
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connecting doctors, patients, and pharma companies through a secure
            digital prescription and health analytics ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-200 text-sm"
            >
              🚀 Get Started Free
            </Link>
            <Link
              href="/patient"
              className="w-full sm:w-auto bg-white text-slate-700 font-semibold px-8 py-3.5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition text-sm"
            >
              👁️ See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------- FEATURES ----------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Why Choose Nexovian?
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to digitize healthcare prescriptions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ ROLES ------------------------------ */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Built for Everyone
          </h2>
          <p className="text-sm text-slate-500">
            Three portals. One unified healthcare ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition`}
              >
                {r.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{r.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{r.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 group-hover:gap-2 transition-all">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------ STATS ------------------------------ */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-white/10 rounded-full" />

          <div className="relative text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-sm text-teal-100">
              Real-time impact across Bangladesh
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold mb-1">{s.value}</p>
                <p className="text-xs md:text-sm text-teal-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ HOW IT WORKS ------------------------------ */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            How It Works
          </h2>
          <p className="text-sm text-slate-500">
            A simple 3-step flow from prescription to insight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { step: "01", title: "Doctor Writes", desc: "Doctor writes a digital prescription on the platform.", icon: "🩺" },
            { step: "02", title: "System Secures", desc: "Data is encrypted and analyzed securely.", icon: "🔐" },
            { step: "03", title: "Everyone Benefits", desc: "Patients, doctors & pharma get insights.", icon: "📊" },
          ].map((s, i) => (
            <div key={i} className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <span className="absolute top-4 right-4 text-4xl font-bold text-slate-100">
                {s.step}
              </span>
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl mb-4">
                {s.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Ready to digitize healthcare?
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mb-6">
            Join thousands of doctors, patients, and pharma companies already
            using Nexovian to transform digital healthcare in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-200 text-sm"
            >
              Create Free Account
            </Link>
            <Link
              href="/doctor"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl transition text-sm"
            >
              Doctor Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}