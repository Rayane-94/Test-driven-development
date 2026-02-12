import { describe, it, expect } from "vitest";
import { parseCard } from "../src/card";

describe("parseCard", () => {
  it("parse 'AT' (As de trèfle)", () => {
    expect(parseCard("AT")).toEqual({ rank: 14, color: "T", card: "AT" });
  });
});
