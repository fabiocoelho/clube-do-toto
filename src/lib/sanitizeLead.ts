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

/** Trimmed text, or null when empty / "None" / "null" (common placeholders in the table). */
export function cleanText(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (!s || /^(none|null|undefined)$/i.test(s)) return null;
  return s;
}

/** Absolute http(s) URL, or null. Adds https:// when the scheme is missing. */
export function cleanUrl(raw: unknown): string | null {
  const s = cleanText(raw);
  if (!s) return null;
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

export function mapsEmbedUrl(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
}

export function mapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
