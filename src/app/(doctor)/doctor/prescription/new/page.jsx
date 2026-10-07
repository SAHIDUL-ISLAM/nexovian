"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/* ============================================================
   📚 MASTER DATA
   ============================================================ */

// ------------------- SYMPTOMS (dropdown) -------------------
const SYMPTOMS = [
  "Fever & Headache",
  "Cough & Cold",
  "Sore Throat",
  "Stomach Pain",
  "Diarrhea",
  "Vomiting",
  "High Blood Pressure",
  "Diabetes Follow-up",
  "Joint Pain",
  "Skin Rash",
  "Chest Pain",
  "Shortness of Breath",
];

// ---------------- DEPENDENT DIAGNOSIS MAP ----------------
const DIAGNOSIS_BY_SYMPTOM = {
  "Fever & Headache": ["Viral Fever", "Typhoid", "Dengue", "Malaria", "Common Cold"],
  "Cough & Cold": ["Common Cold", "Upper Respiratory Tract Infection", "Bronchitis", "Allergic Rhinitis"],
  "Sore Throat": ["Tonsillitis", "Pharyngitis", "Strep Throat"],
  "Stomach Pain": ["Gastritis", "Peptic Ulcer", "GERD", "Appendicitis"],
  "Diarrhea": ["Acute Gastroenteritis", "Food Poisoning", "IBS"],
  "Vomiting": ["Gastritis", "Food Poisoning", "Migraine"],
  "High Blood Pressure": ["Hypertension Stage 1", "Hypertension Stage 2", "Pre-hypertension"],
  "Diabetes Follow-up": ["Type 2 Diabetes", "Type 1 Diabetes", "Gestational Diabetes"],
  "Joint Pain": ["Osteoarthritis", "Rheumatoid Arthritis", "Gout"],
  "Skin Rash": ["Allergic Dermatitis", "Eczema", "Fungal Infection", "Psoriasis"],
  "Chest Pain": ["Angina", "Myocardial Infarction", "Costochondritis"],
  "Shortness of Breath": ["Asthma", "COPD", "Pneumonia", "Heart Failure"],
};

// ---------------- DEPENDENT TESTS MAP ----------------
const TESTS_BY_SYMPTOM = {
  "Fever & Headache": ["CBC", "Dengue NS1", "Widal Test", "Malaria Antigen", "CRP"],
  "Cough & Cold": ["Chest X-Ray", "CBC", "Sputum Culture"],
  "Sore Throat": ["Throat Swab Culture", "CBC"],
  "Stomach Pain": ["Ultrasound Abdomen", "H. pylori Test", "Endoscopy"],
  "Diarrhea": ["Stool R/E", "Stool Culture", "Serum Electrolytes"],
  "Vomiting": ["Serum Electrolytes", "Ultrasound Abdomen"],
  "High Blood Pressure": ["ECG", "Lipid Profile", "Serum Creatinine", "Echocardiogram"],
  "Diabetes Follow-up": ["HbA1c", "Fasting Blood Sugar", "Lipid Profile", "Serum Creatinine"],
  "Joint Pain": ["X-Ray Joint", "Uric Acid", "RA Factor", "ESR"],
  "Skin Rash": ["Skin Biopsy", "IgE Total", "Patch Test"],
  "Chest Pain": ["ECG", "Troponin-I", "Echocardiogram", "Chest X-Ray"],
  "Shortness of Breath": ["Chest X-Ray", "Spirometry", "ABG Analysis", "CBC"],
};

