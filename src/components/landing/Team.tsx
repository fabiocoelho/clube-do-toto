import { motion } from "framer-motion";
import vet from "@/assets/team-vet.jpg";
import spa from "@/assets/team-spa.jpg";
import groomer from "@/assets/team-groomer.jpg";
import daycare from "@/assets/team-daycare.jpg";
import { Eyebrow, Reveal } from "./shared";

type Tile =
  | { kind: "photo"; src: string; name: string; role: string; h: string }
  | { kind: "stat"; value: string; label: string; tone: "primary" | "ink" };

const tiles: Tile[] = [
  { kind: "photo", src: vet, name: "Dra. Camila Rocha", role: "Médica veterinária", h: "aspect-[4/5]" },
  { kind: "stat", value: "+12 mil", label: "pets atendidos com carinho", tone: "primary" },
  { kind: "photo", src: spa, name: "Espaço de banho", role: "Climatizado e sem gaiolas", h: "aspect-square" },
  { kind: "photo", src: groomer, name: "Thiago Mendes", role: "Groomer certificado", h: "aspect-[3/4]" },
  { kind: "stat", value: "9 anos", label: "de experiência no bairro", tone: "ink" },
  { kind: "photo", src: daycare, name: "Ana Beatriz", role: "Day care & recreação", h: "aspect-[4/5]" },
];

function PhotoTile({ src, name, role, h }: { src: string; name: string; role: string; h: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm ${h}`}>
      <img src={src} alt={`${name} — ${role}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 flex items-end bg-ink/0 p-6 transition-colors duration-500 group-hover:bg-ink/50">
        <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-serif text-xl text-ink-foreground">{name}</p>
          <p className="text-sm text-ink-foreground/80">{role}</p>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 z-10 bg-ink"
        initial={{ x: "0%" }}
        whileInView={{ x: "101%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.77, 0, 0.18, 1], delay: 0.15 }}
      />
    </div>
  );
}

export function Team() {
  return (
    <section id="equipe" className="bg-secondary py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <Eyebrow>Estrutura & equipe</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">Pessoas apaixonadas, num espaço feito para eles.</h2>
        </Reveal>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {tiles.map((t, i) =>
            t.kind === "photo" ? (
              <div key={i} className="break-inside-avoid"><PhotoTile {...t} /></div>
            ) : (
              <Reveal key={i} className="break-inside-avoid">
                <div className={`flex aspect-[5/4] flex-col justify-between rounded-3xl p-8 ${t.tone === "primary" ? "bg-primary text-primary-foreground" : "bg-ink text-ink-foreground"}`}>
                  <span className="text-xs uppercase tracking-[0.25em] opacity-70">Clube do Totó</span>
                  <div>
                    <p className="font-serif text-6xl tracking-tight">{t.value}</p>
                    <p className="mt-2 font-light opacity-80">{t.label}</p>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
