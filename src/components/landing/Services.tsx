import { Bath, Scissors, Stethoscope, Sparkles, Truck, HeartHandshake, type LucideIcon } from "lucide-react";
import { Eyebrow, Reveal } from "./shared";
import bathImg from "@/assets/service-bath.jpg";

const services: { icon: LucideIcon; title: string; text: string; span: string }[] = [
  { icon: Bath, title: "Banho Premium", text: "Shampoos dermatológicos, hidratação e secagem em baixa temperatura para pelagem macia e saudável.", span: "md:col-span-2 md:row-span-2" },
  { icon: Scissors, title: "Tosa Artesanal", text: "Na tesoura ou máquina, respeitando o padrão da raça.", span: "" },
  { icon: Stethoscope, title: "Clínica Veterinária", text: "Consultas, vacinas e check-ups.", span: "" },
  { icon: Sparkles, title: "Spa & Hidratação", text: "Ozônio, argila e massagem relaxante.", span: "" },
  { icon: Truck, title: "Leva e Traz", text: "Busca e entrega com segurança.", span: "" },
  { icon: HeartHandshake, title: "Day Care", text: "Um dia de brincadeiras e socialização supervisionada.", span: "md:col-span-2" },
];

export function Services() {
  return (
    <section id="servicos" className="bg-secondary pb-28 pt-48 lg:pb-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>Nossos serviços</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">Tudo o que seu pet precisa, num só lugar.</h2>
          </div>
          <p className="max-w-md font-light leading-relaxed text-muted-foreground md:justify-self-end">
            Cada atendimento é individual, sem pressa e sem gaiolas. Profissionais certificados e ambiente climatizado.
          </p>
        </Reveal>

        <div className="grid auto-rows-[minmax(200px,auto)] gap-5 md:grid-cols-4">
          {services.map((s, i) =>
            i === 0 ? (
              <Reveal key={s.title} delay={0} className={s.span}>
                <article className="group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <img
                    src={bathImg}
                    alt="Cãozinho branco enrolado em toalha após o banho"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:scale-110">
                    <s.icon className="h-6 w-6" strokeWidth={1.4} />
                  </div>
                  <div className="relative mt-10 text-background">
                    <h3 className="font-serif text-3xl tracking-tight md:text-4xl">{s.title}</h3>
                    <p className="mt-3 max-w-md font-light leading-relaxed text-background/85">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ) : (
              <Reveal key={s.title} delay={i * 0.08} className={s.span}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:scale-110">
                    <s.icon className="h-6 w-6" strokeWidth={1.4} />
                  </div>
                  <div className="mt-10">
                    <h3 className="font-serif text-2xl tracking-tight">{s.title}</h3>
                    <p className="mt-3 font-light leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
