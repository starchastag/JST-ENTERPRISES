"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Zap,
  Wind,
  Droplets,
  ShieldCheck,
  Building2,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

type Language = "en" | "hi";

const services = [
  {
    id: "civil",
    icon: Building2,
    en: "Civil Works",
    hi: "सिविल कार्य",
    detailEn: "Building repairs, renovation and civil maintenance.",
    detailHi: "भवन मरम्मत, नवीनीकरण और सिविल रखरखाव।",
  },
  {
    id: "electrical",
    icon: Zap,
    en: "Electrical",
    hi: "इलेक्ट्रिकल",
    detailEn: "Electrical installations, lighting and power systems.",
    detailHi: "इलेक्ट्रिकल इंस्टॉलेशन, लाइटिंग और पावर सिस्टम।",
  },
  {
    id: "hvac",
    icon: Wind,
    en: "HVAC",
    hi: "HVAC",
    detailEn: "Mechanical systems and climate-control maintenance.",
    detailHi: "मैकेनिकल सिस्टम और क्लाइमेट कंट्रोल रखरखाव।",
  },
  {
    id: "plumbing",
    icon: Droplets,
    en: "Plumbing",
    hi: "प्लंबिंग",
    detailEn: "Water supply, drainage and plumbing systems.",
    detailHi: "जल आपूर्ति, ड्रेनेज और प्लंबिंग सिस्टम।",
  },
  {
    id: "fire",
    icon: ShieldCheck,
    en: "Fire Safety",
    hi: "अग्नि सुरक्षा",
    detailEn: "Fire-protection systems and safety maintenance.",
    detailHi: "फायर प्रोटेक्शन सिस्टम और सुरक्षा रखरखाव।",
  },
  {
    id: "amc",
    icon: Wrench,
    en: "AMC & Facilities",
    hi: "AMC एवं सुविधाएँ",
    detailEn: "Planned maintenance and facility-management services.",
    detailHi: "नियोजित रखरखाव और फैसिलिटी मैनेजमेंट सेवाएँ।",
  },
];

const workflow = {
  en: [
    ["01", "Assess", "Understand site requirements and scope."],
    ["02", "Plan", "Define resources, schedule and execution."],
    ["03", "Execute", "Coordinate work and quality checks."],
    ["04", "Maintain", "Support ongoing maintenance needs."],
  ],
  hi: [
    ["01", "जाँच", "साइट की आवश्यकताओं और कार्यक्षेत्र को समझना।"],
    ["02", "योजना", "संसाधन, समय-सारणी और कार्य योजना बनाना।"],
    ["03", "कार्यान्वयन", "कार्य और गुणवत्ता जाँच का समन्वय।"],
    ["04", "रखरखाव", "निरंतर रखरखाव की आवश्यकताओं में सहायता।"],
  ],
};

export default function EngineeringShowcase({
  lang = "en",
}: {
  lang?: Language;
}) {
  const [active, setActive] = useState("electrical");
  const reduceMotion = useReducedMotion();

  const selected = services.find((service) => service.id === active)!;
  const title =
    lang === "hi"
      ? "इंजीनियरिंग सेवाएँ, एक एकीकृत दृष्टिकोण"
      : "Engineering services. One integrated approach.";

  const ticker = services
    .map((service) => (lang === "hi" ? service.hi : service.en))
    .join("   /   ");

  return (
    <div className="hst-showcase">
      <section className="hst-showcase__hero">
        <div className="hst-showcase__grid" aria-hidden="true" />

        <div className="hst-showcase__hero-content">
          <p className="hst-eyebrow">HST / ENGINEERING & FACILITY SERVICES</p>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {title}
          </motion.h2>

          <p className="hst-showcase__intro">
            {lang === "hi"
              ? "संस्थागत और वाणिज्यिक भवनों के लिए सिविल, इलेक्ट्रिकल, HVAC और रखरखाव समाधान।"
              : "Civil, electrical, HVAC and maintenance solutions for institutional and commercial buildings."}
          </p>

          <a className="hst-cta" href="/services">
            {lang === "hi" ? "सेवाएँ देखें" : "Explore services"}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="hst-showcase__system">
          <div className="hst-showcase__system-top">
            <span>SYSTEM SELECTOR</span>
            <span>HST / 001</span>
          </div>

          <div className="hst-showcase__service-list">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = active === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActive(service.id)}
                  aria-pressed={isActive}
                  className={`hst-service-button ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{lang === "hi" ? service.hi : service.en}</span>
                  <ArrowUpRight
                    size={16}
                    className="hst-service-arrow"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <motion.div
            key={selected.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="hst-showcase__detail"
            aria-live="polite"
          >
            <span className="hst-eyebrow">SELECTED CAPABILITY</span>
            <h3>{lang === "hi" ? selected.hi : selected.en}</h3>
            <p>{lang === "hi" ? selected.detailHi : selected.detailEn}</p>
          </motion.div>
        </div>
      </section>

      <div className="hst-ticker" aria-label={ticker}>
        <div className="hst-ticker__track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {ticker}　◆　{ticker}　◆　
            </span>
          ))}
        </div>
      </div>

      <section className="hst-workflow">
        <p className="hst-eyebrow">
          {lang === "hi" ? "कार्य प्रक्रिया / 02" : "OUR PROCESS / 02"}
        </p>

        <h2>
          {lang === "hi"
            ? "आवश्यकता से रखरखाव तक"
            : "From requirements to maintenance."}
        </h2>

        <div className="hst-workflow__grid">
          {workflow[lang].map(([number, heading, description]) => (
            <article className="hst-workflow-card" key={number}>
              <span className="hst-workflow-card__number">{number}</span>
              <h3>{heading}</h3>
              <p>{description}</p>
              <div className="hst-workflow-card__rule" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
