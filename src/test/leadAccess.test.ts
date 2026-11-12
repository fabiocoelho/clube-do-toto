import { describe, expect, it } from "vitest";
import { isPreviewHost, readLeadToken } from "@/lib/leadAccess";
import { demoLead } from "@/components/landing/lead";

describe("readLeadToken", () => {
  it("reads ?id=", () => expect(readLeadToken("?id=048c1a")).toBe("048c1a"));
  it("accepts ?id=demo, ?=demo and ?demo", () => {
    expect(readLeadToken("?id=demo")).toBe("demo");
    expect(readLeadToken("?=demo")).toBe("demo");
    expect(readLeadToken("?demo")).toBe("demo");
  });
  it("returns null without a token", () => expect(readLeadToken("")).toBeNull());
});

describe("isPreviewHost", () => {
  const id = "1fe0606e-7994-4072-b5cf-c838d3e0beaa";
  it("treats Lovable preview hosts and localhost as preview", () => {
    expect(isPreviewHost("localhost")).toBe(true);
    expect(isPreviewHost(`id-preview--${id}.lovable.app`)).toBe(true);
    expect(isPreviewHost(`id-preview-6--${id}.lovable.app`)).toBe(true);
    expect(isPreviewHost(`${id}.lovableproject.com`)).toBe(true);
  });
  it("keeps the published site and custom domains public (strict redirect)", () => {
    expect(isPreviewHost("curated-creative-journey.lovable.app")).toBe(false);
    expect(isPreviewHost("petshop.getsite.com.br")).toBe(false);
    expect(isPreviewHost("evil-id-preview--x.example.com")).toBe(false);
  });
});

describe("demoLead", () => {
  it("is the Pet Shop Clube do Totó with static fallbacks", () => {
    const DEMO_LEAD = demoLead();
    expect(DEMO_LEAD.name).toBe("Pet Shop Clube do Totó");
    expect(DEMO_LEAD.token).toBe("demo");
    expect(DEMO_LEAD.rating).toBe("5,0");
  });
});
