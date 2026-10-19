import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import ProjectsGallery from "@/components/ProjectsGallery";

export default function ProjectsPage() {
  return (
    <SiteShell active="/projects">
      <PageHero
        eyebrow="PROJECT PORTFOLIO"
        title="Show the work behind your reputation."
        description="Explore a portfolio layout designed for verified hospital, institutional, commercial and maintenance projects."
      />
      <section className="section-pad">
        <div className="site-container">
          <div className="mb-9 max-w-2xl">
            <div className="section-eyebrow">PROJECT CATEGORIES</div>
            <h2 className="section-title mt-4">A portfolio built on verified work.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Filter by work category and open a card for more details. Replace all sample entries with real projects, authorised photographs and verified scope information before publishing.
            </p>
          </div>
          <ProjectsGallery />
        </div>
      </section>
    </SiteShell>
  );
}
