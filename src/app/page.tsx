"use client";

import { useState } from "react";
import InteractiveBuilding from "@/components/InteractiveBuilding";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  HardHat,
  Hospital,
  Languages,
  Menu,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
  Droplets,
  Wind,
  Flame,
  PanelsTopLeft,
} from "lucide-react";
import EngineeringShowcase from "@/components/EngineeringShowcase";
import "@/components/EngineeringShowcase.css";

type Lang = "en" | "hi";

const copy = {
  en: {
    eyebrow: "ENGINEERING • MAINTENANCE • FACILITY MANAGEMENT",
    nav: [
      "Home",
      "About",
      "Services",
      "Projects",
      "Tenders",
      "Certificates",
      "Contact",
    ],
    tag: "Built on reliability. Maintained with care.",
    titleA: "Keeping critical",
    titleB: "spaces running.",
    description:
      "Integrated maintenance and engineering support for hospitals, institutional campuses, commercial buildings and public infrastructure.",
    primary: "Discuss a project",
    secondary: "Explore our services",
    note: "One accountable partner for complex facilities.",
    strip: [
      "Hospital & institutional facilities",
      "Civil and electrical works",
      "Planned maintenance support",
    ],
    servicesEyebrow: "WHAT WE DO",
    servicesTitle: "Complete care for every building.",
    servicesDesc:
      "A coordinated approach to the systems, spaces and services that keep a facility safe, functional and ready for use.",
    services: [
      [
        "Hospital & Institutional Maintenance",
        "Maintenance support for healthcare facilities, campuses and critical-use environments.",
        "hospital",
      ],
      [
        "Electrical & Power Systems",
        "Electrical upkeep, lighting, distribution systems and planned inspections.",
        "zap",
      ],
      [
        "Civil & Building Works",
        "Repairs, refurbishment, waterproofing and general building upkeep.",
        "building",
      ],
      [
        "HVAC & Ventilation",
        "Preventive maintenance support for cooling, ventilation and indoor comfort systems.",
        "wind",
      ],
      [
        "Plumbing & Water Systems",
        "Plumbing repairs, water supply systems, drainage and routine checks.",
        "water",
      ],
      [
        "Fire & Safety Systems",
        "Maintenance coordination and inspection support for essential safety systems.",
        "fire",
      ],
      [
        "Annual Maintenance Contracts",
        "Structured service schedules, documentation and ongoing maintenance coordination.",
        "check",
      ],
      [
        "Integrated Facility Management",
        "Coordinated facility support tailored to site requirements and scope of work.",
        "panels",
      ],
    ],
    approachEyebrow: "HOW WE WORK",
    approachTitle: "A disciplined approach from scope to handover.",
    steps: [
      [
        "01",
        "Understand the scope",
        "Review site requirements, tender scope, timelines and operational priorities.",
      ],
      [
        "02",
        "Plan the work",
        "Define manpower, materials, safety measures and a practical execution plan.",
      ],
      [
        "03",
        "Execute with care",
        "Coordinate work, communicate progress and maintain site discipline.",
      ],
      [
        "04",
        "Document & hand over",
        "Record completed work and hand over agreed deliverables and documentation.",
      ],
    ],
    capabilityEyebrow: "BUILT FOR COMPLEX SITES",
    capabilityTitle: "Dependable execution. Clear communication.",
    capabilityDesc:
      "From individual maintenance tasks to coordinated building service scopes, our focus is on safe work practices, clear responsibilities and consistent follow-through.",
    capabilities: [
      "Scope-led planning",
      "Site coordination",
      "Safety-conscious execution",
      "Maintenance documentation",
    ],
    calloutTitle: "Planning a maintenance or facility project?",
    calloutDesc:
      "Share your requirements, tender scope or site details. Our team can review the information and discuss the next steps.",
    calloutButton: "Start an enquiry",
    contactEyebrow: "LET'S TALK",
    contactTitle: "Tell us what your site needs.",
    contactDesc:
      "Use the enquiry form to outline your requirement. Add your contact details and we can follow up with you.",
    name: "Your name",
    company: "Organisation / company",
    email: "Email address",
    phone: "Phone number",
    requirement: "How can we help?",
    requirementPlaceholder: "Tell us about the site, service or tender scope…",
    submit: "Prepare enquiry email",
    formNote:
      "This demo opens your email application; it does not store form submissions.",
    footerLine: "Engineering and maintenance, delivered with accountability.",
    footer: "© 2026 JST ENTERPRISES. All rights reserved.",
    notice:
      "Website content is illustrative. Add verified company details, registrations, certificates and project references before publishing.",
  },
  hi: {
    eyebrow: "इंजीनियरिंग • मेंटेनेंस • फैसिलिटी मैनेजमेंट",
    nav: [
      "होम",
      "हमारे बारे में",
      "सेवाएँ",
      "प्रोजेक्ट",
      "टेंडर अनुभव",
      "प्रमाणपत्र",
      "संपर्क",
    ],
    tag: "विश्वसनीय काम। जिम्मेदारी के साथ देखभाल।",
    titleA: "ज़रूरी सुविधाओं को",
    titleB: "चालू और सुरक्षित रखें।",
    description:
      "अस्पतालों, संस्थानों, कमर्शियल बिल्डिंग और सार्वजनिक इन्फ्रास्ट्रक्चर के लिए एकीकृत मेंटेनेंस और इंजीनियरिंग सहायता।",
    primary: "प्रोजेक्ट पर चर्चा करें",
    secondary: "हमारी सेवाएँ देखें",
    note: "जटिल सुविधाओं के लिए एक जिम्मेदार पार्टनर।",
    strip: [
      "अस्पताल और संस्थान",
      "सिविल और इलेक्ट्रिकल कार्य",
      "नियोजित मेंटेनेंस सहायता",
    ],
    servicesEyebrow: "हम क्या करते हैं",
    servicesTitle: "हर बिल्डिंग के लिए संपूर्ण देखभाल।",
    servicesDesc:
      "सिस्टम, स्थान और सेवाओं के लिए समन्वित व्यवस्था, ताकि परिसर सुरक्षित, उपयोगी और काम के लिए तैयार रहे।",
    services: [
      [
        "अस्पताल और संस्थान मेंटेनेंस",
        "हेल्थकेयर सुविधाओं, कैंपस और महत्वपूर्ण उपयोग वाले परिसरों के लिए मेंटेनेंस सहायता।",
        "hospital",
      ],
      [
        "इलेक्ट्रिकल और पावर सिस्टम",
        "इलेक्ट्रिकल रखरखाव, लाइटिंग, डिस्ट्रीब्यूशन सिस्टम और नियोजित निरीक्षण।",
        "zap",
      ],
      [
        "सिविल और बिल्डिंग कार्य",
        "मरम्मत, रिफर्बिशमेंट, वॉटरप्रूफिंग और सामान्य बिल्डिंग रखरखाव।",
        "building",
      ],
      [
        "HVAC और वेंटिलेशन",
        "कूलिंग, वेंटिलेशन और इनडोर कम्फर्ट सिस्टम के लिए प्रिवेंटिव मेंटेनेंस सहायता।",
        "wind",
      ],
      [
        "प्लंबिंग और वॉटर सिस्टम",
        "प्लंबिंग मरम्मत, पानी की सप्लाई, ड्रेनेज और नियमित जाँच।",
        "water",
      ],
      [
        "फायर और सेफ्टी सिस्टम",
        "आवश्यक सुरक्षा प्रणालियों के रखरखाव समन्वय और निरीक्षण में सहायता।",
        "fire",
      ],
      [
        "एनुअल मेंटेनेंस कॉन्ट्रैक्ट",
        "नियोजित सर्विस शेड्यूल, डॉक्यूमेंटेशन और निरंतर मेंटेनेंस समन्वय।",
        "check",
      ],
      [
        "इंटीग्रेटेड फैसिलिटी मैनेजमेंट",
        "साइट की आवश्यकता और कार्यक्षेत्र के अनुसार समन्वित फैसिलिटी सहायता।",
        "panels",
      ],
    ],
    approachEyebrow: "हम कैसे काम करते हैं",
    approachTitle: "कार्य-क्षेत्र से हैंडओवर तक व्यवस्थित प्रक्रिया।",
    steps: [
      [
        "01",
        "आवश्यकता समझें",
        "साइट की जरूरत, टेंडर स्कोप, समय-सीमा और प्राथमिकताओं की समीक्षा।",
      ],
      [
        "02",
        "कार्य की योजना",
        "मैनपावर, सामग्री, सुरक्षा उपाय और कार्यान्वयन योजना तय करना।",
      ],
      [
        "03",
        "जिम्मेदारी से कार्य",
        "काम का समन्वय, प्रगति की जानकारी और साइट अनुशासन बनाए रखना।",
      ],
      [
        "04",
        "डॉक्यूमेंटेशन और हैंडओवर",
        "पूर्ण कार्य का रिकॉर्ड और सहमत दस्तावेज़ों के साथ हैंडओवर।",
      ],
    ],
    capabilityEyebrow: "जटिल साइटों के लिए तैयार",
    capabilityTitle: "भरोसेमंद कार्य। स्पष्ट संवाद।",
    capabilityDesc:
      "छोटे मेंटेनेंस कार्यों से लेकर समन्वित बिल्डिंग सर्विस स्कोप तक, हमारा ध्यान सुरक्षित कार्यप्रणाली, स्पष्ट जिम्मेदारियों और निरंतर फॉलो-थ्रू पर है।",
    capabilities: [
      "कार्य-क्षेत्र के अनुसार योजना",
      "साइट समन्वय",
      "सुरक्षा-केंद्रित कार्य",
      "मेंटेनेंस डॉक्यूमेंटेशन",
    ],
    calloutTitle:
      "क्या आप मेंटेनेंस या फैसिलिटी प्रोजेक्ट की योजना बना रहे हैं?",
    calloutDesc:
      "अपनी आवश्यकता, टेंडर स्कोप या साइट की जानकारी साझा करें। हमारी टीम आगे की प्रक्रिया पर चर्चा कर सकती है।",
    calloutButton: "पूछताछ शुरू करें",
    contactEyebrow: "बात करें",
    contactTitle: "बताएँ, आपकी साइट को किस सहायता की जरूरत है।",
    contactDesc:
      "अपनी आवश्यकता बताने के लिए फॉर्म भरें। संपर्क विवरण मिलने पर आगे बात की जा सकती है।",
    name: "आपका नाम",
    company: "संस्था / कंपनी",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    requirement: "आपको किस प्रकार की सहायता चाहिए?",
    requirementPlaceholder: "साइट, सेवा या टेंडर स्कोप के बारे में लिखें…",
    submit: "ईमेल के माध्यम से पूछताछ भेजें",
    formNote:
      "यह डेमो आपके ईमेल ऐप को खोलेगा; फॉर्म का डेटा वेबसाइट पर सेव नहीं होता।",
    footerLine: "जिम्मेदारी के साथ इंजीनियरिंग और मेंटेनेंस।",
    footer: "© 2026 JST ENTERPRISES. सर्वाधिकार सुरक्षित।",
    notice:
      "वेबसाइट की सामग्री उदाहरण के लिए है। प्रकाशित करने से पहले सत्यापित कंपनी विवरण, रजिस्ट्रेशन, प्रमाणपत्र और प्रोजेक्ट रेफरेंस जोड़ें।",
  },
};

