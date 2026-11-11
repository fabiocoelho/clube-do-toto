import { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Star } from "lucide-react";
const HERO_VIDEO = "/hero-dog-loop.mp4";
const HERO_POSTER = "/hero-dog-poster.jpg";
import { WhatsAppIcon } from "./shared";
import { useLead } from "./lead";
import { useVideoControl } from "./useVideoControl";

const ease = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const GAP = 50;

// Scrolls anchor links so the section's content (past its top padding) lands GAP px below the fixed header.
function useAnchorOffset() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      // The eyebrow label above the section title, so every section stops at the same spot.
      const h2 = el.querySelector("h2");
      const first = (h2?.parentElement?.firstElementChild ?? el) as HTMLElement;
      // Ignore any reveal-animation offset on the label or its wrappers.
      let shift = 0;
      for (let n: HTMLElement | null = first; n && n !== el; n = n.parentElement) {
        shift += new DOMMatrix(getComputedStyle(n).transform).m42 || 0;
      }
      const top = first.getBoundingClientRect().top - shift + window.scrollY - header - GAP;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export function Hero() {
  useAnchorOffset();
  const { videoRef, togglePlay } = useVideoControl();
  const lead = useLead();
  return (
    <section
      onClick={togglePlay}
      className="relative z-10 isolate flex min-h-[100svh] bg-ink text-ink-foreground flex-col pt-[calc(4rem+env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pt-[calc(5rem+env(safe-area-inset-top))] sm:pb-8 lg:pb-10"
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-foreground/10 bg-ink/90 text-ink-foreground pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-[max(1.5rem,env(safe-area-inset-left))] sm:h-20 lg:px-10">
        <a href="#" className="font-serif text-xl tracking-tight sm:text-2xl">
          {lead.name}<span className="text-primary">.</span>
        </a>
        <div className="hidden items-center gap-10 text-sm text-ink-muted md:flex">
          <a href="#servicos" className="transition-colors hover:text-ink-foreground">Serviços</a>
          <a href="#equipe" className="transition-colors hover:text-ink-foreground">Equipe</a>
          <a href="#faq" className="transition-colors hover:text-ink-foreground">Dúvidas</a>
          <a href="#contato" className="transition-colors hover:text-ink-foreground">Contato</a>
        </div>
        {!lead.closed && <a href={lead.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-full border border-ink-foreground/20 px-4 py-1.5 text-sm transition-colors sm:px-5 sm:py-2 hover:bg-ink-foreground hover:text-ink">
          Agendar
        </a>}
      </nav>
      </header>

      {/* Background: looping muted video over a matching still (shown alone if motion is reduced) */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink lg:left-[22%]">
        <img src={HERO_POSTER} alt="" className="absolute inset-0 h-full w-full object-cover object-[55%_center]" />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[55%_center] motion-reduce:hidden"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60 lg:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink from-20% via-ink/75 via-45% to-ink/5 to-80% lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink/60 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 content-center items-center gap-4 px-5 py-4 sm:gap-8 sm:px-8 sm:py-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <motion.div
          className="text-center lg:col-span-6 lg:text-left"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
        >
          <motion.p variants={item} className="mb-3 flex items-center justify-center gap-2 text-xs sm:mb-5 sm:text-sm lg:justify-start text-ink-foreground/85">
            <span className="flex text-star">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</span>
            {lead.rating} no Google · +{lead.totalReviews} avaliações
          </motion.p>
          <motion.h1 variants={item} className="font-serif text-[2.1rem] font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl [@media(min-height:860px)]:xl:text-[5.5rem]">
            Cuidado de verdade, <em className="text-accent">amor incondicional</em>&nbsp;.
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-3 max-w-md text-sm font-light sm:mt-6 sm:text-lg lg:mx-0 leading-relaxed text-ink-foreground/85">
            Banho, tosa e bem-estar com calma, carinho e produtos premium. Um espaço pensado para o seu pet se sentir em casa.
          </motion.p>
          <motion.div variants={item} className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:mt-8 sm:gap-6 lg:justify-start">
            {!lead.closed && <a href={lead.whatsappUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground sm:px-8 sm:py-4 sm:text-base shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">
              <WhatsAppIcon />
              Agendar pelo WhatsApp
            </a>}
            <a href="#servicos" className="text-sm text-ink-foreground underline-offset-8 hover:underline">Ver serviços →</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center lg:col-span-6 lg:justify-end lg:self-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.6 }}
        >
          <div className="animate-float-slow flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-card-foreground shadow-xl sm:gap-3 sm:px-5 sm:py-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <div>
              <p className="text-sm font-medium">Agendamento Rápido</p>
              <p className="text-xs text-muted-foreground">Consulte no WhatsApp</p>
            </div>
            <CalendarCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
