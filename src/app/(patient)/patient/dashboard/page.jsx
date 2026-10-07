"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   🗂️ PATIENT DATA — প্রতিটি email-এর জন্য আলাদা record
   ============================================================ */
const PATIENT_RECORDS = {
  /* ---------------- Patient 1: Nusrat Jahan ---------------- */
  "nusrat@example.com": {
    uid: "PT-2024-00871",
    name: "Nusrat Jahan",
    age: 32,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+880 1712-345678",
    email: "nusrat@example.com",
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
    trendData: [65, 72, 58, 80, 68, 75],
  },

  /* ---------------- Patient 2: Tanvir Alam (disabled but kept for reference) ---------------- */
  "tanvir@example.com": {
    uid: "PT-2024-00234",
    name: "Tanvir Alam",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+880 1911-223344",
    email: "tanvir@example.com",
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
    trendData: [55, 60, 68, 72, 65, 70],
  },

  /* ---------------- Patient 3: Sadia Islam (NEW) ---------------- */
  "sadia@example.com": {
    uid: "PT-2024-00512",
    name: "Sadia Islam",
    age: 28,
    gender: "Female",
    bloodGroup: "A+",
    phone: "+880 1733-998877",
    email: "sadia@example.com",
    address: "Uttara, Dhaka, Bangladesh",
    emergencyContact: "+880 1911-445566",
    avatar: "https://i.pravatar.cc/150?img=32",
    lastVisit: "02 Oct 2024",
    medicalHistory: [
      { id: 1, condition: "Migraine", since: "2020", status: "Ongoing", doctor: "Dr. Ferdous Rahman", icon: "🧠", color: "text-purple-600 bg-purple-50" },
      { id: 2, condition: "Iron Deficiency Anemia", since: "2023", status: "Under Treatment", doctor: "Dr. Nazia Sultana", icon: "🩸", color: "text-rose-600 bg-rose-50" },
    ],
    reports: [
      { id: 1, title: "Complete Blood Count (CBC)", date: "02 Oct 2024", lab: "Ibn Sina Diagnostic", status: "Low Hemoglobin", statusColor: "bg-amber-100 text-amber-700" },
      { id: 2, title: "Serum Ferritin", date: "25 Sep 2024", lab: "Labaid Hospital", status: "Low", statusColor: "bg-rose-100 text-rose-700" },
      { id: 3, title: "MRI Brain", date: "15 Sep 2024", lab: "United Hospital", status: "Normal", statusColor: "bg-emerald-100 text-emerald-700" },
    ],
    metrics: [
      { label: "Blood Pressure", value: "110/70", unit: "mmHg", trend: "-1%", positive: true },
      { label: "Hemoglobin", value: "9.8", unit: "g/dL", trend: "+2%", positive: true },
      { label: "Weight", value: "54", unit: "kg", trend: "0%", positive: true },
      { label: "BMI", value: "20.1", unit: "", trend: "0%", positive: true },
    ],
    vaccinations: [
      { name: "COVID-19 Booster", date: "20 Mar 2024" },
      { name: "Hepatitis B", date: "15 Aug 2023" },
    ],
    trendData: [60, 55, 62, 70, 65, 72],
  },
};

/* ============================================================
   🧩 MAIN PAGE
   ============================================================ */
export default function PatientDashboard() {
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

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

      // role check
      if (user.role !== "patient") {
        router.replace(`/${user.role}/dashboard`);
        return;
      }

      // email → patient record
      const record = PATIENT_RECORDS[user.email.toLowerCase()];

      if (!record) {
        // fallback (unregistered patient)
        setPatient({
          uid: "PT-0000-00000",
          name: user.name || "Patient",
          age: "—",
          gender: "—",
          bloodGroup: "—",
          phone: "—",
          email: user.email,
          address: "—",
          emergencyContact: "—",
          avatar: "https://i.pravatar.cc/150?img=5",
          lastVisit: "—",
          medicalHistory: [],
          reports: [],
          metrics: [],
          vaccinations: [],
          trendData: [50, 50, 50, 50, 50, 50],
        });
        return;
      }

      setPatient(record);
    } catch {
      router.replace("/signin");
    }
  }, [router]);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "history", label: "Medical History", icon: "❤️" },
    { id: "reports", label: "Reports", icon: "📄" },
    { id: "metrics", label: "Health Metrics", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* =========================== HEADER =========================== */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-white/10 rounded-full" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={patient.avatar}
                alt={patient.name}
                className="w-20 h-20 rounded-2xl border-4 border-white/30 object-cover"
              />
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

        {/* =========================== TABS =========================== */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* =========================== CONTENT =========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ---------------- PROFILE ---------------- */}
          {activeTab === "profile" && (
            <>
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  👤 Personal Information
                </h2>
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
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  💉 Vaccinations
                </h2>
                <div className="space-y-3">
                  {patient.vaccinations.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-4">No vaccinations recorded.</p>
                  ) : (
                    patient.vaccinations.map((v, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{v.name}</p>
                          <p className="text-xs text-slate-500">{v.date}</p>
                        </div>
                        <span className="text-slate-400">›</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {/* ---------------- HISTORY ---------------- */}
          {activeTab === "history" && (
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                ❤️ Medical History
              </h2>
              {patient.medicalHistory.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No medical history recorded.</p>
              ) : (
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
              )}
            </div>
          )}

          {/* ---------------- REPORTS ---------------- */}
          {activeTab === "reports" && (
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  📄 Diagnostic Reports
                </h2>
                <button className="text-sm text-teal-600 font-medium hover:underline">View All</button>
              </div>
              {patient.reports.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No reports uploaded.</p>
              ) : (
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
              )}
            </div>
          )}

          {/* ---------------- METRICS ---------------- */}
          {activeTab === "metrics" && (
            <>
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {patient.metrics.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4 lg:col-span-4">No metrics available.</p>
                ) : (
                  patient.metrics.map((m, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
                      <p className="text-sm text-slate-500 mb-1">{m.label}</p>
                      <div className="flex items-end justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-slate-800">{m.value}</span>
                          {m.unit && <span className="text-xs text-slate-400">{m.unit}</span>}
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                          {m.trend}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">📈 Trends (Last 6 Months)</h2>
                  <span className="text-xs text-slate-400">Updated: {patient.lastVisit}</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[100, 75, 50, 25, 0].map((v) => (
                      <div key={v} className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-300 w-8 text-right">{v}%</span>
                        <div className="flex-1 border-t border-dashed border-slate-100" />
                      </div>
                    ))}
                  </div>
                  <div className="relative flex items-end justify-between gap-3 h-56 pl-10">
                    {patient.trendData.map((value, i) => {
                      const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                          <span className="text-xs font-semibold text-teal-700 mb-1 opacity-0 group-hover:opacity-100 transition">
                            {value}%
                          </span>
                          <div
                            className="w-full max-w-[48px] bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-teal-600 hover:to-cyan-500 shadow-sm"
                            style={{ height: `${value}%` }}
                          />
                          <span className="text-xs text-slate-500 mt-2 font-medium">{months[i]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          🔒 Your data is end-to-end encrypted and only shared with your consent.
        </p>
      </div>
    </div>
  );
}