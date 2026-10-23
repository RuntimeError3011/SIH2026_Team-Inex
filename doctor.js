// ==========================================================================
// MedBuddy Doctor Portal - doctor.js
// Features: Navigation, Patient Records, AI Voice Dictation (LLM-simulated),
//           Schedule, Call for Staff, Reports, Leave Management
// ==========================================================================

// ------------------------------------------------------------------
// MOCK DATA
// ------------------------------------------------------------------
const PATIENTS = [
  { id: "P-1024", name: "Ananya Sharma", age: 56, gender: "Female", dept: "Cardiology", lastVisit: "Oct 21, 2026", status: "active", statusLabel: "Active", diagnosis: "Coronary Artery Disease & Hypertension", bp: "118/76 mmHg", pulse: "76 bpm", spo2: "98%", allergies: ["ACE Inhibitors"], chronic: ["Hypertension (12 yrs)", "Type 2 Diabetes"], meds: ["Tab. Aspirin 75mg OD", "Tab. Atorvastatin 40mg HS", "Tab. Metformin 500mg BD"] },
  { id: "P-1037", name: "Rohit Verma",   age: 42, gender: "Male",   dept: "Cardiology", lastVisit: "Oct 18, 2026", status: "follow-up", statusLabel: "Follow-up", diagnosis: "Post-PTCA Monitoring & Dyslipidemia", bp: "128/82 mmHg", pulse: "72 bpm", spo2: "99%", allergies: ["None"], chronic: ["Dyslipidemia", "Ex-smoker"], meds: ["Tab. Ticagrelor 90mg BD", "Tab. Rosuvastatin 20mg OD"] },
  { id: "P-1051", name: "Priya Nair",    age: 68, gender: "Female", dept: "Endocrinology", lastVisit: "Oct 16, 2026", status: "under-review", statusLabel: "Under Review", diagnosis: "Hypothyroidism & Type 2 DM", bp: "134/88 mmHg", pulse: "68 bpm", spo2: "97%", allergies: ["Sulfa drugs"], chronic: ["Hypothyroidism", "T2DM (15 yrs)"], meds: ["Tab. Levothyroxine 50mcg OD", "Inj. Insulin Glargine 20U HS"] },
  { id: "P-1068", name: "Sandeep Kapoor",age: 37, gender: "Male",   dept: "Cardiology", lastVisit: "Oct 14, 2026", status: "active", statusLabel: "Active", diagnosis: "Supraventricular Tachycardia (SVT)", bp: "122/78 mmHg", pulse: "98 bpm", spo2: "98%", allergies: ["Ibuprofen"], chronic: ["SVT (Paroxysmal)", "Anxiety disorder"], meds: ["Tab. Metoprolol ER 50mg OD"] },
  { id: "P-1083", name: "Neha Patel",    age: 53, gender: "Female", dept: "Internal Medicine", lastVisit: "Oct 12, 2026", status: "discharged", statusLabel: "Discharged", diagnosis: "Community-acquired Pneumonia (resolved)", bp: "116/74 mmHg", pulse: "80 bpm", spo2: "99%", allergies: ["Penicillin"], chronic: ["Mild asthma"], meds: ["Inhaler Budecort 200mcg BD PRN"] }
];

const SCHEDULE = [
  { time: "09:00 AM", duration: "15 min", patient: "Ananya Sharma", type: "Follow-up Visit", dept: "Cardiology", status: "confirmed", statusLabel: "Confirmed", dotClass: "green", pid: "P-1024" },
  { time: "10:30 AM", duration: "30 min", patient: "Rohit Verma",   type: "Consultation",  dept: "Cardiology", status: "checked-in",  statusLabel: "Checked In", dotClass: "green", pid: "P-1037" },
  { time: "12:00 PM", duration: "30 min", patient: "Priya Nair",    type: "Lab Results Review", dept: "Endocrinology", status: "pending", statusLabel: "Pending", dotClass: "orange", pid: "P-1051" },
  { time: "02:00 PM", duration: "20 min", patient: "Sandeep Kapoor",type: "Holter Monitor Review", dept: "Cardiology", status: "confirmed", statusLabel: "Confirmed", dotClass: "green", pid: "P-1068" }
];

