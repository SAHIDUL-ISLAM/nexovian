"use client";

import React, { useState } from "react";

/* ----------------------------- MOCK DATABASE ----------------------------- */
const PATIENTS_DB = [
  {
    uid: "PT-2024-00871",
    phone: "+880 1712-345678",
    name: "Ayesha Rahman",
    age: 32,
    gender: "Female",
    bloodGroup: "B+",
    email: "ayesha.rahman@example.com",
    address: "Dhanmondi, Dhaka, Bangladesh",
    emergencyContact: "+880 1812-987654",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastVisit: "12 Sep 2024",
    medicalHistory: [
      { id: 1, condition: "Type 2 Diabetes", since: "2019", status: "Ongoing", doctor: "Dr. Kamrul Hasan", icon: "🩸", color: "text-rose-600 bg-rose-50" },
      { id: 2, condition: "Hypertension", since: "2021", status: "Controlled", doctor: "Dr. Nusrat Jahan", icon: "❤️", color: "text-amber-600 bg-amber-50" },
      { id: 3, condition: "Appendectomy Surgery", since: "2015", status: "Recovered", doctor: "Dr. Rafiq Ahmed", icon: "🩺", color: "text-emerald-600 bg-emerald-50" },
      { id: 4, condition: "Penicillin Allergy", since: "Birth", status: "Permanent", doctor: "—", icon: "⚠️", color: "text-purple-600 bg-purple-50" },
    ],
    reports: [
      { id: 1, title: "Complete Blood Count (CBC)", date: "12 Sep 2024", lab: "Popular Diagnostic Center", status: "Normal", statusColor: "bg-emerald-100 text-emerald-700" },
      { id: 2, title: "HbA1c Test", date: "05 Sep 2024", lab: "Labaid Hospital", status: "Slightly High", statusColor: "bg-amber-100 text-amber-700" },
      { id: 3, title: "Chest X-Ray", date: "20 Aug 2024", lab: "Square Hospital", status: "Normal", statusColor: "bg-emerald-100 text-emerald-700" },
      { id: 4, title: "Lipid Profile", date: "10 Aug 2024", lab: "Ibn Sina Diagnostic", status: "High", statusColor: "bg-rose-100 text-rose-700" },
    ],
    metrics: [
      { label: "Blood Pressure", value: "120/80", unit: "mmHg", trend: "-2%", positive: true },
      { label: "Blood Sugar", value: "7.2", unit: "mmol/L", trend: "+4%", positive: false },
      { label: "Weight", value: "62", unit: "kg", trend: "-1%", positive: true },
      { label: "BMI", value: "22.4", unit: "", trend: "0%", positive: true },
    ],
    vaccinations: [
      { name: "COVID-19 Booster", date: "15 Jan 2024" },
      { name: "Influenza", date: "02 Nov 2023" },
      { name: "Hepatitis B", date: "10 Jun 2022" },
    ],
  },
  {
    uid: "PT-2024-00234",
    phone: "+880 1911-223344",
    name: "Rahim Uddin",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    email: "rahim.uddin@example.com",
    address: "Mirpur, Dhaka, Bangladesh",
    emergencyContact: "+880 1711-556677",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastVisit: "28 Sep 2024",
    medicalHistory: [
      { id: 1, condition: "Asthma", since: "2010", status: "Ongoing", doctor: "Dr. Sabrina Khan", icon: "🫁", color: "text-sky-600 bg-sky-50" },
      { id: 2, condition: "High Cholesterol", since: "2022", status: "Controlled", doctor: "Dr. Tanvir Alam", icon: "🩸", color: "text-amber-600 bg-amber-50" },
    ],
    reports: [
      { id: 1, title: "ECG Report", date: "28 Sep 2024", lab: "Square Hospital", status: "Normal", statusColor: "bg-emerald-100 text-emerald-700" },
      { id: 2, title: "Lipid Profile", date: "15 Sep 2024", lab: "Popular Diagnostic", status: "High", statusColor: "bg-rose-100 text-rose-700" },
    ],
    metrics: [
      { label: "Blood Pressure", value: "135/88", unit: "mmHg", trend: "+3%", positive: false },
      { label: "Blood Sugar", value: "5.8", unit: "mmol/L", trend: "0%", positive: true },
      { label: "Weight", value: "78", unit: "kg", trend: "+2%", positive: false },
      { label: "BMI", value: "26.1", unit: "", trend: "+2%", positive: false },
    ],
    vaccinations: [
      { name: "COVID-19 Booster", date: "10 Feb 2024" },
      { name: "Tetanus", date: "05 Mar 2023" },
    ],
  },
];

