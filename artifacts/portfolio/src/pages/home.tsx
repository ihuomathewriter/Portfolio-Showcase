import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Linkedin, Instagram, Menu, X } from "lucide-react";
import { EditorialCard } from "@/components/editorial-card";
import { CountUp } from "@/components/count-up";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const archiveCategories = [
  "All",
  "Logistics & Trade",
  "Digital Marketing",
  "Sustainability & Impact",
  "Copywriting & Landing Pages",
  "Technical & Academic",
  "Lifestyle & Culture"
];

const archiveItems = [
  {
    title: "AfCFTA Impact: What African Businesses Need to Know",
    publication: "ShipPack",
    initials: "SP",
    year: "2024",
    dek: "How the African Continental Free Trade Area reshapes cross-border logistics and SME strategy.",
    category: "Logistics & Trade",
    tag: "Logistics & Trade | SEO Article",
    pattern: "grid" as const,
    link: "https://docs.google.com/document/d/1BEgr71M8uMq8A1_3ZOGGU_YrgV-h9McSMFzevFf47YU/edit?usp=sharing",
    image: "/afcfta-impact.jpg",
  },
  {
    title: "4 Influencer Marketing Strategies for Small Businesses",
    publication: "Digital Strategy",
    initials: "DS",
    year: "2024",
    dek: "Practical, budget-conscious influencer frameworks that deliver measurable returns for lean teams.",
    category: "Digital Marketing",
    tag: "Digital Marketing | Strategy",
    pattern: "diagonal" as const,
    link: "https://docs.google.com/document/d/1HL_jYn_KR5eZ_KdszmVY8aU0DHWiXHLTaTR_ETflF5U/edit?usp=sharing",
    image: "/influencer-marketing.png",
  },
  {
    title: "How Small Businesses Can Build Customer Loyalty With Green Packaging",
    publication: "ShipPack",
    initials: "SP",
    year: "2024",
    dek: "Analyzing the loyalty and cost-benefit dynamics of transitioning to biodegradable packaging for SME manufacturers.",
    category: "Sustainability & Impact",
    tag: "Sustainability | Small Business",
    pattern: "dots" as const,
    link: "https://docs.google.com/document/d/13EsSzW8KlVFXWYsdhIv43nmgwnd-31oaP932FCKVanY/edit?usp=sharing",
    image: "/green-packaging.png",
  },
  {
    title: "Landing Page Sample",
    publication: "Copywriting Portfolio",
    initials: "CP",
    year: "2024",
    dek: "A conversion-optimised landing page demonstrating persuasive copy structure, benefit-led hierarchy, and CTA design.",
    category: "Copywriting & Landing Pages",
    tag: "Copywriting | Landing Page",
    pattern: "crosshatch" as const,
    link: "https://docs.google.com/document/d/1FVd4Kq4APQENtJRcun_uadWFJmtgNjdPRobcT8OHutc/edit?usp=sharing",
    image: "/landing-page-sample.png",
  },
  {
    title: "Published Chapter — Bloomsbury Academic Press",
    publication: "Bloomsbury Academic",
    initials: "BA",
    year: "2024",
    dek: "A peer-reviewed contribution to postcolonial African literary studies — full reference and link available soon.",
    category: "Technical & Academic",
    tag: "Academic | Postcolonial Studies",
    pattern: "dots" as const,
    link: null,
    comingSoon: true,
  },
  {
    title: "5 Best Nigerian Contemporary Novels to Read in 2024",
    publication: "Medium",
    initials: "MD",
    year: "2024",
    dek: "A curated reading list at the intersection of modern Nigerian fiction, cultural memory, and global literary awards.",
    category: "Lifestyle & Culture",
    tag: "Lifestyle | Book Reviews",
    pattern: "diagonal" as const,
    link: "https://medium.com/@ihuomathewriter",
  },
];