const WEEKLY_SHIFTS = [
  { day: "Mon", shift: "08:00 – 16:00", station: "Cardiology OPD & CCU", status: "completed" },
  { day: "Tue", shift: "08:00 – 16:00", station: "Cath Lab & Cardiology", status: "completed" },
  { day: "Wed", shift: "14:00 – 20:00", station: "Evening Specialty Clinic", status: "completed" },
  { day: "Thu", shift: "08:00 – 16:00", station: "Inpatient Rounds & Echo", status: "completed" },
  { day: "Fri (Today)", shift: "08:00 – 16:00", station: "OPD 104 & Ward Rounds", status: "active" },
  { day: "Sat", shift: "09:00 – 13:00", station: "Half-Day Checkups", status: "upcoming" },
  { day: "Sun", shift: "Off Duty", station: "Rest Day", status: "off" }
];

const STAFF_TYPES = [
  { key: "nurse", icon: "🩺", title: "Nursing Assistance", desc: "Vitals check, IV line, stat meds, dressing" },
  { key: "wardboy", icon: "🛏️", title: "Ward Attendant", desc: "Patient transport, sample transfer" },
  { key: "pharmacy", icon: "💊", title: "Urgent Pharmacy", desc: "Emergency drug/blood product delivery" },
  { key: "housekeeping", icon: "🧹", title: "Housekeeping", desc: "Spill decontamination, linen" }
];

let selectedStaffType = "nurse";
let activeCalls = [
  { id: "CALL-881", type: "Nursing Assistance", staff: "Nurse Priya Nair", room: "OPD Room 104", time: "8 mins ago", status: "en-route" }
];
let rxItems = [
  { name: "Tab. Atorvastatin 20mg", freq: "Once daily (OD)", dur: "30 Days" },
  { name: "Tab. Metoprolol ER 25mg", freq: "Twice daily (BD)", dur: "30 Days" }
];
let isRecording = false;
let recordingTimer = null;
let recordingSeconds = 0;

// Demo transcripts for AI simulation
const DEMO_DICTATIONS = [
  {
    transcript: "Patient Ananya Sharma, P-1024, 56-year-old female, presenting with mild exertional chest discomfort for the past 3 days. Blood pressure on examination today is 122 over 80. Pulse 78 beats per minute. SpO2 98 percent on room air. No fresh cardiac murmurs on auscultation. I am starting her on Tab Nitroglycerin 0.5 milligram sublingual as needed. Continue current medications. Repeat 2D echo in 2 weeks.",
    output: {
      patient: "Ananya Sharma (P-1024)",
      chiefComplaint: "Mild exertional chest discomfort × 3 days",
      vitals: "BP 122/80 mmHg | Pulse 78 bpm | SpO2 98%",
      clinicalFindings: "No fresh cardiac murmurs. Bilateral lung fields clear.",
      diagnosis: "Suspected Unstable Angina / Exertional Angina",
      plan: "Add Tab. Nitroglycerin 0.5mg SL PRN. Continue current medications.",
      investigations: "2D Echocardiogram (in 2 weeks), 12-Lead ECG",
      followUp: "Review with Echo report in 2 weeks",
      prescriptions: [
        { name: "Tab. Nitroglycerin 0.5mg", freq: "SL PRN (chest pain)", dur: "As needed" }
      ]
    }
  },
  {
    transcript: "Rohit Verma, P-1037, post-PTCA patient, day 90 follow-up. He is stable. BP today 126 slash 80. Pulse 70. No chest pain, no breathlessness. Lipid profile from last week shows LDL at 62 milligrams per deciliter, well controlled. Continue dual antiplatelet and statin. Next follow-up in 3 months.",
    output: {
      patient: "Rohit Verma (P-1037)",
      chiefComplaint: "Post-PTCA 90-day routine follow-up",
      vitals: "BP 126/80 mmHg | Pulse 70 bpm",
      clinicalFindings: "Hemodynamically stable. No chest pain or dyspnea. LDL 62 mg/dL (controlled).",
      diagnosis: "Stable Post-PTCA (Day 90) — Coronary Artery Disease",
      plan: "Continue Ticagrelor 90mg BD and Rosuvastatin 20mg OD.",
      investigations: "Lipid profile done — within target",
      followUp: "Follow-up in 3 months with Treadmill Test",
      prescriptions: []
    }
  }
];

