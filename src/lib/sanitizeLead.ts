export const WHATSAPP_FALLBACK = "5551980573087";

const LOWER = new Set(["de", "da", "do", "das", "dos", "e", "em", "a", "o"]);

export function cleanBusinessName(raw: string | null | undefined): string {
  if (!raw) return "";
  let s = raw.split(/\s[-|–]\s|\(/)[0] ?? "";
  s = s.replace(/\b(LTDA|EIRELI|EPP|ME|S\/A|S\.A\.?|SA)\b\.?/gi, " ");
  s = s.replace(/\s+/g, " ").trim().replace(/[-,.\s]+$/, "");
  return s
    .toLowerCase()
    .split(" ")
    .map((w, i) => (i > 0 && LOWER.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export function whatsappDigits(raw: string | null | undefined): string {
  let d = (raw ?? "").replace(/\D/g, "");
  if (!d) d = WHATSAPP_FALLBACK;
  if (!d.startsWith("55")) d = "55" + d;
  return d;
}

export function formatWhatsApp(raw: string | null | undefined): string {
  const local = whatsappDigits(raw).slice(2);
  const ddd = local.slice(0, 2);
  const num = local.slice(2);
  if (num.length === 9) return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`;
  if (num.length === 8) return `(${ddd}) ${num.slice(0, 4)}-${num.slice(4)}`;
  return local;
}

export type ReviewDistribution = Partial<Record<"oneStar" | "twoStar" | "threeStar" | "fourStar" | "fiveStar", number>>;

export function parseReviews(dist: unknown) {
  const obj = (dist && typeof dist === "object" ? dist : {}) as Record<string, unknown>;
  const total = Object.values(obj).reduce<number>((s, v) => s + (Number(v) || 0), 0);
  const fiveStar = Number(obj["fiveStar"]) || 0;
  return { total, fiveStar, showTestimonials: fiveStar > 10 };
}

export function formatRating(n: number | null | undefined): string {
  return (Number(n) || 5).toFixed(1).replace(".", ",");
}