const shippackCards = [
  {
    type: "Email Newsletter Series",
    title: "ShipPack Weekly Email Drops — Series A",
    desc: "Conversion-focused weekly newsletters blending brand storytelling, logistics education, and warm community voice.",
    link: "https://docs.google.com/document/d/17al8VworD-dFW9b6D0J4L4yyLEKa5Pj3_4SJ5Shb2NA/edit?usp=sharing",
    buttonLabel: "View Document",
    isPdf: false,
  },
  {
    type: "Email Newsletter Series",
    title: "ShipPack Weekly Email Drops — Series B",
    desc: "Retention and engagement-led email copy, including the viral \"Quitters Don't Win\" campaign and motivational series.",
    link: "https://docs.google.com/document/d/1NtkhFJrnczyxNIPqLCPL-qMgzQzgb7N9-Rvb3oAISto/edit?usp=sharing",
    buttonLabel: "View Document",
    isPdf: false,
  },
  {
    type: "Email Newsletter Series",
    title: "ShipPack Weekly Email Drops — Series C",
    desc: "Educational and product-led emails covering logistics strategy, delivery tips, and platform updates.",
    link: "https://docs.google.com/document/d/1COjANQyj_LVlW6AGHEYaAisgwCs8I7Z7GIolbqhD6TU/edit?usp=sharing",
    buttonLabel: "View Document",
    isPdf: false,
  },
  {
    type: "Email Newsletter Series",
    title: "ShipPack Weekly Email Drops — Series D",
    desc: "Community-building and seasonal email campaigns including Easter, Q1 wrap-up, and TikTok launch announcements.",
    link: "https://docs.google.com/document/d/1FSEflgkUANW3N0JxniXGZ5QGM-xv8Jq03AXTSgD1DAA/edit?usp=sharing",
    buttonLabel: "View Document",
    isPdf: false,
  },
  {
    type: "Content Calendar",
    title: "6-Month Editorial Calendar (July–December)",
    desc: "Full daily content calendar across Instagram, Facebook, LinkedIn, and TikTok — including captions, content types, design briefs, and hashtag strategy.",
    link: "/Content_Calendar_For_ShipPack.pdf",
    buttonLabel: "Download Calendar (PDF)",
    isPdf: true,
  },
  {
    type: "Social Media Performance",
    title: "Organic Growth Report — ShipPack",
    desc: "Six months of organic social media performance across four platforms. Follower growth from 750 to 1,600+. LinkedIn engagement rate peaked at 16.4%. Twitter impressions grew 7x. Key insight: trend-led and leisure content consistently outperformed promotional posts, leading to a strategic pivot toward Reels and carousels.",
    link: null,
    buttonLabel: null,
    isPdf: false,
    isTextSummary: true,
  },
  {
    type: "Audience Research",
    title: "ShipPack Customer Persona Profile — Document A",
    desc: "Audience research and persona documentation developed to inform ShipPack's content targeting and campaign strategy.",
    link: "https://docs.google.com/document/d/1qQfaL51SPHptJ5XB0L-rIc3vrV9mtO-5qlGWXOB4pT0/edit?usp=sharing",
    buttonLabel: "View Document",
    isPdf: false,
  },
  {
    type: "Audience Research",
    title: "ShipPack Customer Persona Profile — Document B",
    desc: "Extended persona and growth strategy documentation covering audience segmentation and content direction.",
    link: "https://docs.google.com/document/d/1VKkwCaqXaWt-MlaM281QxdR5tMhzosppHbn45YhemTs/edit?usp=sharing",
    buttonLabel: "View Document",
    isPdf: false,
  },
  {
    type: "Growth Strategy",
    title: "Content Growth Strategy — ShipPack",
    desc: "Strategic content and growth planning document covering channel direction, content pillars, and campaign frameworks.",
    link: "https://docs.google.com/document/d/1dpaOc1aMji6bOg6XKr23VIorBDLSVcOV7muicUYrPSc/edit?tab=t.0",
    buttonLabel: "View Document",
    isPdf: false,
  },
];

