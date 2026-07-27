import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const inspectionFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s()+-]{7,20}$/, "Please enter a valid phone number (min 7 digits)"),
  service: z.string().optional(),
  bookingDate: z.string().min(1, "Booking date is required"),
  bookingTime: z.string().min(1, "Booking time is required"),
  address: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  notes: z.string().optional(),
});

type InspectionFormValues = z.infer<typeof inspectionFormSchema>;

export function InspectionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "General Inspection",
      bookingDate: "",
      bookingTime: "Morning (8am–12pm)",
      address: "",
      city: "",
      notes: "",
    },
  });

  const onSubmit = async (data: InspectionFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("inspection_bookings").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        service: data.service || null,
        booking_date: data.bookingDate,
        booking_time: data.bookingTime,
        address: data.address,
        city: data.city,
        notes: data.notes || null,
        status: "New",
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Inspection booking submitted successfully!");
      reset();
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.message || "Failed to book inspection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date for minimum selection limit
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-card border border-border p-8 text-center shadow-[var(--shadow-soft)] animate-fade-in py-16">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-heading">Inspection Booked!</h3>
        <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
          Your inspection booking request has been submitted. Our booking coordinator will contact you shortly to confirm the scheduled window.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-8 rounded-full px-6"
        >
          Book Another Inspection
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
          <Label htmlFor="service" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Requested Inspection Service
          </Label>
          <select
            id="service"
            {...register("service")}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            <option value="General Inspection">General Inspection</option>
            <option value="Residential Termite Audit">Residential Termite Audit</option>
            <option value="Commercial Compliance Audit">Commercial Compliance Audit</option>
            <option value="Emergency Wildlife Check">Emergency Wildlife Check</option>
            <option value="Rodent Vulnerability Scan">Rodent Vulnerability Scan</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bookingDate" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Preferred Date *
          </Label>
          <Input
            id="bookingDate"
            type="date"
            min={getMinDate()}
            {...register("bookingDate")}
            className="mt-1.5 rounded-xl border border-input bg-background cursor-pointer"
          />
          {errors.bookingDate && (
            <p className="mt-1 text-xs text-destructive">{errors.bookingDate.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bookingTime" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Preferred Time Slot *
          </Label>
          <select
            id="bookingTime"
            {...register("bookingTime")}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          >
            <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
            <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
            <option value="Evening (4pm–8pm)">Evening (4pm–8pm)</option>
          </select>
          {errors.bookingTime && (
            <p className="mt-1 text-xs text-destructive">{errors.bookingTime.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address" className="text-xs font-semibold text-heading uppercase tracking-wider">
            Street Address *
          </Label>
          <Input
            id="address"
            {...register("address")}
            placeholder="123 Main St"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city" className="text-xs font-semibold text-heading uppercase tracking-wider">
            City *
          </Label>
          <Input
            id="city"
            {...register("city")}
            placeholder="Chicago"
            className="mt-1.5 rounded-xl border border-input bg-background"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="notes" className="text-xs font-semibold text-heading uppercase tracking-wider">
          Special Notes / Gate Codes / Entry Details
        </Label>
        <Textarea
          id="notes"
          rows={3}
          {...register("notes")}
          placeholder="E.g., Beware of dog, please ring back door bell, call 10 mins before arrival..."
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
            <Loader2 className="h-5 w-5 animate-spin" /> Booking Inspection...
          </>
        ) : (
          <>
            Book Inspection <CalendarDays className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Flexible rescheduling · Free cancellation up to 24h before
      </p>
    </form>
  );
}
