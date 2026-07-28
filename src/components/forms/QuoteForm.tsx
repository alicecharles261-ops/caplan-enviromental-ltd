import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { sendQuoteEmail } from "@/lib/email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const quoteFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s()+-]{7,20}$/, "Please enter a valid phone number (min 7 digits)"),
  service: z.string().optional(),
  propertyType: z.string().optional(),
  propertySize: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "Rodents",
      propertyType: "Residential",
      propertySize: "",
      address: "",
      city: "",
      postalCode: "",
      preferredContactMethod: "Email",
      message: "",
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase.from("quote_requests").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        service: data.service || null,
        property_type: data.propertyType || null,
        property_size: data.propertySize || null,
        address: data.address || null,
        city: data.city || null,
        postal_code: data.postalCode || null,
        preferred_contact_method: data.preferredContactMethod || null,
        message: data.message || null,
        status: "New",
      });

      if (dbError) {
        console.error("Quote DB insert error:", dbError);
        throw new Error("Unable to save your request. Please try again.");
      }

      // 2. Notify owner via email (failure is non-blocking — record is already saved)
      try {
        const emailResult = await sendQuoteEmail({
          data: {
            ...data,
            submittedAt: new Date().toLocaleString("en-CA", {
              dateStyle: "long",
              timeStyle: "short",
            }),
          },
        });
        if (!emailResult.success) {
          console.error("Owner notification email failed:", emailResult.error);
        }
      } catch (emailErr) {
        console.error("Owner notification email threw:", emailErr);
      }

      setIsSuccess(true);
      reset();
    } catch (error: any) {
      console.error("Quote submission error:", error);
      toast.error(
        error.message ||
          "Something went wrong while submitting your request. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 text-center shadow-[var(--shadow-soft)] animate-fade-in py-16">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-heading">Thank You!</h3>
        <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
          Your quote request has been received. Our team will contact you shortly.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-8 rounded-full px-6"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-[var(--shadow-soft)] grid gap-5"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Full Name *
          </Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="John Doe"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="(555) 555-5555"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="preferredContactMethod" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Preferred Contact
          </Label>
          <select
            id="preferredContactMethod"
            {...register("preferredContactMethod")}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Text">Text</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="service" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Pest Issue
          </Label>
          <select
            id="service"
            {...register("service")}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            <option value="Rodents">Rodents</option>
            <option value="Bed Bugs">Bed Bugs</option>
            <option value="Cockroaches">Cockroaches</option>
            <option value="Ants">Ants</option>
            <option value="Wasps">Wasps / Hornets</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Other">Other Pest</option>
          </select>
        </div>

        <div>
          <Label htmlFor="propertyType" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Property Type
          </Label>
          <select
            id="propertyType"
            {...register("propertyType")}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="propertySize" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Property Size
          </Label>
          <Input
            id="propertySize"
            {...register("propertySize")}
            placeholder="e.g. 2,000 sq ft"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Street Address
          </Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="123 Main St"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-xs font-semibold text-heading uppercase tracking-wider">
            City
          </Label>
          <Input
            id="city"
            {...register("city")}
            placeholder="Chicago"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="text-xs font-semibold text-heading uppercase tracking-wider">
          Pest Problem Details
        </Label>
        <Textarea
          id="message"
          rows={3}
          {...register("message")}
          placeholder="Please describe what you are seeing, where, and for how long..."
          className="mt-1.5 rounded-xl border border-input bg-background"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-full py-6 text-base font-semibold transition-all shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Submitting Request...
          </>
        ) : (
          <>
            Request Free Quote <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        No obligation · Response within 1 hour · 100% confidential
      </p>
    </form>
  );
}
