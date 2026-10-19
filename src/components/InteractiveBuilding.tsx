"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Hospital, Zap, Wrench, Wind } from "lucide-react";

const zones = [
  { key: "structure", label: "Building fabric", title: "Civil & structural upkeep", detail: "Repairs, waterproofing, finishes and planned building inspections.", icon: Building2 },
  { key: "power", label: "Electrical", title: "Electrical systems", detail: "Lighting, distribution panels, power systems and routine checks.", icon: Zap },
  { key: "facility", label: "Facility", title: "Integrated facility support", detail: "Coordinated site services, maintenance schedules and reporting.", icon: Wrench },
  { key: "air", label: "HVAC", title: "HVAC & ventilation", detail: "Preventive care for cooling, ventilation and indoor comfort systems.", icon: Wind },
  { key: "health", label: "Healthcare", title: "Hospital environments", detail: "Maintenance planning for active-use and healthcare facilities.", icon: Hospital }
];

export default function InteractiveBuilding() {
  const [active, setActive] = useState(0);
  const current = zones[active];
  const Icon = current.icon;

  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <div className="section-eyebrow">EXPLORE THE BUILDING</div>
            <h2 className="section-title mt-4">One building. Many connected systems.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">Select a system to explore the type of maintenance support it may require. This is a conceptual illustration, not a live building model or a claim of specific project experience.</p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {zones.map((zone, index) => {
                const ZoneIcon = zone.icon;
                return <button key={zone.key} onClick={() => setActive(index)} className={`building-zone-button ${active === index ? "building-zone-active" : ""}`}>
                  <ZoneIcon size={17} />
                  <span>{zone.label}</span>
                  <span className="ml-auto text-xs opacity-50">0{index + 1}</span>
                </button>;
              })}
            </div>
            <motion.div key={current.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }} className="building-detail-card mt-5">
              <div className="flex items-start gap-4">
                <span className="building-detail-icon"><Icon size={22} /></span>
                <div><h3 className="font-bold text-ink">{current.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{current.detail}</p></div>
              </div>
            </motion.div>
          </div>

          <div className="interactive-building-stage">
            <div className="interactive-building-grid" />
            <div className="interactive-building-sun" />
            <motion.div className="ib-tower ib-tower-back" animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity }}><div className="ib-windows" /></motion.div>
            <motion.div className={`ib-tower ib-tower-main ib-active-${current.key}`} animate={{ y: [0, -5, 0], rotateY: [-2, 2, -2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <div className="ib-roof" />
              <div className="ib-windows" />
              <div className={`ib-highlight ib-highlight-${current.key}`} />
              <div className="ib-entrance" />
            </motion.div>
            <motion.div className="ib-tower ib-tower-front" animate={{ y: [0, -2, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}><div className="ib-windows" /></motion.div>
            <div className="ib-ground" />
            <motion.div key={current.key} className="ib-callout" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
              <span className="ib-callout-dot" /><div><small>SELECTED SYSTEM</small><b>{current.label}</b></div>
            </motion.div>
            <div className="ib-stage-caption"><span>HST / BUILT ENVIRONMENT</span><span>INTERACTIVE CONCEPT</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
