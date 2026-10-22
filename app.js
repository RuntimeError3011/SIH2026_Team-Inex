// ==========================================================================
// MedBuddy Interactive Engine: Theme, Audio, Bilingual Translation,
// Conversational LLM Triage, Patient Records & Backend FHIR
// ==========================================================================

// 1. Audio Synthesizer (Web Audio API)
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
  } catch (e) {}
}

function playEmergencyChime() {
  try {
    playBeep(880, 0.15, 'triangle');
    setTimeout(() => playBeep(1174.66, 0.25, 'triangle'), 120);
  } catch (e) {}
}

// 2. Light / Dark Theme Controller (Default: White / Light)
let currentTheme = 'light';

function toggleTheme() {
  playBeep(620, 0.06);
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  const icon = document.getElementById('themeToggleIcon');
  const text = document.getElementById('themeToggleText');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.innerText = '🌙';
    if (text) text.innerText = 'Dark';
    triggerToast(currentLang === 'hi' ? 'डार्क थीम सक्रिय' : 'Dark theme activated');
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (icon) icon.innerText = '☀️';
    if (text) text.innerText = 'Light';
    triggerToast(currentLang === 'hi' ? 'क्लीन वाइट थीम सक्रिय' : 'Clean white theme activated');
  }
}

// 3. Modal Handlers
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

function openVoiceModal() { openModal('voiceModal'); }
function openIdSyncModal() { openModal('idSyncModal'); }
function openStaffModal() { openModal('staffModal'); }
function openScanReportModal() { openModal('scanReportModal'); }
function openFullRxModal() { openModal('fullRxModal'); }
function openPatientRecordsModal() { openModal('patientRecordsModal'); }