// ---------------- DEPENDENT MEDICINES MAP ----------------
// (Generic + Brand from real BD pharma companies)
const MEDICINES_BY_SYMPTOM = {
  "Fever & Headache": [
    { name: "Napa (Paracetamol 500mg)", company: "Beximco", type: "Tablet", dosage: "1-0-1", meal: "After Meal", duration: "5 days" },
    { name: "Ace (Paracetamol 500mg)", company: "Square", type: "Tablet", dosage: "1-0-1", meal: "After Meal", duration: "5 days" },
    { name: "Tusca Plus Syrup", company: "Incepta", type: "Syrup", dosage: "2 tsp", meal: "After Meal", duration: "5 days" },
  ],
  "Cough & Cold": [
    { name: "Tusca Plus Syrup", company: "Incepta", type: "Syrup", dosage: "2 tsp", meal: "After Meal", duration: "7 days" },
    { name: "Monas 10 (Montelukast)", company: "Square", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "14 days" },
    { name: "Fexo 120 (Fexofenadine)", company: "ACI", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "7 days" },
  ],
  "Sore Throat": [
    { name: "Azithral 500 (Azithromycin)", company: "Square", type: "Tablet", dosage: "1-0-0", meal: "After Meal", duration: "5 days" },
    { name: "Seclo 20 (Omeprazole)", company: "Square", type: "Capsule", dosage: "1-0-0", meal: "Before Meal", duration: "7 days" },
    { name: "Maxpro 20 (Esomeprazole)", company: "Renata", type: "Capsule", dosage: "1-0-0", meal: "Before Meal", duration: "7 days" },
  ],
  "Stomach Pain": [
    { name: "Seclo 20 (Omeprazole)", company: "Square", type: "Capsule", dosage: "1-0-0", meal: "Before Meal", duration: "14 days" },
    { name: "Maxpro 20 (Esomeprazole)", company: "Renata", type: "Capsule", dosage: "1-0-0", meal: "Before Meal", duration: "14 days" },
    { name: "Antacid Plus Suspension", company: "Eskayef", type: "Syrup", dosage: "2 tsp", meal: "After Meal", duration: "7 days" },
  ],
  "Diarrhea": [
    { name: "ORS Powder", company: "Square", type: "Powder", dosage: "1 sachet", meal: "Empty Stomach", duration: "3 days" },
    { name: "Flagyl 400 (Metronidazole)", company: "Beximco", type: "Tablet", dosage: "1-1-1", meal: "After Meal", duration: "5 days" },
    { name: "Zinc-B Syrup", company: "ACI", type: "Syrup", dosage: "1 tsp", meal: "After Meal", duration: "14 days" },
  ],
  "Vomiting": [
    { name: "Emistat 4 (Ondansetron)", company: "Incepta", type: "Tablet", dosage: "1-0-1", meal: "Before Meal", duration: "3 days" },
    { name: "Seclo 20 (Omeprazole)", company: "Square", type: "Capsule", dosage: "1-0-0", meal: "Before Meal", duration: "7 days" },
  ],
  "High Blood Pressure": [
    { name: "Amlopin 5 (Amlodipine)", company: "Square", type: "Tablet", dosage: "1-0-0", meal: "After Meal", duration: "30 days" },
    { name: "Bisocor 5 (Bisoprolol)", company: "Aristopharma", type: "Tablet", dosage: "1-0-0", meal: "After Meal", duration: "30 days" },
    { name: "Losartan 50 (Losartan Potassium)", company: "Incepta", type: "Tablet", dosage: "1-0-0", meal: "After Meal", duration: "30 days" },
  ],
  "Diabetes Follow-up": [
    { name: "Comet 500 (Metformin)", company: "Square", type: "Tablet", dosage: "1-0-1", meal: "After Meal", duration: "30 days" },
    { name: "Diamicron MR 60 (Gliclazide)", company: "Servier", type: "Tablet", dosage: "1-0-0", meal: "Before Meal", duration: "30 days" },
    { name: "Jardiance 10 (Empagliflozin)", company: "Boehringer", type: "Tablet", dosage: "1-0-0", meal: "After Meal", duration: "30 days" },
  ],
  "Joint Pain": [
    { name: "Flexi 100 (Aceclofenac)", company: "Square", type: "Tablet", dosage: "1-0-1", meal: "After Meal", duration: "7 days" },
    { name: "Naprox 500 (Naproxen)", company: "Incepta", type: "Tablet", dosage: "1-0-1", meal: "After Meal", duration: "7 days" },
    { name: "Calbo-D (Calcium + Vit D)", company: "Square", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "30 days" },
  ],
  "Skin Rash": [
    { name: "Fexo 120 (Fexofenadine)", company: "ACI", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "7 days" },
    { name: "Dermovate Cream", company: "GSK", type: "Cream", dosage: "Apply twice", meal: "N/A", duration: "14 days" },
    { name: "Candid Cream (Clotrimazole)", company: "Square", type: "Cream", dosage: "Apply twice", meal: "N/A", duration: "14 days" },
  ],
  "Chest Pain": [
    { name: "Aspirin 75 (Ecosprin)", company: "ACI", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "30 days" },
    { name: "Atorva 20 (Atorvastatin)", company: "Square", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "30 days" },
    { name: "Nitrostat SL (GTN)", company: "Pfizer", type: "Tablet", dosage: "SOS", meal: "N/A", duration: "As needed" },
  ],
  "Shortness of Breath": [
    { name: "Monas 10 (Montelukast)", company: "Square", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "30 days" },
    { name: "Ventolin Inhaler (Salbutamol)", company: "GSK", type: "Inhaler", dosage: "2 puffs", meal: "N/A", duration: "As needed" },
    { name: "Fexo 120 (Fexofenadine)", company: "ACI", type: "Tablet", dosage: "0-0-1", meal: "After Meal", duration: "14 days" },
  ],
};

