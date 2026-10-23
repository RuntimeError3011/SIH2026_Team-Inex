// ==========================================================================
// MedBuddy Hospital Management System - Admin Dashboard Interactive Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initChartTooltips();
});

// Toast notification helper
function showToast(message) {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #0f172a;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 12.5px;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 8px;
    animation: toast-in 0.25s ease-out;
  `;
  toast.innerHTML = `<span>✓</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Profile Dropdown Toggle
function toggleProfileDropdown() {
  const menu = document.getElementById('profileDropdownMenu');
  if (menu) menu.classList.toggle('open');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const pill = document.getElementById('adminProfilePill');
  const menu = document.getElementById('profileDropdownMenu');
  if (pill && menu && !pill.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// Global Search Filter on Recent Patients Table
function initSearch() {
  const searchInput = document.getElementById('headerSearchInput');
  const table = document.getElementById('recentPatientsTable');
  if (!searchInput || !table) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      if (text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// Interactive SVG Chart Tooltips
function initChartTooltips() {
  const points = document.querySelectorAll('.chart-point');
  const tooltip = document.getElementById('chartTooltip');
  if (!tooltip) return;

  points.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
      const day = point.getAttribute('data-day');
      const val = point.getAttribute('data-val');
      const cx = parseFloat(point.getAttribute('cx'));
      const cy = parseFloat(point.getAttribute('cy'));

      tooltip.innerText = `${day}: ${val} patients`;
      tooltip.style.left = `${cx + 20}px`;
      tooltip.style.top = `${cy + 10}px`;
      tooltip.style.display = 'block';
    });

    point.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
}

// Quick Actions Modal Controls
function openQuickModal(type) {
  const modal = document.getElementById('quickActionModal');
  const title = document.getElementById('quickModalTitle');
  const body = document.getElementById('quickModalDynamicFields');
  if (!modal || !title || !body) return;

  if (type === 'addUser') {
    title.innerText = '+ Add New Hospital Staff / User';
    body.innerHTML = `
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" class="form-control" id="modalInputName" placeholder="e.g. Dr. Ramesh Gupta">
      </div>
      <div class="form-group">
        <label>Staff Role</label>
        <select class="form-control" id="modalInputRole">
          <option>Doctor / Specialist</option>
          <option>Nursing Staff</option>
          <option>Pharmacist</option>
          <option>Receptionist / Triage</option>
          <option>Lab Technician</option>
        </select>
      </div>
      <div class="form-group">
        <label>Department</label>
        <select class="form-control">
          <option>Cardiology</option>
          <option>General Medicine</option>
          <option>Orthopedics</option>
          <option>Neurology</option>
          <option>Pediatrics</option>
        </select>
      </div>
    `;
  } else if (type === 'registerPatient') {
    title.innerText = 'Register New Patient (Walk-in / ABDM)';
    body.innerHTML = `
      <div class="form-group">
        <label>Patient Full Name</label>
        <input type="text" class="form-control" placeholder="Enter patient name">
      </div>
      <div class="form-group">
        <label>ABHA ID / Aadhaar / Mobile</label>
        <input type="text" class="form-control" placeholder="14-digit ABHA ID or 10-digit Mobile">
      </div>
      <div class="form-group">
        <label>Triage Department</label>
        <select class="form-control">
          <option>General Medicine</option>
          <option>Cardiology</option>
          <option>Orthopedics</option>
          <option>Neurology</option>
          <option>Emergency Triage</option>
        </select>
      </div>
    `;
  } else if (type === 'bookAppointment') {
    title.innerText = 'Book Consultation Appointment';
    body.innerHTML = `
      <div class="form-group">
        <label>Patient ID / Name</label>
        <input type="text" class="form-control" placeholder="e.g. PT-1042 Aarav Sharma">
      </div>
      <div class="form-group">
        <label>Consulting Doctor</label>
        <select class="form-control">
          <option>Dr. Anjali Verma (General Medicine)</option>
          <option>Dr. Meera Shah (Cardiology)</option>
          <option>Dr. R. Singhal (Surgery)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Time Slot</label>
        <input type="time" class="form-control" value="11:30">
      </div>
    `;
  } else if (type === 'addDoctor') {
    title.innerText = 'Add Doctor to Duty Roster';
    body.innerHTML = `
      <div class="form-group">
        <label>Doctor Name</label>
        <input type="text" class="form-control" placeholder="Dr. Firstname Lastname">
      </div>
      <div class="form-group">
        <label>Medical Council Reg #</label>
        <input type="text" class="form-control" placeholder="e.g. MCI-48921">
      </div>
      <div class="form-group">
        <label>Department</label>
        <select class="form-control">
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
          <option>General Medicine</option>
        </select>
      </div>
    `;
  } else if (type === 'newAdmission') {
    title.innerText = 'Assign Inpatient Bed (Admission)';
    body.innerHTML = `
      <div class="form-group">
        <label>Patient ID</label>
        <input type="text" class="form-control" placeholder="e.g. PT-1044">
      </div>
      <div class="form-group">
        <label>Ward Selection</label>
        <select class="form-control">
          <option>General Ward (Bed 14 available)</option>
          <option>ICU (Bed 03 available)</option>
          <option>Cardiac Care Unit (Bed 05 available)</option>
          <option>Day Care Ward</option>
        </select>
      </div>
    `;
  }

  modal.classList.add('open');
}

function closeQuickModal() {
  const modal = document.getElementById('quickActionModal');
  if (modal) modal.classList.remove('open');
}

function submitQuickAction() {
  closeQuickModal();
  showToast('Record updated successfully in MedBuddy HMS database.');
}

// Navigate to Patient Kiosk
function launchPatientKiosk() {
  window.location.href = 'index.html';
}

// Logout to Login page
function logoutAdmin() {
  window.location.href = 'login.html';
}
