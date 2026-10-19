import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="hero-section relative isolate overflow-hidden py-20 sm:py-24"><div className="hero-grid"/><div className="hero-glow hero-glow-one"/><div className="site-container relative z-10"><div className="hero-label"><span className="h-px w-8 bg-gold"/>{eyebrow}</div><h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-[-.045em] text-white sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">{description}</p><Link href="/contact" className="button button-gold mt-8">Discuss a requirement <ArrowRight size={16}/></Link></div></section>;
}