// ---------------- DEPENDENT ADVICE MAP ----------------
const ADVICE_BY_SYMPTOM = {
  "Fever & Headache": "Take rest, drink plenty of fluids, monitor temperature every 4 hours.",
  "Cough & Cold": "Avoid cold drinks, use warm water gargle, keep chest covered.",
  "Sore Throat": "Gargle with warm salt water, avoid spicy food, rest your voice.",
  "Stomach Pain": "Avoid spicy & oily food, eat small frequent meals, do not lie down immediately after eating.",
  "Diarrhea": "Drink ORS frequently, avoid dairy, eat light easily digestible food.",
  "Vomiting": "Take small sips of water, avoid solid food for 4 hours, rest.",
  "High Blood Pressure": "Reduce salt intake, exercise 30 min daily, avoid stress, monitor BP regularly.",
  "Diabetes Follow-up": "Follow diabetic diet, exercise 30 min, check sugar regularly, do not skip meals.",
  "Joint Pain": "Apply warm compress, avoid heavy lifting, do gentle stretching.",
  "Skin Rash": "Avoid scratching, keep area clean & dry, avoid known allergens.",
  "Chest Pain": "Avoid exertion, take medicine regularly, seek emergency help if pain increases.",
  "Shortness of Breath": "Avoid dust & smoke, use inhaler as prescribed, avoid cold weather.",
};

// ------------------- VITALS DROPDOWN OPTIONS -------------------
const BP_OPTIONS = ["90/60", "100/70", "110/70", "120/80", "130/85", "140/90", "150/95", "160/100"];
const PULSE_OPTIONS = ["60", "65", "70", "72", "75", "80", "85", "90", "100", "110"];
const TEMP_OPTIONS = ["97.0°F", "97.5°F", "98.0°F", "98.6°F", "99.0°F", "99.5°F", "100.0°F", "101.0°F", "102.0°F", "103.0°F"];
const WEIGHT_OPTIONS = ["40", "45", "50", "55", "60", "62", "65", "70", "75", "80", "85", "90", "100"];
const SPO2_OPTIONS = ["90%", "92%", "94%", "95%", "96%", "97%", "98%", "99%", "100%"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];
const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const MEAL_OPTIONS = ["Before Meal", "After Meal", "With Meal", "Empty Stomach", "N/A"];
const TYPE_OPTIONS = ["Tablet", "Capsule", "Syrup", "Injection", "Ointment", "Cream", "Inhaler", "Drops", "Powder"];
const DOSAGE_OPTIONS = ["1-0-0", "0-1-0", "0-0-1", "1-0-1", "1-1-1", "1-1-0", "0-1-1", "2-0-2", "SOS", "Apply twice", "2 puffs", "2 tsp", "1 tsp", "1 sachet"];

