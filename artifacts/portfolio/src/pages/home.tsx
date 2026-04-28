import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { EditorialCard } from "@/components/editorial-card";
import { CountUp } from "@/components/count-up";
import { cn } from "@/lib/utils";

// --- Fade in variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const hairlineDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// --- Data ---
const archiveCategories = [
  "All",
  "Agribusiness & Industry",
  "Sustainability & Impact",
  "Wellness & Lifestyle",
  "Technical & Academic"
];

const archiveItems = [
  {
    title: "Why Nigerian Agritech Founders Are Betting on Cassava",
    publication: "Agrodemy",
    initials: "AG",
    year: "2024",
    dek: "A deep dive into the supply chain shifts repositioning a staple crop as an industrial powerhouse.",
    category: "Agribusiness & Industry",
    pattern: "grid" as const,
  },
  {
    title: "Scaling Cold-Chain Logistics in Sub-Saharan Retail",
    publication: "ShipPack",
    initials: "SP",
    year: "2023",
    dek: "How regional distributors are bypassing infrastructure gaps to deliver perishable goods.",
    category: "Agribusiness & Industry",
    pattern: "diagonal" as const,
  },
  {
    title: "The Quiet Economics of Eco-Packaging",
    publication: "Lead Africa",
    initials: "LA",
    year: "2025",
    dek: "Analyzing the cost-benefit ratio of transitioning to biodegradable packaging for SME manufacturers.",
    category: "Sustainability & Impact",
    pattern: "dots" as const,
  },
  {
    title: "Carbon Accounting for the Modern SME",
    publication: "FAB Magazine",
    initials: "FB",
    year: "2024",
    dek: "Demystifying emissions tracking and ESG compliance for rising African enterprises.",
    category: "Sustainability & Impact",
    pattern: "crosshatch" as const,
  },
  {
    title: "The Metrics of Mindfulness: ROI in Corporate Wellness",
    publication: "Mainland FM",
    initials: "MF",
    year: "2023",
    dek: "Tracking the operational benefits of structured wellness programs in high-growth startups.",
    category: "Wellness & Lifestyle",
    pattern: "diagonal" as const,
  },
  {
    title: "Curating Culture: The New African Aesthetic",
    publication: "FAB Magazine",
    initials: "FB",
    year: "2025",
    dek: "How independent publishers are redefining luxury and lifestyle narratives on the continent.",
    category: "Wellness & Lifestyle",
    pattern: "grid" as const,
  },
  {
    title: "Pedagogy and the Postcolonial Voice",
    publication: "Bloomsbury Academic",
    initials: "BA",
    year: "2024",
    dek: "An analysis of curriculum development in post-independence Nigerian literature programs.",
    category: "Technical & Academic",
    pattern: "dots" as const,
  },
  {
    title: "Structuring SEO for Niche Academic Journals",
    publication: "Bloomsbury Academic",
    initials: "BA",
    year: "2023",
    dek: "Developing technical metadata frameworks to increase visibility of peer-reviewed research.",
    category: "Technical & Academic",
    pattern: "crosshatch" as const,
  },
];

