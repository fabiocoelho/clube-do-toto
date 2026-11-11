import { describe, expect, it } from "vitest";
import { cleanBusinessName, formatAddressLines, formatWhatsApp, parseReviews, whatsappDigits, wifiNetworkName, wifiPassword } from "@/lib/sanitizeLead";

describe("sanitizeLead", () => {
  it("cleans business name", () => {
    expect(cleanBusinessName("PET SHOP AMIGO LTDA - Centro")).toBe("Pet Shop Amigo");
    expect(cleanBusinessName("CLUBE DO TOTÓ (Filial)")).toBe("Clube do Totó");
  });
  it("formats whatsapp with fallback", () => {
    expect(whatsappDigits("+55 (51) 98057-3087")).toBe("5551980573087");
    expect(whatsappDigits(null)).toBe("5551980573087");
    expect(formatWhatsApp("+5551980573087")).toBe("(51) 98057-3087");
  });
  it("sums reviews and gates testimonials on fiveStar > 10", () => {
    expect(parseReviews({ fiveStar: 41, fourStar: 1, oneStar: 0 })).toEqual({ total: 42, fiveStar: 41, showTestimonials: true });
    expect(parseReviews({ fiveStar: 10 }).showTestimonials).toBe(false);
  });
  it("splits the address into street/neighborhood and city - UF, Cep", () => {
    expect(formatAddressLines("R. Hilário Ribeiro, 202 - Moinhos de Vento, Porto Alegre - RS, 90510-040, Brasil")).toEqual([
      "R. Hilário Ribeiro, 202 - Moinhos de Vento",
      "Porto Alegre - RS, Cep 90510-040",
    ]);
    expect(formatAddressLines("R. Recife, 36 - Lj 05 - Azenha, Porto Alegre - RS, 90880-500, Brasil")).toEqual([
      "R. Recife, 36 - Lj 05 - Azenha",
      "Porto Alegre - RS, Cep 90880-500",
    ]);
    expect(formatAddressLines("Sem cidade aqui")).toEqual(["Sem cidade aqui", ""]);
  });
  it("Wi-Fi network has no spaces/symbols and max 20 chars", () => {
    expect(wifiNetworkName("Despachantes, Recursos de Multas")).toBe("DespachantesRecursos");
    expect(wifiNetworkName("Clube do Totó")).toBe("ClubedoToto");
  });
  it("Wi-Fi password is first word + year", () => {
    expect(wifiPassword("Despachante Alessandro", 2026)).toBe("Despachante2026");
    expect(wifiPassword("Pet-Shop Amigo", 2026)).toBe("PetShop2026");
  });
});
