import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-heading text-white/80">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div>
          <a href="/">
            <img
              src="/caplan-logo-full.png"
              alt="Caplan Environmental Ltd"
              width={160}
              height={31}
              className="w-[160px] h-auto"
            />
          </a>
          <p className="mt-5 text-sm leading-relaxed">
            Licensed, certified & eco-friendly pest control for homes and businesses. Fast response,
            guaranteed results.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {["Residential Pest Control","Commercial Pest Control","Rodent Control","Bed Bugs","Wasps & Hornets","Wildlife Control"].map((s) => (
              <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {["About Us","Certifications","Pest Library","Service Areas","Blog","Careers"].map((s) => (
              <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary-light" /> (800) 555-0100</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary-light" /> hello@caplanenv.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary-light" /> 100 Green Way, Suite 200</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-primary-light" /> Mon–Sat · 7am–8pm · 24/7 Emergency</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div>© {new Date().getFullYear()} Caplan Environmental Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