const galleryItems = [
  {
    type: "E-Book",
    title: "Field Notes: Building Agribusiness Authority Online",
    initials: "AG",
    pattern: "grid" as const,
    variant: "primary" as const
  },
  {
    type: "Script",
    title: "Voices of the Mainland — Episode Scripts, Vol. I",
    initials: "MF",
    pattern: "diagonal" as const,
    variant: "secondary" as const
  },
  {
    type: "Academic Paper",
    title: "Identity Reconstruction in Postcolonial Nigerian Fiction",
    initials: "BA",
    pattern: "dots" as const,
    variant: "primary" as const
  },
  {
    type: "Whitepaper",
    title: "The SEO-Led Content System: A Framework for Logistics SaaS",
    initials: "SP",
    pattern: "crosshatch" as const,
    variant: "secondary" as const
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArchive = activeCategory === "All" 
    ? archiveItems 
    : archiveItems.filter(item => item.category === activeCategory);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif font-bold tracking-tight text-lg text-primary">
            Ihuoma Okechukwu.
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide uppercase">
            <button onClick={() => scrollTo("impact")} className="hover:text-primary transition-colors">Work</button>
            <button onClick={() => scrollTo("pillars")} className="hover:text-primary transition-colors">Pillars</button>
            <button onClick={() => scrollTo("archive")} className="hover:text-primary transition-colors">Archive</button>
            <button onClick={() => scrollTo("foundations")} className="hover:text-primary transition-colors">Foundations</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="pt-24 pb-32 px-6 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground border border-border px-3 py-1.5 rounded-none">
                PORTFOLIO · 2026 EDITION · LAGOS / REMOTE
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-8 text-foreground">
              Content Strategy &<br />
              Media <span className="italic text-primary">Communications.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed mb-12">
              Designing SEO-led content systems and end-to-end narratives that drive visibility, perception, and measurable growth.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => scrollTo("case-study")}
                className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 group"
              >
                View Case Studies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-secondary text-secondary px-6 py-3 text-sm font-medium hover:bg-secondary/10 transition-colors flex items-center gap-2">
                Download CV
                <Download className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. The Impact Grid */}
        <section id="impact" className="border-y border-border bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                { end: 900, suffix: "% (9x)", label: "Net Profit Increase", desc: "For Spicy Buds Kilishi via strategic content roadmap." },
                { end: 30, suffix: "%", label: "Organic Traffic Growth", desc: "For ShipPack through SEO-led content systems." },
                { end: 20, suffix: "%", label: "Readership Increase", desc: "For FAB Magazine within a 4-month editorial sprint." }
              ].map((metric, i) => (
                <div key={i} className="p-10 lg:p-16 flex flex-col justify-center">
                  <div className="font-serif text-6xl lg:text-7xl text-primary mb-4 tracking-tighter">
                    <CountUp end={metric.end} suffix={metric.suffix} />
                  </div>
                  <div className="font-bold text-sm uppercase tracking-wide mb-2">{metric.label}</div>
                  <div className="text-sm text-foreground/70 leading-relaxed">{metric.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Strategic Pillars */}
        <section id="pillars" className="py-32 px-6 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-6 mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-primary">Strategic Pillars</h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {[
                {
                  num: "01",
                  title: "Content Operations & Systems",
                  desc: "Building editorial calendars, defining style guides, and structuring workflows that scale.",
                  clients: "ShipPack, Spicy Buds"
                },
                {
                  num: "02",
                  title: "Editorial & Narrative Strategy",
                  desc: "High-level storytelling that shapes brand perception for culture, lifestyle, and media entities.",
                  clients: "FAB Magazine, Mainland FM"
                },
                {
                  num: "03",
                  title: "End-to-End Growth Content",
                  desc: "Full-funnel execution across Blogs, Email, and Social targeting acquisition and retention.",
                  clients: "SaaS, Logistics, Retail"
                }
              ].map((pillar, i) => (
                <motion.div key={i} variants={fadeInUp} className="group">
                  <div className="text-xs font-bold font-mono text-muted-foreground mb-6 border-b border-border pb-4 block">
                    PILLAR {pillar.num}
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/80 mb-6">
                    {pillar.desc}
                  </p>
                  <div className="text-xs font-medium uppercase tracking-wider text-secondary">
                    Context: {pillar.clients}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 4. Case Study Highlight */}
        <section id="case-study" className="bg-primary text-primary-foreground py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="text-xs font-bold tracking-widest uppercase text-primary-foreground/60 mb-6 border-b border-primary-foreground/20 inline-block pb-2">
                CASE STUDY HIGHLIGHT · SPICY BUDS KILISHI
              </div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-8">
                From Founder-dependency<br />to <span className="italic">9x Profit.</span>
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl leading-relaxed">
                How I built a 6-month content roadmap, structured a media team, and scaled organic traffic by 40% to drive unprecedented revenue growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-primary-foreground/20 pt-12">
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-secondary-foreground">The Challenge</h3>
                <p className="text-sm leading-relaxed text-primary-foreground/70">
                  The brand relied entirely on the founder's personal network for sales. There was no documented content strategy, erratic posting schedules, and zero SEO footprint, creating a severe bottleneck for scale.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-secondary-foreground">The Approach</h3>
                <p className="text-sm leading-relaxed text-primary-foreground/70">
                  Audited existing assets and developed a comprehensive 6-month content roadmap. I recruited and structured a lean media team, instituted an editorial calendar, and launched an SEO-driven blog targeting high-intent retail queries.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-secondary-foreground">The Result</h3>
                <p className="text-sm leading-relaxed text-primary-foreground/70 mb-6">
                  Systematized content production leading to a <span className="font-bold text-primary-foreground">+40% organic traffic</span> surge within two quarters, ultimately contributing to a <span className="font-bold text-primary-foreground">9x increase in net profit</span>.
                </p>
                <div className="text-xs text-primary-foreground/50 border-t border-primary-foreground/20 pt-4">
                  Role: Lead Content Strategist · Period: 2024 – 2025
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Archive */}
        <section id="archive" className="py-32 px-6 max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-serif text-4xl text-primary mb-4">The Archive</h2>
              <p className="text-foreground/70 text-sm max-w-md">
                A curated ledger of published work, strategy teardowns, and editorial pieces across sectors.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {archiveCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-xs font-medium px-4 py-2 border transition-colors",
                    activeCategory === cat 
                      ? "bg-foreground text-background border-foreground" 
                      : "border-border text-foreground hover:border-foreground/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border">
            {filteredArchive.map((item, i) => (
              <motion.article 
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row gap-6 py-8 border-b border-border hover:bg-muted/30 transition-colors px-4 -mx-4"
              >
                <div className="w-24 md:w-32 flex-shrink-0">
                  <EditorialCard initials={item.initials} pattern={item.pattern} />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                    <span>{item.publication}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>{item.year}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-secondary">{item.category}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed max-w-3xl">
                    {item.dek}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 6. Foundations */}
        <section id="foundations" className="bg-muted py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-4xl text-primary">Foundations</h2>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              <p className="text-lg leading-relaxed text-foreground/80 mb-6">
                My approach to strategy is rooted in academic rigor. With a B.A. in English and Literary Studies from the <span className="font-semibold text-foreground">University of Nigeria, Nsukka (UNN)</span>, my foundational training revolves around critical analysis, narrative structure, and rhetorical intent.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                My research focus on <span className="font-semibold text-foreground">Postcolonial Identity & Identity Reconstruction</span> informs how I build brand narratives—understanding that every piece of content exists within a broader cultural and systemic context. It is this depth that separates disposable writing from enduring strategy.
              </p>
            </div>
            
            <div className="bg-background border border-border p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8 border-b border-border pb-4 block">
                CREDENTIAL LEDGER
              </h3>
              
              <dl className="space-y-6">
                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Degree</dt>
                  <dd className="font-serif text-lg text-primary">B.A. English & Literary Studies</dd>
                  <dd className="text-sm text-foreground/80">University of Nigeria, Nsukka (UNN)</dd>
                </div>
                
                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Primary Research Focus</dt>
                  <dd className="font-serif text-lg text-primary">Postcolonial Identity Reconstruction</dd>
                </div>
                
                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Academic Interests</dt>
                  <dd className="text-sm text-foreground/80 leading-relaxed">
                    Postcolonial discourse <span className="mx-2 text-border">|</span> 
                    Narrative voice <span className="mx-2 text-border">|</span> 
                    Cultural memory <span className="mx-2 text-border">|</span>
                    Rhetorical framing
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 7. Document Gallery */}
        <section className="py-32 px-6 max-w-6xl mx-auto border-b border-border">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-primary">Document Gallery</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <EditorialCard 
                  initials={item.initials} 
                  pattern={item.pattern} 
                  variant={item.variant}
                  className="mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500" 
                />
                <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">
                  {item.type}
                </div>
                <h3 className="font-serif text-lg leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-3">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-secondary group-hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider">
                  Request Access <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 8. Footer / Contact */}
      <footer id="contact" className="bg-background pt-32 pb-12 px-6 max-w-6xl mx-auto">
        <div className="mb-32 max-w-2xl">
          <h2 className="font-serif text-5xl md:text-7xl text-primary mb-8 tracking-tight">Let's work together.</h2>
          <p className="text-lg text-foreground/70 mb-10">
            Available for strategic consulting, content operations audits, and end-to-end editorial projects.
          </p>
          <a 
            href="mailto:ihuoma.okechukwu@portfolio.example" 
            className="inline-flex items-center gap-3 text-xl md:text-2xl font-medium border-b-2 border-primary pb-2 hover:text-primary hover:border-foreground transition-colors"
          >
            ihuoma.okechukwu@portfolio.example
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-border text-sm text-foreground/60">
          <p className="font-serif italic text-lg text-primary">Strategic Storytelling. Measurable Results.</p>
          
          <div className="flex items-center gap-8 font-medium">
            <a href="#" className="hover:text-primary hover:underline underline-offset-4 transition-all">LinkedIn</a>
            <a href="#" className="hover:text-primary hover:underline underline-offset-4 transition-all">Medium</a>
            <span>© 2026 Ihuoma Okechukwu</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
