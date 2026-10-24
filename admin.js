// RICH EXPANDED INITIAL DATA WITH EXTRA RANDOM ENTRIES
    const initialData = {
      patients: [
        { id: 'MRN-101', name: 'Robert Chen', age: 45, gender: 'Male', phone: '+1 555-0192', doctor: 'Dr. Sarah Connor', dept: 'Cardiology', status: 'In Consultation' },
        { id: 'MRN-102', name: 'Emma Watson', age: 29, gender: 'Female', phone: '+1 555-0188', doctor: 'Dr. Gregory House', dept: 'General Medicine', status: 'Checked In' },
        { id: 'MRN-103', name: 'Marcus Vance', age: 62, gender: 'Male', phone: '+1 555-0143', doctor: 'Dr. Meredith Grey', dept: 'Neurology', status: 'Scheduled' },
        { id: 'MRN-104', name: 'Sophia Martinez', age: 34, gender: 'Female', phone: '+1 555-0112', doctor: 'Dr. Shaun Murphy', dept: 'Orthopedics', status: 'Completed' },
        { id: 'MRN-105', name: 'Liam O\'Connor', age: 51, gender: 'Male', phone: '+1 555-0823', doctor: 'Dr. John Dorian', dept: 'Radiology', status: 'Checked In' },
        { id: 'MRN-106', name: 'Aisha Patel', age: 38, gender: 'Female', phone: '+1 555-0911', doctor: 'Dr. Arizona Robbins', dept: 'Pediatrics', status: 'In Consultation' },
        { id: 'MRN-107', name: 'David Kim', age: 41, gender: 'Male', phone: '+1 555-0344', doctor: 'Dr. Olivia Benson', dept: 'Dermatology & Cosmetology', status: 'Scheduled' },
        { id: 'MRN-108', name: 'Elena Rostova', age: 27, gender: 'Female', phone: '+1 555-0567', doctor: 'Dr. Stephen Strange', dept: 'Gastroenterology', status: 'Completed' },
        { id: 'MRN-109', name: 'James Wilson', age: 58, gender: 'Male', phone: '+1 555-0771', doctor: 'Dr. Leonard McCoy', dept: 'Oncology & Cancer Care', status: 'In Consultation' },
        { id: 'MRN-110', name: 'Chloe Dubois', age: 31, gender: 'Female', phone: '+1 555-0422', doctor: 'Dr. Sarah Connor', dept: 'Cardiology', status: 'Scheduled' }
      ],
      doctors: [
        { id: 'DOC-1', name: 'Dr. Sarah Connor', specialty: 'Cardiology', room: 'Room 101', available: true, phone: 'Ext 401' },
        { id: 'DOC-2', name: 'Dr. Gregory House', specialty: 'General Medicine', room: 'Room 102', available: true, phone: 'Ext 402' },
        { id: 'DOC-3', name: 'Dr. Meredith Grey', specialty: 'Neurology', room: 'Room 205', available: false, phone: 'Ext 405' },
        { id: 'DOC-4', name: 'Dr. Shaun Murphy', specialty: 'Orthopedics', room: 'Room 301', available: true, phone: 'Ext 301' },
        { id: 'DOC-5', name: 'Dr. John Dorian', specialty: 'Radiology', room: 'Imaging Suite B', available: true, phone: 'Ext 202' },
        { id: 'DOC-6', name: 'Dr. Arizona Robbins', specialty: 'Pediatrics', room: 'Wing 4A', available: true, phone: 'Ext 108' },
        { id: 'DOC-7', name: 'Dr. Olivia Benson', specialty: 'Dermatology & Cosmetology', room: 'Room 112', available: true, phone: 'Ext 112' },
        { id: 'DOC-8', name: 'Dr. Stephen Strange', specialty: 'Gastroenterology', room: 'Room 208', available: false, phone: 'Ext 208' },
        { id: 'DOC-9', name: 'Dr. Leonard McCoy', specialty: 'Oncology & Cancer Care', room: 'Onco Pavilion 2', available: true, phone: 'Ext 501' }
      ],
      appointments: [
        { id: 'APT-1001', patient: 'Robert Chen', doctor: 'Dr. Sarah Connor', date: '2026-10-24', time: '11:00 AM', reason: 'Cardiac Follow-up', status: 'Active' },
        { id: 'APT-1002', patient: 'Emma Watson', doctor: 'Dr. Gregory House', date: '2026-10-24', time: '11:30 AM', reason: 'Unexplained Fever', status: 'Active' },
        { id: 'APT-1003', patient: 'Liam O\'Connor', doctor: 'Dr. John Dorian', date: '2026-10-24', time: '01:15 PM', reason: 'Lumbar Spine X-Ray', status: 'Active' },
        { id: 'APT-1004', patient: 'Aisha Patel', doctor: 'Dr. Arizona Robbins', date: '2026-10-24', time: '02:00 PM', reason: 'Pediatric Asthma Check', status: 'Active' },
        { id: 'APT-1005', patient: 'David Kim', doctor: 'Dr. Olivia Benson', date: '2026-10-25', time: '10:00 AM', reason: 'Dermatitis Evaluation', status: 'Scheduled' },
        { id: 'APT-1006', patient: 'James Wilson', doctor: 'Dr. Leonard McCoy', date: '2026-10-25', time: '11:45 AM', reason: 'Biopsy Screening Review', status: 'Scheduled' }
      ],
      departments: [
        { 
          name: 'Cardiology', 
          lead: 'Dr. Sarah Connor', 
          beds: '24/30 Occupied', 
          load: 80, 
          color: 'bg-rose-500', 
          icon: 'fa-heart-pulse',
          description: 'Comprehensive adult & pediatric heart care, non-invasive cardiac testing, and catheterization lab.',
          services: ['Electrocardiogram (ECG)', 'Echocardiography', 'Coronary Angiography', 'Cardiac Rehab', 'Pacemaker Check']
        },
        { 
          name: 'General Medicine', 
          lead: 'Dr. Gregory House', 
          beds: '45/50 Occupied', 
          load: 90, 
          color: 'bg-sky-500', 
          icon: 'fa-stethoscope',
          description: 'Primary clinical care, complex diagnostic evaluations, chronic disease management, and fever clinic.',
          services: ['Comprehensive Health Check', 'Diabetes Management', 'Hypertension Clinic', 'Infectious Disease Care', 'Preventive Screenings']
        },
        { 
          name: 'Neurology', 
          lead: 'Dr. Meredith Grey', 
          beds: '12/20 Occupied', 
          load: 60, 
          color: 'bg-purple-500', 
          icon: 'fa-brain',
          description: 'Specialized diagnosis and treatment of brain, spinal cord, nerve, and neuromuscular disorders.',
          services: ['EEG & Brain Mapping', 'Stroke Care Unit', 'Epilepsy Management', 'Migraine & Headache Clinic', 'Neuro-rehabilitation']
        },
        { 
          name: 'Orthopedics', 
          lead: 'Dr. Shaun Murphy', 
          beds: '18/25 Occupied', 
          load: 72, 
          color: 'bg-amber-500', 
          icon: 'fa-bone',
          description: 'Joint replacement, trauma care, arthroscopy, and spine disorder management.',
          services: ['Total Knee & Hip Replacement', 'Fracture Clinic & Casts', 'Sports Injury Rehabilitation', 'Arthroscopic Surgery', 'Spine Care']
        },
        { 
          name: 'Radiology', 
          lead: 'Dr. John Dorian', 
          beds: 'N/A (Outpatient)', 
          load: 40, 
          color: 'bg-cyan-500', 
          icon: 'fa-x-ray',
          description: 'High-precision 3T MRI, CT Scan, digital X-Ray, and ultrasonography diagnostic center.',
          services: ['3T MRI Imaging', '64-Slice CT Scan', 'Ultrasound & Doppler', 'Digital Mammography', 'Interventional Radiology']
        },
        { 
          name: 'Pediatrics', 
          lead: 'Dr. Arizona Robbins', 
          beds: '15/20 Occupied', 
          load: 75, 
          color: 'bg-emerald-500', 
          icon: 'fa-baby',
          description: 'Compassionate healthcare for infants, children, and adolescents with specialized NICU support.',
          services: ['Child Immunization', 'Pediatric ICU', 'Growth & Development Tracking', 'Neonatal Care Unit', 'Child Nutrition']
        },
        { 
          name: 'Dermatology & Cosmetology', 
          lead: 'Dr. Olivia Benson', 
          beds: '5/10 Occupied', 
          load: 50, 
          color: 'bg-pink-500', 
          icon: 'fa-hand-dots',
          description: 'Advanced medical dermatology, skin allergy testing, laser therapies, and cosmetic care.',
          services: ['Skin Biopsy & Allergy Testing', 'Laser Skin Resurfacing', 'Acne & Psoriasis Therapy', 'Cosmetic Dermatology', 'Hair Loss Treatments']
        },
        { 
          name: 'Gastroenterology', 
          lead: 'Dr. Stephen Strange', 
          beds: '10/15 Occupied', 
          load: 66, 
          color: 'bg-orange-500', 
          icon: 'fa-notes-medical',
          description: 'Digestive system evaluation, upper GI endoscopy, colonoscopy, and liver disorder management.',
          services: ['Upper GI Endoscopy', 'Colonoscopy Screening', 'Liver & Hepatitis Clinic', 'IBS & IBD Management', 'Polyp Removal']
        },
        { 
          name: 'Oncology & Cancer Care', 
          lead: 'Dr. Leonard McCoy', 
          beds: '22/25 Occupied', 
          load: 88, 
          color: 'bg-indigo-500', 
          icon: 'fa-ribbon',
          description: 'Multidisciplinary cancer care providing chemotherapy, immunotherapy, surgical oncology, and palliative support.',
          services: ['Day Care Chemotherapy', 'Radiation Oncology', 'Tumor Board Review', 'Cancer Screening Kits', 'Palliative & Supportive Care']
        }
      ],
      diagnostics: [
        { id: 'LAB-501', patient: 'Emma Watson', type: 'Blood Test', date: '2026-10-24', result: 'WBC slightly elevated (11,500/mcL). Hemoglobin normal 13.5 g/dL.' },
        { id: 'LAB-502', patient: 'Robert Chen', type: 'ECG', date: '2026-10-24', result: 'Normal sinus rhythm with mild ST depression during exertion.' },
        { id: 'LAB-503', patient: 'Liam O\'Connor', type: 'X-Ray', date: '2026-10-24', result: 'L4-L5 lumbar disc space narrowing noted. No fracture line observed.' },
        { id: 'LAB-504', patient: 'Elena Rostova', type: 'MRI Scan', date: '2026-10-23', result: 'Abdominal scan shows minor gallbladder mucosal thickening. No gallstones.' },
        { id: 'LAB-505', patient: 'Aisha Patel', type: 'Blood Test', date: '2026-10-24', result: 'Serum IgE level elevated (210 IU/mL), consistent with mild allergic response.' }
      ],
      beds: [
        { bedNo: 'ICU-1', ward: 'ICU', patient: 'Robert Chen', occupied: true },
        { bedNo: 'ICU-2', ward: 'ICU', patient: 'None', occupied: false },
        { bedNo: 'GEN-101', ward: 'General Ward', patient: 'Sophia Martinez', occupied: true },
        { bedNo: 'GEN-102', ward: 'General Ward', patient: 'Emma Watson', occupied: true },
        { bedNo: 'GEN-103', ward: 'General Ward', patient: 'None', occupied: false },
        { bedNo: 'CARD-01', ward: 'Cardiac Wing', patient: 'Liam O\'Connor', occupied: true },
        { bedNo: 'CARD-02', ward: 'Cardiac Wing', patient: 'None', occupied: false },
        { bedNo: 'PED-01', ward: 'Pediatric Ward', patient: 'Aisha Patel', occupied: true }
      ],
      users: [
        { id: 'USR-01', name: 'Dr. Alex Danvers', role: 'Administrator', email: 'alex.danvers@medbuddy.com', active: true },
        { id: 'USR-02', name: 'Nurse Joy', role: 'Nurse Practitioner', email: 'joy@medbuddy.com', active: true },
        { id: 'USR-03', name: 'Dr. Sarah Connor', role: 'Doctor', email: 's.connor@medbuddy.com', active: true },
        { id: 'USR-04', name: 'Dr. Gregory House', role: 'Doctor', email: 'g.house@medbuddy.com', active: true },
        { id: 'USR-05', name: 'Mark Vance', role: 'Receptionist', email: 'm.vance@medbuddy.com', active: true },
        { id: 'USR-06', name: 'Dr. John Dorian', role: 'Lab Technician', email: 'j.dorian@medbuddy.com', active: true }
      ],
      invoices: [],
      notifications: [
        { id: 1, text: 'Emergency patient arrived in Cardiac Bay', time: '10 mins ago', type: 'critical' },
        { id: 2, text: 'Lab report for Emma Watson published', time: '25 mins ago', type: 'info' },
        { id: 3, text: 'New appointment requested for David Kim', time: '40 mins ago', type: 'info' }
      ]
    };

    // LOCAL STORAGE LOAD/SAVE
    let appData = JSON.parse(localStorage.getItem('medbuddy_db')) || initialData;

    function saveData() {
      localStorage.setItem('medbuddy_db', JSON.stringify(appData));
    }

    // INITIALIZATION ON WINDOW LOAD
    window.onload = function() {
      updateLiveClock();
      setInterval(updateLiveClock, 1000);
      renderAllWorkspaces();
      switchTab('dashboard');
    };

    function updateLiveClock() {
      const now = new Date();
      document.getElementById('liveTime').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      document.getElementById('liveDate').innerText = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
    }

    // NAVIGATION TABS SWITCHING
    function switchTab(tabId) {
      document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
      const targetView = document.getElementById(`view-${tabId}`);
      if (targetView) targetView.classList.remove('hidden');

      // Update sidebar nav active styling for clean light theme
      document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
          btn.classList.add('bg-sky-500', 'text-white', 'shadow-sm');
          btn.classList.remove('hover:bg-slate-100', 'text-slate-700');
        } else {
          btn.classList.remove('bg-sky-500', 'text-white', 'shadow-sm');
          btn.classList.add('hover:bg-slate-100', 'text-slate-700');
        }
      });
      // Close sidebar on mobile after tap
      if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('-translate-x-full');
      }
    }

    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('hidden');
    }

    // RENDER ALL WORKSPACES
    function renderAllWorkspaces() {
      renderDashboard();
      renderPatientsTable();
      renderDoctorsGrid();
      renderAppointmentsTable();
      renderDepartmentsList();
      renderDiagnosticsGrid();
      renderBedsGrid();
      renderUsersTable();
      populateDropdowns();
      renderNotifications();
      calculateInvoiceTotal();
    }

    // DASHBOARD RENDER
    function renderDashboard() {
      document.getElementById('statTotalPatients').innerText = appData.patients.length;
      document.getElementById('statTodayAppts').innerText = appData.appointments.length;

      // Dept Capacity Bars
      const deptContainer = document.getElementById('dashDeptLoadContainer');
      deptContainer.innerHTML = appData.departments.slice(0, 5).map(d => `
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-medium text-slate-700">${d.name}</span>
            <span class="font-bold text-slate-500">${d.load}%</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div class="${d.color} h-2 rounded-full transition-all duration-500" style="width: ${d.load}%"></div>
          </div>
        </div>
      `).join('');

      // Recent Patients Table
      const recentTbody = document.getElementById('dashRecentPatientsTbody');
      recentTbody.innerHTML = appData.patients.slice(-5).map(p => `
        <tr class="hover:bg-slate-50 transition">
          <td class="p-2.5 font-medium text-slate-800">${p.name}</td>
          <td class="p-2.5 text-slate-500">${p.doctor}</td>
          <td class="p-2.5 text-slate-500">${p.dept}</td>
          <td class="p-2.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status==='In Consultation'?'bg-sky-100 text-sky-700':'bg-emerald-100 text-emerald-700'}">${p.status}</span></td>
        </tr>
      `).join('');

      // Lab Feed
      const labFeed = document.getElementById('dashLabFeedContainer');
      labFeed.innerHTML = appData.diagnostics.map(lab => `
        <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <div class="font-bold text-slate-800 text-xs">${lab.patient} - <span class="text-sky-600">${lab.type}</span></div>
            <div class="text-[10px] text-slate-500 truncate max-w-xs">${lab.result}</div>
          </div>
          <span class="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-lg">${lab.date}</span>
        </div>
      `).join('');
    }

    function refreshDashboard() {
      renderDashboard();
      showToast('Dashboard stats refreshed', 'info');
    }

    // PATIENTS TABLE RENDER & SEARCH
    function renderPatientsTable() {
      const search = document.getElementById('patientSearchInput').value.toLowerCase();
      const status = document.getElementById('patientStatusFilter').value;

      const filtered = appData.patients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search) || p.id.toLowerCase().includes(search) || p.phone.includes(search);
        const matchesStatus = status === 'ALL' || p.status === status;
        return matchesSearch && matchesStatus;
      });

      const tbody = document.getElementById('patientsTableBody');
      tbody.innerHTML = filtered.map(p => `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="p-3.5 font-bold text-sky-600">${p.id}</td>
          <td class="p-3.5 font-semibold text-slate-800">${p.name}</td>
          <td class="p-3.5 text-slate-600">${p.age} yrs / ${p.gender}</td>
          <td class="p-3.5 text-slate-600">${p.phone}</td>
          <td class="p-3.5 text-slate-600">${p.doctor}</td>
          <td class="p-3.5">
            <select onchange="updatePatientStatus('${p.id}', this.value)" class="text-[11px] font-semibold rounded-lg px-2 py-1 bg-slate-100 border border-slate-200 focus:outline-none">
              <option value="Scheduled" ${p.status==='Scheduled'?'selected':''}>Scheduled</option>
              <option value="Checked In" ${p.status==='Checked In'?'selected':''}>Checked In</option>
              <option value="In Consultation" ${p.status==='In Consultation'?'selected':''}>In Consultation</option>
              <option value="Completed" ${p.status==='Completed'?'selected':''}>Completed</option>
            </select>
          </td>
          <td class="p-3.5 text-right">
            <button onclick="deletePatient('${p.id}')" class="text-rose-500 hover:text-rose-700 p-1"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `).join('');
    }

    function updatePatientStatus(id, newStatus) {
      const p = appData.patients.find(x => x.id === id);
      if (p) {
        p.status = newStatus;
        saveData();
        showToast(`Patient ${p.name} status changed to ${newStatus}`, 'success');
      }
    }

    function deletePatient(id) {
      appData.patients = appData.patients.filter(p => p.id !== id);
      saveData();
      renderPatientsTable();
      showToast('Patient record deleted', 'info');
    }

    // DOCTORS DIRECTORY - LIST FORMAT
    function renderDoctorsGrid() {
      const grid = document.getElementById('doctorsGrid');
      grid.innerHTML = appData.doctors.map(d => `
        <div class="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-indigo-200 transition">
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0 flex items-center justify-center font-extrabold text-base">
              ${d.name.replace('Dr. ','').charAt(0)}
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-slate-800 text-sm">${d.name}</h4>
              <p class="text-xs text-indigo-600 font-semibold">${d.specialty}</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 sm:min-w-[280px]">
            <span><i class="fa-solid fa-door-open mr-1 text-slate-400"></i>${d.room}</span>
            <span><i class="fa-solid fa-phone mr-1 text-slate-400"></i>${d.phone}</span>
            <span class="inline-flex items-center gap-1.5 font-semibold ${d.available?'text-emerald-700':'text-rose-700'}">
              <span class="w-2 h-2 rounded-full ${d.available?'bg-emerald-500':'bg-rose-500'}"></span>${d.available?'Available':'On Leave'}
            </span>
          </div>
        </div>
      `).join('');
    }

    // APPOINTMENTS TABLE
    function renderAppointmentsTable() {
      const tbody = document.getElementById('appointmentsTableBody');
      tbody.innerHTML = appData.appointments.map(a => `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="p-3.5 font-bold text-purple-600">${a.id}</td>
          <td class="p-3.5 font-semibold text-slate-800">${a.patient}</td>
          <td class="p-3.5 text-slate-600">${a.doctor}</td>
          <td class="p-3.5 text-slate-600">${a.date} at ${a.time}</td>
          <td class="p-3.5 text-slate-600">${a.reason}</td>
          <td class="p-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">${a.status}</span></td>
          <td class="p-3.5 text-right">
            <button onclick="cancelAppointment('${a.id}')" class="text-rose-500 hover:text-rose-700 p-1"><i class="fa-solid fa-calendar-xmark"></i></button>
          </td>
        </tr>
      `).join('');
    }

    function cancelAppointment(id) {
      appData.appointments = appData.appointments.filter(a => a.id !== id);
      saveData();
      renderAppointmentsTable();
      showToast('Appointment cancelled', 'info');
    }

    // DEPARTMENTS & SERVICES - BOX/CARD FORMAT
    function renderDepartmentsList() {
      const container = document.getElementById('departmentsListContainer');
      const search = (document.getElementById('serviceSearchInput')?.value || '').toLowerCase();
      const filtered = appData.departments.filter(d =>
        d.name.toLowerCase().includes(search) ||
        d.lead.toLowerCase().includes(search) ||
        d.services.some(s => s.toLowerCase().includes(search))
      );

      if (filtered.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs md:col-span-2 xl:col-span-3">No matching departments or services found.</div>`;
        return;
      }

      container.innerHTML = filtered.map(d => `
        <article class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-sky-200 transition flex flex-col gap-4">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex-shrink-0 flex items-center justify-center text-xl border border-sky-100">
              <i class="fa-solid ${d.icon || 'fa-hospital'}"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-extrabold text-slate-800 text-base">${d.name}</h3>
              <span class="inline-block mt-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">${d.beds}</span>
            </div>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">${d.description || 'Specialized clinical services with state-of-the-art facilities.'}</p>
          <div>
            <h4 class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Services</h4>
            <div class="flex flex-wrap gap-1.5">
              ${(d.services || []).map(svc => `
                <span class="text-[11px] bg-sky-50 text-sky-700 px-2.5 py-1 rounded-lg border border-sky-100 font-medium">${svc}</span>
              `).join('')}
            </div>
          </div>
          <div class="mt-auto pt-3 border-t border-slate-100">
            <div class="flex justify-between items-center gap-3 mb-2">
              <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Clinical Lead</span>
              <span class="text-xs font-bold text-slate-700 text-right"><i class="fa-solid fa-user-doctor text-sky-500 mr-1"></i>${d.lead}</span>
            </div>
            <div class="flex justify-between text-[10px] text-slate-500 mb-1">
              <span>Occupancy</span><span class="font-bold text-slate-700">${d.load}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div class="${d.color} h-1.5 rounded-full" style="width: ${d.load}%"></div>
            </div>
          </div>
        </article>
      `).join('');
    }

    // DIAGNOSTICS GRID
    function renderDiagnosticsGrid(filterCat = 'ALL') {
      const grid = document.getElementById('labReportsGrid');
      const filtered = filterCat === 'ALL' ? appData.diagnostics : appData.diagnostics.filter(d => d.type === filterCat);

      grid.innerHTML = filtered.map(d => `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">${d.type}</span>
              <h4 class="font-bold text-slate-800 text-sm mt-1.5">${d.patient}</h4>
            </div>
            <span class="text-[10px] text-slate-400 font-medium">${d.date}</span>
          </div>
          <p class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">${d.result}</p>
          <button onclick="printDiagnosticReport('${d.id}')" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition">
            <i class="fa-solid fa-print"></i> View & Print Sheet
          </button>
        </div>
      `).join('');
    }

    function filterLabCategory(cat) {
      renderDiagnosticsGrid(cat);
    }

    // ADMISSIONS & BED MANAGEMENT - LIST FORMAT
    function renderBedsGrid() {
      const grid = document.getElementById('bedsGrid');
      grid.innerHTML = appData.beds.map(b => `
        <div class="bg-white px-4 py-3 rounded-xl border ${b.occupied?'border-rose-200':'border-emerald-200'} shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex items-center gap-3 flex-1">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center ${b.occupied?'bg-rose-50 text-rose-600':'bg-emerald-50 text-emerald-600'}">
              <i class="fa-solid fa-bed text-lg"></i>
            </div>
            <div>
              <div class="font-bold text-slate-800 text-sm">${b.bedNo}</div>
              <div class="text-xs text-slate-500">${b.ward}</div>
            </div>
          </div>
          <div class="sm:min-w-[220px] flex items-center justify-between gap-3">
            <span class="text-xs font-semibold ${b.occupied?'text-rose-700':'text-emerald-700'}">${b.occupied ? b.patient : 'Vacant Bed'}</span>
            <span class="text-[10px] uppercase tracking-wide font-bold px-2 py-1 rounded-lg ${b.occupied?'bg-rose-50 text-rose-700':'bg-emerald-50 text-emerald-700'}">${b.occupied?'Occupied':'Available'}</span>
          </div>
        </div>
      `).join('');
    }

    // USERS TABLE
    function renderUsersTable() {
      const tbody = document.getElementById('usersTableBody');
      tbody.innerHTML = appData.users.map(u => `
        <tr class="hover:bg-slate-50/80 transition">
          <td class="p-3.5 font-bold text-blue-600">${u.id}</td>
          <td class="p-3.5 font-semibold text-slate-800">${u.name}</td>
          <td class="p-3.5 text-slate-600">${u.role}</td>
          <td class="p-3.5 text-slate-600">${u.email}</td>
          <td class="p-3.5">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u.active?'bg-emerald-100 text-emerald-800':'bg-slate-100 text-slate-500'}">
              ${u.active ? 'Active' : 'Disabled'}
            </span>
          </td>
          <td class="p-3.5 text-right">
            <button onclick="toggleUserStatus('${u.id}')" class="text-slate-400 hover:text-slate-800 p-1"><i class="fa-solid fa-power-off"></i></button>
          </td>
        </tr>
      `).join('');
    }

    function toggleUserStatus(id) {
      const u = appData.users.find(x => x.id === id);
      if (u) {
        u.active = !u.active;
        saveData();
        renderUsersTable();
        showToast(`User ${u.name} status updated`, 'info');
      }
    }

    // POPULATE SELECT DROPDOWNS
    function populateDropdowns() {
      const patientOptions = appData.patients.map(p => `<option value="${p.name}">${p.name} (${p.id})</option>`).join('');
      const doctorOptions = appData.doctors.map(d => `<option value="${d.name}">${d.name} (${d.specialty})</option>`).join('');

      ['billPatientSelect', 'appPatientSelect', 'diagPatientSelect', 'admPatientSelect'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = patientOptions;
      });

      ['appDoctorSelect'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = doctorOptions;
      });
    }

    // INVOICE CALCULATION
    function calculateInvoiceTotal() {
      let subtotal = 0;
      document.querySelectorAll('.bill-item-chk:checked').forEach(chk => {
        subtotal += parseFloat(chk.value) || 0;
      });

      const misc = parseFloat(document.getElementById('billMiscAmount')?.value) || 0;
      const tax = (subtotal + misc) * 0.18;
      const grandTotal = subtotal + misc + tax;

      document.getElementById('billTaxDisplay').value = `$${tax.toFixed(2)}`;
      document.getElementById('billGrandTotal').innerText = `$${grandTotal.toFixed(2)}`;
    }

    function generateAndSaveInvoice() {
      const patient = document.getElementById('billPatientSelect').value;
      const total = document.getElementById('billGrandTotal').innerText;
      const mode = document.getElementById('billPaymentMode').value;
      const invId = 'INV-' + Math.floor(1000 + Math.random() * 9000);

      const inv = { id: invId, patient, amount: total, mode, date: new Date().toLocaleDateString() };
      appData.invoices.unshift(inv);
      saveData();

      showToast(`Invoice ${invId} generated successfully!`, 'success');

      // Print preview receipt
      document.getElementById('printableArea').innerHTML = `
        <div class="text-center border-b border-slate-200 pb-4 mb-4">
          <h2 class="text-2xl font-black text-slate-800">MEDBUDDY CENTRAL HOSPITAL</h2>
          <p class="text-xs text-slate-500">Official Billing Receipt & Payment Confirmation</p>
        </div>
        <div class="flex justify-between text-xs mb-4">
          <div>
            <strong>Invoice ID:</strong> ${invId}<br>
            <strong>Patient Name:</strong> ${patient}
          </div>
          <div class="text-right">
            <strong>Date:</strong> ${inv.date}<br>
            <strong>Payment Mode:</strong> ${mode}
          </div>
        </div>
        <div class="border-t border-b border-slate-200 py-3 my-4 text-xs">
          <div class="flex justify-between font-bold text-slate-800">
            <span>Total Paid Amount:</span>
            <span>${total}</span>
          </div>
        </div>
        <div class="text-center text-[10px] text-slate-400 mt-6">
          Thank you for trusting MedBuddy Healthcare. Computer Generated Invoice.
        </div>
      `;
      openModal('printModal');
    }

    function printDiagnosticReport(id) {
      const rep = appData.diagnostics.find(x => x.id === id);
      if (!rep) return;

      document.getElementById('printableArea').innerHTML = `
        <div class="text-center border-b border-slate-200 pb-4 mb-4">
          <h2 class="text-2xl font-black text-slate-800">MEDBUDDY DIAGNOSTICS & LABS</h2>
          <p class="text-xs text-slate-500">Certified Diagnostic Report Sheet</p>
        </div>
        <div class="flex justify-between text-xs mb-4">
          <div>
            <strong>Report ID:</strong> ${rep.id}<br>
            <strong>Patient:</strong> ${rep.patient}
          </div>
          <div class="text-right">
            <strong>Test Category:</strong> ${rep.type}<br>
            <strong>Date Published:</strong> ${rep.date}
          </div>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs my-4 space-y-2">
          <strong>Clinical Observations / Results:</strong>
          <p class="text-slate-700">${rep.result}</p>
        </div>
        <div class="flex justify-between items-center pt-8 text-[11px] text-slate-500">
          <div>Lab Technician Signature: ____________</div>
          <div>Chief Radiologist Signature: ____________</div>
        </div>
      `;
      openModal('printModal');
    }

    // FORM SAVING FUNCTIONS
    function savePatient(e) {
      e.preventDefault();
      const newP = {
        id: 'MRN-' + (100 + appData.patients.length + 1),
        name: document.getElementById('pFormName').value,
        age: document.getElementById('pFormAge').value,
        gender: document.getElementById('pFormGender').value,
        phone: document.getElementById('pFormPhone').value,
        doctor: 'Dr. Sarah Connor',
        dept: document.getElementById('pFormDept').value,
        status: document.getElementById('pFormStatus').value
      };
      appData.patients.push(newP);
      saveData();
      renderPatientsTable();
      populateDropdowns();
      closeModal('patientModal');
      showToast(`Patient ${newP.name} registered successfully`, 'success');
    }

    function saveAppointment(e) {
      e.preventDefault();
      const newA = {
        id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
        patient: document.getElementById('appPatientSelect').value,
        doctor: document.getElementById('appDoctorSelect').value,
        date: document.getElementById('appDate').value,
        time: document.getElementById('appTime').value,
        reason: document.getElementById('appReason').value,
        status: 'Active'
      };
      appData.appointments.push(newA);
      saveData();
      renderAppointmentsTable();
      closeModal('appointmentModal');
      showToast(`Appointment scheduled for ${newA.patient}`, 'success');
    }

    function saveDoctor(e) {
      e.preventDefault();
      const newD = {
        id: 'DOC-' + (appData.doctors.length + 1),
        name: document.getElementById('docName').value,
        specialty: document.getElementById('docSpecialty').value,
        room: document.getElementById('docRoom').value,
        available: true,
        phone: 'Ext ' + Math.floor(100 + Math.random() * 900)
      };
      appData.doctors.push(newD);
      saveData();
      renderDoctorsGrid();
      populateDropdowns();
      closeModal('doctorModal');
      showToast(`${newD.name} added to directory`, 'success');
    }

    function saveDiagnosticReport(e) {
      e.preventDefault();
      const newD = {
        id: 'LAB-' + Math.floor(500 + Math.random() * 500),
        patient: document.getElementById('diagPatientSelect').value,
        type: document.getElementById('diagType').value,
        date: new Date().toISOString().split('T')[0],
        result: document.getElementById('diagResult').value
      };
      appData.diagnostics.push(newD);
      saveData();
      renderDiagnosticsGrid();
      closeModal('diagnosticModal');
      showToast('Diagnostic report published', 'success');
    }

    function saveUserAccount(e) {
      e.preventDefault();
      const newU = {
        id: 'USR-0' + (appData.users.length + 1),
        name: document.getElementById('uName').value,
        role: document.getElementById('uRole').value,
        email: document.getElementById('uEmail').value,
        active: true
      };
      appData.users.push(newU);
      saveData();
      renderUsersTable();
      closeModal('userModal');
      showToast(`Staff user ${newU.name} created`, 'success');
    }

    function saveAdmission(e) {
      e.preventDefault();
      const patient = document.getElementById('admPatientSelect').value;
      const bedNo = document.getElementById('admBedNo').value;
      const ward = document.getElementById('admWard').value;

      appData.beds.push({ bedNo, ward, patient, occupied: true });
      saveData();
      renderBedsGrid();
      closeModal('admissionModal');
      showToast(`Bed ${bedNo} assigned to ${patient}`, 'success');
    }

    // SYSTEM SETTINGS & UTILS
    function saveSettings() {
      const hName = document.getElementById('settingHospName').value;
      const aName = document.getElementById('settingAdminName').value;
      document.getElementById('hospitalNameDisplay').innerText = hName;
      document.getElementById('sidebarUserName').innerText = aName;
      showToast('Settings updated', 'success');
    }

    function exportDataJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `medbuddy_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    function resetDataToDefault() {
      if (confirm("Reset all data to default system parameters?")) {
        localStorage.removeItem('medbuddy_db');
        appData = initialData;
        renderAllWorkspaces();
        showToast('System data reset to defaults', 'info');
      }
    }

    // GLOBAL SEARCH
    function handleGlobalSearch(query) {
      const resultsContainer = document.getElementById('globalSearchResults');
      if (!query.trim()) {
        resultsContainer.classList.add('hidden');
        return;
      }

      const matchingP = appData.patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      const matchingD = appData.doctors.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));

      let html = '';
      if (matchingP.length) {
        html += `<div class="font-bold text-[10px] text-slate-400 uppercase">Patients</div>`;
        matchingP.forEach(p => {
          html += `<div onclick="switchTab('patients')" class="p-1.5 hover:bg-slate-100 rounded cursor-pointer">${p.name} (${p.id})</div>`;
        });
      }
      if (matchingD.length) {
        html += `<div class="font-bold text-[10px] text-slate-400 uppercase mt-1">Doctors</div>`;
        matchingD.forEach(d => {
          html += `<div onclick="switchTab('doctors')" class="p-1.5 hover:bg-slate-100 rounded cursor-pointer">${d.name} - ${d.specialty}</div>`;
        });
      }

      if (!html) html = `<div class="text-slate-400 p-2">No matching records found</div>`;

      resultsContainer.innerHTML = html;
      resultsContainer.classList.remove('hidden');
    }

    // MODAL & NOTIFICATIONS HELPERS
    function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
    function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

    function toggleNotifications() {
      document.getElementById('notifDropdown').classList.toggle('hidden');
    }

    function clearNotifs() {
      appData.notifications = [];
      renderNotifications();
    }

    function renderNotifications() {
      const list = document.getElementById('notifList');
      if (!appData.notifications || appData.notifications.length === 0) {
        list.innerHTML = `<div class="text-slate-400 text-center py-2">No active notifications</div>`;
        document.getElementById('notifBadge')?.classList.add('hidden');
        return;
      }
      document.getElementById('notifBadge')?.classList.remove('hidden');
      list.innerHTML = appData.notifications.map(n => `
        <div class="p-2 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-start">
          <span class="text-slate-700">${n.text}</span>
          <span class="text-[9px] text-slate-400 whitespace-nowrap ml-2">${n.time}</span>
        </div>
      `).join('');
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `p-3 rounded-xl shadow-lg text-xs font-semibold text-white flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 ${type==='success'?'bg-emerald-600':type==='critical'?'bg-rose-600':'bg-sky-600'}`;
      toast.innerHTML = `<i class="fa-solid ${type==='success'?'fa-check-circle':'fa-info-circle'}"></i> <span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => { toast.classList.add('opacity-0'); setTimeout(() => toast.remove(), 300); }, 3000);
    }
