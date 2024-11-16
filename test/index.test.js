const Possessive = require("../index");

describe("Possessive", () => {
  let possessive;

  beforeEach(() => {
    possessive = new Possessive();
  });

  describe("Basic functionality", () => {
    test("regular nouns", () => {
      expect(possessive.makePossessive("John")).toBe("John's");
      expect(possessive.makePossessive("cat")).toBe("cat's");
    });

    test("nouns ending in s", () => {
      expect(possessive.makePossessive("James")).toBe("James'");
      expect(possessive.makePossessive("Chris")).toBe("Chris'");
    });

    test("alternative style", () => {
      const altPossessive = new Possessive({ style: "alternative" });
      expect(altPossessive.makePossessive("James")).toBe("James's");
      expect(altPossessive.makePossessive("Chris")).toBe("Chris's");
    });
  });

  describe("German names", () => {
    test("names with ß", () => {
      expect(possessive.makePossessive("Strauß")).toBe("Strauß'");
      expect(possessive.makePossessive("Weiß")).toBe("Weiß'");
      expect(possessive.makePossessive("Groß")).toBe("Groß'");
    });

    test("ß with alternative style", () => {
      const altPossessive = new Possessive({ style: "alternative" });
      expect(altPossessive.makePossessive("Strauß")).toBe("Strauß'");
      expect(altPossessive.makePossessive("Weiß")).toBe("Weiß'");
    });

    test("names with umlauts", () => {
      expect(possessive.makePossessive("Müller")).toBe("Müller's");
      expect(possessive.makePossessive("Schröder")).toBe("Schröder's");
    });
  });

  describe("French names", () => {
    test("names ending in s", () => {
      expect(possessive.makePossessive("François")).toBe("François'");
      expect(possessive.makePossessive("Jacques")).toBe("Jacques'");
      expect(possessive.makePossessive("Jules")).toBe("Jules'");
    });

    test("names ending in s with alternative style", () => {
      const altPossessive = new Possessive({ style: "alternative" });
      expect(altPossessive.makePossessive("François")).toBe("François's");
      expect(altPossessive.makePossessive("Jacques")).toBe("Jacques's");
    });

    test("names ending in silent x", () => {
      expect(possessive.makePossessive("Lemieux")).toBe("Lemieux's");
      expect(possessive.makePossessive("Devereaux")).toBe("Devereaux's");
      expect(possessive.makePossessive("Leroux")).toBe("Leroux's");
    });

    test("names ending in eau", () => {
      expect(possessive.makePossessive("Moreau")).toBe("Moreau's");
      expect(possessive.makePossessive("Trudeau")).toBe("Trudeau's");
    });

    test("names with accents", () => {
      expect(possessive.makePossessive("René")).toBe("René's");
      expect(possessive.makePossessive("Molière")).toBe("Molière's");
      expect(possessive.makePossessive("François")).toBe("François'");
    });

    test("names with ç", () => {
      expect(possessive.makePossessive("Leçon")).toBe("Leçon's");
    });
  });

  describe("Nordic names", () => {
    test("names with å", () => {
      expect(possessive.makePossessive("Åberg")).toBe("Åberg's");
      expect(possessive.makePossessive("Håkansson")).toBe("Håkansson's");
    });

    test("names with ø/ö", () => {
      expect(possessive.makePossessive("Björk")).toBe("Björk's");
      expect(possessive.makePossessive("Østergaard")).toBe("Østergaard's");
    });

    test("names with æ/ä", () => {
      expect(possessive.makePossessive("Kjær")).toBe("Kjær's");
      expect(possessive.makePossessive("Määttä")).toBe("Määttä's");
    });
  });

  describe("Mixed cases", () => {
    test("names with special characters ending in s", () => {
      expect(possessive.makePossessive("FrançOis")).toBe("FrançOis'");
      expect(possessive.makePossessive("Weiss")).toBe("Weiss'");
    });

    test("case preservation", () => {
      expect(possessive.makePossessive("MÜLLER")).toBe("MÜLLER'S");
      expect(possessive.makePossessive("FrançOis")).toBe("FrançOis'");
      expect(possessive.makePossessive("MüLLer")).toBe("MüLLer's");
    });
  });

  describe("Configuration", () => {
    test("disabled French rules", () => {
      const noFrench = new Possessive({ enableFrenchRules: false });
      expect(noFrench.makePossessive("François")).toBe("François'");
    });

    test("disabled German rules", () => {
      const noGerman = new Possessive({ enableGermanRules: false });
      expect(noGerman.makePossessive("Strauß")).toBe("Strauß's");
    });
  });

  describe("Error handling", () => {
    test("invalid inputs", () => {
      expect(() => possessive.makePossessive("")).toThrow(
        "Input cannot be empty"
      );
      expect(() => possessive.makePossessive("   ")).toThrow(
        "Input cannot be only whitespace"
      );
      expect(() => possessive.makePossessive(null)).toThrow(
        "Input cannot be empty"
      );
      expect(() => possessive.makePossessive(undefined)).toThrow(
        "Input cannot be empty"
      );
      expect(() => possessive.makePossessive(123)).toThrow(
        "Input must be a string"
      );
    });
  });
});
