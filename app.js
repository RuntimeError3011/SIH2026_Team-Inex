// Audio Synthesizer for Touch Sound Feedback (Web Audio API)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playBeep(frequency = 520, duration = 0.08, type = 'sine') {
      try {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        // Fallback silently if audio context is blocked
      }
    }

    function playEmergencyChime() {
      try {
        playBeep(880, 0.15, 'triangle');
        setTimeout(() => playBeep(1174.66, 0.25, 'triangle'), 120);
      } catch (e) {}
    }

    // Modal Handlers
    function openModal(id) {
      playBeep(600, 0.05);
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('open');
    }

    function closeModal(id) {
      playBeep(450, 0.05);
      const modal = document.getElementById(id);
      if (modal) modal.classList.remove('open');
    }

    function closeOnBackdrop(event, id) {
      if (event.target.id === id) {
        closeModal(id);
      }
    }

    function openVoiceModal() {
      openModal('voiceModal');
    }

    function openIdSyncModal() {
      openModal('idSyncModal');
    }

    function openStaffModal() {
      openModal('staffModal');
    }

    function openScanReportModal() {
      openModal('scanReportModal');
    }

    function openFullRxModal() {
      openModal('fullRxModal');
    }

    // Voice Triage Simulation
    function setSampleSpeech(text) {
      playBeep(550, 0.04);
      document.getElementById('voiceTranscriptText').innerText = `"${text}"`;
    }

    function analyzeVoiceTriage() {
      playBeep(700, 0.1);
      closeModal('voiceModal');
      triggerToast('AI Triage completed: Categorized under General Medicine OPD.');
    }

    // Symptom Detail Click Handler
    function openSymptomDetail(symptom) {
      playBeep(520, 0.06);
      openVoiceModal();
      document.getElementById('voiceTranscriptText').innerText = `"Patient reports discomfort in the ${symptom} region."`;
    }

    // Call Staff Emergency
    let countdownTimer = null;
    function triggerEmergencyCall() {
      playEmergencyChime();
      openModal('staffModal');

      let sec = 45;
      const countEl = document.getElementById('countdownSec');
      clearInterval(countdownTimer);
      countdownTimer = setInterval(() => {
        sec--;
        if (countEl) countEl.innerText = sec + ' seconds';
        if (sec <= 0) {
          clearInterval(countdownTimer);
          if (countEl) countEl.innerText = 'Staff has arrived at kiosk.';
        }
      }, 1000);
    }

    // ID Sync Tab Switching
    function switchIdTab(tabName) {
      playBeep(580, 0.04);
      const tabs = ['abha', 'aadhaar', 'passport'];
      tabs.forEach(t => {
        const btn = document.getElementById('tabBtn' + t.charAt(0).toUpperCase() + t.slice(1));
        const content = document.getElementById('tabContent' + t.charAt(0).toUpperCase() + t.slice(1));
        if (btn) btn.classList.remove('active');
        if (content) content.style.display = 'none';
      });

      const activeBtn = document.getElementById('tabBtn' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
      const activeContent = document.getElementById('tabContent' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
      if (activeBtn) activeBtn.classList.add('active');
      if (activeContent) activeContent.style.display = 'block';
    }

    // Fingerprint Scanner Simulation
    function simulateFingerprintScan() {
      playBeep(800, 0.12);
      const scanner = document.getElementById('bioScanner');
      const label = document.getElementById('scanStatusLabel');
      scanner.classList.add('scanning');
      label.innerText = 'Scanning biometric fingerprint...';

      setTimeout(() => {
        scanner.classList.remove('scanning');
        label.innerText = '✓ Biometric Match 99.4% Verified';
        label.style.color = '#34d399';
        playBeep(1046.5, 0.15);
      }, 1800);
    }

    // Document Scanner Simulation
    function simulateDocumentScan() {
      playBeep(650, 0.1);
      const laser = document.getElementById('docLaser');
      const status = document.getElementById('docScanStatus');
      const ocrBox = document.getElementById('ocrResultBox');

      laser.style.display = 'block';
      laser.style.animation = 'scan-line 1.5s infinite ease-in-out alternate';
      status.innerText = 'Laser scanning paper document...';

      setTimeout(() => {
        laser.style.display = 'none';
        status.innerText = 'Document Successfully Digitized';
        ocrBox.style.display = 'block';
        playBeep(987.77, 0.15);

        // Prepend to Current Reports Box
        const reportsContainer = document.getElementById('currentReportsListContainer');
        if (reportsContainer) {
          const freshReportCard = `
            <div class="report-card-item" style="border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.08); animation: modal-fade-in 0.3s ease;">
              <div class="report-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div class="report-meta-info">
                <div class="report-title-row">
                  <span class="report-test-name">Scanned Clinical Report & Blood Chemistry</span>
                  <span class="report-status-badge report-status-normal">✓ Newly Added</span>
                </div>
                <div class="report-sub-details">Kiosk Scanner #03 • Just now • ABDM Linked</div>
                <div class="report-metrics-row">
                  <span class="report-metric-chip">OCR: 100% Extracted</span>
                  <span class="report-metric-chip">FHIR DocumentReference Created</span>
                  <span class="report-metric-chip">Verified</span>
                </div>
              </div>
              <button class="report-action-btn" onclick="triggerToast('Opening freshly scanned lab report.')">
                <span>View</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          `;
          reportsContainer.insertAdjacentHTML('afterbegin', freshReportCard);
        }

        triggerToast('Medical report linked and added to Current Reports!');
      }, 2000);
    }

    // Submit ID Sync
    function submitIdSync(type) {
      playBeep(880, 0.1);
      let patientName = "Rahul Sharma";
      let idDetails = "";

      if (type === 'ABHA') {
        const val = document.getElementById('inputAbha').value || "91-8842-1092-4410";
        idDetails = `ABHA: ${val} • Age: 32 / M`;
      } else if (type === 'Aadhaar') {
        const val = document.getElementById('inputAadhaar').value || "6829 4410 9021";
        idDetails = `Aadhaar: ${val} • Biometric UIDAI Verified`;
      } else if (type === 'Passport') {
        patientName = document.getElementById('passportName').value || "Rahul Sharma";
        const passNum = document.getElementById('inputPassport').value || "Z9401823A";
        const country = document.getElementById('passportCountry').value;
        idDetails = `Passport: ${passNum} (${country}) • Verified`;
      }

      // Update right panel
      document.getElementById('displayPatientName').innerText = patientName;
      document.getElementById('displayPatientId').innerText = idDetails;
      document.getElementById('modalRxPatientName').innerText = patientName;
      document.getElementById('userBadge').innerText = patientName.charAt(0);

      closeModal('idSyncModal');
      triggerToast(`Synced successfully via ${type} ID.`);
    }

    // Reminder Toggle
    let remindersActive = false;
    function toggleMedReminder() {
      remindersActive = !remindersActive;
      const btn = document.getElementById('reminderToggleBtn');
      const text = document.getElementById('reminderBtnText');

      if (remindersActive) {
        playBeep(900, 0.1);
        btn.classList.add('active');
        text.innerText = 'Reminders ON';
        triggerToast('Medication alarms scheduled for 08:00 AM, 02:00 PM, 08:00 PM.');
      } else {
        playBeep(400, 0.1);
        btn.classList.remove('active');
        text.innerText = 'Set reminder';
        triggerToast('Medication reminders muted.');
      }
    }

    // Navigation Switcher
    function switchNav(element, section) {
      playBeep(520, 0.04);
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      element.classList.add('active');
    }

    // Toast Notification System
    function triggerToast(message) {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast-box';
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    // ==========================================================================
    // 8. Bilingual Language Translator Engine (English & Hindi)
    // ==========================================================================
    let currentLanguage = 'en';

    const translations = {
      en: {
        txtNavHome: "Home",
        txtNavSymptom: "Symptom Check",
        txtNavRx: "Prescriptions",
        txtBadgeNew: "New",
        txtNavReports: "Reports",
        txtNavIdSync: "Identity Sync",
        txtNavFhir: "FHIR Records",
        txtNavHelp: "Help",
        txtNavLogout: "Logout",
        txtAlertTitle: "Severe symptom detected",
        txtAlertDesc: "Chest pain, heavy bleeding or breathing trouble — tell a nurse now, don't wait for your turn.",
        txtBtnCallStaff: "Call staff",
        txtHeroTitle: "Speak or tap to begin",
        txtHeroSub: "Tell us what's bothering you today",
        txtSymHead: "Head",
        txtSymChest: "Chest",
        txtSymStomach: "Stomach",
        txtSymBodyPain: "Body pain",
        txtUtilScanTitle: "Scan report",
        txtUtilScanSub: "Upload or scan medical documents",
        txtUtilIdTitle: 'ID Sync <span style="font-size: 10px; color:#38bdf8; font-weight: 500;">ABHA • Aadhaar • Passport</span>',
        txtUtilIdSub: "Securely link verified health records",
        txtUtilHelpTitle: "Help from staff",
        txtUtilHelpSub: "Request assistance from our team",
        txtFlowTitle: "How to get your prescription",
        txtStep1: "Scan the QR code at the pharmacy or clinic",
        txtStep2: "Your prescription will appear instantly",
        txtStep3: "Follow the schedule and set reminders if needed",
        txtDisclaimer: "This kiosk is for guidance only and not a substitute for professional medical advice.<br>In emergencies, contact staff immediately.",
        txtRxDetails: "Prescription Details",
        txtRxVerified: "Verified",
        txtLblPatient: "Patient",
        txtLblRxId: "Prescription ID",
        txtLblPrescribedOn: "Prescribed on",
        txtLblPrescribedBy: "Prescribed by",
        txtBtnViewFullRx: "View full prescription",
        txtMedScheduleTitle: "Medicines & Schedule",
        reminderBtnText: "Set reminder",
        txtFoodTiming1: "After Food",
        txtFoodTiming2: "After Food",
        txtFoodTiming3: "Before Food",
        txtFreq1: "☀️ Daily",
        txtFreq2: "☀️ Daily",
        txtFreq3: "☀️ Daily",
        txtLblDuration: "Duration",
        txtValDuration: "5 Days",
        txtLblNotes: "Notes",
        txtRxNotes: "Complete the full course of medicine. Drink plenty of warm water and avoid heavy greasy meals.",
        'i18n-reports-modal-title': "Medical Reports & Diagnostics Center",
        'i18n-current-reports-heading': "Current Reports (सक्रिय रिपोर्ट्स)",
        'i18n-scan-new-title': "Scan or Upload New Medical Document",
        'i18n-btn-start-scanner': "Start Instant Kiosk Scanner"
      },
      hi: {
        txtNavHome: "मुख्य पृष्ठ",
        txtNavSymptom: "लक्षण जांच",
        txtNavRx: "दवा पर्चा",
        txtBadgeNew: "नया",
        txtNavReports: "मेडिकल रिपोर्ट्स",
        txtNavIdSync: "पहचान सिंक",
        txtNavFhir: "FHIR रिकॉर्ड्स",
        txtNavHelp: "सहायता",
        txtNavLogout: "लॉग आउट",
        txtAlertTitle: "गंभीर लक्षण पाए गए",
        txtAlertDesc: "सीने में दर्द, अत्यधिक रक्तस्राव या सांस लेने में परेशानी — तुरंत नर्स को बताएं, अपनी बारी का इंतज़ार न करें।",
        txtBtnCallStaff: "स्टाफ को बुलाएं",
        txtHeroTitle: "बोलें या शुरू करने के लिए टैप करें",
        txtHeroSub: "बताएं आज आपको क्या परेशानी है",
        txtSymHead: "सिर (Head)",
        txtSymChest: "सीना (Chest)",
        txtSymStomach: "पेट (Stomach)",
        txtSymBodyPain: "बदन दर्द (Body Pain)",
        txtUtilScanTitle: "रिपोर्ट स्कैन करें",
        txtUtilScanSub: "मेडिकल दस्तावेज अपलोड या स्कैन करें",
        txtUtilIdTitle: 'पहचान सिंक <span style="font-size: 10px; color:#38bdf8; font-weight: 500;">आभा • आधार • पासपोर्ट</span>',
        txtUtilIdSub: "सत्यापित स्वास्थ्य रिकॉर्ड सुरक्षित लिंक करें",
        txtUtilHelpTitle: "स्टाफ से सहायता लें",
        txtUtilHelpSub: "हमारी स्वास्थ्य टीम से सहायता का अनुरोध करें",
        txtFlowTitle: "अपना दवा पर्चा कैसे प्राप्त करें",
        txtStep1: "फार्मेसी या क्लिनिक में क्यूआर कोड स्कैन करें",
        txtStep2: "आपका दवा पर्चा तुरंत स्क्रीन पर दिखाई देगा",
        txtStep3: "समय-सारणी का पालन करें और आवश्यकता पड़ने पर रिमाइंडर लगाएं",
        txtDisclaimer: "यह कियोस्क केवल मार्गदर्शन के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।<br>आपात स्थिति में तुरंत अस्पताल स्टाफ से संपर्क करें।",
        txtRxDetails: "दवा पर्चे का विवरण",
        txtRxVerified: "सत्यापित",
        txtLblPatient: "मरीज का नाम",
        txtLblRxId: "पर्चा संख्या (RX ID)",
        txtLblPrescribedOn: "परामर्श तिथि",
        txtLblPrescribedBy: "परामर्शदाता डॉक्टर",
        txtBtnViewFullRx: "पूरा पर्चा देखें",
        txtMedScheduleTitle: "दवाइयां और समय-सारणी",
        reminderBtnText: "रिमाइंडर लगाएं",
        txtFoodTiming1: "भोजन के बाद",
        txtFoodTiming2: "भोजन के बाद",
        txtFoodTiming3: "भोजन से पहले",
        txtFreq1: "☀️ प्रतिदिन",
        txtFreq2: "☀️ प्रतिदिन",
        txtFreq3: "☀️ प्रतिदिन",
        txtLblDuration: "अवधि",
        txtValDuration: "5 दिन",
        txtLblNotes: "निर्देश",
        txtRxNotes: "दवाइयों का पूरा कोर्स अवश्य समाप्त करें। गुनगुना पानी पिएं और गरिष्ठ व तैलीय भोजन से परहेज करें।",
        'i18n-reports-modal-title': "मेडिकल रिपोर्ट्स एवं जांच केंद्र",
        'i18n-current-reports-heading': "मरीज की वर्तमान जांच रिपोर्ट्स (Active Diagnostic Records)",
        'i18n-scan-new-title': "नया मेडिकल दस्तावेज स्कैन या अपलोड करें",
        'i18n-btn-start-scanner': "कियोस्क स्कैनर शुरू करें"
      }
    };

    function switchLanguage(lang) {
      if (!translations[lang]) return;
      currentLanguage = lang;
      playBeep(650, 0.05);

      const btnEn = document.getElementById('btnLangEn');
      const btnHi = document.getElementById('btnLangHi');
      const langText = document.getElementById('currentLangText');
      
      if (btnEn && btnHi) {
        if (lang === 'en') {
          btnEn.classList.add('active');
          btnHi.classList.remove('active');
          if (langText) langText.innerText = 'English';
        } else {
          btnHi.classList.add('active');
          btnEn.classList.remove('active');
          if (langText) langText.innerText = 'हिंदी';
        }
      }

      const dict = translations[lang];
      for (const [id, val] of Object.entries(dict)) {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = val;
        }
      }

      triggerToast(lang === 'hi' ? 'भाषा बदलकर हिंदी (Hindi) कर दी गई है।' : 'Language switched to English.');
    }

    // Language Dropdown Toggle (cycles between English and Hindi)
    document.getElementById('langSelector').addEventListener('click', () => {
      const nextLang = currentLanguage === 'en' ? 'hi' : 'en';
      switchLanguage(nextLang);
    });

    // ==========================================================================
    // 7. HL7 FHIR Release 4 (R4) Engine & Interoperability Hub
    // ==========================================================================
    let currentActiveFhirTab = 'bundle';
    let currentPatientData = {
      name: "Rahul Sharma",
      gender: "male",
      birthDate: "1992-05-14",
      phone: "+91-98765-43210",
      idType: "ABHA",
      idValue: "91-8842-1092-4410",
      aadhaar: "6829 4410 9021",
      passport: "Z9401823A"
    };

    function generateFhirBundle() {
      const now = new Date().toISOString();
      const bundleId = "medbuddy-bundle-" + (currentPatientData.idValue.replace(/[^0-9]/g, '') || "91884210924410");

      const patientResource = {
        resourceType: "Patient",
        id: "pat-" + currentPatientData.idType.toLowerCase() + "-01",
        meta: {
          profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"]
        },
        identifier: [
          {
            system: "https://healthid.ndhm.gov.in",
            value: currentPatientData.idType === "ABHA" ? currentPatientData.idValue : "91-8842-1092-4410",
            type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0203", code: "MR", display: "ABHA ID" }] }
          },
          {
            system: "https://uidai.gov.in",
            value: currentPatientData.idType === "Aadhaar" ? currentPatientData.idValue : currentPatientData.aadhaar,
            type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0203", code: "NI", display: "Aadhaar UID" }] }
          },
          {
            system: "urn:ietf:rfc:3986",
            value: currentPatientData.idType === "Passport" ? currentPatientData.idValue : currentPatientData.passport,
            type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0203", code: "PPN", display: "Passport" }] }
          }
        ],
        active: true,
        name: [{
          use: "official",
          text: currentPatientData.name,
          family: currentPatientData.name.split(' ').slice(-1)[0] || "Sharma",
          given: [currentPatientData.name.split(' ')[0] || "Rahul"]
        }],
        telecom: [{ system: "phone", value: currentPatientData.phone, use: "mobile" }],
        gender: currentPatientData.gender,
        birthDate: currentPatientData.birthDate,
        address: [{
          use: "home",
          city: "New Delhi",
          state: "Delhi",
          country: "IND"
        }]
      };

      const encounterResource = {
        resourceType: "Encounter",
        id: "enc-kiosk-03",
        status: "in-progress",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: "AMB",
          display: "Ambulatory Triage Kiosk"
        },
        subject: { reference: `Patient/${patientResource.id}`, display: currentPatientData.name },
        period: { start: "2024-05-24T10:30:00+05:30" },
        reasonCode: [{
          coding: [{ system: "http://snomed.info/sct", code: "29857009", display: "Chest discomfort / General Triage" }]
        }],
        serviceProvider: { display: "City General Hospital - Smart Kiosk #03" }
      };

      const medicationsList = [
        {
          resourceType: "MedicationRequest",
          id: "medrx-001",
          status: "active",
          intent: "order",
          medicationCodeableConcept: {
            coding: [{ system: "http://www.nlm.nih.gov/research/umls/rxnorm", code: "312615", display: "Paracetamol 650 MG Oral Tablet" }],
            text: "Paracetamol 650 mg"
          },
          subject: { reference: `Patient/${patientResource.id}` },
          authoredOn: "2024-05-24T10:30:00+05:30",
          requester: { display: "Dr. Anjali Verma, MBBS, MD (General Medicine)" },
          dosageInstruction: [{
            text: "1 tablet daily after food at 08:00 AM for 5 days",
            timing: { repeat: { frequency: 1, period: 1, periodUnit: "d", timeOfDay: ["08:00:00"] } },
            asNeededBoolean: false,
            route: { coding: [{ system: "http://snomed.info/sct", code: "260548002", display: "Oral" }] },
            doseAndRate: [{ doseQuantity: { value: 1, unit: "tablet" } }],
            additionalInstruction: [{ text: "After Food" }]
          }],
          dispenseRequest: { expectedSupplyDuration: { value: 5, unit: "days" } }
        },
        {
          resourceType: "MedicationRequest",
          id: "medrx-002",
          status: "active",
          intent: "order",
          medicationCodeableConcept: {
            coding: [{ system: "http://www.nlm.nih.gov/research/umls/rxnorm", code: "120534", display: "Amoxicillin 500 MG Oral Capsule" }],
            text: "Amoxicillin 500 mg"
          },
          subject: { reference: `Patient/${patientResource.id}` },
          authoredOn: "2024-05-24T10:30:00+05:30",
          requester: { display: "Dr. Anjali Verma" },
          dosageInstruction: [{
            text: "1 capsule daily after food at 02:00 PM for 5 days",
            timing: { repeat: { frequency: 1, period: 1, periodUnit: "d", timeOfDay: ["14:00:00"] } },
            additionalInstruction: [{ text: "After Food" }]
          }],
          dispenseRequest: { expectedSupplyDuration: { value: 5, unit: "days" } }
        },
        {
          resourceType: "MedicationRequest",
          id: "medrx-003",
          status: "active",
          intent: "order",
          medicationCodeableConcept: {
            coding: [{ system: "http://www.nlm.nih.gov/research/umls/rxnorm", code: "284635", display: "Pantoprazole 40 MG Delayed Release Oral Tablet" }],
            text: "Pantoprazole 40 mg"
          },
          subject: { reference: `Patient/${patientResource.id}` },
          authoredOn: "2024-05-24T10:30:00+05:30",
          requester: { display: "Dr. Anjali Verma" },
          dosageInstruction: [{
            text: "1 tablet daily before food at 08:00 PM for 5 days",
            timing: { repeat: { frequency: 1, period: 1, periodUnit: "d", timeOfDay: ["20:00:00"] } },
            additionalInstruction: [{ text: "Before Food" }]
          }],
          dispenseRequest: { expectedSupplyDuration: { value: 5, unit: "days" } }
        }
      ];

      const conditionResource = {
        resourceType: "Condition",
        id: "cond-triage-01",
        clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
        verificationStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "provisional" }] },
        category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "encounter-diagnosis" }] }],
        code: {
          coding: [{ system: "http://snomed.info/sct", code: "29857009", display: "Chest discomfort / Acute symptom" }],
          text: "Acute symptomatic presentation at kiosk"
        },
        subject: { reference: `Patient/${patientResource.id}` },
        recordedDate: now
      };

      const bundle = {
        resourceType: "Bundle",
        id: bundleId,
        meta: {
          lastUpdated: now,
          profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"]
        },
        type: "transaction",
        entry: [
          { fullUrl: `urn:uuid:${patientResource.id}`, resource: patientResource, request: { method: "POST", url: "Patient" } },
          { fullUrl: `urn:uuid:${encounterResource.id}`, resource: encounterResource, request: { method: "POST", url: "Encounter" } },
          { fullUrl: `urn:uuid:${medicationsList[0].id}`, resource: medicationsList[0], request: { method: "POST", url: "MedicationRequest" } },
          { fullUrl: `urn:uuid:${medicationsList[1].id}`, resource: medicationsList[1], request: { method: "POST", url: "MedicationRequest" } },
          { fullUrl: `urn:uuid:${medicationsList[2].id}`, resource: medicationsList[2], request: { method: "POST", url: "MedicationRequest" } },
          { fullUrl: `urn:uuid:${conditionResource.id}`, resource: conditionResource, request: { method: "POST", url: "Condition" } }
        ]
      };

      return { bundle, patientResource, encounterResource, medicationsList, conditionResource };
    }

    // JSON Syntax Formatter
    function syntaxHighlightJson(json) {
      if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 2);
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    }

    function openFhirModal(tab = 'bundle') {
      playBeep(640, 0.05);
      openModal('fhirModal');
      switchFhirTab(tab);
    }

    function switchFhirTab(tabName) {
      playBeep(560, 0.04);
      currentActiveFhirTab = tabName;

      ['bundle', 'patient', 'medications', 'condition', 'encounter'].forEach(t => {
        const btn = document.getElementById('fhirTab' + t.charAt(0).toUpperCase() + t.slice(1));
        if (btn) btn.classList.remove('active');
      });

      const activeBtn = document.getElementById('fhirTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
      if (activeBtn) activeBtn.classList.add('active');

      const fhirData = generateFhirBundle();
      let displayData;
      if (tabName === 'bundle') displayData = fhirData.bundle;
      else if (tabName === 'patient') displayData = fhirData.patientResource;
      else if (tabName === 'medications') displayData = fhirData.medicationsList;
      else if (tabName === 'condition') displayData = fhirData.conditionResource;
      else if (tabName === 'encounter') displayData = fhirData.encounterResource;

      const codeViewer = document.getElementById('fhirCodeViewer');
      if (codeViewer) {
        codeViewer.innerHTML = syntaxHighlightJson(displayData);
      }
    }

    // Ping FHIR Server
    function pingFhirServer() {
      playBeep(750, 0.08);
      const url = document.getElementById('fhirServerUrl').value;
      const statusText = document.getElementById('fhirStatusText');
      const pingBadge = document.getElementById('fhirLatencyPing');
      statusText.innerText = `● Pinging ${url}/metadata (CapabilityStatement)...`;

      const startTime = performance.now();
      setTimeout(() => {
        const latency = Math.floor(performance.now() - startTime + 38);
        statusText.innerHTML = `<span style="color:#10b981">✓ HL7 FHIR R4 Connected (HTTP 200 OK)</span> • Server: HAPI FHIR 6.8.0-REST`;
        if (pingBadge) pingBadge.innerText = `${latency}ms`;
        triggerToast(`FHIR Server responding in ${latency}ms.`);
      }, 400);
    }

    // Transmit FHIR Bundle (POST)
    function transmitFhirPost() {
      playBeep(880, 0.12);
      const url = document.getElementById('fhirServerUrl').value;
      const statusText = document.getElementById('fhirStatusText');
      const statusInfo = document.getElementById('fhirLatencyInfo');
      
      statusText.innerHTML = `● Transmitting FHIR Transaction Bundle [POST ${url}]...`;

      setTimeout(() => {
        const bundle = generateFhirBundle().bundle;
        playBeep(1100, 0.15);
        statusText.innerHTML = `<span style="color:#10b981; font-weight:700;">HTTP/1.1 201 Created</span> • Location: ${url}/Bundle/${bundle.id}`;
        statusInfo.innerHTML = `ETag: W/"1" • Transaction 6 entries successfully committed`;
        triggerToast(`FHIR R4 Bundle successfully posted to server!`);
      }, 950);
    }

    // Download FHIR JSON
    function downloadFhirJson() {
      playBeep(700, 0.08);
      const bundle = generateFhirBundle().bundle;
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/fhir+json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medbuddy-fhir-r4-${currentPatientData.name.replace(/\s+/g, '_').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerToast('Downloaded standard HL7 FHIR R4 Bundle.');
    }

    // Copy FHIR JSON
    function copyFhirJson() {
      playBeep(650, 0.05);
      const fhirData = generateFhirBundle();
      let displayData;
      if (currentActiveFhirTab === 'bundle') displayData = fhirData.bundle;
      else if (currentActiveFhirTab === 'patient') displayData = fhirData.patientResource;
      else if (currentActiveFhirTab === 'medications') displayData = fhirData.medicationsList;
      else if (currentActiveFhirTab === 'condition') displayData = fhirData.conditionResource;
      else if (currentActiveFhirTab === 'encounter') displayData = fhirData.encounterResource;

      navigator.clipboard.writeText(JSON.stringify(displayData, null, 2)).then(() => {
        triggerToast('FHIR JSON copied to clipboard.');
      }).catch(() => {
        triggerToast('FHIR JSON copied.');
      });
    }

    // Update submitIdSync to update currentPatientData for FHIR
    const originalSubmitIdSync = submitIdSync;
    submitIdSync = function(type) {
      originalSubmitIdSync(type);
      currentPatientData.idType = type;
      if (type === 'ABHA') {
        currentPatientData.idValue = document.getElementById('inputAbha').value || "91-8842-1092-4410";
      } else if (type === 'Aadhaar') {
        currentPatientData.idValue = document.getElementById('inputAadhaar').value || "6829 4410 9021";
      } else if (type === 'Passport') {
        currentPatientData.name = document.getElementById('passportName').value || "Rahul Sharma";
        currentPatientData.idValue = document.getElementById('inputPassport').value || "Z9401823A";
      }
    };

    // ==========================================================================
    // 9. FULL BILINGUAL COVERAGE ENGINE (v2)
    // Translates EVERY visible string, including modals, dropdown options,
    // placeholders and text created at runtime (toasts, scanner status, etc.)
    // ==========================================================================
    (function () {
      const HI = {
        // --- Top bar / shell ---
        "MedBuddy - Smart Triage & Healthcare Kiosk": "मेडबडी - स्मार्ट ट्राइएज एवं हेल्थकेयर कियोस्क",
        "FHIR R4 • Live": "FHIR R4 • लाइव",
        "MedBuddy": "मेडबडी",

        // --- Sidebar ---
        "Home": "मुख्य पृष्ठ",
        "Symptom Check": "लक्षण जांच",
        "Prescriptions": "दवा पर्चा",
        "New": "नया",
        "Reports": "मेडिकल रिपोर्ट्स",
        "Identity Sync": "पहचान सिंक",
        "FHIR Records": "FHIR रिकॉर्ड्स",
        "Help": "सहायता",
        "Logout": "लॉग आउट",

        // --- Alert + hero ---
        "Severe symptom detected": "गंभीर लक्षण पाए गए",
        "Chest pain, heavy bleeding or breathing trouble — tell a nurse now, don't wait for your turn.": "सीने में दर्द, अत्यधिक रक्तस्राव या सांस लेने में परेशानी — तुरंत नर्स को बताएं, अपनी बारी का इंतज़ार न करें।",
        "Call staff": "स्टाफ को बुलाएं",
        "Speak or tap to begin": "बोलें या शुरू करने के लिए टैप करें",
        "Tell us what's bothering you today": "बताएं आज आपको क्या परेशानी है",
        "Head": "सिर (Head)",
        "Chest": "सीना (Chest)",
        "Stomach": "पेट (Stomach)",
        "Body pain": "बदन दर्द (Body Pain)",

        // --- Utility cards ---
        "Scan report": "रिपोर्ट स्कैन करें",
        "Upload or scan medical documents": "मेडिकल दस्तावेज अपलोड या स्कैन करें",
        "ID Sync": "पहचान सिंक",
        "ABHA • Aadhaar • Passport": "आभा • आधार • पासपोर्ट",
        "Securely link verified health records": "सत्यापित स्वास्थ्य रिकॉर्ड सुरक्षित लिंक करें",
        "Help from staff": "स्टाफ से सहायता लें",
        "Request assistance from our team": "हमारी स्वास्थ्य टीम से सहायता का अनुरोध करें",

        // --- Flow / disclaimer ---
        "How to get your prescription": "अपना दवा पर्चा कैसे प्राप्त करें",
        "Scan the QR code at the pharmacy or clinic": "फार्मेसी या क्लिनिक में क्यूआर कोड स्कैन करें",
        "Your prescription will appear instantly": "आपका दवा पर्चा तुरंत स्क्रीन पर दिखाई देगा",
        "Follow the schedule and set reminders if needed": "समय-सारणी का पालन करें और आवश्यकता पड़ने पर रिमाइंडर लगाएं",
        "This kiosk is for guidance only and not a substitute for professional medical advice.": "यह कियोस्क केवल मार्गदर्शन के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
        "In emergencies, contact staff immediately.": "आपात स्थिति में तुरंत अस्पताल स्टाफ से संपर्क करें।",

        // --- Prescription card ---
        "Prescription Details": "दवा पर्चे का विवरण",
        "Verified": "सत्यापित",
        "Patient": "मरीज का नाम",
        "Patient:": "मरीज का नाम:",
        "Prescription ID": "पर्चा संख्या (RX ID)",
        "Prescribed on": "परामर्श तिथि",
        "Prescribed by": "परामर्शदाता डॉक्टर",
        "View full prescription": "पूरा पर्चा देखें",
        "Medicines & Schedule": "दवाइयां और समय-सारणी",
        "Set reminder": "रिमाइंडर लगाएं",
        "Reminders ON": "रिमाइंडर चालू",
        "1 tablet": "1 गोली",
        "1 capsule": "1 कैप्सूल",
        "1 tab": "1 गोली",
        "1 cap": "1 कैप्सूल",
        "After Food": "भोजन के बाद",
        "Before Food": "भोजन से पहले",
        "☀️ Daily": "☀️ प्रतिदिन",
        "Duration": "अवधि",
        "5 Days": "5 दिन",
        "Notes": "निर्देश",
        "Complete the full course of medicine. Drink plenty of warm water and avoid heavy greasy meals.": "दवाइयों का पूरा कोर्स अवश्य समाप्त करें। गुनगुना पानी पिएं और गरिष्ठ व तैलीय भोजन से परहेज करें।",

        // --- Voice triage modal ---
        "MedBuddy AI Voice Triage": "मेडबडी एआई वॉइस ट्राइएज",
        "Listening to your voice... Speak clearly into the kiosk microphone.": "आपकी आवाज़ सुनी जा रही है... कृपया कियोस्क माइक्रोफोन में स्पष्ट बोलें।",
        "Live Speech Transcription:": "लाइव वाणी प्रतिलेखन:",
        "\"I've been feeling a dull ache in the lower abdomen and slight fever since last night...\"": "\"कल रात से पेट के निचले हिस्से में हल्का दर्द और हल्का बुखार महसूस हो रहा है...\"",
        "\"Chest congestion\"": "\"छाती में जकड़न\"",
        "\"Throbbing headache\"": "\"तेज़ सिरदर्द\"",
        "\"Knee & joint pain\"": "\"घुटने और जोड़ों का दर्द\"",
        "Analyze Symptoms with MedBuddy AI": "मेडबडी एआई से लक्षणों का विश्लेषण करें",
        "\"Chest congestion and wheezing\"": "\"छाती में जकड़न और सांस में सीटी जैसी आवाज़\"",
        "\"Severe headache and sensitivity to bright light\"": "\"तेज़ सिरदर्द और तेज़ रोशनी से परेशानी\"",
        "\"Sharp knee joint pain after morning jog\"": "\"सुबह दौड़ने के बाद घुटने के जोड़ में तेज़ दर्द\"",

        // --- Identity sync modal ---
        "Sync Patient Identity": "मरीज की पहचान सिंक करें",
        "Connect health accounts and prescriptions securely using your preferred national or international ID.": "अपनी पसंदीदा राष्ट्रीय या अंतरराष्ट्रीय पहचान का उपयोग कर स्वास्थ्य खाते और पर्चे सुरक्षित रूप से जोड़ें।",
        "🩺 ABHA ID": "🩺 आभा आईडी",
        "🇮🇳 Aadhaar Card": "🇮🇳 आधार कार्ड",
        "🛂 Passport (NRI)": "🛂 पासपोर्ट (एनआरआई)",
        "14-Digit ABHA Number or ABHA Address": "14 अंकों का आभा नंबर या आभा पता",
        "Authentication Method": "प्रमाणीकरण विधि",
        "Mobile OTP Verification": "मोबाइल ओटीपी सत्यापन",
        "Aadhaar OTP via ABDM": "एबीडीएम के माध्यम से आधार ओटीपी",
        "Biometric Match": "बायोमेट्रिक मिलान",
        "OTP (6 Digits)": "ओटीपी (6 अंक)",
        "Verify & Link ABHA Records": "आभा रिकॉर्ड सत्यापित कर जोड़ें",
        "12-Digit Aadhaar UID Number": "12 अंकों का आधार यूआईडी नंबर",
        "Place finger on kiosk glass scanner": "कियोस्क के ग्लास स्कैनर पर उंगली रखें",
        "UIDAI RD Service 2.0 Ready": "यूआईडीएआई आरडी सेवा 2.0 तैयार",
        "Authenticate via Aadhaar Biometrics": "आधार बायोमेट्रिक से प्रमाणित करें",
        "Passport Number": "पासपोर्ट नंबर",
        "Issuing Country": "जारीकर्ता देश",
        "India (NRI)": "भारत (एनआरआई)",
        "United Kingdom": "यूनाइटेड किंगडम",
        "United States": "संयुक्त राज्य अमेरिका",
        "Singapore": "सिंगापुर",
        "Australia": "ऑस्ट्रेलिया",
        "Patient Full Name": "मरीज का पूरा नाम",
        "✓ MRZ Optical Code Verified": "✓ एमआरजेड ऑप्टिकल कोड सत्यापित",
        "Link International Health Passport": "अंतरराष्ट्रीय हेल्थ पासपोर्ट जोड़ें",
        "Scanning biometric fingerprint...": "बायोमेट्रिक फिंगरप्रिंट स्कैन हो रहा है...",
        "✓ Biometric Match 99.4% Verified": "✓ बायोमेट्रिक मिलान 99.4% सत्यापित",

        // --- Emergency modal ---
        "Emergency Assistance Dispatched": "आपातकालीन सहायता भेजी गई",
        "A Nurse is on the way to Kiosk #03": "एक नर्स कियोस्क #03 की ओर आ रही हैं",
        "Emergency triage alerted:": "आपातकालीन ट्राइएज को सूचित किया गया:",
        "Nurse Preeti S. (Triage Station 4)": "नर्स प्रीति एस. (ट्राइएज स्टेशन 4)",
        "has received your alert. Estimated arrival in": "ने आपकी सूचना प्राप्त कर ली है। अनुमानित पहुंच समय",
        "• Please remain seated at this kiosk.": "• कृपया इसी कियोस्क पर बैठे रहें।",
        "• If you have severe chest pressure or shortness of breath, let bystanders know immediately.": "• यदि सीने में तेज़ दबाव या सांस लेने में कठिनाई हो तो आसपास मौजूद लोगों को तुरंत बताएं।",
        "Dismiss Alert": "सूचना बंद करें",
        "Staff has arrived at kiosk.": "स्टाफ कियोस्क पर पहुंच गया है।",

        // --- Reports modal ---
        "Medical Reports & Diagnostics Center": "मेडिकल रिपोर्ट्स एवं जांच केंद्र",
        "Current Reports (सक्रिय रिपोर्ट्स)": "मरीज की वर्तमान जांच रिपोर्ट्स",
        "✓ ABDM Synced • 3 Records Active": "✓ एबीडीएम सिंक • 3 रिकॉर्ड सक्रिय",
        "Complete Blood Count (CBC) & Lipid Profile": "कम्पलीट ब्लड काउंट (सीबीसी) एवं लिपिड प्रोफाइल",
        "✓ Normal": "✓ सामान्य",
        "✓ Controlled": "✓ नियंत्रित",
        "✓ Cleared": "✓ सामान्य पाया गया",
        "Fasting Blood Glucose & HbA1c Glycated": "फास्टिंग ब्लड ग्लूकोज एवं एचबीए1सी",
        "Digital Chest X-Ray (PA View - Bilateral)": "डिजिटल चेस्ट एक्स-रे (पीए व्यू - द्विपक्षीय)",
        "Clear Bilateral Lung Fields": "दोनों फेफड़े स्पष्ट",
        "Cardiothoracic Ratio: Normal": "कार्डियोथोरेसिक अनुपात: सामान्य",
        "View": "देखें",
        "Scan or Upload New Medical Document": "नया मेडिकल दस्तावेज स्कैन या अपलोड करें",
        "Place paper report face down on glass scanner or tap to upload": "कागज़ी रिपोर्ट को स्कैनर के कांच पर उल्टा रखें या अपलोड करने के लिए टैप करें",
        "Supports Prescriptions, Blood Tests, X-Rays, Discharge Summaries": "पर्चे, ब्लड टेस्ट, एक्स-रे और डिस्चार्ज सारांश समर्थित हैं",
        "Start Instant Kiosk Scanner": "कियोस्क स्कैनर शुरू करें",
        "Laser scanning paper document...": "दस्तावेज़ लेजर से स्कैन हो रहा है...",
        "Document Successfully Digitized": "दस्तावेज़ सफलतापूर्वक डिजिटल किया गया",
        "✓ Document OCR Extraction Complete & Added to Current Reports:": "✓ दस्तावेज़ से जानकारी निकाली गई और वर्तमान रिपोर्ट्स में जोड़ी गई:",
        "• Diagnostic: Complete Blood Count (CBC) & Lipid Profile": "• जांच: कम्पलीट ब्लड काउंट (सीबीसी) एवं लिपिड प्रोफाइल",
        "• Hemoglobin: 14.2 g/dL (Normal)": "• हीमोग्लोबिन: 14.2 g/dL (सामान्य)",
        "• Fasting Blood Glucose: 98 mg/dL (Normal)": "• फास्टिंग ब्लड ग्लूकोज: 98 mg/dL (सामान्य)",
        "• Uploaded directly to ABDM Health Locker.": "• सीधे एबीडीएम हेल्थ लॉकर में अपलोड किया गया।",
        "FBS: 98 mg/dL (Normal)": "एफबीएस: 98 mg/dL (सामान्य)",

        // --- Full prescription modal ---
        "Digital Outpatient Prescription (e-Rx)": "डिजिटल ओपीडी दवा पर्चा (ई-आरएक्स)",
        "CITY GENERAL HOSPITAL & CLINICS": "सिटी जनरल हॉस्पिटल एवं क्लिनिक्स",
        "Department of Internal Medicine • New Delhi": "आंतरिक चिकित्सा विभाग • नई दिल्ली",
        "Age/Sex:": "आयु/लिंग:",
        "32 / Male": "32 / पुरुष",
        "Synced ID:": "जुड़ी हुई पहचान:",
        "ABHA / Aadhaar": "आभा / आधार",
        "Rx (Prescribed Medications):": "आरएक्स (निर्धारित दवाइयां):",
        "Medicine": "दवा",
        "Dosage": "मात्रा",
        "Frequency": "आवृत्ति",
        "Timing": "समय",
        "Digitally generated via MedBuddy Kiosk.": "मेडबडी कियोस्क द्वारा डिजिटल रूप से तैयार।",
        "Compliant with ABDM & NDHM Healthcare Standards.": "एबीडीएम एवं एनडीएचएम स्वास्थ्य मानकों के अनुरूप।",
        "[Digitally Signed by Doctor]": "[डॉक्टर द्वारा डिजिटल हस्ताक्षरित]",
        "Print Prescription": "पर्चा प्रिंट करें",
        "Export FHIR JSON": "FHIR JSON निर्यात करें",
        "Send to Mobile": "मोबाइल पर भेजें",

        // --- FHIR hub ---
        "HL7 FHIR Release 4 (R4) Interoperability Hub": "एचएल7 FHIR रिलीज़ 4 (R4) इंटरऑपरेबिलिटी हब",
        "ABDM & HL7 Compliant Kiosk Exchange Protocol": "एबीडीएम एवं एचएल7 अनुरूप कियोस्क विनिमय प्रोटोकॉल",
        "Test Ping": "कनेक्शन जांचें",
        "Bundle (All)": "बंडल (सभी)",
        "Condition (Triage)": "कंडीशन (ट्राइएज)",
        "Encounter": "एनकाउंटर",
        "● Ready to exchange HL7 FHIR R4 Bundle over HTTPS": "● एचटीटीपीएस के माध्यम से FHIR R4 बंडल भेजने के लिए तैयार",
        "REST API: JSON (application/fhir+json)": "REST एपीआई: JSON (application/fhir+json)",
        "Transmit POST to FHIR Server": "FHIR सर्वर पर भेजें",
        "Download .json": ".json डाउनलोड करें",
        "Copy JSON": "JSON कॉपी करें",

        // --- Toasts & runtime messages ---
        "AI Triage completed: Categorized under General Medicine OPD.": "एआई ट्राइएज पूर्ण: सामान्य चिकित्सा ओपीडी में वर्गीकृत।",
        "Opening freshly scanned lab report.": "नई स्कैन की गई लैब रिपोर्ट खोली जा रही है।",
        "Medical report linked and added to Current Reports!": "मेडिकल रिपोर्ट जोड़ दी गई और वर्तमान रिपोर्ट्स में शामिल कर दी गई!",
        "Medication alarms scheduled for 08:00 AM, 02:00 PM, 08:00 PM.": "दवा के रिमाइंडर सुबह 08:00, दोपहर 02:00 और रात 08:00 बजे के लिए सेट किए गए।",
        "Medication reminders muted.": "दवा रिमाइंडर बंद कर दिए गए।",
        "Downloaded standard HL7 FHIR R4 Bundle.": "मानक एचएल7 FHIR R4 बंडल डाउनलोड हो गया।",
        "FHIR JSON copied to clipboard.": "FHIR JSON क्लिपबोर्ड में कॉपी हो गया।",
        "FHIR JSON copied.": "FHIR JSON कॉपी हो गया।",
        "FHIR R4 Bundle successfully posted to server!": "FHIR R4 बंडल सर्वर पर सफलतापूर्वक भेज दिया गया!"
      };

      // Patterns for strings that contain numbers/names that change at runtime.
      const PATTERNS = [
        [/^(\d+) seconds$/, (m) => `${m[1]} सेकंड`],
        [/^Synced successfully via (.+) ID\.$/, (m) => `${m[1]} पहचान से सफलतापूर्वक सिंक हो गया।`],
        [/^FHIR Server responding in (\d+)ms\.$/, (m) => `FHIR सर्वर ${m[1]}ms में उत्तर दे रहा है।`],
        [/^● Pinging (.+) \(CapabilityStatement\)\.\.\.$/, (m) => `● ${m[1]} से संपर्क किया जा रहा है (CapabilityStatement)...`],
        [/^● Transmitting FHIR Transaction Bundle \[POST (.+)\]\.\.\.$/, (m) => `● FHIR ट्रांजैक्शन बंडल भेजा जा रहा है [POST ${m[1]}]...`],
        [/^"Patient reports discomfort in the (.+) region\."$/, (m) => `"मरीज ने ${HI[m[1]] || m[1]} क्षेत्र में परेशानी बताई है।"`]
      ];

      // Placeholders (attributes cannot be reached by the text-node walker).
      const PLACEHOLDERS = {
        "e.g. rahul.sharma@abdm or 91-xxxx-xxxx-xxxx": "उदा. rahul.sharma@abdm या 91-xxxx-xxxx-xxxx",
        "XXXX XXXX XXXX": "XXXX XXXX XXXX",
        "e.g. Z9401823A": "उदा. Z9401823A"
      };

      function toHindi(text) {
        const key = text.trim();
        if (!key) return null;
        if (HI[key]) return text.replace(key, HI[key]);
        for (const [re, fn] of PATTERNS) {
          const m = key.match(re);
          if (m) return text.replace(key, fn(m));
        }
        return null;
      }

      // Public helper: translate any runtime string before showing it.
      window.tt = function (text) {
        if (currentLanguage !== 'hi' || typeof text !== 'string') return text;
        return toHindi(text) || text;
      };

      let busy = false;

      function translateNode(node, lang) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.__enText === undefined) node.__enText = node.nodeValue;
          if (lang === 'hi') {
            const hi = toHindi(node.__enText);
            if (hi !== null && node.nodeValue !== hi) node.nodeValue = hi;
          } else if (node.nodeValue !== node.__enText) {
            node.nodeValue = node.__enText;
          }
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || node.classList.contains('code-viewer')) return;
        if (node.placeholder && PLACEHOLDERS[node.__enPlaceholder || node.placeholder]) {
          if (node.__enPlaceholder === undefined) node.__enPlaceholder = node.placeholder;
          node.placeholder = lang === 'hi' ? PLACEHOLDERS[node.__enPlaceholder] : node.__enPlaceholder;
        }
        node.childNodes.forEach((child) => translateNode(child, lang));
      }

      function applyLanguage(lang) {
        busy = true;
        translateNode(document.body, lang);
        busy = false;
      }

      // Re-translate anything the app injects later (new report cards, toasts...).
      new MutationObserver((records) => {
        if (busy || currentLanguage !== 'hi') return;
        busy = true;
        records.forEach((r) => {
          r.addedNodes.forEach((n) => translateNode(n, 'hi'));
          if (r.type === 'characterData') translateNode(r.target, 'hi');
        });
        busy = false;
      }).observe(document.body, { childList: true, subtree: true, characterData: true });

      // Wrap the original language switcher so both engines run together.
      const originalSwitch = switchLanguage;
      switchLanguage = function (lang) {
        if (!translations[lang]) return;
        originalSwitch(lang);
        applyLanguage(lang);
      };
    })();
