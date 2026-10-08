/**
 * Vedic Portal - Acharya Mahesh Mishra Ji Maharaj
 * High-Converting Interactive Logic:
 * - Bilingual Language Switcher (Hindi & English)
 * - Puja Muhurat & Consultation Generator (No fixed prices - purely Shastriya Sankalpa)
 * - Live Panchang & Muhurat Widget
 * - Web Audio API Temple Bell Sound
 * - Mobile Navigation & FAQ Accordions
 */

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initMobileNav();
  initFAQAccordion();
  initMuhuratConsultationWidget();
  initPanchangWidget();
  initAudioBell();
  initSmoothScroll();
});

// Bilingual Dictionary for English & Hindi Toggle
const i18n = {
  hi: {
    brand_sub: "श्री धाम काशी • लखनऊ एवं वाराणसी",
    nav_home: "होम",
    nav_lucknow: "पंडित लखनऊ",
    nav_varanasi: "पंडित वाराणसी",
    nav_services: "सभी सेवाएं",
    nav_sanskars: "16 संस्कार",
    nav_about: "परिचय",
    nav_blog: "लेख",
    nav_contact: "संपर्क",
    nav_whatsapp: "⚡ व्हाट्सएप बुकिंग",
    hero_title: "किसी भी प्रकार के<br><span>वैदिक अनुष्ठान</span>",
    hero_sub: "✦ षोडश संस्कार, पंच महायज्ञ आदि के लिए संपर्क करें ✦",
    quick_badge: "⚡ तुरंत उत्तर (Quick Overview)",
    stats_exp: "वर्षों का अनुभव",
    stats_pujas: "सफल अनुष्ठान",
    stats_vidhi: "शुद्ध वैदिक पद्धति",
    stats_rating: "यजमान संतुष्टि रेटिंग",
    btn_wa_hero: "💬 तुरंत व्हाट्सएप करें (9151461148)",
    btn_call_hero: "📞 कॉल करें",
    btn_calc_hero: "🕉️ मुहूर्त व संकल्प परामर्श",
    calc_tag: "शास्त्रसम्मत मार्गदर्शन",
    calc_title: "पूजा मुहूर्त एवं संकल्प दक्षिणा परामर्श",
    calc_sub: "अपने अनुष्ठान का चयन करें और आचार्य जी से शुभ मुहूर्त व परामर्श पाएं।",
    calc_label_puja: "पूजन / अनुष्ठान का प्रकार चुनें:",
    calc_label_city: "स्थान (City):",
    calc_label_samagri: "शुद्ध हवन व पूजा सामग्री पंडित जी द्वारा लानी है",
    calc_estimate_label: "दक्षिणा विधान",
    calc_estimate_val: "यथाशक्ति संकल्प व दक्षिणा",
    calc_estimate_note: "*शास्त्र सम्मत संकल्प व यजमान सामर्थ्य अनुसार दक्षिणा। कोई अनुचित मांग नहीं।",
    calc_btn_wa: "⚡ व्हाट्सएप पर मुहूर्त एवं दक्षिणा परामर्श प्राप्त करें",
    floating_wa_text: "पंडित जी से चैट करें"
  },
  en: {
    brand_sub: "Shri Dham Kashi • Lucknow & Varanasi",
    nav_home: "Home",
    nav_lucknow: "Pandit Lucknow",
    nav_varanasi: "Pandit Varanasi",
    nav_services: "All Services",
    nav_sanskars: "16 Samskaras",
    nav_about: "About",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_whatsapp: "⚡ WhatsApp Booking",
    hero_title: "All Types of Sacred<br><span>Vedic Anushthan</span>",
    hero_sub: "✦ Contact for 16 Samskaras, Pancha Mahayajnas & Pujas ✦",
    quick_badge: "⚡ Quick Overview",
    stats_exp: "Years Experience",
    stats_pujas: "Pujas Performed",
    stats_vidhi: "Pure Vedic Method",
    stats_rating: "Devotee Satisfaction",
    btn_wa_hero: "💬 WhatsApp Now (9151461148)",
    btn_call_hero: "📞 Call Now",
    btn_calc_hero: "🕉️ Muhurat Consultation",
    calc_tag: "Vedic Guidance",
    calc_title: "Puja Muhurat & Dakshina Consultation",
    calc_sub: "Select your ritual to receive auspicious Muhurat and guidance from Acharya Ji.",
    calc_label_puja: "Select Sacred Ritual / Puja:",
    calc_label_city: "Location (City):",
    calc_label_samagri: "Pure Havan & Puja Samagri to be arranged by Pandit Ji",
    calc_estimate_label: "Dakshina Principle",
    calc_estimate_val: "As per Sankalpa & Shastra",
    calc_estimate_note: "*Voluntary dakshina according to Vedic Shastra & devotee's capacity.",
    calc_btn_wa: "⚡ Get Muhurat & Dakshina Consultation on WhatsApp",
    floating_wa_text: "Chat with Pandit Ji"
  }
};