// 4. Toast Notifications
function triggerToast(message) {
  playBeep(720, 0.05);
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'kiosk-toast';
  toast.innerHTML = `<span>✓</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// 5. Complete Bilingual Localization Dictionary (English & Hindi)
let currentLang = 'en';

const translations = {
  en: {
    // Header
    txtKioskLocation: "City General Hospital • Smart Triage Kiosk #03",

    // Nav
    txtNavHome: "Home",
    txtNavSymptom: "Symptom Check (AI)",
    txtNavRx: "Prescriptions",
    txtNavReports: "Reports",
    txtNavRecords: "Patient Records",
    txtNavSync: "Identity Sync",
    txtNavHelp: "Help & Support",
    txtNavLogout: "Logout / Exit",
    txtBadgeNew: "New",
    txtBadgeAbdm: "ABDM",

    // Banner
    txtEmergencyTitle: "Severe Symptoms Detected",
    txtEmergencyDesc: "Chest pain, heavy bleeding, or breathing difficulty — inform nurse immediately, do not wait.",
    txtBtnCallStaff: "Call Staff",

    // Hero
    txtHeroTitle: "Speak or Tap to begin",
    txtHeroSubtitle: "Tell us what hurts today • AI Conversational Triage Active",

    // Symptoms
    txtSymptomSectionTitle: "Quick Symptom Selection",
    txtSymHead: "Head",
    txtSymHeadDesc: "Throbbing, migraine, dizziness, or sinus pressure.",
    txtSymChest: "Chest",
    txtSymChestDesc: "Sharp pain, tightness, palpitations, or breathing issues.",
    txtSymStomach: "Stomach",
    txtSymStomachDesc: "Cramps, nausea, acid reflux, or acute abdominal ache.",
    txtSymBody: "Body Pain",
    txtSymBodyDesc: "High fever, chills, joint soreness, or generalized fatigue.",
    badgeMild1: "Mild to Severe",
    badgeUrgent: "Urgent Priority",
    badgeGastro: "Gastro",
    badgeFever: "Fever / Aches",

    // Utilities
    txtUtilScan: "Scan report",
    txtUtilScanDesc: "Upload lab or paper prescriptions",
    txtUtilSync: "Identity Sync",
    txtUtilSyncDesc: "ABHA, Aadhaar & Passport biometric sync",
    txtUtilHelp: "Help from staff",
    txtUtilHelpDesc: "Assistance for senior citizens & vitals",

    // Prescription Drawer
    txtDrawerTitle: "Prescription Drawer",
    txtRxGuideTitle: "How to get your prescription",
    txtRxStep1: "Describe your symptoms",
    txtRxStep1Desc: "Tap above or speak into the microphone.",
    txtRxStep2: "Complete automated triage",
    txtRxStep2Desc: "AI triages and forwards vitals to the doctor.",
    txtRxStep3: "Collect digital prescription",
    txtRxStep3Desc: "Print here or receive it directly via WhatsApp/ABDM.",
    txtLatestRx: "Latest Consultation",
    txtBtnViewFullRx: "View Full Prescription",

    // LLM Chat Assistant
    i18nLlmTitle: "MedBuddy AI Clinical Triage Assistant",
    ttsToggleText: "Read Aloud (बोलकर सुनाएं): ON",
    i18nSuggestionsLabel: "Quick Symptom Prompts:",
    inputChatPlaceholder: "Describe your symptoms (e.g. 'I am suffering from fever')...",
    txtBtnSend: "Send",
    botGreeting: "Hello Rahul! I am your MedBuddy AI Clinical Assistant.\nPlease tell me what symptoms or concerns you are experiencing today. You can speak into the microphone or type below.",

    // Patient Records
    i18nRecordsModalTitle: "Comprehensive Patient Records & Medical History",
    hdrChronicConditions: "Chronic Medical Conditions",
    hdrPastSurgeries: "Past Surgeries & Procedures",
    hdrAllergies: "Known Allergies & Drug Reactions",
    hdrImmunizations: "Immunization & Family History",

    // Reports Modal
    i18nReportsModalTitle: "Medical Reports & Diagnostic Center",
    i18nCurrentReportsTitle: "Current Reports (सक्रिय रिपोर्ट्स)",
    i18nReportsSyncedBadge: "✓ ABDM Synced • 3 Records Active",
    i18nScanNewTitle: "Scan or Upload New Medical Document",
    docScanStatus: "Place paper report on scanner or tap to upload",
    i18nBtnStartScanner: "Start Instant Kiosk Scanner"
  },

  hi: {
    // Header
    txtKioskLocation: "सिटी जनरल अस्पताल • स्मार्ट ट्राइएज कियोस्क #03",

    // Nav
    txtNavHome: "मुख्य पृष्ठ",
    txtNavSymptom: "लक्षण जांच (एआई)",
    txtNavRx: "दवा पर्चा (Rx)",
    txtNavReports: "मेडिकल रिपोर्ट्स",
    txtNavRecords: "मरीज का इतिहास",
    txtNavSync: "पहचान सिंक",
    txtNavHelp: "सहायता और सपोर्ट",
    txtNavLogout: "लॉग आउट / बाहर आएं",
    txtBadgeNew: "नया",
    txtBadgeAbdm: "एबीडीएम",

    // Banner
    txtEmergencyTitle: "गंभीर लक्षण पाए गए",
    txtEmergencyDesc: "सीने में दर्द, अत्यधिक रक्तस्राव या सांस लेने में परेशानी — तुरंत नर्स को बताएं, अपनी बारी का इंतज़ार न करें।",
    txtBtnCallStaff: "स्टाफ को बुलाएं",

    // Hero
    txtHeroTitle: "बोलें या शुरू करने के लिए टैप करें",
    txtHeroSubtitle: "बताएं आज आपको क्या परेशानी है • एआई क्लिनिकल ट्राइएज सक्रिय",

    // Symptoms
    txtSymptomSectionTitle: "त्वरित लक्षण चयन",
    txtSymHead: "सिर",
    txtSymHeadDesc: "माइग्रेन, भारीपन, चक्कर आना या साइनस का दबाव।",
    txtSymChest: "सीना",
    txtSymChestDesc: "तेज दर्द, जकड़न, घबराहट या सांस लेने में तकलीफ।",
    txtSymStomach: "पेट",
    txtSymStomachDesc: "मरोड़, उल्टी, एसिडिटी या पेट का तेज दर्द।",
    txtSymBody: "बदन दर्द",
    txtSymBodyDesc: "तेज बुखार, ठंड लगना, जोड़ों में दर्द या थकान।",
    badgeMild1: "हल्का से गंभीर",
    badgeUrgent: "अति आवश्यक",
    badgeGastro: "पेट संबंधी",
    badgeFever: "बुखार / दर्द",

    // Utilities
    txtUtilScan: "रिपोर्ट स्कैन करें",
    txtUtilScanDesc: "लैब रिपोर्ट या पुराना पर्चा अपलोड करें",
    txtUtilSync: "पहचान सिंक",
    txtUtilSyncDesc: "आभा, आधार और पासपोर्ट बायोमेट्रिक सिंक",
    txtUtilHelp: "स्टाफ से सहायता",
    txtUtilHelpDesc: "बुजुर्गों और बीपी/शुगर जांच के लिए मदद",

    // Prescription Drawer
    txtDrawerTitle: "दवा पर्चा ड्रॉवर",
    txtRxGuideTitle: "अपना दवा पर्चा कैसे प्राप्त करें",
    txtRxStep1: "अपने लक्षण बताएं",
    txtRxStep1Desc: "ऊपर टैप करें या माइक्रोफोन में बोलें।",
    txtRxStep2: "स्वचालित ट्राइएज पूर्ण करें",
    txtRxStep2Desc: "एआई आपके लक्षणों का विश्लेषण कर डॉक्टर को भेजेगा।",
    txtRxStep3: "डिजिटल पर्चा प्राप्त करें",
    txtRxStep3Desc: "यहाँ प्रिंट करें या व्हाट्सएप/आभा पर सीधे पाएं।",
    txtLatestRx: "हालिया परामर्श",
    txtBtnViewFullRx: "पूरा दवा पर्चा देखें",

    // LLM Chat Assistant
    i18nLlmTitle: "मेडबडी एआई क्लिनिकल ट्राइएज सहायक",
    ttsToggleText: "बोलकर सुनाएं (Read Aloud): चालू",
    i18nSuggestionsLabel: "त्वरित लक्षण सुझाव:",
    inputChatPlaceholder: "अपने लक्षण बताएं (जैसे 'मुझे 3 दिन से बुखार है')...",
    txtBtnSend: "भेजें",
    botGreeting: "नमस्ते राहुल! मैं आपका मेडबडी एआई क्लिनिकल सहायक हूँ।\nकृपया मुझे बताएं कि आज आपको क्या परेशानी या लक्षण महसूस हो रहे हैं। आप माइक में बोल सकते हैं या नीचे लिख सकते हैं।",

    // Patient Records
    i18nRecordsModalTitle: "मरीज का संपूर्ण चिकित्सा रिकॉर्ड और इतिहास",
    hdrChronicConditions: "दीर्घकालिक बीमारियां (Chronic Conditions)",
    hdrPastSurgeries: "पिछली सर्जरी और प्रक्रियाएं",
    hdrAllergies: "दवा और अन्य एलर्जी (Allergies)",
    hdrImmunizations: "टीकाकरण और पारिवारिक इतिहास",

    // Reports Modal
    i18nReportsModalTitle: "मेडिकल रिपोर्ट्स एवं डायग्नोस्टिक सेंटर",
    i18nCurrentReportsTitle: "सक्रिय रिपोर्ट्स (Current Diagnostic Reports)",
    i18nReportsSyncedBadge: "✓ एबीडीएम सत्यापित • 3 रिकॉर्ड सक्रिय",
    i18nScanNewTitle: "नया मेडिकल दस्तावेज़ स्कैन या अपलोड करें",
    docScanStatus: "कागजी रिपोर्ट को स्कैनर ग्लास पर रखें या टैप करें",
    i18nBtnStartScanner: "कियोस्क स्कैनर शुरू करें"
  }
};

function switchLanguage(lang) {
  playBeep(640, 0.06);
  currentLang = lang;

  document.getElementById('btnLangEn').classList.toggle('active', lang === 'en');
  document.getElementById('btnLangHi').classList.toggle('active', lang === 'hi');
  const langText = document.getElementById('currentLangText');
  if (langText) langText.innerText = lang === 'hi' ? 'हिंदी' : 'English';

  const dict = translations[lang];
  for (const [id, val] of Object.entries(dict)) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = val;
      } else {
        el.innerText = val;
      }
    }
  }

  // Update initial greeting in chat if only 1 message exists
  const chatFeed = document.getElementById('llmChatFeed');
  if (chatFeed && chatFeed.querySelectorAll('.chat-message-row').length <= 1) {
    const greetingMsg = document.getElementById('botGreetingMsg');
    if (greetingMsg) {
      greetingMsg.innerHTML = `${dict.botGreeting.replace(/\n/g, '<br>')}<span class="chat-timestamp">${lang === 'hi' ? 'अभी' : 'Just now'}</span>`;
    }
  }

  triggerToast(lang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है' : 'Language set to English');
}

// 6. Conversational LLM Symptom Triage Engine
let isTtsActive = true;
let isRecognizing = false;
let speechRecognizer = null;

function toggleTts() {
  playBeep(520, 0.05);
  isTtsActive = !isTtsActive;
  const toggle = document.getElementById('btnTtsToggle');
  const label = document.getElementById('ttsToggleText');
  if (toggle) toggle.classList.toggle('active', isTtsActive);
  if (label) {
    label.innerText = isTtsActive 
      ? (currentLang === 'hi' ? 'बोलकर सुनाएं (Read Aloud): चालू' : 'Read Aloud (बोलकर सुनाएं): ON')
      : (currentLang === 'hi' ? 'बोलकर सुनाएं (Read Aloud): बंद' : 'Read Aloud (बोलकर सुनाएं): OFF');
  }
}

function speakText(text) {
  if (!isTtsActive || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

// Interactive Patient-AI Dialogue Logic
function generateClinicalAiResponse(patientInput) {
  const text = patientInput.toLowerCase().trim();
  const isHi = currentLang === 'hi';

  // 1. Red-Flag Emergency Symptoms Check
  const emergencyKeywords = ['chest pain', 'heart attack', "can't breathe", 'shortness of breath', 'severe bleeding', 'unconscious', 'सीने में दर्द', 'सांस नहीं आ रही', 'सांस फूलना', 'बेहोश', 'खून बहना'];
  const hasEmergency = emergencyKeywords.some(k => text.includes(k));

  if (hasEmergency) {
    playEmergencyChime();
    const banner = document.getElementById('emergencyBanner');
    if (banner) {
      banner.style.display = 'flex';
      banner.scrollIntoView({ behavior: 'smooth' });
    }

    if (isHi) {
      return "🚨 **तत्काल आपातकालीन चेतावनी**: आपके लक्षण अत्यंत गंभीर स्थिति (जैसे हृदय या श्वसन आपातकाल) का संकेत दे रहे हैं।\n\n• **ट्राइएज प्राथमिकता: P1 (अति आवश्यक - Critical)**\n• कृपया कतार में इंतज़ार न करें!\n• आपातकालीन नर्सिंग स्टाफ को आपके पास तुरंत आने के लिए सतर्क कर दिया गया है।";
    } else {
      return "🚨 **CRITICAL EMERGENCY ALERT**: Your described symptoms indicate a potentially life-threatening condition (cardiac or respiratory emergency).\n\n• **Triage Priority: P1 (Immediate Critical Care)**\n• Please do NOT wait in line!\n• Emergency nursing staff have been alerted to attend to you at this kiosk immediately.";
    }
  }

  // 2. Fever Dialogue (As requested: "i am suffering from fever" -> "From how many days?")
  const feverKeywords = ['fever', 'bukhaar', 'temperature', 'tapmaan', 'बुखार', 'तापमान', 'फीवर'];
  const mentionsFever = feverKeywords.some(k => text.includes(k));

  const durationKeywords = ['day', 'days', 'din', 'दिन', 'week', 'hafta', 'हफ्ते', 'yesterday', 'kal', 'कल', 'hour', 'ghante', 'घंटे'];
  const mentionsDuration = durationKeywords.some(k => text.includes(k));

  if (mentionsFever) {
    if (!mentionsDuration) {
      if (isHi) {
        return "मुझे समझ आया कि आपको बुखार है। सही डॉक्टरी जांच और ट्राइएज के लिए कृपया बताएं:\n\n1. आपको **कितने दिनों से** बुखार है?\n2. क्या आपने थर्मामीटर से तापमान नापा है (जैसे 100°F या 102°F)?\n3. क्या बुखार के साथ ठंड, सिरदर्द, गले में खराश या खांसी भी है?";
      } else {
        return "I understand you are experiencing a fever. To help our medical team triage you accurately, please tell me:\n\n1. **From how many days** have you had the fever?\n2. Have you measured your body temperature (e.g. 100°F or 102°F)?\n3. Do you have accompanying symptoms like chills, severe body ache, sore throat, or cough?";
      }
    } else {
      if (isHi) {
        return `धन्यवाद। इतने समय से बुखार सक्रिय संक्रमण की ओर संकेत करता है।\n\n• **ट्राइएज सिफारिश: P2 (प्राथमिकता ओपीडी परामर्श)**\n• पर्याप्त मात्रा में पानी और ओआरएस/तरल पदार्थ पिएं।\n• बिना डॉक्टर की सलाह के एंटीबायोटिक न लें। डॉ. अंजलि वर्मा जल्द ही आपकी जांच करेंगी।\n• क्या आपने पैरासिटामोल लिया है, और क्या सांस लेने में कोई परेशानी है?`;
      } else {
        return `Thank you for the details. Having a fever for this duration indicates an active acute infection.\n\n• **Triage Recommendation: P2 (Priority Outpatient Consultation)**\n• Stay well hydrated with oral electrolytes and rest.\n• Do not take antibiotics without a physician's prescription. Dr. Anjali Verma will examine you shortly.\n• Have you taken paracetamol, and are you noticing any rash or breathing difficulty?`;
      }
    }
  }

  // 3. Stomach Ache Dialogue
  const stomachKeywords = ['stomach', 'pet dard', 'vomit', 'nausea', 'acid', 'उल्टी', 'दस्त', 'मरोड़', 'पेट'];
  if (stomachKeywords.some(k => text.includes(k))) {
    if (isHi) {
      return "पेट दर्द के सटीक मूल्यांकन के लिए कृपया बताएं:\n\n1. दर्द पेट के किस हिस्से में है (ऊपरी, नाभि के पास, या दाईं तरफ नीचे)?\n2. क्या इसके साथ उल्टी, दस्त या जलन भी है?\n3. यह दर्द कितने समय से हो रहा है?";
    } else {
      return "To help evaluate your abdominal pain:\n\n1. Exactly where is the pain located (upper abdomen, around navel, or lower right side)?\n2. Are you experiencing vomiting, nausea, or diarrhea?\n3. For how many hours or days has this pain persisted?";
    }
  }

  // 4. Headache / Migraine Dialogue
  const headKeywords = ['headache', 'sir dard', 'migraine', 'dizzy', 'सिरदर्द', 'सिर दर्द', 'चक्कर'];
  if (headKeywords.some(k => text.includes(k))) {
    if (isHi) {
      return "सिरदर्द के लिए कृपया बताएं:\n\n1. क्या दर्द सिर के एक तरफ है या पूरे सिर में?\n2. क्या इसके साथ चक्कर, आंखों के आगे धुंधलापन या गर्दन में अकड़न है?\n3. यह कितने दिनों से हो रहा है?";
    } else {
      return "Regarding your headache:\n\n1. Is the pain on one side of your head or all over?\n2. Do you experience dizziness, light sensitivity, visual blurring, or neck stiffness?\n3. For how many days have you had this headache?";
    }
  }

  // 5. Default Empathetic Triage Follow-up
  if (isHi) {
    return `आपके द्वारा बताए गए लक्षण दर्ज कर लिए गए हैं: "${patientInput}"।\n\nसटीक ट्राइएज के लिए कृपया स्पष्ट करें:\n1. यह लक्षण आपको **कितने समय/दिनों से** है?\n2. दर्द या परेशानी की तीव्रता 1 से 10 के पैमाने पर कितनी है?`;
  } else {
    return `I have noted your symptoms: "${patientInput}".\n\nTo help our clinical team triage you accurately:\n1. **For how many days or hours** have you had this issue?\n2. On a scale of 1 to 10, how severe is your discomfort?`;
  }
}

