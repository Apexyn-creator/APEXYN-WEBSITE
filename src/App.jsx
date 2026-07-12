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
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const LINKEDIN_URL = "https://www.linkedin.com/in/apexyn01";

// ── Card ────────────────────────────────────────────────────────────────
const GlassCard = ({ children, className = "", hover = true }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${hover ? "transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1" : ""} ${className}`}>
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

  const links = ["Services", "Why Us", "Process", "Pricing", "Reviews", "Contact"];
  const scrollTo = (id) => { document.getElementById(id.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo.jpeg" alt="Apexyn Solutions" className="w-11 h-11 rounded-lg object-cover" />
          <span className="font-black text-3xl tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">Apexyn <span className="text-cyan-600">Solutions</span></span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">{l}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="LinkedIn">{Icon.linkedin}</a>
          <a href="mailto:apexynsol@gmail.com" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">apexynsol@gmail.com</a>
          <button onClick={() => scrollTo("Contact")} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity shadow-sm shadow-blue-200">Get Started</button>
        </div>
        <button className="md:hidden text-slate-900" onClick={() => setMenuOpen(!menuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-5 py-4 flex flex-col items-center gap-4 shadow-sm">
          {links.map(l => <button key={l} onClick={() => scrollTo(l)} className="text-slate-600 text-center text-sm font-medium">{l}</button>)}
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-600 text-sm font-medium">LinkedIn</a>
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[120px] animate-pulse" style={{ animationDuration: "4s" }}/>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-200/40 blur-[100px] animate-pulse" style={{ animationDuration: "6s" }}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-100/40 blur-[80px] animate-pulse" style={{ animationDuration: "5s" }}/>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.04)_1px,transparent_1px)] bg-[size:60px_60px]"/>
      </div>

      <div className="relative max-w-5xl mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-8 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"/>
          US Career Services · All Visa Types Accepted
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
          Your Next Full-Time<br/>
          <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">Opportunity</span> Starts Here
        </h1>

        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Helping US candidates get more interviews through strategic job applications, ATS-optimized resumes, and powerful personal branding — <span className="text-slate-800">40–45 applications submitted daily.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button onClick={() => scrollTo("pricing")} className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base text-center hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/20">
            Get Started {Icon.arrow}
          </button>
          <button onClick={() => scrollTo("contact")} className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold text-base text-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm">
            Book Free Consultation
          </button>
        </div>

        <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-4 px-8 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {[["90%", "Client Satisfaction"], ["300+", "Interview Calls"], ["45/day", "Applications Sent"], ["All Visas", "Accepted"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-blue-700 font-black text-xl">{val}</div>
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
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
      desc: "We submit 40–45 targeted applications daily, each tailored to match job descriptions for maximum ATS compatibility.",
      features: ["40–45 daily applications on weekdays", "ATS keyword optimization per job", "Transparent daily tracking reports", "All visa types welcome"],
      gradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      icon: Icon.resume,
      title: "Resume Tailoring",
      tag: "High Impact",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      desc: "Every resume is rewritten to mirror the target job's language — beating ATS filters and grabbing recruiter attention.",
      features: ["ATS-friendly formatting", "Per-job keyword matching", "Quantified achievement bullets", "Professional visual design"],
      gradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Icon.linkedin,
      title: "LinkedIn Optimization",
      tag: "Quick Win",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      desc: "Transform your LinkedIn into a recruiter magnet with a fully optimized profile that ranks in search and signals seniority.",
      features: ["Headline & summary rewrite", "Recruiter search visibility boost", "Skill endorsement strategy", "Personal brand positioning"],
      gradient: "from-sky-50 to-blue-50",
      iconBg: "bg-sky-50 text-sky-600",
    },
    {
      icon: Icon.globe,
      title: "Digital Resume Portfolio",
      tag: "Stand Out",
      tagColor: "bg-violet-50 text-violet-700 border-violet-200",
      desc: "An interactive web resume that showcases your story beyond a PDF — perfect for tech, design, and creative roles.",
      features: ["Interactive web portfolio", "Mobile-optimized design", "Shareable custom link", "Project & skills showcase"],
      gradient: "from-violet-50 to-purple-50",
      iconBg: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <section id="services" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">End-to-End Career Services</h2>
          <p className="text-slate-500 max-w-xl mx-auto">From first application to offer letter — we handle the heavy lifting so you can focus on interviews.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <GlassCard key={s.title} className={`p-7 bg-gradient-to-br ${s.gradient}`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`p-3 rounded-xl ${s.iconBg}`}>{s.icon}</div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.tagColor}`}>{s.tag}</span>
              </div>
              <h3 className="text-slate-900 font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm mb-5 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm">
                    <span className="text-emerald-600 shrink-0">{Icon.check}</span>{f}
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
    <section id="why-us" className="py-24 px-5 relative overflow-hidden bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">The Apexyn Advantage</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Results You Can Measure</h2>
          <p className="text-slate-500 max-w-xl mx-auto">We track every metric that matters — applications, callbacks, interviews, and offers.</p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <GlassCard key={s.label} className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                {s.val !== null ? `${s.val}${s.suffix}` : "✓"}
              </div>
              <div className="text-slate-900 font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-slate-500 text-xs">{s.sub}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"/>
              <h4 className="text-slate-900 font-bold">{r.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{r.desc}</p>
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
    <section id="process" className="py-24 px-5 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">A Clear Path From Search to Offer</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Six steps, fully managed, with visibility into every stage along the way.</p>
        </div>

        <div className="space-y-5">
          {steps.map((s) => (
            <GlassCard key={s.step} className="p-6 flex items-start gap-5">
              <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-base">{s.step}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-black text-blue-700 mb-2 break-words">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </GlassCard>
          ))}
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
      badge: "Most Popular",
    },
    {
      name: "3 Months",
      price: "₹51,999",
      period: "one-time",
      desc: "Our most popular plan — extended runway for a thorough, sustained job search.",
      features: ["Everything in the 1-Month plan", "3 full months of daily applications", "Ongoing resume & LinkedIn refinement", "Ongoing strategy check-ins", "Best value per month"],
      badge: "Most Popular",
    },
    {
      name: "LinkedIn Optimization",
      price: "₹1,299",
      period: "one-time",
      desc: "A complete LinkedIn makeover to boost recruiter visibility and personal branding — as a standalone service.",
      features: ["Headline & summary rewrite", "Recruiter search visibility boost", "Skill endorsement strategy", "Personal brand positioning"],
      badge: "Quick Win",
    },
    {
      name: "Digital Resume Card",
      price: "₹3,500",
      period: "one-time",
      desc: "An interactive digital resume card that showcases your story beyond a PDF — standalone service.",
      features: ["Interactive web portfolio", "Mobile-optimized design", "Shareable custom link", "Project & skills showcase"],
      badge: "Stand Out",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Simple, Transparent Plans</h2>
          <p className="text-slate-500 max-w-xl mx-auto">No enrollment fee. A 4% success fee applies only after you accept an offer.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <GlassCard
              key={p.name}
              className="p-8 flex flex-col border-blue-300 bg-gradient-to-b from-blue-50 to-cyan-50"
            >
              <span className="self-start mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                {p.badge}
              </span>
              <h3 className="text-blue-700 font-black text-2xl mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{p.price}</span>
                <span className="text-slate-500 text-sm">{p.period}</span>
              </div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{p.desc}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm">
                    <span className="text-emerald-600 shrink-0">{Icon.check}</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="w-full text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 shadow-sm shadow-blue-200">
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

// ── Reviews ────────────────────────────────────────────────────────────────
function Reviews() {
  const reviews = [
    {
      name: "Priya S.",
      role: "Landed a Data Analyst role · 3-Month Plan",
      text: "The daily application tracking kept me sane during my search. Within 6 weeks I had three interviews lined up and accepted an offer soon after.",
    },
    {
      name: "Arjun M.",
      role: "Software Engineer, OPT · 1-Month Plan",
      text: "My resume wasn't passing ATS filters before. After tailoring, I started getting callbacks within the first week. Genuinely worth it.",
    },
    {
      name: "Sana K.",
      role: "LinkedIn Optimization client",
      text: "Recruiters started messaging me within days of the profile update. Small investment, immediate difference in visibility.",
    },
    {
      name: "Rahul V.",
      role: "Placed as Business Analyst · H-1B · 3-Month Plan",
      text: "I was skeptical about the daily application volume, but it worked. Got placed within 8 weeks with a company that sponsors H-1B. Couldn't have done it alone.",
    },
    {
      name: "Meera N.",
      role: "Placed as Product Manager · 1-Month Plan",
      text: "The resume tailoring made all the difference for PM roles specifically. Two offers in one month, and the team was responsive throughout the whole process.",
    },
    {
      name: "Kevin D.",
      role: "Placed as DevOps Engineer · CPT · 3-Month Plan",
      text: "Being on CPT made things stressful with timelines, but the team understood the urgency. Placed with a great team before my deadline, exactly as promised.",
    },
  ];

  return (
    <section id="reviews" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Client Stories</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">What Our Clients Say</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Real results from candidates who trusted us with their job search.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <GlassCard key={r.name} className="p-7 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <span key={i}>{Icon.star}</span>)}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1">"{r.text}"</p>
              <div>
                <div className="text-slate-900 font-semibold text-sm">{r.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{r.role}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xykqreqw", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200";

  return (
    <section id="contact" className="py-24 px-5 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">Ready to Land Your Next Role?</h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Send us a message and we'll get back to you to schedule your free consultation.
          </p>
        </div>

        <GlassCard className="p-8 md:p-10 bg-white" hover={false}>
          {status === "sent" ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mb-5">
                <span className="w-6 h-6">{Icon.check}</span>
              </div>
              <h3 className="text-slate-900 font-bold text-xl mb-2">Message sent</h3>
              <p className="text-slate-500 text-sm">Thanks for reaching out — we'll reply to your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Service</label>
                <select id="service" name="service" required defaultValue="" className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200">
                  <option value="" disabled>Select a service</option>
                  <option value="Full-Time Job Applications">Full-Time Job Applications</option>
                  <option value="Resume Tailoring">Resume Tailoring</option>
                  <option value="LinkedIn Optimization">LinkedIn Optimization</option>
                  <option value="Digital Resume Portfolio">Digital Resume Portfolio</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Message</label>
                <textarea id="message" name="message" required rows={5} placeholder="Tell us about your job search goals..." className={`${inputClass} resize-none`} />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm">Something went wrong — please try again, or email us directly.</p>
              )}

              <button type="submit" disabled={status === "sending"} className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base hover:opacity-90 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:hover:scale-100">
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </GlassCard>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
          <a href="mailto:apexynsol@gmail.com" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors">
            {Icon.mail} apexynsol@gmail.com
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors">
            <span className="w-5 h-5">{Icon.linkedin}</span> Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Newsletter popup ───────────────────────────────────────────────────────
function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (localStorage.getItem("apexyn_newsletter_dismissed")) return;
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem("apexyn_newsletter_dismissed", "1");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mzdnpjon", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        setTimeout(close, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] w-[calc(100%-2.5rem)] max-w-sm">
      <GlassCard className="p-5 bg-white border-blue-200 shadow-2xl shadow-blue-900/10" hover={false}>
        <button onClick={close} aria-label="Close" className="absolute top-3 right-3 text-slate-400 hover:text-slate-900 transition-colors">
          {Icon.close}
        </button>
        {status === "sent" ? (
          <div className="text-center py-3">
            <p className="text-slate-900 font-semibold text-sm">You're on the list! 🎉</p>
            <p className="text-slate-500 text-xs mt-1">We'll keep you posted on career tips & offers.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative">
            <h4 className="text-slate-900 font-bold text-sm mb-1 pr-6">Stay in the loop</h4>
            <p className="text-slate-500 text-xs mb-4">Get job search tips & service updates in your inbox.</p>
            <div className="flex gap-2">
              <input type="email" name="email" required placeholder="you@example.com" className="flex-1 px-3 py-2.5 rounded-lg bg-white text-slate-900 border border-slate-300 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500" />
              <button type="submit" disabled={status === "sending"} className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                {status === "sending" ? "..." : "Join"}
              </button>
            </div>
            {status === "error" && <p className="text-red-600 text-xs mt-2">Something went wrong, try again.</p>}
          </form>
        )}
      </GlassCard>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 px-5 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Apexyn <span className="text-cyan-600">Solutions</span>
        </span>
        <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Apexyn Solutions. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="LinkedIn">
            {Icon.linkedin}
          </a>
          <a href="mailto:apexynsol@gmail.com" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">apexynsol@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-700 antialiased">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Pricing />
      <Reviews />
      <Contact />
      <Footer />
      <NewsletterPopup />
    </div>
  );
}
