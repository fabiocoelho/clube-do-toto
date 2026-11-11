import { Eyebrow, Reveal } from "./shared";

const reviews = [
  { name: "Mariana L.", pet: "tutora do Bento", text: "O Bento voltou cheiroso, calmo e com laço! Atendimento impecável do início ao fim." },
  { name: "Rafael C.", pet: "tutor da Luna", text: "Primeiro petshop em que a Luna entra abanando o rabo. Equipe extremamente cuidadosa." },
  { name: "Juliana P.", pet: "tutora do Thor", text: "Ambiente limpo, sem gaiolas e eles mandam foto durante o banho. Recomendo demais." },
  { name: "Carlos M.", pet: "tutor da Mel", text: "O leva e traz salvou minha rotina. Pontuais e muito atenciosos." },
  { name: "Fernanda S.", pet: "tutora do Fred", text: "A tosa ficou perfeita, exatamente como pedi. Já virei cliente fixa." },
  { name: "Lucas A.", pet: "tutor da Nina", text: "A veterinária foi super paciente e explicou tudo com calma. Nota 10." },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-star">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google">
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

export function Reviews() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="overflow-hidden border-y border-border bg-secondary py-28">
      <Reveal className="mx-auto mb-14 max-w-7xl px-6 text-center lg:px-10">
        <Eyebrow>Prova social</Eyebrow>
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Tutores que confiam na gente.</h2>
      </Reveal>
      <div className="pause-on-hover relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-6">
          {loop.map((r, i) => (
            <figure key={i} className="w-[340px] shrink-0 rounded-3xl border border-border bg-card p-7">
              <div className="flex items-center justify-between">
                <Stars />
                <GoogleG />
              </div>
              <blockquote className="mt-5 font-light leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-serif text-accent-foreground">{r.name[0]}</span>
                <span className="text-sm">
                  <span className="block font-medium">{r.name}</span>
                  <span className="text-muted-foreground">{r.pet}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
