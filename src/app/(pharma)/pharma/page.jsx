"use client";

import React from "react";
import Link from "next/link";

export default function PharmaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-2xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-100/50 border border-white/60 p-8 md:p-10">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-200">
                <span className="text-5xl">💊</span>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                Pro
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              Welcome, Pharma Partner
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sign in to access real-time market analytics, prescription insights, and demand forecasting.
            </p>
          </div>

          {/* Analytics Feature Highlights */}
          <div className="space-y-3 mb-8">
            {[
              {
                icon: "📊",
                title: "Prescription Analytics",
                desc: "See which medicines are prescribed most",
              },
              {
                icon: "📍",
                title: "Regional Insights",
                desc: "Track demand by area & hospital",
              },
              {
                icon: "📈",
                title: "Demand Forecasting",
                desc: "AI-based supply & demand prediction",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/80 hover:bg-teal-50 transition border border-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-lg">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                  <p className="text-xs text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Preview Strip */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-teal-700">
                📊 Live Analytics Preview
              </span>
              <span className="text-[10px] text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
                Anonymized
              </span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-16">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-md transition-all hover:from-teal-600 hover:to-cyan-500"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Sign In Button */}
          <Link
            href="/signin"
            className="block w-full text-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 text-sm"
          >
            🔓 Sign In to Analytics Dashboard
          </Link>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-5">
            Not registered yet?{" "}
            <Link href="/signup" className="text-teal-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Bottom Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Anonymized data • GDPR compliant
        </div>
      </div>
    </div>
  );
}