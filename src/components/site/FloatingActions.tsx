import { Phone, MessageSquareText } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="/#quote"
        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary-hover transition-all hover:-translate-y-0.5"
        aria-label="Request a quote"
      >
        <MessageSquareText className="h-4 w-4" /> Request Quote
      </a>
      <a
        href="tel:+18005550100"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-heading px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)] hover:bg-heading/90 transition-all hover:-translate-y-0.5"
        aria-label="Call us now"
      >
        <Phone className="h-4 w-4" /> Call Now
      </a>
    </div>
  );
}
