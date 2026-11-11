import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabase } from "@/lib/supabase";
import {
  cleanBusinessName,
  cleanText,
  cleanUrl,
  formatRating,
  formatWhatsApp,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  parseReviews,
  whatsappDigits,
} from "@/lib/sanitizeLead";
import { ADDRESS, GOOGLE_REVIEW_URL, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, WIFI_PASSWORD } from "./shared";

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
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  reviewUrl: string;
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
  const digits = whatsappDigits(data.whatsapp as string | null);
  const name = cleanBusinessName(data.nome_negocio as string | null) || "Pet Shop";
  const reviews = parseReviews(data.distribuicao_avaliacoes);
  const text = encodeURIComponent(`Olá! Quero agendar um horário no ${name}`);
  const address = cleanText(data.endereco);
  return {
    token,
    name,
    whatsappDigits: digits,
    whatsappDisplay: formatWhatsApp(data.whatsapp as string | null),
    whatsappUrl: `https://wa.me/${digits}?text=${text}`,
    rating: formatRating(data.nota_google as number | null),
    totalReviews: reviews.total,
    showTestimonials: reviews.showTestimonials,
    site: cleanUrl(data.site),
    address: address ?? ADDRESS,
    mapsEmbedUrl: address ? mapsEmbedUrl(address) : MAPS_EMBED_URL,
    mapsDirectionsUrl: address ? mapsDirectionsUrl(address) : MAPS_DIRECTIONS_URL,
    reviewUrl: cleanUrl(data.link_avaliacao) ?? GOOGLE_REVIEW_URL,
    wifiPassword: cleanText(data.senha_wifi) ?? WIFI_PASSWORD,
  };
}

export function LeadGate({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id")?.trim();
    const redirect = () => window.location.replace(REDIRECT_URL);
    if (!id) return redirect();
    let active = true;
    // select("*") so optional columns (link_avaliacao, senha_wifi) never break the query when absent.
    getSupabase()
      .from("leads")
      .select("*")
      .eq("token_url", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) return redirect();
        const next = buildLead(id, data as Record<string, unknown>);
        setLead(next);
        document.title = `${next.name} | Petshop`;
      });
    return () => {
      active = false;
    };
  }, []);

  if (!lead) return <div className="min-h-[100svh] bg-ink" aria-busy />;
  return <LeadContext.Provider value={lead}>{children}</LeadContext.Provider>;
}
