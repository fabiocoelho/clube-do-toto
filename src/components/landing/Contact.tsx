import { Clock, Instagram, MapPin, Navigation, Phone } from "lucide-react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, Reveal, WhatsAppIcon } from "./shared";
import { useLead } from "./lead";

export function Contact() {
  const lead = useLead();
  return (
    <footer
      id="contato"
      className="flex min-h-[100svh] flex-col bg-ink text-ink-foreground pt-[calc(4rem+env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:pt-[calc(5rem+env(safe-area-inset-top))] sm:pb-6 lg:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-[max(1.25rem,env(safe-area-inset-left))] py-4 sm:py-6 lg:px-10 lg:py-[2svh]">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-primary sm:mb-4 sm:text-xs lg:mb-[1.5svh]">Contato & localização</p>
            <h2 className="font-serif text-[1.65rem] leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[clamp(1.9rem,7.5svh,3.75rem)]">Vem fazer parte do clube.</h2>
            <p className="mt-2 max-w-md text-[0.8rem] font-light leading-relaxed text-ink-muted sm:mt-5 sm:text-base lg:mt-[2svh]">Agende em menos de um minuto pelo WhatsApp. Respondemos rapidinho.</p>

            <a href={lead.whatsappUrl} target="_blank" rel="noreferrer" className="relative mt-4 inline-flex sm:mt-8 lg:mt-[3.5svh]">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40 [animation-duration:2s]" />
              <span className="relative inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:scale-[1.03] sm:gap-3 sm:px-9 sm:py-5 sm:text-lg lg:py-[clamp(0.7rem,2svh,1.25rem)]">
                <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                Falar no WhatsApp
              </span>
            </a>

            <ul className="mt-5 space-y-2 text-[0.8rem] text-ink-muted sm:mt-10 sm:space-y-4 sm:text-base lg:mt-[3.5svh] lg:space-y-[1.4svh]">
              <li className="flex gap-3 sm:gap-4"><MapPin className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" strokeWidth={1.4} />{lead.address}</li>
              <li className="flex gap-3 sm:gap-4"><Clock className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" strokeWidth={1.4} />Seg a Sex 8h–19h · Sáb 8h–16h</li>
              <li className="flex gap-3 sm:gap-4"><Phone className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" strokeWidth={1.4} />{lead.whatsappDisplay}</li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-ink-foreground sm:gap-4"><Instagram className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" strokeWidth={1.4} />{INSTAGRAM_HANDLE}</a></li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[1.5rem] border border-ink-foreground/10 bg-ink-soft sm:aspect-[4/3] sm:rounded-[2rem] lg:aspect-auto lg:h-[min(56svh,30rem)]">
              <iframe
                title={`Mapa da localização de ${lead.name}`}
                src={lead.mapsEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
              <a
                href={lead.mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-xs backdrop-blur transition-colors hover:bg-ink sm:bottom-5 sm:left-5"
              >
                <Navigation className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
                Navegar Agora (GPS)
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-1.5 border-t border-ink-foreground/10 pt-3 text-xs text-ink-muted sm:mt-12 sm:gap-4 sm:pt-6 lg:mt-[3svh] lg:pt-[2svh] sm:text-sm md:flex-row">
          <span className="font-serif text-sm text-ink-foreground sm:text-lg">{lead.name}<span className="text-primary">.</span></span>
          <span>© 2026 {lead.name}. Feito com carinho para quem tem quatro patas.</span>
        </div>
      </div>
    </footer>
  );
}
