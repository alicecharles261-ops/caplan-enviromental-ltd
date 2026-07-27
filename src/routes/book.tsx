import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { UnifiedForms } from "@/components/forms/UnifiedForms";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Pest Inspection — Caplan Environmental Ltd" },
      {
        name: "description",
        content: "Schedule a professional, eco-friendly pest inspection for your home or business with Caplan Environmental Ltd.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Schedule Service</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-heading">Book an Inspection</h1>
            <p className="mt-4 text-muted-foreground">
              Select a date and time that works best for you. One of our certified technicians will assess your property and provide a detailed report.
            </p>
          </div>
          <UnifiedForms defaultTab="book" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
