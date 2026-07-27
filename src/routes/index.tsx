import { createFileRoute } from "@tanstack/react-router";
import { UnifiedForms } from "@/components/forms/UnifiedForms";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Leaf,
  Clock3,
  Award,
  CheckCircle2,
  Star,
  ChevronDown,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  Bug,
  Rat,
  Bird,
  Sparkles,
  Home,
  Building2,
  Utensils,
  Hotel,
  Warehouse,
  GraduationCap,
  Stethoscope,
  Factory,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import heroImg from "@/assets/hero-technician.jpg";
import residentialImg from "@/assets/residential.jpg";
import commercialImg from "@/assets/commercial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caplan Environmental Ltd — Eco-Friendly Pest Control & Environmental Services" },
      {
        name: "description",
        content:
          "Licensed, certified & eco-friendly pest control for homes and businesses. Fast response, transparent pricing, guaranteed results. Request a free quote from Caplan Environmental Ltd.",
      },
      { property: "og:title", content: "Caplan Environmental Ltd — Pest Control You Can Trust" },
      {
        property: "og:description",
        content:
          "Family & pet safe treatments, certified technicians and guaranteed results across residential & commercial properties.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Caplan Environmental Ltd",
          image: "/favicon.ico",
          telephone: "+1-800-555-0100",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "100 Green Way, Suite 200",
            addressCountry: "US",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const done = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            setValue(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function StatCounter({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-heading">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      <FloatingActions />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 500px at 85% -10%, oklch(0.71 0.128 132 / 0.25), transparent 60%), linear-gradient(180deg, oklch(0.98 0.015 132) 0%, #ffffff 60%)",
          }}
        />
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-float-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Leaf className="h-3.5 w-3.5" /> Eco-friendly · Family & Pet Safe
            </span>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-heading leading-[1.05]">
              Pest control done right.<br />
              <span className="text-primary">Trusted. Guaranteed.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Licensed technicians, transparent pricing and environmentally responsible treatments
              — protecting homes and businesses with proven results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary-hover transition-all hover:-translate-y-0.5"
              >
                Get Free Quote <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+18005550100"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-heading hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" /> 24/7 Emergency Line
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { icon: ShieldCheck, label: "Licensed & Insured" },
                { icon: Award, label: "Certified Techs" },
                { icon: Clock3, label: "Same-Day Service" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-medium text-heading">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-card)] ring-1 ring-border">
              <img
                src={heroImg}
                alt="Caplan Environmental technician performing eco-friendly pest inspection"
                width={1600}
                height={1200}
                className="w-full h-[420px] md:h-[540px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur px-5 py-4 shadow-[var(--shadow-soft)] flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-heading font-semibold text-sm">4.9 / 5 · 2,300+ reviews</div>
                  <div className="text-xs text-muted-foreground">Rated #1 local pest control</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-section">
        <div className="container-x py-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {["EPA Certified","NPMA Member","QualityPro","GreenPro"].map((b) => (
            <div key={b} className="flex items-center justify-center gap-2 text-heading font-display font-semibold tracking-wide">
              <ShieldCheck className="h-5 w-5 text-primary" /> {b}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow="Services"
            title="Complete pest control, tailored to you"
            sub="From single-family homes to multi-site commercial operations — we deliver the right treatment plan, every time."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)] hover:border-primary/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <a href="#quote" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESIDENTIAL / COMMERCIAL SPLIT */}
      <section className="py-16 md:py-24 bg-section">
        <div className="container-x grid md:grid-cols-2 gap-8">
          {[
            { title: "Residential", copy: "Protect your family, pets and home with safe, effective treatments and long-term prevention plans.", img: residentialImg, tag: "For Homes" },
            { title: "Commercial", copy: "Discreet, code-compliant programs for restaurants, hotels, warehouses, offices and industrial sites.", img: commercialImg, tag: "For Business" },
          ].map((c) => (
            <div key={c.title} className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
              <img src={c.img} alt={c.title} loading="lazy" className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/85 via-heading/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-white/80">{c.tag}</span>
                <h3 className="mt-1 font-display text-3xl font-bold">{c.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/85">{c.copy}</p>
                <a href="#quote" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-heading hover:bg-primary hover:text-white transition-colors">
                  Explore services <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader eyebrow="Why Choose Us" title="A safer, smarter pest control experience" />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border p-6 hover:border-primary/40 transition-colors">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-heading">{w.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-20 md:py-24 bg-section">
        <div className="container-x">
          <SectionHeader eyebrow="Industries Served" title="Trusted across sectors" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((i) => (
              <div key={i.label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 hover:border-primary/40 hover:-translate-y-0.5 transition-all">
                <i.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-heading">{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader eyebrow="Our Process" title="Four steps to a pest-free property" />
          <div className="mt-14 grid md:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={p.title} className="relative rounded-2xl bg-card border border-border p-6">
                <div className="absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold font-display">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-semibold text-heading">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounterInverted target={25} suffix="+" label="Years of Experience" />
          <StatCounterInverted target={12500} suffix="+" label="Homes Protected" />
          <StatCounterInverted target={98} suffix="%" label="Customer Retention" />
          <StatCounterInverted target={24} suffix="/7" label="Emergency Response" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader eyebrow="Testimonials" title="What our customers say" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border p-7 bg-card">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-sm text-foreground leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm">
                  <div className="font-semibold text-heading">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-24 bg-section">
        <div className="container-x">
          <SectionHeader eyebrow="Gallery" title="Before & after results" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[residentialImg, commercialImg, heroImg, residentialImg, commercialImg, heroImg, residentialImg, commercialImg].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl group">
                <img src={src} loading="lazy" alt="Project result" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="container-x max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Answers to common questions" />
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* QUOTE / CONTACT */}
      <section id="quote" className="py-20 md:py-28 bg-section">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader eyebrow="Get in Touch" title="How can we help you?" align="left" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Request a free quote, book a licensed technician's inspection, or send us a message. We'll follow up within one business hour.
            </p>
            <div id="contact" className="mt-8 space-y-4">
              <ContactItem icon={Phone} label="Call us" value="(800) 555-0100" />
              <ContactItem icon={Mail} label="Email" value="hello@caplanenv.com" />
              <ContactItem icon={MapPin} label="Head office" value="100 Green Way, Suite 200" />
              <ContactItem icon={Clock3} label="Hours" value="Mon–Sat · 7am–8pm · 24/7 Emergency" />
            </div>
          </div>
          <UnifiedForms defaultTab="quote" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StatCounterInverted({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm text-primary-foreground/80">{label}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-heading">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left px-6 py-5"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-heading">{q}</span>
        <ChevronDown className={`h-5 w-5 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>}
    </button>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-heading font-semibold">{value}</div>
      </div>
    </div>
  );
}



// Data
const services = [
  { icon: Bug, title: "Residential Pest Control", desc: "Comprehensive protection for homes with family & pet safe treatments." },
  { icon: Building2, title: "Commercial Pest Control", desc: "Custom IPM programs for businesses of every size and sector." },
  { icon: Rat, title: "Rodent Control", desc: "Exclusion, trapping and monitoring to keep rodents out for good." },
  { icon: Sparkles, title: "Bed Bug Treatment", desc: "Discreet heat and chemical treatments with a satisfaction guarantee." },
  { icon: Bird, title: "Bird & Wildlife Control", desc: "Humane, code-compliant removal, exclusion and prevention." },
  { icon: Leaf, title: "Preventative Programs", desc: "Year-round protection plans with scheduled visits and reporting." },
];

const whyUs = [
  { icon: ShieldCheck, title: "Licensed & Insured", copy: "Fully licensed technicians and comprehensive insurance on every job." },
  { icon: Leaf, title: "Eco-Friendly", copy: "Low-impact, family & pet safe products backed by science." },
  { icon: Clock3, title: "Fast Response", copy: "Same-day appointments and 24/7 emergency service when it matters." },
  { icon: Award, title: "Guaranteed Results", copy: "If pests return between visits, we do too — at no extra cost." },
];

const industries = [
  { icon: Home, label: "Residential" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Hotel, label: "Hotels" },
  { icon: Building2, label: "Offices" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Stethoscope, label: "Hospitals" },
  { icon: Factory, label: "Industrial" },
];

const process = [
  { title: "Inspect", copy: "A licensed technician assesses the site and identifies pest activity and entry points." },
  { title: "Plan", copy: "We build a tailored treatment plan with transparent, upfront pricing." },
  { title: "Treat", copy: "Targeted, low-impact treatments applied by certified professionals." },
  { title: "Protect", copy: "Ongoing monitoring and prevention keep your property pest-free." },
];

const testimonials = [
  { name: "Sarah M.", role: "Homeowner", quote: "Professional, on time and completely eliminated our ant problem. Couldn't recommend more highly." },
  { name: "David L.", role: "Restaurant Owner", quote: "Their commercial program keeps us fully compliant with health inspections. Reliable every time." },
  { name: "Priya K.", role: "Property Manager", quote: "Fast response across our portfolio. Their reporting makes audits effortless." },
];

const faqs = [
  { q: "Are your treatments safe for my family and pets?", a: "Yes. We use low-impact, EPA-approved products applied by certified technicians, with clear re-entry guidance for every treatment." },
  { q: "Do you offer emergency service?", a: "We provide 24/7 emergency response with same-day appointments across our service areas." },
  { q: "Do you guarantee your work?", a: "Every treatment is backed by our satisfaction guarantee — if pests return between scheduled visits, we return at no additional cost." },
  { q: "How is pricing determined?", a: "Pricing is based on property size, pest type and treatment plan. We provide transparent, upfront quotes with no hidden fees." },
  { q: "Which areas do you serve?", a: "We service metro and surrounding regions across residential and commercial properties. Contact us with your address to confirm coverage." },
];
