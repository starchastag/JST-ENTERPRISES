"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, Hospital, Zap, X } from "lucide-react";

type Project = {
  id: number;
  category: "Hospital" | "Building" | "Electrical";
  title: string;
  description: string;
  scope: string;
  visual: string;
};

const projects: Project[] = [
  { id: 1, category: "Hospital", title: "Healthcare Facility Maintenance", description: "A sample portfolio layout for verified hospital maintenance work.", scope: "Facility maintenance • Planned inspections", visual: "hospital" },
  { id: 2, category: "Building", title: "Institutional Building Services", description: "A sample layout for civil upkeep and institutional building services.", scope: "Civil works • Building upkeep", visual: "building" },
  { id: 3, category: "Electrical", title: "Electrical Systems Support", description: "A sample layout for electrical maintenance and service coordination.", scope: "Electrical maintenance • Safety checks", visual: "electrical" },
  { id: 4, category: "Building", title: "Commercial Property Upkeep", description: "A sample layout for refurbishment and routine building maintenance.", scope: "Repairs • Refurbishment", visual: "commercial" },
  { id: 5, category: "Hospital", title: "Critical-Space Service Planning", description: "A sample layout for planned maintenance in active-use facilities.", scope: "Preventive maintenance • Coordination", visual: "clinical" },
  { id: 6, category: "Electrical", title: "Power & Lighting Maintenance", description: "A sample layout for lighting, distribution and inspection support.", scope: "Lighting • Distribution systems", visual: "power" }
];

const filters = ["All", "Hospital", "Building", "Electrical"] as const;
type Filter = typeof filters[number];

const visuals: Record<string, { Icon: typeof Hospital; label: string; className: string }> = {
  hospital: { Icon: Hospital, label: "HEALTHCARE FACILITY", className: "gallery-visual-hospital" },
  building: { Icon: Building2, label: "INSTITUTIONAL BUILDING", className: "gallery-visual-building" },
  electrical: { Icon: Zap, label: "ELECTRICAL SYSTEMS", className: "gallery-visual-electrical" },
  commercial: { Icon: Building2, label: "COMMERCIAL PROPERTY", className: "gallery-visual-commercial" },
  clinical: { Icon: Hospital, label: "PLANNED FACILITY CARE", className: "gallery-visual-clinical" },
  power: { Icon: Zap, label: "POWER & LIGHTING", className: "gallery-visual-power" }
};

export default function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(() => filter === "All" ? projects : projects.filter(p => p.category === filter), [filter]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2" aria-label="Filter projects">
        {filters.map(item => (
          <button key={item} onClick={() => setFilter(item)} className={`gallery-filter ${filter === item ? "gallery-filter-active" : ""}`}>
            {item === "All" ? "All categories" : item}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => {
            const visual = visuals[project.visual];
            const Icon = visual.Icon;
            return (
              <motion.article key={project.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .28, delay: index * .035 }} className="gallery-card">
                <button onClick={() => setSelected(project)} className="block w-full text-left" aria-label={`View ${project.title} details`}>
                  <div className={`gallery-visual ${visual.className}`}>
                    <div className="gallery-visual-grid" />
                    <div className="gallery-visual-orbit" />
                    <Icon size={54} strokeWidth={1.15} className="relative z-10 text-[#e0bd78]" />
                    <span className="gallery-visual-label">{visual.label}</span>
                    <span className="gallery-open"><ArrowUpRight size={18} /></span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="gallery-category">{project.category}</span>
                      <span className="text-[10px] font-bold tracking-widest text-slate-300">0{project.id}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{project.description}</p>
                    <div className="mt-5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">{project.scope}</div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <p className="mt-7 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
        Portfolio demo: these cards are illustrative placeholders, not evidence of completed HST ENTERPRISES projects. Replace them with verified work and authorised photographs before publishing.
      </p>

      <AnimatePresence>
        {selected && (
          <motion.div className="gallery-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" className="gallery-modal" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} onClick={e => e.stopPropagation()}>
              <button className="gallery-modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={20} /></button>
              <div className={`gallery-visual gallery-modal-visual ${visuals[selected.visual].className}`}>
                <div className="gallery-visual-grid" />
                <div className="gallery-visual-orbit" />
                {(() => { const Icon = visuals[selected.visual].Icon; return <Icon size={62} strokeWidth={1.1} className="relative z-10 text-[#e0bd78]" />; })()}
                <span className="gallery-visual-label">{visuals[selected.visual].label}</span>
              </div>
              <div className="p-7 sm:p-9">
                <span className="gallery-category">{selected.category}</span>
                <h2 id="gallery-modal-title" className="mt-3 text-2xl font-semibold tracking-tight text-ink">{selected.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{selected.description}</p>
                <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm"><b>Scope example:</b> {selected.scope}</div>
                <p className="mt-4 text-xs leading-5 text-slate-400">Add actual project name, client permission, contract period and verified scope here when available.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
