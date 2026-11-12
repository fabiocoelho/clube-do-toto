import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabase } from "@/lib/supabase";
import { DEMO_TOKEN, isDemoToken, isPreviewHost, readLeadToken } from "@/lib/leadAccess";
import {
  cleanBusinessName,
  cleanText,
  cleanUrl,
  formatAddressLines,
  formatRating,
  formatWhatsApp,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  parseReviews,
  whatsappDigits,
  wifiNetworkName,
  wifiPassword,
} from "@/lib/sanitizeLead";
import { ADDRESS, GOOGLE_REVIEW_URL, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from "./shared";

export type Lead = {
  token: string;
  name: string;
  whatsappDigits: string;
  whatsappDisplay: string;
  whatsappUrl: string;
  rating: string;
  totalReviews: number;
  showTestimonials: boolean;
  site: string | null;
  address: string;
  /** [street, number, neighborhood] / [city - UF, CEP] */
  addressLines: [string, string];
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  reviewUrl: string;
  wifiNetwork: string;
  wifiPassword: string;
};

const LeadContext = createContext<Lead | null>(null);

export function useLead(): Lead {
  const lead = useContext(LeadContext);
  if (!lead) throw new Error("useLead must be used inside LeadGate");
  return lead;
}

export const REDIRECT_URL = "https://getsite.com.br";

/** Builds the Lead from a raw `leads` row, falling back to static data for empty columns. */
export function buildLead(token: string, data: Record<string, unknown>): Lead {
  const digits = whatsappDigits(data["whatsapp"] as string | null);
  const name = cleanBusinessName(data["nome_negocio"] as string | null) || "Pet Shop";
  const reviews = parseReviews(data["distribuicao_avaliacoes"]);
  const text = encodeURIComponent(`Olá! Quero agendar um horário no ${name}`);
  const address = cleanText(data["endereco"]);
  return {
    token,
    name,
    whatsappDigits: digits,
    whatsappDisplay: formatWhatsApp(data["whatsapp"] as string | null),
    whatsappUrl: `https://wa.me/${digits}?text=${text}`,
    rating: formatRating(data["nota_google"] as number | null),
    totalReviews: reviews.total,
    showTestimonials: reviews.showTestimonials,
    site: cleanUrl(data["site"]),
    address: address ?? ADDRESS,
    addressLines: formatAddressLines(address ?? ADDRESS),
    mapsEmbedUrl: address ? mapsEmbedUrl(address) : MAPS_EMBED_URL,
    mapsDirectionsUrl: address ? mapsDirectionsUrl(address) : MAPS_DIRECTIONS_URL,
    reviewUrl: cleanUrl(data["link_avaliacao"]) ?? GOOGLE_REVIEW_URL,
    wifiNetwork: wifiNetworkName(name),
    wifiPassword: wifiPassword(name, new Date().getFullYear()),
  };
}

/** Built-in demo client, shown for `?id=demo` / `?=demo` and in the Lovable preview without a token. */
// Built lazily: the Wi-Fi password uses the current year, which is not available at module scope on the server.
export const demoLead = (): Lead =>
  buildLead(DEMO_TOKEN, {
    nome_negocio: "Pet Shop Clube do Totó",
    nota_google: 5,
    distribuicao_avaliacoes: { fiveStar: 42 },
  });

export function LeadGate({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const show = (next: Lead) => {
      setLead(next);
      document.title = `${next.name} | Petshop`;
    };
    const redirect = () => window.location.replace(REDIRECT_URL);
    const token = readLeadToken(window.location.search);
    // Demo works everywhere; inside the Lovable preview a missing token also shows the demo.
    if (!token) return isPreviewHost(window.location.hostname) ? show(demoLead()) : redirect();
    if (isDemoToken(token)) return show(demoLead());
    const id = token;
    let active = true;
    // select("*") so optional columns (endereco, link_avaliacao) never break the query when absent.
    getSupabase()
      .from("leads")
      .select("*")
      .eq("token_url", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) return redirect();
        show(buildLead(id, data as Record<string, unknown>));
      });
    return () => {
      active = false;
    };
  }, []);

  if (!lead) return <div className="min-h-[100svh] bg-ink" aria-busy />;
  return <LeadContext.Provider value={lead}>{children}</LeadContext.Provider>;
}
