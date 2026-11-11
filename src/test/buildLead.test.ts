import { describe, expect, it } from "vitest";
import { buildLead } from "@/components/landing/lead";
import { ADDRESS, GOOGLE_REVIEW_URL, INSTAGRAM_URL, MAPS_EMBED_URL, WIFI_PASSWORD } from "@/components/landing/shared";

const base = { nome_negocio: "PET LTDA", whatsapp: "51999998888" };

describe("buildLead", () => {
  it("uses the lead's endereco for text, map and GPS route", () => {
    const lead = buildLead("abc", { ...base, endereco: "R. Giusepe Mandeli, 265 - Porto Alegre" });
    expect(lead.address).toBe("R. Giusepe Mandeli, 265 - Porto Alegre");
    expect(lead.mapsEmbedUrl).toContain("q=R.%20Giusepe%20Mandeli%2C%20265%20-%20Porto%20Alegre");
    expect(lead.mapsDirectionsUrl).toContain("destination=R.%20Giusepe%20Mandeli");
  });

  it("uses link_avaliacao and senha_wifi when present", () => {
    const lead = buildLead("abc", { ...base, link_avaliacao: "g.page/r/xyz/review", senha_wifi: "segredo123" });
    expect(lead.reviewUrl).toBe("https://g.page/r/xyz/review");
    expect(lead.wifiPassword).toBe("segredo123");
  });

  it("falls back to Clube do Totó data when the new columns are null or missing", () => {
    const lead = buildLead("abc", { ...base, endereco: null, senha_wifi: "None" });
    expect(lead.address).toBe(ADDRESS);
    expect(lead.mapsEmbedUrl).toBe(MAPS_EMBED_URL);
    expect(lead.reviewUrl).toBe(GOOGLE_REVIEW_URL);
    expect(lead.wifiPassword).toBe(WIFI_PASSWORD);
  });

  it("ignores comercio_fechou: a closed business still gets its contact data", () => {
    const lead = buildLead("abc", { ...base, comercio_fechou: true });
    expect(lead).not.toHaveProperty("closed");
    expect(lead.whatsappUrl).toContain("wa.me/5551999998888");
  });
});

describe("social links", () => {
  it("Instagram is fixed to eu.fcoelho", () => {
    expect(INSTAGRAM_URL).toBe("https://instagram.com/eu.fcoelho");
  });
});