/* ------------------------------- COMPONENTS ------------------------------- */
const StatCard = ({ label, value, unit, trend, positive }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <p className="text-sm text-slate-500 mb-1">{label}</p>
    <div className="flex items-end justify-between">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        {unit && <span className="text-xs text-slate-400">{unit}</span>}
      </div>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
        {trend}
      </span>
    </div>
  </div>
);

const TabButton = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
      active ? "bg-teal-600 text-white shadow-md shadow-teal-200" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
    }`}
  >
    <span>{icon}</span>
    {label}
  </button>
);

/* ---------------------------------- PAGE ---------------------------------- */
export default function PatientRecordPage() {
  const [uidQuery, setUidQuery] = useState("");
  const [phoneQuery, setPhoneQuery] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const normalize = (str) => (str || "").replace(/\s|-/g, "").toLowerCase();

  const handleSearch = (e) => {
    e.preventDefault();
    const uid = uidQuery.trim();
    const phone = phoneQuery.trim();

    // ✅ Both fields are required
    if (!uid && !phone) {
      setError("Both UID and Phone Number are required to search.");
      setPatient(null);
      return;
    }
    if (!uid) {
      setError("Please enter the Patient UID.");
      setPatient(null);
      return;
    }
    if (!phone) {
      setError("Please enter the Phone Number.");
      setPatient(null);
      return;
    }

    // ✅ Both must match the same patient
    const found = PATIENTS_DB.find(
      (p) => normalize(p.uid) === normalize(uid) && normalize(p.phone) === normalize(phone)
    );

    if (found) {
      setPatient(found);
      setError("");
      setActiveTab("profile");
    } else {
      setPatient(null);
      setError("No patient found with this UID and Phone Number combination.");
    }
  };

  const handleReset = () => {
    setUidQuery("");
    setPhoneQuery("");
    setPatient(null);
    setError("");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "history", label: "Medical History", icon: "❤️" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "metrics", label: "Health Metrics", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* ------------------------------ SEARCH BAR ------------------------------ */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              Patient Health Record Portal
            </h1>
            <p className="text-sm text-slate-500">
              Enter <b>both UID and Phone Number</b> to view patient details
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* UID Field */}
              <div className="relative">
                <label className="text-xs font-medium text-slate-500 mb-1 block">
                  Patient UID <span className="text-rose-500">*</span>
                </label>
                <span className="absolute left-4 top-[38px] text-slate-400">🆔</span>
                <input
                  type="text"
                  value={uidQuery}
                  onChange={(e) => setUidQuery(e.target.value)}
                  placeholder="e.g. PT-2024-00871"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 transition"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label className="text-xs font-medium text-slate-500 mb-1 block">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <span className="absolute left-4 top-[38px] text-slate-400">📞</span>
                <input
                  type="text"
                  value={phoneQuery}
                  onChange={(e) => setPhoneQuery(e.target.value)}
                  placeholder="e.g. +880 1712-345678"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 transition"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-md shadow-teal-200 text-sm"
              >
                🔍 Search Patient
              </button>
              {(uidQuery || phoneQuery || patient) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-6 py-3 rounded-xl transition text-sm"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Hint */}
          <div className="text-center mt-4 text-xs text-slate-400">
            Demo → UID: <span className="text-teal-600 font-medium">PT-2024-00871</span> &nbsp;|&nbsp;
            Phone: <span className="text-teal-600 font-medium">+880 1712-345678</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 max-w-3xl mx-auto bg-rose-50 border border-rose-100 text-rose-600 text-sm px-4 py-3 rounded-xl text-center">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* ---------------------------- EMPTY STATE ---------------------------- */}
        {!patient && !error && (
          <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-200 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-lg font-semibold text-slate-700 mb-1">Secure Patient Access</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Both <b>UID</b> and <b>Phone Number</b> are required to load patient records for privacy & security reasons.
            </p>
          </div>
        )}

        {/* ---------------------------- PATIENT DATA ---------------------------- */}
        {patient && (
          <>
            {/* HEADER */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-lg mb-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-white/10 rounded-full" />
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <img src={patient.avatar} alt={patient.name} className="w-20 h-20 rounded-2xl border-4 border-white/30 object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{patient.name}</h1>
                      <span title="Verified">🛡️</span>
                    </div>
                    <p className="text-teal-100 text-sm mt-1">
                      UID: {patient.uid} • {patient.age} yrs • {patient.gender}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-xs">
                      <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">🩸 {patient.bloodGroup}</span>
                      <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">📅 Last visit: {patient.lastVisit}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-white text-teal-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-teal-50 transition shadow">
                  ⬇️ Export Record
                </button>
              </div>
            </div>

            {/* TABS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {tabs.map((tab) => (
                <TabButton key={tab.id} active={activeTab === tab.id} icon={tab.icon} label={tab.label} onClick={() => setActiveTab(tab.id)} />
              ))}
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {activeTab === "profile" && (
                <>
                  <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">👤 Personal Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: "📞", label: "Phone", value: patient.phone },
                        { icon: "✉️", label: "Email", value: patient.email },
                        { icon: "📍", label: "Address", value: patient.address },
                        { icon: "⚠️", label: "Emergency Contact", value: patient.emergencyContact },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                          <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">{item.icon}</div>
                          <div>
                            <p className="text-xs text-slate-500">{item.label}</p>
                            <p className="text-sm font-medium text-slate-800">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">💉 Vaccinations</h2>
                    <div className="space-y-3">
                      {patient.vaccinations.map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{v.name}</p>
                            <p className="text-xs text-slate-500">{v.date}</p>
                          </div>
                          <span className="text-slate-400">›</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "history" && (
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">❤️ Medical History</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patient.medicalHistory.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all">
                        <div className={`p-3 rounded-xl ${item.color}`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800">{item.condition}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{item.status}</span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">Since {item.since}</p>
                          <p className="text-xs text-slate-400 mt-2">🩺 {item.doctor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reports" && (
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">📄 Diagnostic Reports</h2>
                    <button className="text-sm text-teal-600 font-medium hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-xs text-slate-500 border-b border-slate-100">
                          <th className="py-3 px-4 font-medium">Report</th>
                          <th className="py-3 px-4 font-medium">Date</th>
                          <th className="py-3 px-4 font-medium">Lab</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.reports.map((r) => (
                          <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                            <td className="py-4 px-4 text-sm font-medium text-slate-800">{r.title}</td>
                            <td className="py-4 px-4 text-sm text-slate-500">{r.date}</td>
                            <td className="py-4 px-4 text-sm text-slate-500">{r.lab}</td>
                            <td className="py-4 px-4">
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.statusColor}`}>{r.status}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium hover:underline">👁️ View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "metrics" && (
                <>
                {/* Trends Card – FIXED */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    📈 Trends (Last 6 Months)
                    </h2>
                    <span className="text-xs text-slate-400">Updated: {patient.lastVisit}</span>
                </div>

                {/* Chart Container */}
                <div className="relative">
                    {/* Y-axis grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[100, 75, 50, 25, 0].map((v) => (
                        <div key={v} className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-300 w-8 text-right">{v}%</span>
                        <div className="flex-1 border-t border-dashed border-slate-100" />
                        </div>
                    ))}
                    </div>

                    {/* Bars */}
                    <div className="relative flex items-end justify-between gap-3 h-56 pl-10">
                    {[
                        { month: "Apr", value: 65 },
                        { month: "May", value: 72 },
                        { month: "Jun", value: 58 },
                        { month: "Jul", value: 80 },
                        { month: "Aug", value: 68 },
                        { month: "Sep", value: 75 },
                    ].map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                        {/* Value label */}
                        <span className="text-xs font-semibold text-teal-700 mb-1 opacity-0 group-hover:opacity-100 transition">
                            {item.value}%
                        </span>

                        {/* Bar */}
                        <div
                            className="w-full max-w-[48px] bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-teal-600 hover:to-cyan-500 shadow-sm"
                            style={{ height: `${item.value}%` }}
                        />

                        {/* Month label */}
                        <span className="text-xs text-slate-500 mt-2 font-medium">{item.month}</span>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-teal-500 to-cyan-400" />
                    Health Score
                    </div>
                    <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-slate-200" />
                    Baseline
                    </div>
                </div>
                </div>
                </>
              )}
            </div>

            <p className="text-center text-xs text-slate-400 mt-8">🔒 Your data is end-to-end encrypted and only shared with your consent.</p>
          </>
        )}
      </div>
    </div>
  );
}