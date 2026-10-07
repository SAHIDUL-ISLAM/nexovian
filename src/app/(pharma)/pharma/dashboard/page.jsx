"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ============================================================
   📊 DUMMY ANALYTICS DATA (aggregated, anonymized)
   ============================================================ */

const MONTHLY_DATA = [
  { month: "Jan", total: 1200, own: 340, growth: 12 },
  { month: "Feb", total: 1450, own: 420, growth: 18 },
  { month: "Mar", total: 1680, own: 510, growth: 22 },
  { month: "Apr", total: 1520, own: 470, growth: -9 },
  { month: "May", total: 1820, own: 590, growth: 20 },
  { month: "Jun", total: 2100, own: 720, growth: 15 },
  { month: "Jul", total: 2350, own: 810, growth: 12 },
  { month: "Aug", total: 2180, own: 760, growth: -7 },
  { month: "Sep", total: 2480, own: 890, growth: 14 },
  { month: "Oct", total: 2720, own: 990, growth: 10 },
  { month: "Nov", total: 2950, own: 1080, growth: 8 },
  { month: "Dec", total: 3200, own: 1200, growth: 9 },
];

const AREA_DATA = [
  { area: "Dhaka", total: 1850, own: 720, demand: "High", growth: 14 },
  { area: "Chattogram", total: 1240, own: 450, demand: "High", growth: 11 },
  { area: "Sylhet", total: 680, own: 240, demand: "Medium", growth: 8 },
  { area: "Khulna", total: 520, own: 190, demand: "Medium", growth: 6 },
  { area: "Rajshahi", total: 440, own: 160, demand: "Medium", growth: 4 },
  { area: "Barishal", total: 320, own: 110, demand: "Low", growth: 3 },
  { area: "Rangpur", total: 380, own: 140, demand: "Low", growth: 5 },
  { area: "Mymensingh", total: 290, own: 95, demand: "Low", growth: 2 },
];

const TOP_DOCTORS = [
  { name: "Dr. Kamrul Hasan", specialty: "Medicine", area: "Dhaka", prescriptions: 245, ownBrand: 168, share: 68 },
  { name: "Dr. Nusrat Jahan", specialty: "Cardiology", area: "Dhaka", prescriptions: 212, ownBrand: 140, share: 66 },
  { name: "Dr. Rafiq Ahmed", specialty: "Medicine", area: "Chattogram", prescriptions: 188, ownBrand: 118, share: 63 },
  { name: "Dr. Sabrina Khan", specialty: "Pediatrics", area: "Sylhet", prescriptions: 164, ownBrand: 98, share: 60 },
  { name: "Dr. Tanvir Alam", specialty: "Medicine", area: "Khulna", prescriptions: 142, ownBrand: 80, share: 56 },
];

const TOP_MEDICINES = [
  { name: "Napa 500", company: "Beximco", category: "Painkiller", count: 485, trend: "+12%" },
  { name: "Seclo 20", company: "Square", category: "Gastro", count: 412, trend: "+8%" },
  { name: "Monas 10", company: "Square", category: "Respiratory", count: 368, trend: "+15%" },
  { name: "Maxpro 20", company: "Renata", category: "Gastro", count: 324, trend: "+5%" },
  { name: "Amlopin 5", company: "Square", category: "Cardiac", count: 298, trend: "+10%" },
  { name: "Comet 500", company: "Square", category: "Diabetes", count: 276, trend: "+7%" },
];

const OWN_BRAND_SHARE = [
  { company: "Square", share: 32, color: "#0d9488" },
  { company: "Beximco", share: 24, color: "#0891b2" },
  { company: "Incepta", share: 18, color: "#06b6d4" },
  { company: "Renata", share: 12, color: "#22d3ee" },
  { company: "ACI", share: 8, color: "#67e8f9" },
  { company: "Others", share: 6, color: "#cbd5e1" },
];

const DEMAND_FORECAST = [
  { area: "Dhaka", current: 720, nextMonth: 810, nextQuarter: 950 },
  { area: "Chattogram", current: 450, nextMonth: 520, nextQuarter: 620 },
  { area: "Sylhet", current: 240, nextMonth: 280, nextQuarter: 340 },
  { area: "Khulna", current: 190, nextMonth: 215, nextQuarter: 260 },
  { area: "Rajshahi", current: 160, nextMonth: 180, nextQuarter: 220 },
];

