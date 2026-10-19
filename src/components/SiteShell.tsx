"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Languages, Menu, X, ArrowRight } from "lucide-react";

export default function SiteShell({ children, active }: { children: React.ReactNode; active?: string }) {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("hst-language");
    if (saved === "hi" || saved === "en") setLang(saved);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll<HTMLElement>(".section-pad > .site-container, .service-card, .project-card, .contact-form, .contact-note, .page-hero");
    targets.forEach((el, index) => {
      el.classList.add("motion-reveal");
      el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  function toggleLanguage() {
    setLang(current => {
      const next = current === "en" ? "hi" : "en";
      window.localStorage.setItem("hst-language", next);
      return next;
    });
    window.dispatchEvent(new CustomEvent("hst-language-change"));
  }
  const nav = lang === "en"
    ? [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["Tender Experience", "/tenders"], ["Certificates", "/certificates"], ["Contact", "/contact"]]
    : [["होम", "/"], ["हमारे बारे में", "/about"], ["सेवाएँ", "/services"], ["प्रोजेक्ट", "/projects"], ["टेंडर अनुभव", "/tenders"], ["प्रमाणपत्र", "/certificates"], ["संपर्क", "/contact"]];
  return <div className="min-h-screen bg-white text-ink">
    <div className="topline"><div className="site-container flex justify-between gap-3 py-2 text-[10px] font-semibold uppercase tracking-[.15em] text-white/70 sm:text-xs"><span>ENGINEERING • MAINTENANCE • FACILITY MANAGEMENT</span><span className="hidden sm:block">HST ENTERPRISES</span></div></div>
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl"><div className="site-container flex min-h-[76px] items-center justify-between gap-4 py-3">
      <Link href="/" className="flex shrink-0 items-center gap-3"><span className="brand-mark"><Building2 size={23}/></span><span className="leading-tight"><span className="block text-[16px] font-black tracking-[.1em]">HST <span className="text-gold">ENTERPRISES</span></span><span className="mt-1 block text-[9px] font-semibold tracking-[.14em] text-slate-500">ENGINEERING & FACILITY SERVICES</span></span></Link>
      <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 lg:flex">{nav.map(([label, href])=><Link key={href} href={href} className={`text-xs font-semibold transition hover:text-amber-700 ${active===href ? "text-amber-700" : "text-slate-600"}`}>{label}</Link>)}</nav>
      <div className="flex items-center gap-2"><button onClick={toggleLanguage} className="lang-button" aria-label="Change language"><Languages size={15}/><span className="hidden sm:inline">{lang==="en"?"हिन्दी":"English"}</span></button><Link href="/contact" className="button button-dark hidden !px-4 !py-3 sm:inline-flex">{lang==="en"?"Enquire":"पूछताछ"}<ArrowRight size={14}/></Link><button onClick={()=>setOpen(!open)} className="rounded-full border border-slate-200 p-2.5 lg:hidden" aria-label="Toggle navigation">{open?<X size={19}/>:<Menu size={19}/>}</button></div>
    </div>{open&&<nav className="border-t border-slate-100 bg-white px-6 py-4 lg:hidden">{nav.map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} href={href} className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700">{label}</Link>)}</nav>}</header>
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: "easeOut" }}>
      {children}
    </motion.div>
    <footer className="footer"><div className="site-container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-sm font-black tracking-[.13em] text-white">HST <span className="text-gold">ENTERPRISES</span></Link><p className="text-xs text-slate-400">Engineering and maintenance, delivered with accountability.</p><p className="text-[11px] text-slate-500">© 2026 HST ENTERPRISES. All rights reserved.</p></div><div className="site-container border-t border-white/10 py-4 text-[10px] leading-5 text-slate-500">Website content is illustrative. Publish only verified company details, registrations, certifications and project references.</div></footer>
  </div>;
}