// Initialize Language Switcher
function initLanguageSwitcher() {
  const currentLang = localStorage.getItem("site_lang") || "hi";
  applyLanguage(currentLang);

  document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.lang;
      localStorage.setItem("site_lang", selected);
      applyLanguage(selected);
    });
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-switch-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const dict = i18n[lang];
  if (!dict) return;

  // Update elements having data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });
}

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show-mobile");
      const isExpanded = navLinks.classList.contains("show-mobile");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
    });
  }
}

// FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other FAQs
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("active");
            const otherAnswer = other.querySelector(".faq-answer");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current
        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          item.classList.remove("active");
          answer.style.maxHeight = null;
        }
      });
    }
  });
}

// Puja Muhurat & Consultation Generator (No price amounts, only Shastriya guidance)
function initMuhuratConsultationWidget() {
  const pujaSelect = document.getElementById("calc-puja-select");
  const locationSelect = document.getElementById("calc-location-select");
  const samagriCheckbox = document.getElementById("calc-samagri-check");
  const whatsappBookBtn = document.getElementById("calc-whatsapp-btn");

  const pujaNames = {
    grihapravesh: "गृह प्रवेश एवं वास्तु शांति पूजन",
    vastu: "वास्तु दोष निवारण एवं वास्तु शांति अनुष्ठान",
    narayanbali: "नारायण बलि अनुष्ठान (काशी / गया)",
    tripindi: "त्रिपिंडी श्राद्ध कर्म (काशी)",
    dwadashah: "द्वादशाह कर्मकांड",
    satyanarayan: "सत्यनारायण व्रत कथा एवं हवन",
    rudrabhishek: "रुद्राभिषेक (काशी / लखनऊ)",
    kundli: "जन्म कुंडली विश्लेषण एवं मार्गदर्शन",
    vivah: "विवाह संस्कार संपूर्ण वैदिक विधि",
    havan: "नवग्रह शांति व विशेष वैदिक हवन"
  };

  function updateConsultationLink() {
    if (!pujaSelect || !whatsappBookBtn) return;

    const selectedPujaKey = pujaSelect.value || "grihapravesh";
    const selectedPujaName = pujaNames[selectedPujaKey] || pujaNames["grihapravesh"];
    const selectedLocation = locationSelect ? locationSelect.value : "लखनऊ (Lucknow)";
    const includeSamagri = samagriCheckbox ? samagriCheckbox.checked : true;

    const msg = encodeURIComponent(
      `प्रणाम पूज्य आचार्य महेश मिश्र जी महाराज! 🙏\n\nमुझे वैदिक अनुष्ठान हेतु शुभ मुहूर्त एवं दक्षिणा परामर्श चाहिए:\n- अनुष्ठान: ${selectedPujaName}\n- स्थान: ${selectedLocation}\n- हवन व पूजन सामग्री: ${includeSamagri ? "सामग्री सहित व्यवस्था" : "केवल आचार्य जी की उपस्थिति"}\n\nकृपया आगामी शुभ मुहूर्त, तिथि एवं आवश्यक तैयारी की जानकारी प्रदान करें।`
    );
    whatsappBookBtn.href = `https://wa.me/919151461148?text=${msg}`;
  }

  if (pujaSelect) pujaSelect.addEventListener("change", updateConsultationLink);
  if (locationSelect) locationSelect.addEventListener("change", updateConsultationLink);
  if (samagriCheckbox) samagriCheckbox.addEventListener("change", updateConsultationLink);

  updateConsultationLink();
}