/* ============================================================
   🧩 MAIN COMPONENT
   ============================================================ */
export default function PrescriptionPage() {
  const today = new Date().toISOString().split("T")[0];

  // Patient
  const [patient, setPatient] = useState({
    uid: "",
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "B+",
    phone: "",
    date: today,
  });

  // Vitals
  const [vitals, setVitals] = useState({ bp: "", pulse: "", temp: "", weight: "", spo2: "" });

  // Clinical (dropdown driven)
  const [symptom, setSymptom] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");

  // Dependent lists
  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const [testOptions, setTestOptions] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);

  // Selected tests & medicines
  const [selectedTests, setSelectedTests] = useState([]);
  const [medicines, setMedicines] = useState([]);

  // Custom medicine form
  const [customMed, setCustomMed] = useState({ name: "", company: "" });

  /* -------- When symptom changes → update dependent fields -------- */
  useEffect(() => {
    if (symptom) {
      setDiagnosisOptions(DIAGNOSIS_BY_SYMPTOM[symptom] || []);
      setTestOptions(TESTS_BY_SYMPTOM[symptom] || []);
      setMedicineOptions(MEDICINES_BY_SYMPTOM[symptom] || []);
      setDiagnosis("");
      setAdvice(ADVICE_BY_SYMPTOM[symptom] || "");
      setSelectedTests([]);
      setMedicines([]);
    } else {
      setDiagnosisOptions([]);
      setTestOptions([]);
      setMedicineOptions([]);
      setDiagnosis("");
      setAdvice("");
      setSelectedTests([]);
      setMedicines([]);
    }
  }, [symptom]);

  /* ---------------------- Tests toggle ---------------------- */
  const toggleTest = (test) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  };

  /* ---------------------- Medicines toggle ---------------------- */
  const toggleMedicine = (med) => {
    setMedicines((prev) => {
      const exists = prev.find((m) => m.name === med.name);
      if (exists) return prev.filter((m) => m.name !== med.name);
      return [...prev, { ...med }];
    });
  };

  /* ---------------------- Custom medicine add ---------------------- */
  const addCustomMedicine = () => {
    if (!customMed.name.trim()) return;
    setMedicines([
      ...medicines,
      {
        name: customMed.name,
        company: customMed.company || "Generic",
        type: "Tablet",
        dosage: "1-0-1",
        meal: "After Meal",
        duration: "7 days",
      },
    ]);
    setCustomMed({ name: "", company: "" });
  };

  const updateMedicineField = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const removeMedicine = (index) =>
    setMedicines(medicines.filter((_, i) => i !== index));

  /* ---------------------- Save / Reset / Print ---------------------- */
  const handleSave = () => {
    if (!patient.name || !patient.uid) {
      alert("Patient Name and UID are required.");
      return;
    }
    if (!symptom) {
      alert("Please select a symptom.");
      return;
    }
    if (medicines.length === 0) {
      alert("Please select at least one medicine.");
      return;
    }
    const data = {
      patient,
      vitals,
      symptom,
      diagnosis,
      selectedTests,
      advice,
      followUp,
      medicines,
      createdAt: new Date().toISOString(),
    };
    console.log("✅ Prescription Saved:", data);
    alert("Prescription saved successfully!");
  };

  const handleReset = () => {
    if (!confirm("Clear all fields?")) return;
    setPatient({ uid: "", name: "", age: "", gender: "Male", bloodGroup: "B+", phone: "", date: today });
    setVitals({ bp: "", pulse: "", temp: "", weight: "", spo2: "" });
    setSymptom("");
    setDiagnosis("");
    setAdvice("");
    setFollowUp("");
    setSelectedTests([]);
    setMedicines([]);
  };

  const handlePrint = () => window.print();

  /* ============================================================
     🎨 RENDER
     ============================================================ */
  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 md:px-8 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                🩺
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Write Prescription</h1>
                <p className="text-teal-100 text-xs md:text-sm">Nexovian Digital Prescription System</p>
              </div>
            </div>
            <Link
              href="/doctor/dashboard"
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
            >
              ← Back
            </Link>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">

          {/* ---------------- PATIENT INFO ---------------- */}
          <Section icon="👤" title="Patient Information">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input label="Patient UID *" placeholder="PT-2024-00871" value={patient.uid} onChange={(v) => setPatient({ ...patient, uid: v })} />
              <Input label="Patient Name *" placeholder="Ayesha Rahman" value={patient.name} onChange={(v) => setPatient({ ...patient, name: v })} />
              <Input label="Age" placeholder="32" value={patient.age} onChange={(v) => setPatient({ ...patient, age: v })} />
              <Select label="Gender" value={patient.gender} onChange={(v) => setPatient({ ...patient, gender: v })} options={GENDER_OPTIONS} />
              <Select label="Blood Group" value={patient.bloodGroup} onChange={(v) => setPatient({ ...patient, bloodGroup: v })} options={BLOOD_GROUP_OPTIONS} />
              <Input label="Phone" placeholder="+880 1712-345678" value={patient.phone} onChange={(v) => setPatient({ ...patient, phone: v })} />
              <Input label="Date" type="date" value={patient.date} onChange={(v) => setPatient({ ...patient, date: v })} />
            </div>
          </Section>

          {/* ---------------- VITALS (all dropdowns) ---------------- */}
          <Section icon="💓" title="Vitals">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Select label="BP (mmHg)" value={vitals.bp} onChange={(v) => setVitals({ ...vitals, bp: v })} options={["", ...BP_OPTIONS]} />
              <Select label="Pulse (bpm)" value={vitals.pulse} onChange={(v) => setVitals({ ...vitals, pulse: v })} options={["", ...PULSE_OPTIONS]} />
              <Select label="Temp (°F)" value={vitals.temp} onChange={(v) => setVitals({ ...vitals, temp: v })} options={["", ...TEMP_OPTIONS]} />
              <Select label="Weight (kg)" value={vitals.weight} onChange={(v) => setVitals({ ...vitals, weight: v })} options={["", ...WEIGHT_OPTIONS]} />
              <Select label="SpO₂ (%)" value={vitals.spo2} onChange={(v) => setVitals({ ...vitals, spo2: v })} options={["", ...SPO2_OPTIONS]} />
            </div>
          </Section>

          {/* ---------------- SYMPTOM (master dropdown) ---------------- */}
          <Section icon="🩺" title="Chief Complaint / Symptom">
            <Select
              label="Select Main Symptom *"
              value={symptom}
              onChange={setSymptom}
              options={["", ...SYMPTOMS]}
            />
          </Section>

          {/* ---------------- DIAGNOSIS (dependent dropdown) ---------------- */}
          {symptom && (
            <Section icon="📋" title="Diagnosis (based on symptom)">
              <Select
                label="Select Diagnosis"
                value={diagnosis}
                onChange={setDiagnosis}
                options={["", ...diagnosisOptions]}
              />
            </Section>
          )}

          {/* ---------------- TESTS (multi-select) ---------------- */}
          {symptom && testOptions.length > 0 && (
            <Section icon="🧪" title="Recommended Tests">
              <div className="flex flex-wrap gap-2">
                {testOptions.map((test) => {
                  const active = selectedTests.includes(test);
                  return (
                    <button
                      key={test}
                      type="button"
                      onClick={() => toggleTest(test)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition ${
                        active
                          ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"
                      }`}
                    >
                      {active ? "✓ " : "+ "}
                      {test}
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          {/* ---------------- SUGGESTED MEDICINES ---------------- */}
          {symptom && medicineOptions.length > 0 && (
            <Section icon="💊" title="Suggested Medicines (click to add)">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {medicineOptions.map((med) => {
                  const isSelected = medicines.find((m) => m.name === med.name);
                  return (
                    <button
                      key={med.name}
                      type="button"
                      onClick={() => toggleMedicine(med)}
                      className={`text-left p-4 rounded-2xl border transition ${
                        isSelected
                          ? "bg-teal-50 border-teal-300 shadow-sm"
                          : "bg-slate-50 border-slate-100 hover:border-teal-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{med.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {med.company} • {med.type} • {med.dosage}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-lg ${
                            isSelected ? "bg-teal-600 text-white" : "bg-white text-slate-400 border border-slate-200"
                          }`}
                        >
                          {isSelected ? "✓" : "+"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom medicine add */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-medium text-slate-500 mb-2">Add Custom Medicine</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input label="Medicine Name" placeholder="e.g. Napa 500" value={customMed.name} onChange={(v) => setCustomMed({ ...customMed, name: v })} />
                  <Input label="Company" placeholder="e.g. Beximco" value={customMed.company} onChange={(v) => setCustomMed({ ...customMed, company: v })} />
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addCustomMedicine}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-xl transition text-sm"
                    >
                      ➕ Add
                    </button>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* ---------------- SELECTED MEDICINES ---------------- */}
          {medicines.length > 0 && (
            <Section icon="📝" title="Prescribed Medicines">
              <div className="space-y-3">
                {medicines.map((med, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{med.name}</p>
                        <p className="text-xs text-slate-500">{med.company}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMedicine(i)}
                        className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Select label="Type" value={med.type} onChange={(v) => updateMedicineField(i, "type", v)} options={TYPE_OPTIONS} />
                      <Select label="Dosage" value={med.dosage} onChange={(v) => updateMedicineField(i, "dosage", v)} options={DOSAGE_OPTIONS} />
                      <Select label="Meal" value={med.meal} onChange={(v) => updateMedicineField(i, "meal", v)} options={MEAL_OPTIONS} />
                      <Input label="Duration" placeholder="7 days" value={med.duration} onChange={(v) => updateMedicineField(i, "duration", v)} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ---------------- ADVICE & FOLLOW-UP ---------------- */}
          {symptom && (
            <Section icon="🧾" title="Advice & Follow-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextArea label="Advice" value={advice} onChange={setAdvice} rows={4} />
                <TextArea label="Additional Notes" value={followUp} onChange={setFollowUp} rows={4} placeholder="Any additional notes..." />
                <Input label="Follow-up Date" type="date" value={followUp} onChange={setFollowUp} />
              </div>
            </Section>
          )}

          {/* ---------------- ACTIONS ---------------- */}
          <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-teal-200 transition text-sm"
            >
              💾 Save Prescription
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-white border border-slate-200 hover:border-teal-300 hover:text-teal-700 text-slate-700 font-semibold py-3.5 rounded-xl transition text-sm"
            >
              🖨️ Print
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold py-3.5 rounded-xl transition text-sm"
            >
              🔄 Reset
            </button>
          </div>

          {/* SIGNATURE */}
          <div className="pt-6 border-t border-dashed border-slate-200 flex justify-between items-end text-xs text-slate-400">
            <div>
              <p>Generated by <b className="text-slate-600">Nexovian</b></p>
              <p>Date: {patient.date}</p>
            </div>
            <div className="text-right">
              <p className="border-t border-slate-300 pt-1 w-40 text-center text-slate-600 font-medium">
                Doctor's Signature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   🧱 REUSABLE UI COMPONENTS
   ============================================================ */
function Section({ icon, title, children }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 transition bg-white"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 transition bg-white"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt === "" ? "-- Select --" : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder = "", rows = 3 }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm text-slate-700 transition bg-white resize-none"
      />
    </div>
  );
}