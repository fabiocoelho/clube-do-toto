import { describe, expect, it } from "vitest";
import { buildLead } from "@/components/landing/lead";
import { ADDRESS, GOOGLE_REVIEW_URL, INSTAGRAM_URL, MAPS_EMBED_URL } from "@/components/landing/shared";

const base = { nome_negocio: "PET LTDA", whatsapp: "51999998888" };

describe("buildLead", () => {
  it("uses the lead's endereco for text, map and GPS route", () => {
    const lead = buildLead("abc", { ...base, endereco: "R. Giusepe Mandeli, 265 - Porto Alegre" });
    expect(lead.address).toBe("R. Giusepe Mandeli, 265 - Porto Alegre");
    expect(lead.mapsEmbedUrl).toContain("q=R.%20Giusepe%20Mandeli%2C%20265%20-%20Porto%20Alegre");
    expect(lead.mapsDirectionsUrl).toContain("destination=R.%20Giusepe%20Mandeli");
  });

  it("uses link_avaliacao when present", () => {
    const lead = buildLead("abc", { ...base, link_avaliacao: "g.page/r/xyz/review" });
    expect(lead.reviewUrl).toBe("https://g.page/r/xyz/review");
  });

  it("generates the Wi-Fi password from the first word of the business name + current year", () => {
    const lead = buildLead("abc", { ...base, nome_negocio: "Despachante Alessandro" });
    expect(lead.wifiPassword).toBe(`Despachante${new Date().getFullYear()}`);
    expect(lead.wifiNetwork).toBe("DespachanteAlessandr");
  });

  it("falls back to Clube do Totó data when the new columns are null or missing", () => {
    const lead = buildLead("abc", { ...base, endereco: null });
    expect(lead.address).toBe(ADDRESS);
    expect(lead.addressLines).toEqual(["Rua das Acácias, 123 - Jardim Botânico", "Porto Alegre - RS, Cep 90690-000"]);
    expect(lead.mapsEmbedUrl).toBe(MAPS_EMBED_URL);
    expect(lead.reviewUrl).toBe(GOOGLE_REVIEW_URL);
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
