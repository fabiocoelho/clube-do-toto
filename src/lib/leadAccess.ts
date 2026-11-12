/** Token that loads the built-in "Pet Shop Clube do Totó" demo instead of a real client. */
export const DEMO_TOKEN = "demo";

/**
 * Reads the client token from the query string.
 * Accepts `?id=048c1a`, and for the demo also the shortcuts `?=demo` and `?demo`.
 */
export function readLeadToken(search: string): string | null {
  const params = new URLSearchParams(search);
  const id = params.get("id")?.trim();
  if (id) return id;
  if (params.get("")?.trim().toLowerCase() === DEMO_TOKEN || params.has(DEMO_TOKEN)) return DEMO_TOKEN;
  return null;
}

export const isDemoToken = (token: string) => token.toLowerCase() === DEMO_TOKEN;

const PREVIEW_SUFFIXES = [".lovable.app", ".gpt-eng.com", ".gptengineer.run"];

/**
 * True only for local dev and Lovable preview hosts (editor iframe, drafts, commit previews).
 * Published sites (e.g. curated-creative-journey.lovable.app) and custom domains are NOT previews.
 */
export function isPreviewHost(rawHost: string): boolean {
  const host = rawHost.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
  if (host.endsWith(".lovableproject.com") || host.endsWith(".lovableproject-dev.com")) return true;

  const suffix = PREVIEW_SUFFIXES.find((s) => host.endsWith(s));
  if (!suffix) return false;
  const labels = host.slice(0, -suffix.length).split(".");
  const first = labels[0] ?? "";

  // id-preview--<id>, id-preview-6--<id>, preview--<slug>, preview-<sha>--<slug> (optional workspace label)
  if (/^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/.test(first) && labels.length <= 2) return true;
  // project--<id>-dev
  if (/^project--[0-9a-f-]{36}-dev$/.test(first) && labels.length === 1) return true;
  // live--<id>[-thr_x].<workspace>
  if (/^live--[0-9a-f-]{36}(?:-thr_[a-z0-9]+)?$/.test(first) && labels.length === 2) return true;
  return false;
}
