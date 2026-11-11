import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabase } from "@/lib/supabase";
import { cleanBusinessName, formatRating, formatWhatsApp, parseReviews, whatsappDigits } from "@/lib/sanitizeLead";

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
  closed: boolean;
};

const LeadContext = createContext<Lead | null>(null);

export function useLead(): Lead {
  const lead = useContext(LeadContext);
  if (!lead) throw new Error("useLead must be used inside LeadGate");
  return lead;
}

const REDIRECT_URL = "https://getsite.com.br";

type State = { status: "loading" } | { status: "blocked"; reason: string } | { status: "ready"; lead: Lead };

export function LeadGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id")?.trim();
    const fail = (reason: string) => {
      if (import.meta.env.DEV) setState({ status: "blocked", reason });
      else window.location.replace(REDIRECT_URL);
    };
    if (!id) return fail("Nenhum código de cliente informado na URL (?id=).");
    let active = true;
    getSupabase()
      .from("leads")
      .select("token_url, nome_negocio, whatsapp, site, comercio_fechou, distribuicao_avaliacoes, nota_google")
      .eq("token_url", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) return fail(`Código "${id}" não encontrado.`);
        const digits = whatsappDigits(data.whatsapp);
        const name = cleanBusinessName(data.nome_negocio) || "Pet Shop";
        const reviews = parseReviews(data.distribuicao_avaliacoes);
        const text = encodeURIComponent(`Olá! Quero agendar um horário no ${name}`);
        const site = typeof data.site === "string" && data.site.trim() ? data.site.trim() : null;
        setState({
          status: "ready",
          lead: {
            token: id,
            name,
            whatsappDigits: digits,
            whatsappDisplay: formatWhatsApp(data.whatsapp),
            whatsappUrl: `https://wa.me/${digits}?text=${text}`,
            rating: formatRating(data.nota_google),
            totalReviews: reviews.total,
            showTestimonials: reviews.showTestimonials,
            site: site && !/^https?:\/\//i.test(site) ? `https://${site}` : site,
            closed: data.comercio_fechou === true,
          },
        });
        document.title = `${name} | Petshop`;
      });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") return <div className="min-h-[100svh] bg-ink" aria-busy />;
  if (state.status === "blocked")
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-ink px-6 text-center text-ink-foreground">
        <div className="max-w-sm">
          <p className="font-serif text-2xl">Página indisponível</p>
          <p className="mt-3 text-sm text-ink-muted">{state.reason}</p>
          <p className="mt-2 text-xs text-ink-muted">Em produção, o visitante seria redirecionado para getsite.com.br.</p>
        </div>
      </div>
    );
  return (
    <LeadContext.Provider value={state.lead}>
      {state.lead.closed && (
        <div className="fixed inset-x-0 bottom-0 z-[60] bg-ink px-4 py-3 text-center text-sm text-ink-foreground border-t border-ink-foreground/10">
          Este estabelecimento está temporariamente indisponível para atendimento.
        </div>
      )}
      {children}
    </LeadContext.Provider>
  );
}
