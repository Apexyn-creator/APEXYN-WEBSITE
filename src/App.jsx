import { useState, useEffect, useRef } from "react";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target, duration = 2000, trigger) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

// ── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Icons (inline SVG) ─────────────────────────────────────────────────────
const Icon = {
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/></svg>,
  resume: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.47 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
};

// ── Glassmorphism card ─────────────────────────────────────────────────────
const GlassCard = ({ children, className = "", hover = true }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${hover ? "transition-all duration-300 hover:border-blue-500/30 hover:bg-white/8 hover:-translate-y-1" : ""} ${className}`}>
    {children}
  </div>
);

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services", "Why Us", "Process", "Pricing", "Contact"];
  const scrollTo = (id) => { document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080c14]/90 backdrop-blur-md border-b border-white/8 py-3" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4L32 36H26.5L22 15L17.5 36H12L22 4Z" fill="url(#navLogoGrad)"/>
            <path d="M14 36C18 27 24 24 33 18" stroke="url(#navLogoGrad2)" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
            <circle cx="22" cy="4" r="2.2" fill="#67e8f9"/>
            <defs>
              <linearGradient id="navLogoGrad" x1="12" y1="4" x2="32" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa"/>
                <stop offset="1" stopColor="#1d4ed8"/>
              </linearGradient>
              <linearGradient id="navLogoGrad2" x1="14" y1="36" x2="33" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1d4ed8"/>
                <stop offset="1" stopColor="#67e8f9"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="font-black text-3xl tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">Apexyn <span className="text-cyan-300">Solutions</span></span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">{l}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="mailto:apexynsol@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors">apexynsol@gmail.com</a>
          <button onClick={() => scrollTo("Contact")} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">Get Started</button>
        </div>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#080c14]/95 backdrop-blur-md border-t border-white/8 px-5 py-4 flex flex-col items-center gap-4">
          {links.map(l => <button key={l} onClick={() => scrollTo(l)} className="text-slate-300 text-center text-sm font-medium">{l}</button>)}
          <button onClick={() => scrollTo("Contact")} className="w-full max-w-xs mx-auto px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold text-center">Get Started</button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDuration: "4s" }}/>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse" style={{ animationDuration: "6s" }}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[80px] animate-pulse" style={{ animationDuration: "5s" }}/>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]"/>
      </div>

      <div className="relative max-w-5xl mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"/>
          US Career Services · All Visa Types Accepted
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-blue-300 leading-tight mb-6 tracking-tight">
          Your Next Full-Time<br/>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">Opportunity</span> Starts Here
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Helping US candidates get more interviews through strategic job applications, ATS-optimized resumes, and powerful personal branding — <span className="text-slate-300">40–45 applications submitted daily.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={() => scrollTo("pricing")} className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base text-center hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25">
            Get Started {Icon.arrow}
          </button>
          <button onClick={() => scrollTo("contact")} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-semibold text-base text-center hover:bg-white/10 hover:border-white/25 transition-all duration-200">
            Book Free Consultation
          </button>
        </div>

        <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          {[["90%", "Client Satisfaction"], ["300+", "Interview Calls"], ["45/day", "Applications Sent"], ["All Visas", "Accepted"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-blue-400 font-black text-xl">{val}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services ───────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: Icon.briefcase,
      title: "Full-Time Job Applications",
      tag: "Most Popular",
      tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      desc: "We submit 40–45 targeted applications daily, each tailored to match job descriptions for maximum ATS compatibility.",
      features: ["40–45 daily applications on weekdays", "ATS keyword optimization per job", "Transparent daily tracking reports", "All visa types welcome"],
      gradient: "from-blue-600/20 to-cyan-600/5",
      iconBg: "bg-blue-500/20 text-blue-400",
    },
    {
      icon: Icon.resume,
      title: "Resume Tailoring",
      tag: "High Impact",
      tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      desc: "Every resume is rewritten to mirror the target job's language — beating ATS filters and grabbing recruiter attention.",
      features: ["ATS-friendly formatting", "Per-job keyword matching", "Quantified achievement bullets", "Professional visual design"],
      gradient: "from-emerald-600/15 to-teal-600/5",
      iconBg: "bg-emerald-500/20 text-emerald-400",
    },
    {
      icon: Icon.linkedin,
      title: "LinkedIn Optimization",
      tag: "Quick Win",
      tagColor: "bg-sky-500/20 text-sky-400 border-sky-500/30",
      desc: "Transform your LinkedIn into a recruiter magnet with a fully optimized profile that ranks in search and signals seniority.",
      features: ["Headline & summary rewrite", "Recruiter search visibility boost", "Skill endorsement strategy", "Personal brand positioning"],
      gradient: "from-sky-600/15 to-blue-600/5",
      iconBg: "bg-sky-500/20 text-sky-400",
    },
    {
      icon: Icon.globe,
      title: "Digital Resume Portfolio",
      tag: "Stand Out",
      tagColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
      desc: "An interactive web resume that showcases your story beyond a PDF — perfect for tech, design, and creative roles.",
      features: ["Interactive web portfolio", "Mobile-optimized design", "Shareable custom link", "Project & skills showcase"],
      gradient: "from-violet-600/15 to-purple-600/5",
      iconBg: "bg-violet-500/20 text-violet-400",
    },
  ];

  return (
    <section id="services" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-black text-blue-300 mb-4">End-to-End Career Services</h2>
          <p className="text-slate-400 max-w-xl mx-auto">From first application to offer letter — we handle the heavy lifting so you can focus on interviews.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <GlassCard key={s.title} className={`p-7 bg-gradient-to-br ${s.gradient}`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`p-3 rounded-xl ${s.iconBg}`}>{s.icon}</div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.tagColor}`}>{s.tag}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-300 text-sm">
                    <span className="text-emerald-400 shrink-0">{Icon.check}</span>{f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ──────────────────────────────────────────────────────────
function WhyUs() {
  const [ref, inView] = useInView();
  const c2 = useCounter(90, 1800, inView);
  const c3 = useCounter(300, 1800, inView);
  const c4 = useCounter(45, 1800, inView);

  const stats = [
    { val: c2, suffix: "%", label: "Client Satisfaction", sub: "across all service tiers" },
    { val: c3, suffix: "+", label: "Interview Calls Secured", sub: "for our candidates" },
    { val: c4, suffix: "/day", label: "Applications Per Weekday", sub: "per active candidate" },
    { val: null, suffix: "", label: "All Visa Types", sub: "H-1B, OPT, CPT, L1, GC & more" },
  ];

  const reasons = [
    { title: "No Enrollment Fee", desc: "You only pay the monthly service fee — zero upfront cost or hidden charges." },
    { title: "Transparent Tracking", desc: "Daily reports showing every application submitted, with company and role details." },
    { title: "ATS-First Strategy", desc: "Every submission is optimized to pass automated screening systems before a human sees it." },
    { title: "Success-Based Model", desc: "Our 4% success fee is only due after you receive and accept an offer letter." },
  ];

  return (
    <section id="why-us" className="py-24 px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none"/>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">The Apexyn Advantage</p>
          <h2 className="text-3xl md:text-5xl font-black text-blue-300 mb-4">Results You Can Measure</h2>
          <p className="text-slate-400 max-w-xl mx-auto">We track every metric that matters — applications, callbacks, interviews, and offers.</p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <GlassCard key={s.label} className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                {s.val !== null ? `${s.val}${s.suffix}` : "✓"}
              </div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-slate-500 text-xs">{s.sub}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"/>
              <h4 className="text-blue-300 font-bold">{r.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { step: "01", title: "Free Consultation", desc: "We review your background, target roles, visa status, and set realistic timelines together." },
    { step: "02", title: "Profile Review", desc: "Deep audit of your resume and LinkedIn against current market standards and your target job descriptions." },
    { step: "03", title: "Strategy Creation", desc: "Custom job search plan: target companies, role levels, ATS keywords, and application cadence." },
    { step: "04", title: "Daily Applications", desc: "40–45 tailored applications submitted every weekday with real-time tracking shared with you." },
    { step: "05", title: "Resume Tailoring Support", desc: "For every application below 90% job description match, we tailor your resume with targeted keywords and formatting to close the gap." },
    { step: "06", title: "Offer & Placement", desc: "Celebrate your offer — then the 4% success fee kicks in, payable only on joining." },
  ];

  return (
    <section id="process" className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-black text-blue-300 mb-4">A Clear Path From Search to Offer</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Six steps, fully managed, with visibility into every stage along the way.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-cyan-500/20 to-transparent -translate-x-1/2"/>
          <div className="space-y-6 md:space-y-0">
            {steps.map((s, i) => (
              <div key={s.step} className={`md:grid md:grid-cols-2 md:gap-10 items-center ${i !== 0 ? "md:mt-10" : ""}`}>
                <div className={`${i % 2 === 0 ? "md:order-1 md:text-right" : "md:order-2"}`}>
                  <GlassCard className="p-6 inline-block w-full">
                    <div className="flex items-center gap-3 mb-2 md:justify-end" style={i % 2 !== 0 ? { justifyContent: "flex-start" } : {}}>
                      <span className={`text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ${i % 2 === 0 ? "md:order-2" : ""}`}>{s.step}</span>
                      <h3 className={`text-white font-bold text-lg ${i % 2 === 0 ? "md:order-1" : ""}`}>{s.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                  </GlassCard>
                </div>
                <div className={`hidden md:block ${i % 2 === 0 ? "md:order-2" : "md:order-1"}`}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing ────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "1 Month",
      price: "₹20,000",
      period: "one-time",
      desc: "Full access to daily applications, resume tailoring, and LinkedIn optimization for a month.",
      features: ["40–45 applications per weekday", "Resume tailoring for low-match roles", "LinkedIn profile optimization", "Daily tracking reports", "All visa types accepted"],
      highlight: false,
    },
    {
      name: "3 Months",
      price: "₹51,999",
      period: "one-time",
      desc: "Our most popular plan — extended runway for a thorough, sustained job search.",
      features: ["Everything in the 1-Month plan", "3 full months of daily applications", "Ongoing resume & LinkedIn refinement", "Ongoing strategy check-ins", "Best value per month"],
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-black text-blue-300 mb-4">Simple, Transparent Plans</h2>
          <p className="text-slate-400 max-w-xl mx-auto">No enrollment fee. A 4% success fee applies only after you accept an offer.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((p) => (
            <GlassCard
              key={p.name}
              className={`p-8 flex flex-col ${p.highlight ? "border-blue-500/40 bg-gradient-to-b from-blue-600/10 to-cyan-600/5" : ""}`}
            >
              {p.highlight && (
                <span className="self-start mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Most Popular
                </span>
              )}
              <h3 className="text-white font-bold text-2xl mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{p.price}</span>
                <span className="text-slate-500 text-sm">{p.period}</span>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{p.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-300 text-sm">
                    <span className="text-emerald-400 shrink-0">{Icon.check}</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`w-full text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${p.highlight ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90" : "bg-white/5 border border-white/15 text-white hover:bg-white/10"}`}
              >
                Get Started
              </a>
            </GlassCard>
          ))}
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          4% success fee is calculated on your accepted offer's annual base salary and is due only upon joining.
        </p>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-10 md:p-14 text-center bg-gradient-to-br from-blue-600/10 to-cyan-600/5" hover={false}>
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-black text-blue-300 mb-5">Ready to Land Your Next Role?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Reach out and we'll get back to you to schedule your free consultation.
          </p>

          <a
            href="mailto:apexynsol@gmail.com"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25"
          >
            {Icon.mail} apexynsol@gmail.com
          </a>
        </GlassCard>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/8 py-10 px-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-black text-lg tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
          Apexyn <span className="text-cyan-300">Solutions</span>
        </span>
        <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Apexyn Solutions. All rights reserved.</p>
        <a href="mailto:apexynsol@gmail.com" className="text-slate-400 hover:text-white text-sm transition-colors">apexynsol@gmail.com</a>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#05080f] text-slate-200 antialiased">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