const resourceItems = [
  {
    type: "Checklist",
    title: "25 Best Practices for Sustainable Logistics",
    desc: "A practical checklist for building a resilient, efficient, and future-proof supply chain. Covers operations, energy efficiency, sustainability standards, automation, and long-term growth.",
    file: "/Checklist__25_Best_Practices_for_Sustainable_Logistics_.pdf",
    buttonLabel: "Download Checklist (PDF)",
    initials: "SL",
    pattern: "grid" as const,
    image: "/resource-sustainable-logistics.png",
  },
  {
    type: "Toolkit",
    title: "International Shipping Cost-Reduction Toolkit (2025 Edition)",
    desc: "A step-by-step toolkit for reducing international shipping costs. Includes forecast sheets, carrier comparison tools, a freight forwarder vetting checklist, a negotiation cheat sheet, and a KPI dashboard template.",
    file: "/International_Shipping_Cost-Reduction_Toolkit__2025_Edition___1_.pdf",
    buttonLabel: "Download Toolkit (PDF)",
    initials: "SC",
    pattern: "diagonal" as const,
    image: "/resource-shipping-toolkit.png",
  },
  {
    type: "Checklist",
    title: "Perishable Export Compliance Checklist (2025 Edition)",
    desc: "A pre-dispatch control tool for African exporters shipping perishable goods across borders. Covers product assessment, cold-chain integrity, documentation, customs, and final verification.",
    file: "/Cold-Chain_Export_Readiness_Checklist_.pdf",
    buttonLabel: "Download Checklist (PDF)",
    initials: "PE",
    pattern: "crosshatch" as const,
    image: "/resource-perishable-export.png",
  },
];