const serviceIcons = [
  Hospital,
  Zap,
  Building2,
  Wind,
  Droplets,
  Flame,
  ClipboardCheck,
  PanelsTopLeft,
];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const t = copy[lang];

  function sendEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `JST ENTERPRISES website enquiry — ${form.company || form.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nOrganisation: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nRequirement:\n${form.requirement}`,
    );
    window.location.href = `mailto:info@JSTenterprises.example?subject=${subject}&body=${body}`;
  }

  return (
    <main className="overflow-hidden bg-white text-ink">
      <div className="topline">
        <div className="site-container flex items-center justify-between gap-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-xs">
          <span>{t.eyebrow}</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="status-dot" />{" "}
            {lang === "en"
              ? "Ready for your next project"
              : "आपके अगले प्रोजेक्ट के लिए तैयार"}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="site-container flex h-[78px] items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label="JST ENTERPRISES home"
          >
            <span className="brand-mark">
              <Building2 size={23} strokeWidth={1.7} />
            </span>
            <span className="leading-tight">
              <span className="block text-[17px] font-black tracking-[0.12em] text-ink">
                JST <span className="text-gold">ENTERPRISES</span>
              </span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.19em] text-slate-500">
                ENGINEERING & FACILITY SERVICES
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {t.nav.map((item, i) => (
              <a
                key={item}
                href={
                  [
                    "/",
                    "/about",
                    "/services",
                    "/projects",
                    "/tenders",
                    "/certificates",
                    "/contact",
                  ][i]
                }
                className="nav-link"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="lang-button"
              aria-label="Change language"
            >
              <Languages size={16} /> {lang === "en" ? "हिन्दी" : "English"}
            </button>
            <a className="button button-dark !px-5 !py-3" href="#contact">
              {t.primary}
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="lang-button"
              aria-label="Change language"
            >
              <Languages size={16} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full border border-slate-200 p-2.5"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-5 md:hidden">
            {t.nav.map((item, i) => (
              <a
                key={item}
                onClick={() => setMenuOpen(false)}
                href={
                  [
                    "/",
                    "/about",
                    "/services",
                    "/projects",
                    "/tenders",
                    "/certificates",
                    "/contact",
                  ][i]
                }
                className="block border-b border-slate-100 py-3 text-sm font-semibold"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="mt-4 flex items-center gap-2 text-sm font-semibold"
            >
              <Languages size={16} />{" "}
              {lang === "en" ? "हिन्दी में देखें" : "View in English"}
            </button>
          </div>
        )}
      </header>

      <section id="home" className="hero-section relative isolate">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="site-container relative z-10 grid min-h-[690px] items-center gap-10 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="hero-label">
              <span className="h-px w-8 bg-gold" /> {t.tag}
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
              {t.titleA}
              <br />
              <span className="gold-gradient">{t.titleB}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              {t.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="button button-gold" href="#contact">
                {t.primary}
                <ArrowRight size={17} />
              </a>
              <a className="button button-outline" href="#services">
                {t.secondary}
                <ArrowDownRight size={17} />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3 text-sm text-slate-400">
              <ShieldCheck size={18} className="text-gold" /> {t.note}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 18 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.12 }}
            className="hero-visual relative mx-auto w-full max-w-[590px]"
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-card">
              <div className="visual-card-top">
                <span className="visual-kicker">JST / FACILITY SYSTEMS</span>
                <span className="visual-live">
                  <span />{" "}
                  {lang === "en" ? "SYSTEMS THINKING" : "व्यवस्थित कार्य"}
                </span>
              </div>
              <div
                className="building-scene"
                aria-label="Decorative animated building illustration"
              >
                <div className="scene-sun" />
                <div className="scene-building building-back">
                  <div className="window-grid" />
                </div>
                <div className="scene-building building-main">
                  <div className="building-cap" />
                  <div className="window-grid" />
                  <div className="building-core" />
                </div>
                <div className="scene-building building-front">
                  <div className="window-grid" />
                  <div className="front-door" />
                </div>
                <div className="scene-ground" />
                <div className="scene-line line-a" />
                <div className="scene-line line-b" />
              </div>
              <div className="visual-card-bottom">
                <div>
                  <span className="block text-xs text-slate-400">
                    {lang === "en" ? "INTEGRATED SERVICES" : "एकीकृत सेवाएँ"}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">
                    {lang === "en"
                      ? "One coordinated approach"
                      : "एक समन्वित दृष्टिकोण"}
                  </span>
                </div>
                <div className="visual-icon">
                  <Sparkles size={19} />
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="floating-chip chip-top"
            >
              <span className="chip-icon">
                <CheckCircle2 size={18} />
              </span>
              <span>
                <b>{lang === "en" ? "Planned" : "नियोजित"}</b>
                <small>
                  {lang === "en" ? "Maintenance support" : "मेंटेनेंस सहायता"}
                </small>
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="floating-chip chip-bottom"
            >
              <span className="chip-icon chip-icon-gold">
                <Wrench size={18} />
              </span>
              <span>
                <b>{lang === "en" ? "Multi-service" : "मल्टी-सर्विस"}</b>
                <small>
                  {lang === "en" ? "Building operations" : "बिल्डिंग ऑपरेशंस"}
                </small>
              </span>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-bottom-rule" />
      </section>

      <section className="trust-strip">
        <div className="site-container grid gap-4 py-6 sm:grid-cols-3">
          {t.strip.map((item, i) => (
            <div
              key={item}
              className="flex items-center justify-center gap-3 text-center text-xs font-semibold tracking-wide text-slate-600 sm:justify-start sm:text-sm"
            >
              <span className="strip-number">0{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <InteractiveBuilding />

      <section id="services" className="section-pad bg-white">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="section-heading"
          >
            <div className="section-eyebrow">{t.servicesEyebrow}</div>
            <div className="mt-4 grid gap-5 md:grid-cols-[1fr_.8fr] md:items-end">
              <h2 className="section-title">{t.servicesTitle}</h2>
              <p className="max-w-lg text-sm leading-7 text-slate-500 md:justify-self-end">
                {t.servicesDesc}
              </p>
            </div>
          </motion.div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.article
                  key={service[0]}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
                  className="service-card group"
                >
                  <div className="service-icon">
                    <Icon size={23} strokeWidth={1.7} />
                  </div>
                  <span className="service-index">0{i + 1}</span>
                  <h3 className="mt-7 text-lg font-bold leading-6 tracking-tight text-ink">
                    {service[0]}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {service[1]}
                  </p>
                  <a href="#contact" className="service-link">
                    {lang === "en" ? "Discuss service" : "सेवा पर चर्चा"}{" "}
                    <ArrowRight size={15} />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="approach" className="section-pad bg-mist">
        <div className="site-container">
          <div className="max-w-3xl">
            <div className="section-eyebrow">{t.approachEyebrow}</div>
            <h2 className="section-title mt-4">{t.approachTitle}</h2>
          </div>
          <div className="mt-12 grid gap-0 md:grid-cols-4">
            {t.steps.map((step, i) => (
              <motion.div
                key={step[0]}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="process-step"
              >
                <div className="process-number">
                  {step[0]}
                  <span />
                </div>
                <h3 className="mt-6 text-lg font-bold text-ink">{step[1]}</h3>
                <p className="mt-3 pr-5 text-sm leading-7 text-slate-500">
                  {step[2]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="section-pad capability-section relative"
      >
        <div className="capability-pattern" />
        <div className="site-container relative grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
          <div>
            <div className="section-eyebrow section-eyebrow-light">
              {t.capabilityEyebrow}
            </div>
            <h2 className="section-title section-title-light mt-4">
              {t.capabilityTitle}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-300">
              {t.capabilityDesc}
            </p>
            <a href="#contact" className="button button-gold mt-8">
              {t.primary}
              <ArrowRight size={17} />
            </a>
          </div>
          <div className="capability-list">
            {t.capabilities.map((item, i) => (
              <div key={item} className="capability-item">
                <span className="capability-check">
                  <CheckCircle2 size={19} />
                </span>
                <span>{item}</span>
                <span className="ml-auto text-xs tracking-widest text-white/35">
                  0{i + 1}
                </span>
              </div>
            ))}
            <div className="capability-stamp">
              <HardHat size={28} />
              <span>
                {lang === "en"
                  ? "PRACTICAL. ACCOUNTABLE. SITE-FOCUSED."
                  : "व्यावहारिक। जिम्मेदार। साइट-केंद्रित।"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="site-container">
          <div className="project-cta">
            <div className="cta-orb" />
            <div className="relative z-10 max-w-2xl">
              <div className="section-eyebrow">
                {lang === "en" ? "NEXT STEPS" : "अगला कदम"}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t.calloutTitle}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                {t.calloutDesc}
              </p>
            </div>
            <a
              href="#contact"
              className="button button-gold relative z-10 shrink-0"
            >
              {t.calloutButton}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad bg-mist">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1fr]">
          <div>
            <div className="section-eyebrow">{t.contactEyebrow}</div>
            <h2 className="section-title mt-4">{t.contactTitle}</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              {t.contactDesc}
            </p>
            <div className="mt-8 space-y-4">
              <div className="contact-note">
                <span>
                  <Building2 size={18} />
                </span>
                <div>
                  <b>JST ENTERPRISES</b>
                  <small>
                    {lang === "en"
                      ? "Engineering & Facility Services"
                      : "इंजीनियरिंग और फैसिलिटी सर्विसेज"}
                  </small>
                </div>
              </div>
              <div className="contact-note">
                <span>
                  <ClipboardCheck size={18} />
                </span>
                <div>
                  <b>
                    {lang === "en"
                      ? "Tender & project enquiries"
                      : "टेंडर और प्रोजेक्ट पूछताछ"}
                  </b>
                  <small>
                    {lang === "en"
                      ? "Share scope, location and timeline"
                      : "कार्य-क्षेत्र, स्थान और समय-सीमा साझा करें"}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={sendEnquiry} className="contact-form">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-label">
                {t.name}
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={lang === "en" ? "Full name" : "पूरा नाम"}
                />
              </label>
              <label className="field-label">
                {t.company}
                <input
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder={
                    lang === "en" ? "Company / department" : "कंपनी / विभाग"
                  }
                />
              </label>
              <label className="field-label">
                {t.email}
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </label>
              <label className="field-label">
                {t.phone}
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91"
                />
              </label>
            </div>
            <label className="field-label mt-5 block">
              {t.requirement}
              <textarea
                required
                rows={5}
                value={form.requirement}
                onChange={(e) =>
                  setForm({ ...form, requirement: e.target.value })
                }
                placeholder={t.requirementPlaceholder}
              />
            </label>
            <button
              type="submit"
              className="button button-dark mt-6 w-full justify-center"
            >
              {t.submit}
              <ArrowRight size={16} />
            </button>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              {t.formNote}
            </p>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="site-container flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="brand-mark brand-mark-small">
              <Building2 size={18} />
            </span>
            <span className="text-sm font-black tracking-[0.13em] text-white">
              JST <span className="text-gold">ENTERPRISES</span>
            </span>
          </a>
          <p className="text-xs text-slate-400">{t.footerLine}</p>
          <p className="text-[11px] text-slate-500">{t.footer}</p>
        </div>
        <div className="site-container border-t border-white/10 py-4 text-[10px] leading-5 text-slate-500">
          {t.notice}
        </div>
      </footer>
    </main>
  );
}