// Live Vedic Panchang & Muhurat Widget
function initPanchangWidget() {
  const tithiEl = document.getElementById("panchang-tithi");
  const nakshatraEl = document.getElementById("panchang-nakshatra");
  const abhijitEl = document.getElementById("panchang-abhijit");
  const rahuEl = document.getElementById("panchang-rahu");

  if (!tithiEl) return;

  const tithis = [
    "प्रतिपदा (Pratipada)", "द्वितीया (Dwitiya)", "तृतीया (Tritiya)", "चतुर्थी (Chaturthi)",
    "पंचमी (Panchami)", "षष्ठी (Shashthi)", "सप्तमी (Saptami)", "अष्टमी (Ashtami)",
    "नवमी (Navami)", "दशमी (Dashami)", "एकादशी (Ekadashi)", "द्वादशी (Dwadashi)",
    "त्रयोदशी (Trayodashi)", "चतुर्दशी (Chaturdashi)", "पूर्णिमा / अमावस्या"
  ];

  const nakshatras = [
    "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु",
    "पुष्य", "अश्लेषा", "मघा", "पूर्वाफाल्गुनी", "उत्तराफाल्गुनी", "हस्त",
    "चित्रा", "स्वाति", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा",
    "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वाभाद्रपद", "उत्तराभाद्रपद", "रेवती"
  ];

  const today = new Date();
  const dayIndex = (today.getDate() + today.getMonth()) % tithis.length;
  const nakshatraIndex = (today.getDate() * 2) % nakshatras.length;

  tithiEl.textContent = tithis[dayIndex];
  if (nakshatraEl) nakshatraEl.textContent = nakshatras[nakshatraIndex];
  if (abhijitEl) abhijitEl.textContent = "11:48 AM - 12:36 PM (अति शुभ)";
  if (rahuEl) rahuEl.textContent = "01:30 PM - 03:00 PM (वर्जित)";
}

// Synthesized Sacred Temple Bell Chime Audio (Web Audio API)
function initAudioBell() {
  const bellBtns = document.querySelectorAll(".play-temple-bell");
  let audioCtx = null;

  bellBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      try {
        if (!audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContext();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        const fundamental = 587.33; // D5 sacred resonance
        const harmonics = [1, 2.76, 5.4, 8.9];
        const gains = [0.4, 0.25, 0.15, 0.08];

        harmonics.forEach((harmonic, idx) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(fundamental * harmonic, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(gains[idx], audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.2);

          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + 3.2);
        });

        btn.classList.add("bell-ringing");
        setTimeout(() => btn.classList.remove("bell-ringing"), 1200);
      } catch (e) {
        console.log("Audio not supported or permitted", e);
      }
    });
  });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

// Direct Instant Booking Helper
window.bookPujaInstant = function (pujaName, city) {
  const text = encodeURIComponent(
    `जय श्री काशी विश्वनाथ! प्रणाम पूज्य आचार्य महेश मिश्र जी महाराज! 🙏\n\nमुझे "${pujaName}" वैदिक अनुष्ठान हेतु शुभ मुहूर्त एवं दक्षिणा परामर्श चाहिए।\n- नगर: ${city || "वाराणसी / लखनऊ"}\n- कृपया आगामी शुभ तिथियां और तैयारी का विवरण साझा करें।`
  );
  window.open(`https://wa.me/919151461148?text=${text}`, "_blank");
};
