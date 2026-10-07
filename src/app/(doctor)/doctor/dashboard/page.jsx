"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorDashboard() {
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);

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
      if (user.role !== "doctor") {
        router.replace(`/${user.role}/dashboard`);
        return;
      }
      setDoctor(user);
    } catch {
      router.replace("/signin");
    }
  }, [router]);

  if (!doctor) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-[#6550E4]" />
      </div>
    );
  }

  const stats = [
    { label: "Today's Patients", value: "12", icon: "🧑‍🦱", color: "from-teal-500 to-cyan-500" },
    { label: "Prescriptions", value: "48", icon: "📝", color: "from-emerald-500 to-teal-500" },
    { label: "Pending Reviews", value: "5", icon: "⏳", color: "from-amber-500 to-orange-500" },
    { label: "Total Patients", value: "320", icon: "📊", color: "from-cyan-500 to-blue-500" },
  ];

  const recentPatients = [
    { id: "PT-2024-00871", name: "Ayesha Rahman", time: "10:30 AM", status: "Completed" },
    { id: "PT-2024-00234", name: "Rahim Uddin", time: "11:15 AM", status: "Waiting" },
    { id: "PT-2024-00512", name: "Sadia Islam", time: "12:00 PM", status: "Scheduled" },
    { id: "PT-2024-00789", name: "Tanvir Ahmed", time: "01:30 PM", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-white/10 rounded-full" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome, Dr. {doctor.name} 👋
              </h1>
              <p className="text-teal-100 text-sm mt-1">
                Here's your dashboard overview for today.
              </p>
            </div>
            <Link
              href="/doctor/patients"
              className="bg-white text-teal-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-teal-50 transition shadow"
            >
              👥 View All Patients
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl mb-3`}>
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                📅 Today's Appointments
              </h2>
              <Link
                href="/doctor/patients"
                className="text-sm text-teal-600 font-medium hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="py-3 px-2 font-medium">Patient ID</th>
                    <th className="py-3 px-2 font-medium">Name</th>
                    <th className="py-3 px-2 font-medium">Time</th>
                    <th className="py-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition"
                    >
                      <td className="py-3 px-2 text-sm font-medium text-slate-700">
                        {p.id}
                      </td>
                      <td className="py-3 px-2 text-sm text-slate-600">
                        {p.name}
                      </td>
                      <td className="py-3 px-2 text-sm text-slate-500">
                        {p.time}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            p.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : p.status === "Waiting"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              ⚡ Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { label: "Write Prescription", icon: "📝", href: "/doctor/prescription/new" },
                { label: "Search Patient", icon: "🔍", href: "/patient" },
                { label: "View Reports", icon: "📄", href: "/doctor/dashboard" },
                { label: "Profile Settings", icon: "⚙️", href: "/doctor/dashboard" },
              ].map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-teal-50 hover:border-teal-200 border border-transparent transition"
                >
                  <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm text-lg">
                    {a.icon}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {a.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}