import { describe, expect, it } from "vitest";
import { cleanBusinessName, formatWhatsApp, parseReviews, whatsappDigits } from "@/lib/sanitizeLead";

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
});