// ------------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  setGreeting();
  setTodayDate();
  renderPatientTable("dashboardPatientTableBody", PATIENTS);
  renderScheduleList("dashboardScheduleList", SCHEDULE);
  renderFullPatientTable(PATIENTS);
  renderFullSchedule();
  renderWeeklyShifts();
  renderStaffTypeGrid();
  renderActiveCalls();
  renderRxItems();
  renderRecentReports();
  populatePatientSelects();
});

// ------------------------------------------------------------------
// UTILITY
// ------------------------------------------------------------------
function showDocToast(msg) {
  const toast = document.getElementById("docToast");
  const msgEl = document.getElementById("docToastMsg");
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

function setGreeting() {
  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const el = document.getElementById("greetingText");
  if (el) el.textContent = `${greet}, Dr. Shah`;
}

function setTodayDate() {
  const opts = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  const el = document.getElementById("todayDate");
  if (el) el.textContent = new Date().toLocaleDateString("en-GB", opts);
}

// ------------------------------------------------------------------
// NAVIGATION
// ------------------------------------------------------------------
function navigateTo(section) {
  // Hide all pages
  document.querySelectorAll(".doc-page").forEach(p => p.classList.remove("active-page"));
  // Show target page
  const target = document.getElementById(`page-${section}`);
  if (target) target.classList.add("active-page");

  // Update sidebar active state
  document.querySelectorAll(".sidebar-nav-item").forEach(btn => btn.classList.remove("active"));
  const navBtn = document.getElementById(`nav${capitalize(section)}`);
  if (navBtn) navBtn.classList.add("active");
}

function capitalize(s) {
  const map = { dashboard: "Dashboard", schedule: "Schedule", patients: "Patients", staff: "Staff", reports: "Reports", settings: "Settings" };
  return map[s] || s.charAt(0).toUpperCase() + s.slice(1);
}

// Add CSS for active page
const style = document.createElement("style");
style.textContent = `.doc-page { display: none; } .doc-page.active-page { display: block; animation: fadeIn 0.2s ease; } @keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(style);

// ------------------------------------------------------------------
// PATIENT TABLE RENDERERS
// ------------------------------------------------------------------
function renderPatientTable(tbodyId, patients) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = patients.map(p => `
    <tr onclick="selectPatient('${p.id}')" class="${selectedPatientId === p.id ? 'selected' : ''}">
      <td><div class="patient-id-cell">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        ${p.id}
      </div></td>
      <td class="patient-name-bold">${p.name}</td>
      <td>${p.age}</td>
      <td>${p.dept}</td>
      <td>${p.lastVisit}</td>
      <td><span class="status-pill ${p.status}">${p.statusLabel}</span></td>
      <td>
        <button class="action-dots-btn" onclick="event.stopPropagation();openPatientDetailModal('${p.id}')">⋯</button>
      </td>
    </tr>
  `).join("");
}

let selectedPatientId = "P-1024";

function selectPatient(pid) {
  selectedPatientId = pid;
  const p = PATIENTS.find(x => x.id === pid);
  if (!p) return;

  // Update AI Summary Card
  document.getElementById("aiSummaryPatientName").textContent = p.name;
  document.getElementById("aiSummaryPatientMeta").textContent = `${p.id} • ${p.age} years • ${p.gender}`;
  document.getElementById("aiPatientOverview").textContent =
    `Patient is a ${p.age}-year-old ${p.gender.toLowerCase()} with ${p.chronic.join(" and ")}. ` +
    `Currently under treatment for ${p.diagnosis}. Last visit was on ${p.lastVisit}.`;

  const obsList = document.getElementById("aiObservationsList");
  obsList.innerHTML = [
    `Blood pressure ${p.bp}`,
    `Pulse rate ${p.pulse} • SpO2 ${p.spo2}`,
    `Primary: ${p.diagnosis}`,
    `${p.meds.length} active medication(s) on record`
  ].map(o => `<li>${o}</li>`).join("");

  // Re-render table to highlight selected row
  renderPatientTable("dashboardPatientTableBody", PATIENTS);
  showDocToast(`Viewing AI summary for ${p.name}`);
}

function renderFullPatientTable(patients) {
  renderPatientTable("fullPatientTableBody", patients);
  const lbl = document.getElementById("patientCountLabel");
  if (lbl) lbl.textContent = `${patients.length} patient${patients.length !== 1 ? "s" : ""}`;
}

function handleGlobalSearch(e) {
  // Only search patient names if on patients page
  const q = e.target.value.toLowerCase();
  const filtered = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    p.dept.toLowerCase().includes(q) ||
    p.diagnosis.toLowerCase().includes(q)
  );
  renderPatientTable("dashboardPatientTableBody", filtered);
  if (document.getElementById("fullPatientTableBody")) renderFullPatientTable(filtered);
}

function filterFullPatientList(e) {
  const q = e.target.value.toLowerCase();
  const dept = document.getElementById("deptFilter").value;
  const filtered = PATIENTS.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.diagnosis.toLowerCase().includes(q);
    const matchDept = !dept || p.dept === dept;
    return matchQ && matchDept;
  });
  renderFullPatientTable(filtered);
}

function filterByDept() {
  filterFullPatientList({ target: document.getElementById("patientsPageSearch") });
}

// Patient detail inline view (replaces complex modal)
function openPatientDetailModal(pid) {
  const p = PATIENTS.find(x => x.id === pid);
  if (!p) return;
  navigateTo("reports");
  const sel = document.getElementById("reportPatientSelect");
  if (sel) { sel.value = pid; onReportPatientChange(); }
  showDocToast(`Loaded ${p.name} into Report Builder`);
}

// ------------------------------------------------------------------
// SCHEDULE RENDERERS
// ------------------------------------------------------------------
function renderScheduleList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(s => `
    <div class="schedule-row">
      <div class="schedule-left-meta">
        <div class="schedule-dot-wrap">
          <div class="schedule-hollow-dot ${s.dotClass}"></div>
        </div>
        <div class="schedule-time-box">
          <div class="schedule-time-text">${s.time}</div>
          <div class="schedule-duration">(${s.duration})</div>
        </div>
        <div class="schedule-patient-meta">
          <div class="schedule-patient-avatar">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div class="schedule-patient-info">
            <h5>${s.patient}</h5>
            <p>${s.type} • ${s.dept}</p>
          </div>
        </div>
      </div>
      <div class="schedule-right-actions">
        <span class="schedule-status-pill ${s.status}">${s.statusLabel}</span>
        <svg class="schedule-chevron" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  `).join("");
}

function renderFullSchedule() {
  renderScheduleList("fullScheduleList", SCHEDULE);
}

function renderWeeklyShifts() {
  const tbody = document.getElementById("weeklyShiftTable");
  if (!tbody) return;
  const colors = { active: "#2563eb", completed: "#10b981", upcoming: "#f59e0b", off: "#94a3b8" };
  const labels = { active: "Active Today", completed: "Completed", upcoming: "Upcoming", off: "Off" };
  tbody.innerHTML = WEEKLY_SHIFTS.map(s => `
    <tr style="${s.status === 'active' ? 'background:#eff6ff;font-weight:700' : ''}">
      <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9;font-weight:${s.status === 'active' ? 700 : 500}">${s.day}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9;font-family:var(--font-mono);font-size:12px">${s.shift}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9">${s.station}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9">
        <span style="font-size:11px;font-weight:700;color:${colors[s.status]}">${labels[s.status]}</span>
      </td>
    </tr>
  `).join("");
}

// ------------------------------------------------------------------
// CALL FOR STAFF
// ------------------------------------------------------------------
function renderStaffTypeGrid() {
  const grid = document.getElementById("staffTypeGrid");
  if (!grid) return;
  grid.innerHTML = STAFF_TYPES.map(s => `
    <div onclick="selectStaffType('${s.key}', this)"
      style="border:2px solid ${selectedStaffType === s.key ? '#2563eb' : '#e2e8f0'};
             background:${selectedStaffType === s.key ? '#eff6ff' : '#fff'};
             border-radius:10px;padding:12px;cursor:pointer;transition:all .15s ease">
      <div style="font-size:1.25rem;margin-bottom:5px">${s.icon}</div>
      <div style="font-size:13px;font-weight:700;color:#0f172a">${s.title}</div>
      <div style="font-size:12px;color:#64748b;margin-top:2px">${s.desc}</div>
    </div>
  `).join("");
}

function selectStaffType(key, el) {
  selectedStaffType = key;
  renderStaffTypeGrid();
}

function dispatchStaffCall() {
  const room = document.getElementById("staffRoomSelect").value;
  const note = document.getElementById("staffNote").value;
  const typeInfo = STAFF_TYPES.find(s => s.key === selectedStaffType);
  const newCall = {
    id: `CALL-${Math.floor(100 + Math.random() * 900)}`,
    type: typeInfo ? typeInfo.title : "Staff",
    staff: getAssignedStaff(selectedStaffType),
    room, time: "Just now", status: "en-route", note
  };
  activeCalls.unshift(newCall);
  renderActiveCalls();
  document.getElementById("staffNote").value = "";
  showDocToast(`Dispatched: ${newCall.staff} is en route to ${room}`);
}

function dispatchCodeBlue() {
  activeCalls.unshift({
    id: `CALL-CODE-${Date.now()}`,
    type: "🚨 EMERGENCY CODE BLUE",
    staff: "Cardiac Crash Team Alpha",
    room: "OPD Room 104",
    time: "Just now",
    status: "stat",
    isCodeBlue: true
  });
  renderActiveCalls();
  showDocToast("🚨 CODE BLUE broadcasted to Crash Team!");
}

function getAssignedStaff(key) {
  const map = { nurse: "Nurse Priya Nair (Sr. Staff)", wardboy: "Attendant Mohan Lal", pharmacy: "Pharmacist Ramesh", housekeeping: "Housekeeping Lead Sunil" };
  return map[key] || "On-call Staff";
}

function renderActiveCalls() {
  const el = document.getElementById("staffCallTracker");
  if (!el) return;
  if (!activeCalls.length) {
    el.innerHTML = `<p style="text-align:center;color:#94a3b8;font-size:13px;padding:2rem">No active calls. All stations idle.</p>`;
    return;
  }
  el.innerHTML = activeCalls.map(c => `
    <div style="border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-bottom:10px;
                border-left:4px solid ${c.isCodeBlue ? '#ef4444' : '#2563eb'};
                background:${c.isCodeBlue ? '#fff5f5' : '#fff'}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:13px;font-weight:700;color:${c.isCodeBlue ? '#dc2626' : '#0f172a'}">${c.type}</span>
        <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:9999px;
                     background:${c.status === 'en-route' ? '#fffbeb' : c.status === 'stat' ? '#fef2f2' : '#ecfdf5'};
                     color:${c.status === 'en-route' ? '#b45309' : c.status === 'stat' ? '#dc2626' : '#059669'}">
          ● ${c.status === 'en-route' ? 'En Route' : c.status === 'stat' ? 'STAT DISPATCHED' : 'Resolved'}
        </span>
      </div>
      <div style="font-size:12px;color:#64748b;display:flex;flex-direction:column;gap:2px">
        <div><strong>Location:</strong> ${c.room}</div>
        <div><strong>Assigned:</strong> ${c.staff}</div>
        <div><strong>Dispatched:</strong> ${c.time}</div>
        ${c.note ? `<div><strong>Note:</strong> "${c.note}"</div>` : ''}
      </div>
      ${c.status === 'en-route' ? `
        <div style="margin-top:8px;text-align:right">
          <button onclick="resolveCall('${c.id}')"
            style="padding:4px 12px;border:1px solid #e2e8f0;border-radius:6px;background:#f8fafc;
                   font-size:12px;font-weight:600;color:#334155;cursor:pointer">
            ✓ Mark Resolved
          </button>
        </div>` : ''}
    </div>
  `).join("");
}

function resolveCall(id) {
  const c = activeCalls.find(x => x.id === id);
  if (c) { c.status = "resolved"; renderActiveCalls(); showDocToast("Staff call marked resolved."); }
}

// ------------------------------------------------------------------
// REPORTS & PRESCRIPTIONS
// ------------------------------------------------------------------
function populatePatientSelects() {
  const selectors = ["reportPatientSelect", "voicePatientSelect"];
  selectors.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = PATIENTS.map(p =>
      `<option value="${p.id}">${p.id} — ${p.name} (${p.age}y/${p.gender})</option>`
    ).join("");
  });
}

function onReportPatientChange() {
  const pid = document.getElementById("reportPatientSelect").value;
  const p = PATIENTS.find(x => x.id === pid);
  if (!p) return;
  document.getElementById("reportDiagnosis").value = p.diagnosis;
  document.getElementById("reportNotes").value =
    `Patient: ${p.name}, ${p.age}y/${p.gender}. Presenting for ${p.dept} follow-up. BP ${p.bp}, Pulse ${p.pulse}, SpO2 ${p.spo2}. Clinically stable today.`;
  rxItems = [...p.meds.map(m => ({ name: m, freq: "Once daily (OD)", dur: "30 Days" }))];
  renderRxItems();
}

function renderRxItems() {
  const el = document.getElementById("rxItemsList");
  if (!el) return;
  if (!rxItems.length) {
    el.innerHTML = `<p style="font-size:12px;color:#94a3b8;font-style:italic">No medicines added yet.</p>`;
    return;
  }
  el.innerHTML = rxItems.map((rx, i) => `
    <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px">
      <div>
        <div style="font-size:13px;font-weight:700;color:#0f172a">💊 ${rx.name}</div>
        <div style="font-size:11px;color:#64748b;font-family:var(--font-mono)">${rx.freq} • ${rx.dur}</div>
      </div>
      <button onclick="removeRxItem(${i})" style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:16px">✕</button>
    </div>
  `).join("");
}

function addRxItem() {
  const name = document.getElementById("rxMedName").value.trim();
  if (!name) { showDocToast("Please enter medicine name"); return; }
  rxItems.push({
    name,
    freq: document.getElementById("rxFreq").value,
    dur: document.getElementById("rxDuration").value || "30 Days"
  });
  renderRxItems();
  document.getElementById("rxMedName").value = "";
  showDocToast("Medicine added to prescription");
}

function removeRxItem(i) {
  rxItems.splice(i, 1);
  renderRxItems();
}

function signAndIssueReport() {
  showDocToast("✔ Report signed digitally & saved to FHIR patient record!");
  const pid = document.getElementById("reportPatientSelect").value;
  const p = PATIENTS.find(x => x.id === pid);
  renderRecentReports(p ? p.name : "Patient");
}

function renderRecentReports(newPatient) {
  const el = document.getElementById("recentReportsList");
  if (!el) return;
  const reports = [
    { patient: "Ananya Sharma", type: "Follow-up Consultation", time: "10:15 AM", pid: "P-1024" },
    { patient: "Rohit Verma", type: "Post-PTCA Clearance", time: "09:10 AM", pid: "P-1037" },
    { patient: "Kavita Joshi", type: "Routine Echo Evaluation", time: "08:45 AM", pid: "P-1039" }
  ];
  if (newPatient) {
    reports.unshift({ patient: newPatient, type: "New Report (Just Issued)", time: "Just now", pid: "" });
  }
  el.innerHTML = reports.slice(0, 4).map(r => `
    <div style="display:flex;align-items:center;justify-content:space-between;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;margin-bottom:8px">
      <div>
        <div style="font-size:13px;font-weight:700;color:#0f172a">${r.patient} ${r.pid ? `<span style="color:#2563eb;font-family:var(--font-mono)">${r.pid}</span>` : ''}</div>
        <div style="font-size:11px;color:#64748b">${r.type} • ${r.time}</div>
      </div>
      <button onclick="showDocToast('Opening report PDF from FHIR repository.')"
        style="padding:4px 10px;border:1px solid #e2e8f0;border-radius:6px;background:#f8fafc;font-size:12px;font-weight:600;color:#2563eb;cursor:pointer">
        View
      </button>
    </div>
  `).join("");
}

// ------------------------------------------------------------------
// LEAVE MANAGEMENT
// ------------------------------------------------------------------
function openLeaveModal() {
  document.getElementById("leaveModalBackdrop").classList.add("open");
}

function closeLeaveModal() {
  document.getElementById("leaveModalBackdrop").classList.remove("open");
}

function submitLeave() {
  closeLeaveModal();
  showDocToast("Leave request submitted to Medical Superintendent.");
}

// ------------------------------------------------------------------
// AI VOICE DICTATION ENGINE
// ------------------------------------------------------------------
function openVoiceDictationModal() {
  document.getElementById("voiceModalBackdrop").classList.add("open");
  document.getElementById("aiStructuredOutputBox").style.display = "none";
  document.getElementById("voiceTranscriptBox").textContent = "Your spoken words will appear here...";
  document.getElementById("voiceStatusLabel").textContent = "Press button to start speaking...";
  document.getElementById("voiceTimer").textContent = "0:00";
  document.getElementById("waveformViz").classList.remove("active");
}

function closeVoiceModal() {
  document.getElementById("voiceModalBackdrop").classList.remove("open");
  stopVoiceRecording();
}

function startVoiceRecording() {
  isRecording = true;
  recordingSeconds = 0;
  document.getElementById("btnStartVoice").style.display = "none";
  document.getElementById("btnStopVoice").style.display = "flex";
  document.getElementById("voiceStatusLabel").textContent = "Listening... Speak clearly";
  document.getElementById("waveformViz").classList.add("active");

  // Header button animation
  const voiceBtn = document.getElementById("voiceDictationBtn");
  const micDot = document.getElementById("micDot");
  const label = document.getElementById("voiceBtnLabel");
  voiceBtn.classList.add("recording");
  if (label) label.textContent = "Recording...";

  // Timer
  recordingTimer = setInterval(() => {
    recordingSeconds++;
    const m = Math.floor(recordingSeconds / 60);
    const s = recordingSeconds % 60;
    document.getElementById("voiceTimer").textContent = `${m}:${s.toString().padStart(2, "0")}`;
  }, 1000);

  // Try Web Speech API (real browser mic)
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    window._speechRec = new SpeechRecognition();
    window._speechRec.continuous = true;
    window._speechRec.interimResults = true;
    window._speechRec.lang = "en-IN";
    window._speechRec.onresult = (e) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript + " ";
      }
      document.getElementById("voiceTranscriptBox").textContent = transcript;
    };
    window._speechRec.onerror = () => showDocToast("Microphone not accessible — try Demo Simulation.");
    window._speechRec.start();
  }
}

function stopVoiceRecording() {
  if (!isRecording) return;
  isRecording = false;
  clearInterval(recordingTimer);
  document.getElementById("btnStartVoice").style.display = "flex";
  document.getElementById("btnStopVoice").style.display = "none";
  document.getElementById("waveformViz").classList.remove("active");
  document.getElementById("voiceStatusLabel").textContent = "Processing with AI...";

  const voiceBtn = document.getElementById("voiceDictationBtn");
  const label = document.getElementById("voiceBtnLabel");
  voiceBtn.classList.remove("recording");
  if (label) label.textContent = "AI Voice Dictation";

  if (window._speechRec) { try { window._speechRec.stop(); } catch(e) {} }

  const transcript = document.getElementById("voiceTranscriptBox").textContent;
  if (transcript && transcript !== "Your spoken words will appear here...") {
    setTimeout(() => parseVoiceToRecord(transcript), 800);
  }
}

function runDemoSimulation() {
  // Pick demo based on selected patient
  const pid = document.getElementById("voicePatientSelect").value;
  const demoIdx = pid === "P-1037" ? 1 : 0;
  const demo = DEMO_DICTATIONS[demoIdx];

  document.getElementById("waveformViz").classList.add("active");
  document.getElementById("voiceStatusLabel").textContent = "Simulating doctor speech...";
  document.getElementById("btnDemoFill").disabled = true;

  // Simulate typing transcript word by word
  const words = demo.transcript.split(" ");
  let i = 0;
  const transcriptEl = document.getElementById("voiceTranscriptBox");
  transcriptEl.textContent = "";
  const typeInterval = setInterval(() => {
    if (i >= words.length) {
      clearInterval(typeInterval);
      document.getElementById("waveformViz").classList.remove("active");
      document.getElementById("voiceStatusLabel").textContent = "Processing with AI...";
      setTimeout(() => {
        renderAiStructuredOutput(demo.output);
        document.getElementById("btnDemoFill").disabled = false;
      }, 800);
      return;
    }
    transcriptEl.textContent += words[i] + " ";
    transcriptEl.scrollTop = transcriptEl.scrollHeight;
    i++;
  }, 80);
}

function parseVoiceToRecord(transcript) {
  // Smart keyword parsing fallback for real speech input
  const lower = transcript.toLowerCase();
  const output = {
    patient: getPatientFromTranscript(lower),
    chiefComplaint: extractAfterKeyword(lower, ["presenting with", "complains of", "complaint of", "c/o"]) || "Described by doctor",
    vitals: extractVitals(lower),
    clinicalFindings: extractAfterKeyword(lower, ["auscultation", "examination shows", "findings:"]) || "As per clinical assessment",
    diagnosis: extractAfterKeyword(lower, ["diagnosis:", "impression:", "impression is"]) || "As dictated",
    plan: extractAfterKeyword(lower, ["plan:", "i am starting", "starting", "continue", "adding"]) || "As per discussion",
    investigations: extractAfterKeyword(lower, ["repeat", "order", "get"]) || "As clinically indicated",
    followUp: extractAfterKeyword(lower, ["follow-up", "review in", "next visit"]) || "As needed",
    prescriptions: []
  };
  renderAiStructuredOutput(output);
}

function getPatientFromTranscript(text) {
  const p = PATIENTS.find(pt => text.includes(pt.name.toLowerCase()) || text.includes(pt.id.toLowerCase()));
  return p ? `${p.name} (${p.id})` : "Patient per context";
}

function extractAfterKeyword(text, keywords) {
  for (const kw of keywords) {
    const idx = text.indexOf(kw);
    if (idx !== -1) {
      const snippet = text.slice(idx + kw.length, idx + kw.length + 150).trim();
      return snippet.charAt(0).toUpperCase() + snippet.slice(1);
    }
  }
  return null;
}

function extractVitals(text) {
  const bpMatch = text.match(/\b(\d{2,3})\s*(?:over|slash|\/)\s*(\d{2,3})\b/);
  const pulseMatch = text.match(/pulse\s+(\d{2,3})/);
  const spo2Match = text.match(/spo2?\s+(\d{2,3})/);
  let v = [];
  if (bpMatch) v.push(`BP ${bpMatch[1]}/${bpMatch[2]} mmHg`);
  if (pulseMatch) v.push(`Pulse ${pulseMatch[1]} bpm`);
  if (spo2Match) v.push(`SpO2 ${spo2Match[1]}%`);
  return v.length ? v.join(" | ") : "Recorded on examination";
}

function renderAiStructuredOutput(output) {
  document.getElementById("voiceStatusLabel").textContent = "AI Record Generated ✓";
  const box = document.getElementById("aiStructuredOutputBox");
  const content = document.getElementById("aiStructuredOutputContent");
  box.style.display = "block";

  const fields = [
    { label: "Patient", value: output.patient },
    { label: "Chief Complaint / Reason for Visit", value: output.chiefComplaint },
    { label: "Vitals Observed", value: output.vitals },
    { label: "Clinical Findings", value: output.clinicalFindings },
    { label: "Diagnosis (Impression)", value: output.diagnosis },
    { label: "Treatment Plan", value: output.plan },
    { label: "Investigations Ordered", value: output.investigations },
    { label: "Follow-up Instructions", value: output.followUp }
  ];

  content.innerHTML = fields.map(f => `
    <div class="ai-field-row">
      <div class="ai-field-label">${f.label}</div>
      <div class="ai-field-value" contenteditable="true" style="outline:none;border-bottom:1px dashed #e2e8f0;padding-bottom:2px">${f.value}</div>
    </div>
  `).join("");

  // Auto-add prescriptions from AI output
  if (output.prescriptions && output.prescriptions.length) {
    output.prescriptions.forEach(rx => rxItems.push({ ...rx }));
    renderRxItems();
  }
}

function editAiRecord() {
  showDocToast("All fields are now editable directly. Make your changes.");
  document.querySelectorAll(".ai-field-value").forEach(el => { el.style.borderBottom = "1px solid #2563eb"; el.focus(); });
}

function saveAiGeneratedRecord() {
  closeVoiceModal();
  showDocToast("✔ AI-generated clinical record saved to patient file & FHIR database!");
  // Transfer to report form
  const pid = document.getElementById("voicePatientSelect").value;
  const reportSel = document.getElementById("reportPatientSelect");
  if (reportSel && pid) { reportSel.value = pid; onReportPatientChange(); }
  renderRxItems();
}
