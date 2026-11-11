import { motion, type HTMLMotionProps } from "framer-motion";

export const WHATSAPP_URL =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20no%20Clube%20do%20Tot%C3%B3";

/** Static "Clube do Totó" fallbacks, used when a lead's column is empty. */
export const MAPS_EMBED_URL = "https://www.google.com/maps?q=Porto+Alegre,+RS,+Brasil&z=13&output=embed";
export const MAPS_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Porto+Alegre,+RS,+Brasil";
export const ADDRESS = "Rua das Acácias, 123 - Jardim Botânico, Porto Alegre - RS, 90690-000";
export const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=Pet+Shop+Clube+do+Tot%C3%B3+Porto+Alegre";

/** Fixed for every lead (not parametrized). */
export const INSTAGRAM_URL = "https://instagram.com/eu.fcoelho";
export const INSTAGRAM_HANDLE = "@eu.fcoelho";

export function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-primary">{children}</p>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" strokeLinejoin="round" />
      <path d="M9 8.5c0 3.3 3.2 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.6 4.6 0 0 1-2.8-2.8l.8-1-1-2L9 8.5z" strokeLinejoin="round" />
    </svg>
  );
}
