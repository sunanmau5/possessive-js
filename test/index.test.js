const Possessive = require("../src/index");

describe("Possessive", () => {
	describe("constructor", () => {
		test("uses default options", () => {
			const possessive = new Possessive();

			expect(possessive.options).toEqual({
				style: "standard",
			});
		});

		test("accepts explicit valid options", () => {
			const possessive = new Possessive({ style: "alternative" });

			expect(possessive.options).toEqual({
				style: "alternative",
			});
		});

		test.each([
			["null", null, "Options must be an object"],
			["array", [], "Options must be an object"],
			["string", "bad", "Options must be an object"],
			[
				"invalid style",
				{ style: "modern" },
				"Style option must be either 'standard' or 'alternative'",
			],
		])("rejects %s", (_label, options, message) => {
			expect(() => new Possessive(options)).toThrow(message);
		});
	});

	describe("makePossessive", () => {
		let possessive;

		beforeEach(() => {
			possessive = new Possessive();
		});

		test.each([
			["John", "John's"],
			["cat", "cat's"],
			["James", "James'"],
			["Chris", "Chris'"],
			["Strauß", "Strauß's"],
			["Müller", "Müller's"],
			["François", "François'"],
			["Lemieux", "Lemieux's"],
			["Åberg", "Åberg's"],
			["MÜLLER", "MÜLLER'S"],
			["  John  ", "John's"],
		])("formats %s as %s", (noun, expected) => {
			expect(possessive.makePossessive(noun)).toBe(expected);
		});

		test("supports alternative style for trailing s", () => {
			const alternative = new Possessive({ style: "alternative" });

			expect(alternative.makePossessive("James")).toBe("James's");
			expect(alternative.makePossessive("Chris")).toBe("Chris's");
		});

		test.each([
			["it", "its"],
			["It", "Its"],
			["IT", "ITS"],
			["he", "his"],
			["He", "His"],
			["HE", "HIS"],
			["she", "her"],
			["She", "Her"],
			["SHE", "HER"],
			["they", "their"],
			["They", "Their"],
			["THEY", "THEIR"],
			["its", "its"],
			["Its", "Its"],
		])("formats exception %s as %s", (noun, expected) => {
			expect(possessive.makePossessive(noun)).toBe(expected);
		});

		test("preserves conservative mixed-case behavior for exceptions", () => {
			expect(possessive.makePossessive("iT")).toBe("its");
			expect(possessive.makePossessive("FrançOis")).toBe("FrançOis'");
		});

		test.each([
			["", "Input cannot be empty, null, or undefined"],
			["   ", "Input cannot be only whitespace"],
			[null, "Input cannot be empty, null, or undefined"],
			[undefined, "Input cannot be empty, null, or undefined"],
			[123, "Input must be a string"],
		])("rejects invalid noun %p", (noun, message) => {
			expect(() => possessive.makePossessive(noun)).toThrow(message);
		});
	});

	describe("addException", () => {
		test("adds a custom exception with case-preserving output", () => {
			const possessive = new Possessive();

			possessive.addException("boss", "bosses'");

			expect(possessive.makePossessive("boss")).toBe("bosses'");
			expect(possessive.makePossessive("Boss")).toBe("Bosses'");
			expect(possessive.makePossessive("BOSS")).toBe("BOSSES'");
		});

		test.each([
			[null, "Input cannot be empty, null, or undefined"],
			["", "Input cannot be empty, null, or undefined"],
			[" ", "Input cannot be only whitespace"],
			[42, "Input must be a string"],
		])("validates noun when adding exception: %p", (noun, message) => {
			const possessive = new Possessive();

			expect(() => possessive.addException(noun, "bosses'")).toThrow(message);
		});

		test.each([
			[null, "Input cannot be empty, null, or undefined"],
			["", "Input cannot be empty, null, or undefined"],
			[" ", "Input cannot be only whitespace"],
			[42, "Input must be a string"],
		])("validates possessive form when adding exception: %p", (possessiveForm, message) => {
			const possessive = new Possessive();

			expect(() => possessive.addException("boss", possessiveForm)).toThrow(
				message,
			);
		});
	});
});
