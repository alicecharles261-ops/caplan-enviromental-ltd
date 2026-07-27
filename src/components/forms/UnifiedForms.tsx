import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuoteForm } from "./QuoteForm";
import { InspectionForm } from "./InspectionForm";
import { ContactForm } from "./ContactForm";
import { ClipboardList, Calendar, Mail } from "lucide-react";

interface UnifiedFormsProps {
  defaultTab?: "quote" | "book" | "contact";
}

export function UnifiedForms({ defaultTab = "quote" }: UnifiedFormsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto" id="unified-forms-container">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-muted/60 p-1.5 h-auto mb-6 border border-border/40 backdrop-blur-sm">
          <TabsTrigger
            value="quote"
            className="rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <ClipboardList className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Request Quote</span>
            <span className="inline sm:hidden">Quote</span>
          </TabsTrigger>
          <TabsTrigger
            value="book"
            className="rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Book Inspection</span>
            <span className="inline sm:hidden">Book</span>
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Contact Us</span>
            <span className="inline sm:hidden">Contact</span>
          </TabsTrigger>
        </TabsList>

        <div className="relative overflow-hidden min-h-[400px]">
          <TabsContent value="quote" className="mt-0 focus-visible:ring-0">
            <QuoteForm />
          </TabsContent>
          <TabsContent value="book" className="mt-0 focus-visible:ring-0">
            <InspectionForm />
          </TabsContent>
          <TabsContent value="contact" className="mt-0 focus-visible:ring-0">
            <ContactForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
