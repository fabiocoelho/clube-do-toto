import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  ChevronsDown,
  Copy,
  Globe,
  Instagram,
  MapPin,
  Music2,
  PawPrint,
  QrCode,
  Scissors,
  Star,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ADDRESS,
  INSTAGRAM_URL,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
  TIKTOK_URL,
  WhatsAppIcon,
} from "@/components/landing/shared";
import { useVideoControl } from "@/components/landing/useVideoControl";
import { LeadGate, useLead } from "@/components/landing/lead";
// Temporary gallery: the project's own photos until real "Nosso Espaço" shots arrive.
import g1 from "@/assets/service-bath.jpg";
import g2 from "@/assets/team-groomer.jpg";
import g3 from "@/assets/team-spa.jpg";
import g4 from "@/assets/team-daycare.jpg";

const HERO_VIDEO = "/hero-dog-loop.mp4";
const HERO_POSTER = "/hero-dog-poster.jpg";

const gallery = [g1, g2, g3, g4];

/** Dados do Wi-Fi (edite aqui) */
const WIFI_PASSWORD = "clubedototo2026";

/** Dados do PIX (edite aqui) */

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=Pet+Shop+Clube+do+Tot%C3%B3+Porto+Alegre";

const copyText = async (text: string, successMessage: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch {
    toast.error("Não foi possível copiar. Tente novamente.");
  }
};

const linkButtonClass =
  "w-full flex items-center gap-3 rounded-full bg-ink-foreground/10 px-6 h-[62px] md:h-[49px] font-sans font-medium text-ink-foreground transition-colors hover:bg-ink-foreground/20";

const ctaClass =
  "w-full flex items-center justify-center gap-3 rounded-full bg-primary px-6 h-[62px] md:h-[49px] font-sans font-semibold text-primary-foreground text-base shadow-xl shadow-primary/25 transition-transform hover:scale-[1.03]";

