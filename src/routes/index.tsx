import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Reviews } from "@/components/landing/Reviews";
import { Team } from "@/components/landing/Team";
import { Faq } from "@/components/landing/Faq";
import { Contact } from "@/components/landing/Contact";
import { LeadGate } from "@/components/landing/lead";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clube do Totó — Banho, tosa e cuidado premium para seu pet" },
      { name: "description", content: "Petshop com banho premium, tosa artesanal, veterinária e day care. Agende pelo WhatsApp." },
      { property: "og:title", content: "Clube do Totó — Petshop premium" },
      { property: "og:description", content: "Banho, tosa e bem-estar com calma e carinho. Agende pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LeadGate>
    <main className="overflow-x-hidden">
      <Hero />
      <Services />
      <Reviews />
      <Team />
      <Faq />
      <Contact />
    </main>
    </LeadGate>
  );
}
