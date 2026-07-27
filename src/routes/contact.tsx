import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { UnifiedForms } from "@/components/forms/UnifiedForms";
import { Phone, Mail, MapPin, Clock3 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Caplan Environmental Ltd" },
      {
        name: "description",
        content: "Get in touch with Caplan Environmental Ltd. Send us a message, email us, or call our 24/7 support line.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Get in Touch</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-heading">Contact Us</h1>
            <p className="mt-4 text-muted-foreground">
              Have questions about our eco-friendly pest control plans or services? Reach out today. We respond to all inquiries within one business hour.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl border border-border p-6 md:p-8 bg-card shadow-[var(--shadow-soft)]">
                <h3 className="font-display text-xl font-bold text-heading mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <ContactItem icon={Phone} label="Call us" value="(800) 555-0100" />
                  <ContactItem icon={Mail} label="Email" value="hello@caplanenv.com" />
                  <ContactItem icon={MapPin} label="Head office" value="100 Green Way, Suite 200" />
                  <ContactItem icon={Clock3} label="Hours" value="Mon–Sat · 7am–8pm · 24/7 Emergency" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <UnifiedForms defaultTab="contact" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
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
        <div className="text-heading font-semibold mt-0.5">{value}</div>
      </div>
    </div>
  );
}
