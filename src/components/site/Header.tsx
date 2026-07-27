import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import logo from "@/assets/caplan-logo.avif";

const nav = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Why Us", href: "/#why" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-white/95"
      }`}
    >
      {/* Desktop */}
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: 1280,
          height: 84,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="Caplan Environmental Ltd"
            style={{ height: 46, width: "auto" }}
          />
        </a>

        {/* Nav — centered */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: 36 }}
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative whitespace-nowrap text-gray-700 hover:text-primary transition-colors duration-200 group"
              style={{ fontSize: 16, fontWeight: 500 }}
            >
              {n.label}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary rounded-full transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: phone + CTA */}
        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          <a
            href="tel:+18005550100"
            className="flex items-center gap-2 whitespace-nowrap text-gray-800 hover:text-primary transition-colors duration-200"
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            (800) 555-0100
          </a>
          <a
            href="/#quote"
            className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-white font-bold hover:bg-primary-hover active:scale-95 transition-all duration-200"
            style={{
              fontSize: 16,
              fontWeight: 700,
              height: 52,
              paddingLeft: 32,
              paddingRight: 32,
              borderRadius: 12,
              boxShadow: "0 4px 14px -4px rgba(0,0,0,0.22)",
            }}
          >
            Get a Free Quote
          </a>
        </div>

        {/* Hamburger (mobile / tablet) */}
        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:text-primary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div
            className="flex flex-col"
            style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 20, gap: 4 }}
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-gray-700 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:+18005550100"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center gap-2 text-gray-800"
              style={{ fontSize: 16, fontWeight: 600 }}
            >
              <Phone className="h-4 w-4" />
              (800) 555-0100
            </a>
            <a
              href="/#quote"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center bg-primary text-white font-bold"
              style={{
                fontSize: 16,
                fontWeight: 700,
                height: 52,
                borderRadius: 12,
                boxShadow: "0 4px 14px -4px rgba(0,0,0,0.22)",
              }}
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