const NAV_LINKS = [
  { label: "Work", id: "impact" },
  { label: "Cases", id: "case-studies" },
  { label: "Pillars", id: "pillars" },
  { label: "Archive", id: "archive" },
  { label: "Foundations", id: "foundations" },
  { label: "History", id: "work-history" },
  { label: "Certs", id: "certifications" },
  { label: "Resources", id: "resources" },
  { label: "Contact", id: "contact" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredArchive = activeCategory === "All"
    ? archiveItems
    : archiveItems.filter(item => item.category === activeCategory);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="font-serif font-bold tracking-tight text-lg text-primary flex-shrink-0">
            Ihuoma Okechukwu.
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 text-[10px] font-bold tracking-widest uppercase overflow-x-auto scrollbar-none">
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 rounded hover:text-primary hover:bg-primary/8 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-sm">
            <nav className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-3 gap-1">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-[10px] font-bold tracking-widest uppercase text-foreground/80 hover:text-primary hover:bg-primary/8 px-3 py-3 rounded text-center transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>

        {/* 1. Hero Section */}
        <section className="pt-24 pb-32 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex-1"
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground border border-border px-3 py-1.5">
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

            </motion.div>

            {/* Hero headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end flex-shrink-0"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary ring-1 ring-primary/20 ring-offset-4 ring-offset-background">
                  <img
                    id="hero-headshot"
                    src="/headshot-placeholder.jpg"
                    alt="Ihuoma Okechukwu — Content Strategist and Media Communications Specialist"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.backgroundColor = "hsl(var(--muted))";
                        parent.style.display = "flex";
                        parent.style.alignItems = "center";
                        parent.style.justifyContent = "center";
                        const label = document.createElement("span");
                        label.className = "font-serif text-4xl font-bold text-primary";
                        label.textContent = "IO";
                        parent.appendChild(label);
                      }
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-background border border-border px-3 py-1.5">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground">6+ Years Experience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. The Impact Grid */}
        <section id="impact" className="border-y border-border bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">

              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="font-serif text-6xl lg:text-7xl text-primary mb-4 tracking-tighter">
                  <CountUp end={900} suffix="% (9x)" />
                </div>
                <div className="font-bold text-sm uppercase tracking-wide mb-2">Net Profit Increase</div>
                <div className="text-sm text-foreground/70 leading-relaxed">
                  Increase in net profit for Spicy Buds Kilishi via a structured 6-month content roadmap and media team build-out.
                </div>
              </div>

              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="font-serif text-3xl lg:text-4xl text-primary mb-4 tracking-tight font-bold leading-snug">
                  SEO-Led Growth System
                </div>
                <div className="font-bold text-sm uppercase tracking-wide mb-2">Content Operations</div>
                <div className="text-sm text-foreground/70 leading-relaxed">
                  Built and managed an SEO-led content system for ShipPack that drove consistent organic traffic growth across blog, email, and social channels — without paid ads.
                </div>
              </div>

              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="font-serif text-6xl lg:text-7xl text-primary mb-4 tracking-tighter">
                  <CountUp end={20} suffix="%" />
                </div>
                <div className="font-bold text-sm uppercase tracking-wide mb-2">Readership Increase</div>
                <div className="text-sm text-foreground/70 leading-relaxed">
                  Increase in readership and impressions for FAB Magazine within 4 months of content restructuring.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Case Studies */}
        <div id="case-studies">

          {/* ShipPack Case Study */}
          <section className="py-32 px-6 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-secondary border-b border-secondary pb-1">
                  CASE STUDY · SHIPPACK
                </span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                ShipPack: Building Brand Visibility<br className="hidden md:block" /> Through Content
              </motion.h2>

              <motion.div variants={fadeInUp} className="mb-6">
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  Role: Content Writer &amp; Strategist · Aug 2024 – Present
                </span>
              </motion.div>
              <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <p className="text-base leading-relaxed text-foreground/80">
                  Managed ShipPack's full content and social media operation across Facebook, Instagram, LinkedIn, and Twitter. Grew the brand's LinkedIn following from <strong className="text-foreground">750 to over 1,600</strong> organically through a structured content strategy that included trend-led posts, educational carousels, email newsletters, and community engagement.
                </p>
                <p className="text-base leading-relaxed text-foreground/80">
                  Produced and managed editorial content calendars covering daily posts across four platforms. Authored the brand's weekly email newsletter series. Developed thought leadership articles, lead magnets, a customer persona profile, and a structured social media performance reporting system tracking reach, engagement rate, impressions, and overall growth.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 border-t border-border pt-12">
                {[
                  { stat: "750 → 1,600+", label: "LinkedIn Followers" },
                  { stat: "16.4%", label: "LinkedIn Engagement Rate Peak" },
                  { stat: "7×", label: "Twitter Impression Growth" },
                  { stat: "0", label: "Paid Ad Spend" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/40 border border-border p-6">
                    <div className="font-serif text-3xl text-primary mb-2">{item.stat}</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-foreground/70">{item.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.p variants={fadeInUp} className="text-sm text-foreground/70 leading-relaxed max-w-4xl mb-16 border-l-2 border-primary pl-6">
                Key outcome: ShipPack's Instagram account was recognised and reshared by larger accounts in the logistics space — generating brand visibility beyond its follower count. Identified that trend-led, leisure, and celebration content consistently outperformed promotional posts — a finding that directly shaped the content pivot to Reels and carousels in Q1 2025.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8 border-b border-border pb-4">
                  WORK SAMPLES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shippackCards.map((card, i) => (
                    <div key={i} className={cn(
                      "border border-border p-6 flex flex-col",
                      card.isTextSummary ? "bg-muted/40" : "bg-background"
                    )}>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-secondary mb-3">{card.type}</div>
                      <h4 className="font-serif text-base leading-snug mb-3 flex-1">{card.title}</h4>
                      <p className="text-xs text-foreground/70 leading-relaxed mb-4">{card.desc}</p>
                      {card.link && !card.isTextSummary && (
                        <>
                          {card.isPdf ? (
                            <a
                              href={card.link}
                              download
                              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors self-start"
                            >
                              <Download className="w-3 h-3" />
                              {card.buttonLabel}
                            </a>
                          ) : (
                            <>
                              <a
                                href={card.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors self-start mb-2"
                              >
                                <ArrowRight className="w-3 h-3" />
                                {card.buttonLabel}
                              </a>
                              <span className="text-[10px] text-muted-foreground">Opens in Google Docs — no sign-in required.</span>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Spicy Buds Case Study */}
          <section className="bg-primary text-primary-foreground py-32 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <div className="text-xs font-bold tracking-widest uppercase text-primary-foreground/60 mb-6 border-b border-primary-foreground/20 inline-block pb-2">
                  CASE STUDY · SPICY BUDS KILISHI
                </div>
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-8">
                  From Founder-dependency<br />to <span className="italic">9x Revenue Growth.</span>
                </h2>
                <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl leading-relaxed">
                  How I built a 6-month content roadmap, structured a media team, and scaled organic traffic by 40% to drive unprecedented revenue growth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-primary-foreground/20 pt-12 mb-16">
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-primary-foreground/60">The Challenge</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/70">
                    The brand relied entirely on the founder's personal network for sales. There was no documented content strategy, erratic posting schedules, and zero SEO footprint, creating a severe bottleneck for scale.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-primary-foreground/60">The Approach</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/70">
                    Audited existing assets and developed a comprehensive 6-month content roadmap. Recruited and structured a lean media team, instituted an editorial calendar, and launched an SEO-driven blog targeting high-intent retail queries.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-primary-foreground/60">The Result</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/70 mb-6">
                    Systematized content production leading to a <span className="font-bold text-primary-foreground">+40% organic traffic</span> surge within two quarters, ultimately contributing to a <span className="font-bold text-primary-foreground">9x increase in net profit</span>.
                  </p>
                  <div className="text-xs text-primary-foreground/50 border-t border-primary-foreground/20 pt-4">
                    Role: Content Manager · Period: Jan 2023 – Oct 2023
                  </div>
                </div>
              </div>

              <div className="border-t border-primary-foreground/20 pt-12">
                <div className="text-xs font-bold tracking-widest uppercase text-primary-foreground/60 mb-6">FULL CASE STUDY</div>
                <div className="border border-primary-foreground/20 p-8 max-w-xl">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-primary-foreground/50 mb-3">Document</div>
                  <h3 className="font-serif text-xl text-primary-foreground mb-3 leading-snug">
                    Driving 9× Revenue Growth Through Strategic Content
                  </h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">
                    A detailed case study of the 6-month content roadmap, media team structure, and organic traffic strategy that produced a 900% increase in net profit for Spicy Buds Kilishi.
                  </p>
                  <a
                    href="https://docs.google.com/document/d/1vWR6x69sW-AMJFnk5xhRUkqbACieasbigCy2_iH-izA/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary-foreground px-5 py-2.5 hover:bg-primary-foreground/90 transition-colors mb-2"
                  >
                    Read Case Study <ArrowRight className="w-3 h-3" />
                  </a>
                  <div className="text-[10px] text-primary-foreground/40 mt-2">Opens in Google Docs — no sign-in required.</div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* 4. Strategic Pillars */}
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

        {/* 5. The Archive */}
        <section id="archive" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
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
                  {"image" in item && item.image ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <EditorialCard initials={item.initials} pattern={item.pattern} />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                    <span>{item.publication}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>{item.year}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-secondary">{item.tag}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed max-w-3xl mb-4">
                    {item.dek}
                  </p>
                  {item.comingSoon ? (
                    <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground border border-border self-start">
                      Peer Reviewed / Published — Link Coming Soon
                    </span>
                  ) : item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors self-start group/link"
                    >
                      Read
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  ) : null}
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
              <p className="text-lg leading-relaxed text-foreground/80">
                Ihuoma Okechukwu holds a B.A. in English and Literary Studies from the University of Nigeria, Nsukka, where her undergraduate research focused on postcolonial identity and memory in contemporary African fiction — work that later became a published chapter with Bloomsbury Academic Press. She is an incoming M.A. student and Teaching Fellow in the English Department at <span className="font-semibold text-foreground">Lehigh University (Fall 2026)</span>, where her research continues at the intersection of postcolonial African fiction, spatial theory, and digital humanities. Her academic background shapes how she approaches content — not as a production task, but as an act of positioning, narrative, and meaning-making.
              </p>
            </div>

            <div className="bg-background border border-border p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8 border-b border-border pb-4 block">
                CREDENTIAL LEDGER
              </h3>

              <dl className="space-y-6">
                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Undergraduate Degree</dt>
                  <dd className="font-serif text-lg text-primary">B.A. English & Literary Studies</dd>
                  <dd className="text-sm text-foreground/80">University of Nigeria, Nsukka (UNN) · Graduated May 2024</dd>
                </div>

                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Graduate Study (Incoming, Fall 2026)</dt>
                  <dd className="font-serif text-lg text-primary">M.A. English · Teaching Fellow</dd>
                  <dd className="text-sm text-foreground/80">Lehigh University</dd>
                </div>

                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Research Focus</dt>
                  <dd className="font-serif text-lg text-primary">Postcolonial African Fiction</dd>
                  <dd className="text-sm text-foreground/80">Spatial theory · Digital humanities · Identity reconstruction</dd>
                </div>

                <div>
                  <dt className="text-xs text-foreground/60 uppercase mb-1">Published Work</dt>
                  <dd className="text-sm text-foreground/80 leading-relaxed">
                    Bloomsbury Academic Press <span className="mx-2 text-border">|</span>
                    Postcolonial discourse <span className="mx-2 text-border">|</span>
                    Cultural memory
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 7. Experience Timeline */}
        <section id="work-history" className="py-32 px-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-primary">Work History</h2>
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">6+ Years</span>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block"></div>

            {[
              {
                role: "Content Writer & Strategist",
                company: "ShipPack",
                period: "Aug 2024 – Present",
                location: "Remote",
                type: "Logistics & Technology",
                bullets: [
                  "Planned and executed digital content across blogs, email, and social media to grow audience engagement and brand visibility.",
                  "Collaborated with design and growth teams on coordinated campaigns across multiple channels.",
                  "Used analytics and performance reports to refine strategy and improve reach and growth.",
                  "Maintained editorial calendars and content workflows for consistency and timely delivery.",
                ],
              },
              {
                role: "Content Writer & Social Media Manager",
                company: "FAB Magazine",
                period: "Jan – May 2024",
                location: "Lagos, Nigeria",
                type: "Media & Publishing",
                bullets: [
                  "Developed and published editorial and social media content tailored to audience interests and cultural conversations.",
                  "Grew online readership and social media impressions through audience-focused storytelling.",
                  "Monitored engagement metrics and adjusted content formats to improve performance.",
                ],
              },
              {
                role: "Writing Assistant & Marketing Intern",
                company: "Mainland FM 98.3",
                period: "Jan – May 2024",
                location: "Lagos, Nigeria",
                type: "Radio & Broadcasting",
                bullets: [
                  "Wrote scripts and promotional content for radio programmes and advertisements.",
                  "Supported marketing and communications through documentation, proposals, and audience-focused messaging.",
                  "Collaborated with team members on station promotions and client outreach.",
                ],
              },
              {
                role: "Content Manager",
                company: "Spicy Buds Kilishi",
                period: "Jan 2023 – Oct 2023",
                location: "Enugu, Nigeria",
                type: "FMCG & E-commerce",
                bullets: [
                  "Led digital content and social media strategy, resulting in significant growth in organic traffic and engagement.",
                  "Designed and managed a six-month content calendar aligned with brand and growth objectives.",
                  "Coordinated a small content team, ensuring quality, consistency, and timely delivery.",
                  "Tracked performance metrics and used insights to optimize digital campaigns.",
                ],
              },
              {
                role: "Content Writer",
                company: "IXORA Yoga",
                period: "Nov 2021 – Feb 2022",
                location: "Remote",
                type: "Wellness & Lifestyle",
                bullets: [
                  "Produced blogs, newsletters, and social media content to support brand engagement and community building.",
                  "Managed content schedules and compiled performance insights for internal review.",
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative md:pl-10 pb-12 last:pb-0 group"
              >
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary hidden md:block -translate-x-[3px] group-hover:scale-125 transition-transform"></div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-serif text-xl text-foreground leading-tight">{item.role}</h3>
                    <p className="text-sm font-bold text-primary mt-0.5">{item.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                    <span className="text-xs font-mono text-foreground/70 bg-muted px-2 py-1 self-start sm:self-auto">{item.period}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-secondary border border-secondary/40 px-2 py-0.5">{item.type}</span>
                </div>

                <ul className="space-y-1.5">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
                      {b}
                    </li>
                  ))}
                </ul>

                {i < 4 && <div className="mt-12 h-px bg-border md:hidden"></div>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. Certifications */}
        <section id="certifications" className="bg-muted py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-primary">Certifications & Training</h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  year: "2020",
                  issuer: "African Leadership Institute",
                  credential: "Certificate in Content Creation & Social Media Management",
                  focus: "Content creation, platform strategy, and digital campaign management across social media channels.",
                  tag: "Content & Social",
                },
                {
                  year: "2025",
                  issuer: "Chartered Institute",
                  credential: "Contract, Project & Facility Management",
                  focus: "Professional training in project management frameworks, contract administration, and facility operations.",
                  tag: "Management",
                },
                {
                  year: "2025",
                  issuer: "SEMrush Academy",
                  credential: "SEO & Content Marketing",
                  focus: "Advanced SEO strategy, keyword research, on-page optimisation, and content marketing for organic growth.",
                  tag: "SEO & Analytics",
                },
              ].map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-border p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-secondary border border-secondary/40 px-2 py-0.5 self-start">{cert.tag}</span>
                    <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{cert.issuer}</p>
                  <h3 className="font-serif text-lg leading-snug text-foreground mb-4 flex-1">{cert.credential}</h3>
                  <div className="h-px bg-border mb-4"></div>
                  <p className="text-sm text-foreground/65 leading-relaxed">{cert.focus}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Resources */}
        <section id="resources" className="py-32 px-6 max-w-6xl mx-auto border-b border-border">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-primary">Resources</h2>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resourceItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col border border-border"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {"image" in item && item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <EditorialCard
                      initials={item.initials}
                      pattern={item.pattern}
                      variant={i % 2 === 0 ? "primary" : "secondary"}
                      className="h-full rounded-none"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-secondary mb-3">{item.type}</div>
                  <h3 className="font-serif text-xl leading-snug mb-3 flex-1">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-6">{item.desc}</p>
                  <a
                    href={item.file}
                    download
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-foreground bg-primary px-5 py-3 hover:bg-primary/90 transition-colors self-start"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {item.buttonLabel}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* 8. Footer / Contact */}
      <footer id="contact" className="bg-foreground text-background pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 max-w-2xl">
            <h2 className="font-serif text-5xl md:text-7xl text-primary mb-8 tracking-tight">Let's work together.</h2>
            <p className="text-lg text-background/70 mb-10">
              Available for strategic consulting, content operations audits, and end-to-end editorial projects.
            </p>
            <a
              href="mailto:ihuomathewriter@gmail.com"
              className="inline-flex items-center gap-3 text-xl md:text-2xl font-medium border-b-2 border-primary pb-2 hover:text-primary transition-colors"
            >
              ihuomathewriter@gmail.com
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="border-t border-background/20 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <p className="font-serif italic text-xl text-primary">Strategic Storytelling. Measurable Results.</p>

              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/ihuoma-okechukwu-1441a61b8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-primary" />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/ihuoma_okechukwu__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4 text-primary" />
                  Instagram
                </a>
                <a
                  href="https://medium.com/@ihuomathewriter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  Medium
                </a>
                <a
                  href="https://www.tiktok.com/@ihuomawrites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z"/>
                  </svg>
                  TikTok
                </a>
              </div>
            </div>

            <div className="mt-8 text-xs text-background/40">
              © 2026 Ihuoma Okechukwu
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
