import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Eyebrow, Reveal } from "./shared";

const faqs = [
  { q: "Preciso agendar com antecedência?", a: "Recomendamos agendar com 2 a 3 dias de antecedência, principalmente aos sábados. Encaixes no mesmo dia dependem da disponibilidade." },
  { q: "Quanto tempo dura um banho e tosa?", a: "Em média de 1h30 a 3h, conforme porte e pelagem. Avisamos pelo WhatsApp quando estiver pronto." },
  { q: "Meu pet fica em gaiola?", a: "Não. Os pets aguardam em espaços abertos e supervisionados, separados por porte e temperamento." },
  { q: "Quais produtos vocês utilizam?", a: "Linhas dermatológicas e hipoalergênicas de marcas profissionais. Pets com alergia podem trazer seu próprio produto." },
  { q: "Vocês atendem gatos?", a: "Sim! Temos horários exclusivos para felinos, em ambiente silencioso e sem cães por perto." },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">Perguntas que sempre recebemos.</h2>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.1}>
          <Accordion.Root type="single" collapsible defaultValue="0">
            {faqs.map((f, i) => (
              <Accordion.Item key={i} value={String(i)} className="border-b border-border">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-7 text-left">
                    <span className="font-serif text-xl tracking-tight transition-colors group-hover:text-primary md:text-2xl">{f.q}</span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                      <Plus className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-2xl pb-8 pr-16 font-light leading-relaxed text-muted-foreground">{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