function handleChipClick(text) {
  playBeep(580, 0.05);
  const input = document.getElementById('inputChatMessage');
  if (input) input.value = text;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('inputChatMessage');
  if (!input) return;
  const userText = input.value.trim();
  if (!userText) return;

  playBeep(680, 0.06);
  input.value = '';

  const feed = document.getElementById('llmChatFeed');
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Append User Bubble
  const userRow = document.createElement('div');
  userRow.className = 'chat-message-row user';
  userRow.innerHTML = `
    <div class="chat-avatar user">You</div>
    <div class="chat-bubble user">
      ${escapeHtml(userText)}
      <span class="chat-timestamp" style="color: rgba(255,255,255,0.7);">${now}</span>
    </div>
  `;
  feed.appendChild(userRow);
  feed.scrollTop = feed.scrollHeight;

  // Typing Indicator
  const typingRow = document.createElement('div');
  typingRow.className = 'chat-message-row';
  typingRow.id = 'botTypingIndicator';
  typingRow.innerHTML = `
    <div class="chat-avatar bot">AI</div>
    <div class="chat-bubble bot">
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  feed.appendChild(typingRow);
  feed.scrollTop = feed.scrollHeight;

  // Simulate AI Thinking Delay
  setTimeout(() => {
    typingRow.remove();
    playBeep(840, 0.08);

    const botResponse = generateClinicalAiResponse(userText);
    const botRow = document.createElement('div');
    botRow.className = 'chat-message-row';
    botRow.innerHTML = `
      <div class="chat-avatar bot">AI</div>
      <div class="chat-bubble bot">
        ${botResponse.replace(/\n/g, '<br>')}
        <span class="chat-timestamp">${now}</span>
      </div>
    `;
    feed.appendChild(botRow);
    feed.scrollTop = feed.scrollHeight;

    // Speak aloud if TTS is on
    speakText(botResponse.replace(/[*_#🚨]/g, ''));
  }, 650);
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// 7. Web Speech API (Speech Recognition for Hands-Free Kiosk)
function toggleSpeechRecognition() {
  const micBtn = document.getElementById('btnChatMic');

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    triggerToast(currentLang === 'hi' ? 'माइक्रोफोन केवल क्रोम/एज में समर्थित है' : 'Speech recognition not supported in this browser.');
    return;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (isRecognizing && speechRecognizer) {
    speechRecognizer.stop();
    isRecognizing = false;
    if (micBtn) micBtn.classList.remove('listening');
    return;
  }

  speechRecognizer = new SpeechRec();
  speechRecognizer.continuous = false;
  speechRecognizer.interimResults = false;
  speechRecognizer.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';

  speechRecognizer.onstart = () => {
    isRecognizing = true;
    playBeep(700, 0.1);
    if (micBtn) micBtn.classList.add('listening');
    triggerToast(currentLang === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... Speak now');
  };

  speechRecognizer.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('inputChatMessage');
    if (input) input.value = transcript;
    sendChatMessage();
  };

  speechRecognizer.onerror = () => {
    isRecognizing = false;
    if (micBtn) micBtn.classList.remove('listening');
  };

  speechRecognizer.onend = () => {
    isRecognizing = false;
    if (micBtn) micBtn.classList.remove('listening');
  };

  speechRecognizer.start();
}

// 8. Symptom Cards & Kiosk Actions
function selectQuickSymptom(name) {
  playBeep(640, 0.08);
  openVoiceModal();
  const input = document.getElementById('inputChatMessage');
  if (input) {
    if (currentLang === 'hi') {
      input.value = `मुझे ${name === 'Head' ? 'सिरदर्द' : name === 'Chest' ? 'सीने में दर्द' : name === 'Stomach' ? 'पेट दर्द' : 'बदन दर्द और बुखार'} महसूस हो रहा है`;
    } else {
      input.value = `I am experiencing ${name.toLowerCase()} pain`;
    }
    sendChatMessage();
  }
}

function callHospitalStaff() {
  playEmergencyChime();
  openStaffModal();
}

function dismissBanner() {
  playBeep(400, 0.05);
  const banner = document.getElementById('emergencyBanner');
  if (banner) banner.style.display = 'none';
  triggerToast('Emergency alert banner hidden.');
}

function switchNav(el, name) {
  playBeep(520, 0.04);
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

// 9. Document Scanner Simulator
function simulateDocumentScan() {
  playBeep(650, 0.1);
  const laser = document.getElementById('docLaser');
  const status = document.getElementById('docScanStatus');

  if (laser) {
    laser.style.display = 'block';
    laser.style.animation = 'scan-line 1.5s infinite ease-in-out alternate';
  }
  if (status) status.innerText = currentLang === 'hi' ? 'दस्तावेज़ का लेजर स्कैन जारी है...' : 'Laser scanning paper document...';

  setTimeout(() => {
    if (laser) laser.style.display = 'none';
    if (status) status.innerText = currentLang === 'hi' ? '✓ दस्तावेज़ सफलतापूर्वक डिजिटाइज़ हुआ' : '✓ Document Digitized & Added to Reports';
    playBeep(987.77, 0.15);

    const reportsContainer = document.getElementById('currentReportsListContainer');
    if (reportsContainer) {
      const freshCard = `
        <div class="report-card-item" style="border-color: var(--color-primary); background: rgba(37, 99, 235, 0.05); animation: modal-fade-in 0.3s ease;">
          <div class="report-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="report-meta-info">
            <div class="report-title-row">
              <span class="report-test-name">Scanned Lab Diagnostic & Chemistry</span>
              <span class="report-status-badge report-status-normal">✓ Newly Added</span>
            </div>
            <div class="report-sub-details">Kiosk Scanner #03 • Just now • ABDM Linked</div>
            <div class="report-metrics-row">
              <span class="report-metric-chip">OCR: 100% Extracted</span>
              <span class="report-metric-chip">Backend Record Created</span>
            </div>
          </div>
          <button class="report-action-btn" onclick="triggerToast('Opening newly scanned report.')">
            <span>View</span>
          </button>
        </div>
      `;
      reportsContainer.insertAdjacentHTML('afterbegin', freshCard);
    }

    triggerToast(currentLang === 'hi' ? 'मेडिकल रिपोर्ट सक्रिय सूची में जोड़ दी गई है!' : 'Medical report linked and added to Current Reports!');
  }, 1800);
}

// 10. Multi-Identity Sync Handlers
function switchIdTab(type) {
  playBeep(520, 0.04);
  ['Abha', 'Aadhaar', 'Passport'].forEach(t => {
    const tab = document.getElementById('tab' + t);
    const view = document.getElementById('view' + t);
    if (tab) tab.classList.remove('active');
    if (view) view.style.display = 'none';
  });

  const activeTab = document.getElementById('tab' + type);
  const activeView = document.getElementById('view' + type);
  if (activeTab) activeTab.classList.add('active');
  if (activeView) activeView.style.display = 'flex';
}

function simulateFingerprint() {
  playBeep(800, 0.08);
  const label = document.getElementById('bioScanLabel');
  if (label) {
    label.innerText = 'Scanning biometric minutiae...';
    label.style.color = 'var(--color-primary)';
  }
  setTimeout(() => {
    if (label) {
      label.innerText = '✓ Biometric Match 99.4% Verified';
      label.style.color = 'var(--color-emerald)';
    }
    playBeep(1046.5, 0.15);
  }, 1500);
}

function submitIdSync(type) {
  playBeep(880, 0.1);
  closeModal('idSyncModal');
  triggerToast(`Identity Verified via ${type}. ABDM Health Records Synced!`);
}

// 11. Backend HL7 FHIR Release 4 Data Model (Runs silently in backend)
function generateFhirBundle() {
  const now = new Date().toISOString();
  const bundleId = `medbuddy-bundle-${Date.now()}`;

  const patientResource = {
    resourceType: "Patient",
    id: "patient-rahul-001",
    identifier: [
      { system: "https://healthid.ndhm.gov.in", value: "91-8842-1092-4410", type: { text: "ABHA ID" } },
      { system: "https://uidai.gov.in", value: "6829 4410 9021", type: { text: "Aadhaar" } },
      { system: "https://passportindia.gov.in", value: "Z9401823A", type: { text: "Passport" } }
    ],
    active: true,
    name: [{ use: "official", text: "Rahul Sharma", family: "Sharma", given: ["Rahul"] }],
    gender: "male",
    birthDate: "1992-06-15",
    telecom: [{ system: "phone", value: "+91 98765-43210", use: "mobile" }]
  };

  const pastHistoryResources = [
    {
      resourceType: "Condition",
      id: "cond-htn-01",
      clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "problem-list-item" }] }],
      code: {
        coding: [{ system: "http://snomed.info/sct", code: "38341003", display: "Essential hypertension" }],
        text: "Hypertension (diagnosed 2021, controlled on Telmisartan 40mg)"
      },
      subject: { reference: "Patient/patient-rahul-001" },
      onsetDateTime: "2021-08-10"
    },
    {
      resourceType: "Condition",
      id: "cond-t2dm-02",
      clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }] },
      category: [{ coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "problem-list-item" }] }],
      code: {
        coding: [{ system: "http://snomed.info/sct", code: "44054006", display: "Type 2 diabetes mellitus" }],
        text: "Type 2 Diabetes Mellitus (HbA1c 5.6%)"
      },
      subject: { reference: "Patient/patient-rahul-001" },
      onsetDateTime: "2023-01-15"
    },
    {
      resourceType: "AllergyIntolerance",
      id: "allergy-penicillin-01",
      clinicalStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical", code: "active" }] },
      verificationStatus: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification", code: "confirmed" }] },
      type: "allergy",
      category: ["medication"],
      criticality: "high",
      code: {
        coding: [{ system: "http://snomed.info/sct", code: "373270004", display: "Substance with penicillin structure" }],
        text: "Penicillin / Amoxicillin"
      },
      subject: { reference: "Patient/patient-rahul-001" },
      reaction: [{
        manifestation: [{ coding: [{ system: "http://snomed.info/sct", code: "126485001", display: "Urticaria" }] }],
        severity: "severe"
      }]
    },
    {
      resourceType: "Procedure",
      id: "proc-appendectomy-01",
      status: "completed",
      code: {
        coding: [{ system: "http://snomed.info/sct", code: "6025007", display: "Laparoscopic appendectomy" }],
        text: "Laparoscopic Appendectomy (2018)"
      },
      subject: { reference: "Patient/patient-rahul-001" },
      performedDateTime: "2018-06-20"
    },
    {
      resourceType: "Immunization",
      id: "imm-covid-01",
      status: "completed",
      vaccineCode: {
        coding: [{ system: "http://hl7.org/fhir/sid/cvx", code: "213", display: "SARS-COV-2 COVID-19 vaccine" }],
        text: "COVID-19 (Covishield) - 3 Doses (CoWIN Verified)"
      },
      subject: { reference: "Patient/patient-rahul-001" },
      occurrenceDateTime: "2022-04-12"
    }
  ];

  return {
    resourceType: "Bundle",
    id: bundleId,
    meta: {
      lastUpdated: now,
      profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"]
    },
    type: "transaction",
    entry: [
      { fullUrl: `urn:uuid:${patientResource.id}`, resource: patientResource, request: { method: "POST", url: "Patient" } },
      ...pastHistoryResources.map(r => ({ fullUrl: `urn:uuid:${r.id}`, resource: r, request: { method: "POST", url: r.resourceType } }))
    ]
  };
}

// Expose FHIR bundle generator to backend service
window.MedBuddyBackend = {
  getFhirBundle: generateFhirBundle
};