/* ============================================================
   🧩 MAIN DASHBOARD
   ============================================================ */
export default function PharmaDashboard() {
  const router = useRouter();
  const [pharma, setPharma] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("Dec");

  useEffect(() => {
    const raw =
      localStorage.getItem("nexovianUser") ||
      sessionStorage.getItem("nexovianUser");
    if (!raw) {
      router.replace("/signin");
      return;
    }
    try {
      const user = JSON.parse(raw);
      if (user.role !== "pharma") {
        router.replace(`/${user.role}/dashboard`);
        return;
      }
      setPharma(user);
    } catch {
      router.replace("/signin");
    }
  }, [router]);

  if (!pharma) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentMonth = MONTHLY_DATA.find((m) => m.month === selectedMonth) || MONTHLY_DATA[11];
  const maxTotal = Math.max(...MONTHLY_DATA.map((m) => m.total));
  const maxAreaTotal = Math.max(...AREA_DATA.map((a) => a.total));

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-white/10 rounded-full" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome, {pharma.name} 💊
              </h1>
              <p className="text-teal-100 text-sm mt-1">
                Real-time prescription analytics & market insights
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full">
                  🔒 Anonymized Data
                </span>
                <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full">
                  Updated: 12 Dec 2024
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-white/20 backdrop-blur text-white text-sm px-4 py-2.5 rounded-xl border border-white/30 outline-none focus:bg-white/30 transition"
              >
                {MONTHLY_DATA.map((m) => (
                  <option key={m.month} value={m.month} className="text-slate-800">
                    {m.month} 2024
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            icon="📋"
            label="Total Prescriptions"
            value={currentMonth.total.toLocaleString()}
            change={`${currentMonth.growth > 0 ? "+" : ""}${currentMonth.growth}%`}
            positive={currentMonth.growth > 0}
            color="from-teal-500 to-cyan-500"
          />
          <KpiCard
            icon="💊"
            label="Own Brand Suggest"
            value={currentMonth.own.toLocaleString()}
            change={`${((currentMonth.own / currentMonth.total) * 100).toFixed(1)}%`}
            positive={true}
            color="from-emerald-500 to-teal-500"
          />
          <KpiCard
            icon="📈"
            label="Market Growth"
            value={`${currentMonth.growth}%`}
            change="vs last month"
            positive={currentMonth.growth > 0}
            color="from-cyan-500 to-blue-500"
          />
          <KpiCard
            icon="🏥"
            label="Active Areas"
            value={AREA_DATA.length}
            change="+2 new"
            positive={true}
            color="from-purple-500 to-pink-500"
          />
        </div>

        {/* ================= MONTHLY TREND ================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                📊 Monthly Prescription Trend (2024)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Total prescriptions vs own brand suggestions
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-teal-500 to-cyan-400" />
                Total
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-emerald-500 to-teal-400" />
                Own Brand
              </span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25, 0].map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-300 w-10 text-right">
                    {Math.round((maxTotal * v) / 100)}
                  </span>
                  <div className="flex-1 border-t border-dashed border-slate-100" />
                </div>
              ))}
            </div>

            <div className="relative flex items-end justify-between gap-2 h-64 pl-12">
              {MONTHLY_DATA.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <div className="w-full flex items-end justify-center gap-0.5 h-full">
                    <div
                      className="w-1/2 max-w-[20px] bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-md transition-all hover:from-teal-600 hover:to-cyan-500 relative"
                      style={{ height: `${(m.total / maxTotal) * 100}%` }}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                        {m.total}
                      </span>
                    </div>
                    <div
                      className="w-1/2 max-w-[20px] bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-md transition-all hover:from-emerald-600 hover:to-teal-500 relative"
                      style={{ height: `${(m.own / maxTotal) * 100}%` }}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition">
                        {m.own}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2 font-medium">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= TWO COLUMN: AREA + MARKET SHARE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Area-wise Distribution */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                📍 Area-wise Prescription Distribution
              </h2>
              <span className="text-xs text-slate-400">Top 8 areas</span>
            </div>

            <div className="space-y-4">
              {AREA_DATA.map((a, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700 w-24">{a.area}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          a.demand === "High"
                            ? "bg-emerald-100 text-emerald-700"
                            : a.demand === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {a.demand} Demand
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-500">
                        {a.total} total •{" "}
                        <span className="text-teal-600 font-semibold">{a.own} own</span>
                      </span>
                      <span
                        className={`font-semibold ${
                          a.growth > 0 ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {a.growth > 0 ? "+" : ""}
                        {a.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all"
                      style={{ width: `${(a.total / maxAreaTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Share (Donut) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              🏆 Market Share
            </h2>

            {/* Donut SVG */}
            <div className="flex justify-center mb-4">
              <DonutChart data={OWN_BRAND_SHARE} />
            </div>

            <div className="space-y-2">
              {OWN_BRAND_SHARE.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-slate-600">{c.company}</span>
                  </div>
                  <span className="font-semibold text-slate-800">{c.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= DOCTORS + MEDICINES ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Top Doctors */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                👨‍⚕️ Top Suggesting Doctors
              </h2>
              <span className="text-xs text-slate-400">This month</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="py-2 px-2 font-medium">Doctor</th>
                    <th className="py-2 px-2 font-medium">Area</th>
                    <th className="py-2 px-2 font-medium text-right">Presc.</th>
                    <th className="py-2 px-2 font-medium text-right">Own</th>
                    <th className="py-2 px-2 font-medium text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_DOCTORS.map((d, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <p className="text-sm font-medium text-slate-800">{d.name}</p>
                        <p className="text-[10px] text-slate-500">{d.specialty}</p>
                      </td>
                      <td className="py-3 px-2 text-sm text-slate-600">{d.area}</td>
                      <td className="py-3 px-2 text-sm text-slate-600 text-right">{d.prescriptions}</td>
                      <td className="py-3 px-2 text-sm text-teal-600 font-semibold text-right">{d.ownBrand}</td>
                      <td className="py-3 px-2 text-right">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-teal-50 text-teal-700">
                          {d.share}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Medicines */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                💊 Top Prescribed Medicines
              </h2>
              <span className="text-xs text-slate-400">All companies</span>
            </div>

            <div className="space-y-3">
              {TOP_MEDICINES.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-teal-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-sm font-bold text-teal-600 shadow-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{m.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {m.company} • {m.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{m.count}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">{m.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= DEMAND FORECAST ================= */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                📈 Demand Forecast by Area
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                AI-based prediction of upcoming demand
              </p>
            </div>
            <span className="text-[10px] bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">
              AI Powered
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="py-3 px-3 font-medium">Area</th>
                  <th className="py-3 px-3 font-medium text-right">Current Month</th>
                  <th className="py-3 px-3 font-medium text-right">Next Month</th>
                  <th className="py-3 px-3 font-medium text-right">Next Quarter</th>
                  <th className="py-3 px-3 font-medium text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {DEMAND_FORECAST.map((d, i) => {
                  const growth = (
                    ((d.nextQuarter - d.current) / d.current) *
                    100
                  ).toFixed(1);
                  return (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 px-3 text-sm font-medium text-slate-800">
                        📍 {d.area}
                      </td>
                      <td className="py-3 px-3 text-sm text-slate-600 text-right">
                        {d.current}
                      </td>
                      <td className="py-3 px-3 text-sm text-slate-600 text-right">
                        {d.nextMonth}
                      </td>
                      <td className="py-3 px-3 text-sm font-semibold text-teal-700 text-right">
                        {d.nextQuarter}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                          +{growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <p className="text-center text-xs text-slate-400 mt-8">
          🔒 All data shown is anonymized & aggregated. No personal patient information is displayed.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   🧱 COMPONENTS
   ============================================================ */
function KpiCard({ icon, label, value, change, positive, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mb-3 shadow-sm`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-slate-500">{label}</p>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

function DonutChart({ data }) {
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((item, i) => {
          const dash = (item.share / 100) * circumference;
          const gap = circumference - dash;
          const offset = -cumulative;
          cumulative += dash;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>
      <text
        x="50%"
        y="46%"
        textAnchor="middle"
        className="fill-slate-800 font-bold"
        style={{ fontSize: "22px" }}
      >
        {data[0].share}%
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        className="fill-slate-500"
        style={{ fontSize: "10px" }}
      >
        {data[0].company} Leads
      </text>
    </svg>
  );
}