export const Route = createFileRoute("/smartsite")({
  head: () => ({
    meta: [
      { title: "Clube do Totó — Links, agendamento e localização" },
      {
        name: "description",
        content:
          "Pet Shop Clube do Totó — banho, tosa e carinho. Agende pelo WhatsApp, pague via PIX, conecte ao Wi-Fi e encontre nosso espaço em Porto Alegre.",
      },
      { property: "og:title", content: "Clube do Totó — Todos os nossos links" },
      {
        property: "og:description",
        content: "Agende, avalie, pague via PIX e chegue até o Clube do Totó em Porto Alegre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SmartSitePage,
});

/** Logotipo em código: selo redondo com pata e nome da marca. */
function BrandLogo({ brand }: { brand: string }) {
  return (
    <div
      role="img"
      aria-label={`Logotipo ${brand}`}
      className="relative flex size-32 flex-col items-center justify-center rounded-full border-[6px] border-primary bg-ink shadow-2xl shadow-ink/40"
    >
      <span aria-hidden className="absolute inset-[5px] rounded-full border border-dashed border-ink-foreground/25" />
      <PawPrint className="size-11 text-primary" strokeWidth={1.6} />
      <span className="mt-1 font-serif text-lg italic leading-none text-ink-foreground">
        Totó<span className="text-primary">.</span>
      </span>
      <span className="mt-1 text-[0.5rem] uppercase tracking-[0.3em] text-ink-muted">Pet Shop</span>
    </div>
  );
}

function SmartSitePage() {
  return (
    <LeadGate>
      <SmartSite />
    </LeadGate>
  );
}

function SmartSite() {
  const lead = useLead();
  const BRAND = lead.name;
  const WIFI = { network: `${BRAND.replace(/\s+/g, "")}_Clientes`, password: WIFI_PASSWORD };
  const PIX = { favorecido: BRAND, chave: lead.whatsappDigits };
  const WHATSAPP_URL = lead.whatsappUrl;
  const [isScrolled, setIsScrolled] = useState(false);
  const { videoRef, togglePlay } = useVideoControl();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-[100svh] bg-ink text-ink-foreground font-sans pb-[max(env(safe-area-inset-bottom),1.5rem)]">
      {/* Primeira dobra: tela cheia com vídeo */}
      <section
        onClick={togglePlay}
        className="relative isolate min-h-[100svh] w-full overflow-hidden flex flex-col"
      >
        <div className="flex-1 w-full max-w-md mx-auto flex flex-col items-center px-6 pt-[max(env(safe-area-inset-top),1.5rem)] pb-0">
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink">
            <img src={HERO_POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <video
              ref={videoRef}
              preload="auto"
              disablePictureInPicture
              style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink/60 to-ink pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-24 -z-10 bg-gradient-to-b from-ink to-transparent pointer-events-none" />

          {/* Espaçador: empurra o avatar para baixo (~70/30) */}
          <div className="flex-[6] min-h-[40vh]" />

          <div className="flex flex-col items-center text-center animate-fade-in">
            <BrandLogo brand={BRAND} />
            <h1 className="mt-4 font-serif text-4xl tracking-tight">
              {BRAND}<span className="text-primary">.</span>
            </h1>
            <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mt-3">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-star text-star" />
                ))}
              </span>
              <span className="text-xs text-ink-foreground/80">{lead.rating} no Google · +{lead.totalReviews} avaliações</span>
            </div>
          </div>

          <div className="flex-1 min-h-4 w-full flex flex-col items-center justify-center">
            <span
              className={`flex flex-col items-center gap-2 text-[11px] lowercase text-ink-foreground/60 transition-opacity duration-300 ${
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              arraste
              <ChevronsDown className="size-4 mt-1 animate-bounce text-primary" />
            </span>
          </div>

          <div className="w-full flex flex-col items-center">
            {!lead.closed && <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`animate-pulse-ring ${ctaClass}`}>
              <Calendar className="size-5" />
              Agendar Horário
            </a>}
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto px-6 pt-3 pb-10 flex flex-col items-center gap-10">
        {/* CTAs */}
        <nav className="w-full flex flex-col gap-3 animate-fade-in" aria-label="Links principais">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 rounded-full border-[3px] border-dotted border-primary bg-primary/10 px-6 h-[62px] md:h-[49px] font-semibold text-ink-foreground transition-colors hover:bg-primary/20"
          >
            <Star className="size-5 text-star fill-star" />
            Nos Avalie no Google
          </a>
          {lead.site && (
            <a href={lead.site} target="_blank" rel="noopener noreferrer" className={linkButtonClass}>
              <Globe className="size-5 text-primary" />
              Nosso Site
            </a>
          )}
          <Link to="/" search={{ id: lead.token }} hash="servicos" className={linkButtonClass}>
            <Scissors className="size-5 text-primary" />
            Nossos Serviços
          </Link>
          {!lead.closed && (
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkButtonClass}>
              <WhatsAppIcon className="size-5 text-primary" />
              Fale Conosco
            </a>
          )}

          {/* Wi-Fi */}
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className={linkButtonClass}>
                <Wifi className="size-5 text-primary" />
                Conectar ao Wi-Fi
              </button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl sm:rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-normal tracking-tight">Acesso ao Wi-Fi</DialogTitle>
                <DialogDescription className="sr-only">Dados da rede Wi-Fi do estabelecimento</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 text-sm">
                <p>
                  <span className="font-semibold">Rede:</span> {WIFI.network}
                </p>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted px-4 py-3">
                  <p className="truncate">
                    <span className="font-semibold">Senha:</span> {WIFI.password}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 gap-1.5 rounded-full"
                    onClick={() => copyText(WIFI.password, "Senha do Wi-Fi copiada!")}
                  >
                    <Copy className="size-4" />
                    Copiar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* PIX */}
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className={linkButtonClass}>
                <QrCode className="size-5 text-primary" />
                Pagamento via PIX
              </button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl sm:rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-normal tracking-tight">Chave PIX</DialogTitle>
                <DialogDescription>Favorecido: {PIX.favorecido}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 text-sm">
                <div className="size-48 rounded-2xl border-2 border-dashed border-border bg-muted flex items-center justify-center">
                  <QrCode className="size-16 text-muted-foreground" />
                </div>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Aponte a câmera do aplicativo do seu banco para pagar
                </p>
                <p className="text-center">
                  <span className="font-semibold">Chave PIX:</span> {PIX.chave}
                </p>
                <Button
                  type="button"
                  className="w-full gap-2 rounded-full"
                  onClick={() => copyText(PIX.chave, "Chave PIX copiada!")}
                >
                  <Copy className="size-4" />
                  Copiar Chave PIX
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </nav>

        {/* Nosso Espaço */}
        <section className="w-full animate-fade-in" aria-label="Nosso espaço">
          <h2 className="font-serif text-2xl tracking-tight mb-4">Nosso Espaço</h2>
          <div className="flex gap-3 overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y pb-2 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Foto do espaço ${i + 1}`}
                width={480}
                height={640}
                loading="lazy"
                decoding="async"
                className="w-40 shrink-0 aspect-[3/4] object-cover rounded-2xl snap-start"
              />
            ))}
          </div>
        </section>

        {/* Localização — Navegar Agora + Mapa */}
        <section className="w-full animate-fade-in" aria-label="Localização">
          <div className="overflow-hidden rounded-2xl border border-ink-foreground/10">
            <iframe
              title={`Localização ${BRAND}`}
              src={MAPS_EMBED_URL}
              className="w-full h-56 pointer-events-none"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={`${ctaClass} mt-4`}>
            <MapPin className="size-5" />
            Navegar Agora (GPS)
          </a>
        </section>

        {/* Rodapé */}
        <footer className="flex flex-col items-center gap-4 text-center pt-2">
          <div className="flex gap-5">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink-foreground/70 hover:text-primary transition-colors">
              <Instagram className="size-6" />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-ink-foreground/70 hover:text-primary transition-colors">
              <Music2 className="size-6" />
            </a>
          </div>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ink-foreground/60 hover:text-ink-foreground transition-colors leading-relaxed"
          >
            {ADDRESS}
          </a>
        </footer>
      </div>
    </div>
  );
}
