import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s()+-]{7,20}$/, "Please enter a valid phone number (min 7 digits)"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: "New",
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Contact inquiry submitted successfully!");
      reset();
    } catch (error: any) {
      console.error("Contact submission error:", error);
      toast.error(error.message || "Failed to submit contact message. Please try again.");
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
        <h3 className="mt-6 font-display text-2xl font-bold text-heading">Message Sent!</h3>
        <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
          Thanks for reaching out! We've received your contact inquiry. One of our customer service representatives will respond to you within 1 business hour.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-8 rounded-full px-6"
        >
          Send Another Message
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
        <Label htmlFor="subject" className="text-xs font-semibold text-heading uppercase tracking-wider">
          Subject *
        </Label>
        <Input
          id="subject"
          {...register("subject")}
          placeholder="E.g., Commercial pest control inquiry, Billing questions..."
          className="mt-1.5 rounded-xl border border-input bg-background"
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-xs font-semibold text-heading uppercase tracking-wider">
          Message *
        </Label>
        <Textarea
          id="message"
          rows={4}
          {...register("message")}
          placeholder="How can we help you today? Please provide as much detail as possible..."
          className="mt-1.5 rounded-xl border border-input bg-background"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-full py-6 text-base font-semibold transition-all shadow-[var(--shadow-glow)] hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending Message...
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Average response time: less than 1 hour during business hours
      </p>
    </form>
  );
}
