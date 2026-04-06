/**
 * @license MIT
 * possessive-js
 * Copyright (c) 2024 Sunan Regi Maunakea
 */

/**
 * Options for {@link Possessive}.
 *
 * @typedef {Object} PossessiveOptions
 * @property {'standard' | 'alternative'} [style='standard'] Selects the suffix used for nouns ending in `s`.
 * `standard` returns `Chris'` while `alternative` returns `Chris's`.
 * @property {boolean} [enableFrenchRules=true] Reserved for compatibility with future language-specific rules.
 * @property {boolean} [enableGermanRules=true] Enables special handling for nouns ending in `ß`, such as `Strauß -> Strauß'`.
 * @property {boolean} [enableNordicRules=true] Reserved for compatibility with future language-specific rules.
 */

const VALID_STYLES = new Set(["standard", "alternative"]);
const BOOLEAN_OPTIONS = [
	"enableFrenchRules",
	"enableGermanRules",
	"enableNordicRules",
];
const DEFAULT_OPTIONS = {
	style: "standard",
	enableFrenchRules: true,
	enableGermanRules: true,
	enableNordicRules: true,
};
const ESZETT = "ß";

/**
 * Formats singular nouns and names into possessive form.
 *
 * The library is intentionally small and explicit. It handles a predictable
 * set of English-oriented rules, a small set of exception words, and the
 * `ß` suffix case when German rules are enabled.
 *
 * It does not try to infer plural possessives or perform full language
 * detection. Inputs are trimmed before processing.
 *
 * @example
 * import Possessive from "possessive-js";
 *
 * const possessive = new Possessive();
 *
 * possessive.makePossessive("John");
 * // => "John's"
 *
 * possessive.makePossessive("Chris");
 * // => "Chris'"
 *
 * @example
 * const possessive = new Possessive({ style: "alternative" });
 *
 * possessive.makePossessive("Chris");
 * // => "Chris's"
 */
class Possessive {
	/**
	 * Create a new possessive formatter.
	 *
	 * @param {PossessiveOptions} [options={}] Configuration options.
	 * @throws {Error} Throws when `options` is not an object, when `style` is not
	 * `standard` or `alternative`, or when the feature flags are not booleans.
	 *
	 * @example
	 * const possessive = new Possessive();
	 *
	 * @example
	 * const possessive = new Possessive({
	 *   style: "alternative",
	 *   enableGermanRules: false,
	 * });
	 */
	constructor(options = {}) {
		this.options = this.normalizeOptions(options);
		this.exceptions = new Map([
			["it", "its"],
			["its", "its"],
			["they", "their"],
			["he", "his"],
			["she", "her"],
		]);
	}

	/**
	 * Convert a noun to its singular possessive form.
	 *
	 * The formatter trims the input, checks registered exceptions first, then
	 * applies suffix rules:
	 *
	 * - nouns ending in `ß` become `noun'` when German rules are enabled
	 * - nouns ending in `s` become `noun'` or `noun's` depending on `style`
	 * - other nouns receive `'s`
	 *
	 * Exception words preserve lowercase, uppercase, and title-case input.
	 *
	 * @param {string} noun The noun or name to convert.
	 * @returns {string} The possessive form.
	 * @throws {Error} Throws when the input is empty, whitespace-only, or not a string.
	 *
	 * @example
	 * const possessive = new Possessive();
	 *
	 * possessive.makePossessive("John");
	 * // => "John's"
	 *
	 * @example
	 * const possessive = new Possessive();
	 *
	 * possessive.makePossessive("Chris");
	 * // => "Chris'"
	 *
	 * @example
	 * const possessive = new Possessive({ style: "alternative" });
	 *
	 * possessive.makePossessive("Chris");
	 * // => "Chris's"
	 *
	 * @example
	 * const possessive = new Possessive();
	 *
	 * possessive.makePossessive("It");
	 * // => "Its"
	 */
	makePossessive(noun) {
		const normalizedNoun = this.normalizeNoun(noun);
		const lowerNoun = normalizedNoun.toLowerCase();
		const exception = this.exceptions.get(lowerNoun);

		if (exception) {
			return this.preserveCase(normalizedNoun, exception);
		}

		const suffix = this.selectSuffix(normalizedNoun);
		return this.applySuffix(normalizedNoun, suffix);
	}

	/**
	 * Register a custom exact-word exception.
	 *
	 * Custom exceptions are checked before suffix rules. Stored values are
	 * normalized so that lowercase, uppercase, and title-case outputs remain
	 * consistent with the built-in exception behavior.
	 *
	 * @param {string} noun The noun to match exactly, case-insensitively.
	 * @param {string} possessiveForm The possessive form to return for that noun.
	 * @returns {void}
	 * @throws {Error} Throws when either argument is empty, whitespace-only, or not a string.
	 *
	 * @example
	 * const possessive = new Possessive();
	 *
	 * possessive.addException("boss", "bosses'");
	 *
	 * possessive.makePossessive("boss");
	 * // => "bosses'"
	 *
	 * possessive.makePossessive("Boss");
	 * // => "Bosses'"
	 */
	addException(noun, possessiveForm) {
		const normalizedNoun = this.normalizeNoun(noun);
		const normalizedPossessive = this.normalizeNoun(possessiveForm);

		this.exceptions.set(
			normalizedNoun.toLowerCase(),
			normalizedPossessive.toLowerCase(),
		);
	}

	/**
	 * @private
	 * @param {unknown} options
	 * @returns {PossessiveOptions}
	 */
	normalizeOptions(options) {
		if (
			options === null ||
			Array.isArray(options) ||
			typeof options !== "object"
		) {
			throw new Error("Options must be an object");
		}

		const normalizedOptions = {
			...DEFAULT_OPTIONS,
			...options,
		};

		if (!VALID_STYLES.has(normalizedOptions.style)) {
			throw new Error(
				"Style option must be either 'standard' or 'alternative'",
			);
		}

		for (const optionName of BOOLEAN_OPTIONS) {
			if (typeof normalizedOptions[optionName] !== "boolean") {
				throw new Error(`${optionName} option must be a boolean`);
			}
		}

		return normalizedOptions;
	}

	/**
	 * @private
	 * @param {unknown} noun
	 * @returns {string}
	 */
	normalizeNoun(noun) {
		this.validateInput(noun);
		return noun.trim();
	}

	/**
	 * @private
	 * @param {string} noun
	 * @returns {"'" | "'s"}
	 */
	selectSuffix(noun) {
		if (this.options.enableGermanRules && noun.endsWith(ESZETT)) {
			return "'";
		}

		if (noun.endsWith("s")) {
			return this.options.style === "alternative" ? "'s" : "'";
		}

		return "'s";
	}

	/**
	 * @private
	 * @param {string} noun
	 * @param {"'" | "'s"} suffix
	 * @returns {string}
	 */
	applySuffix(noun, suffix) {
		if (this.isUpperCase(noun)) {
			return noun + suffix.toUpperCase();
		}

		return noun + suffix;
	}

	/**
	 * @private
	 * @param {unknown} noun
	 * @returns {void}
	 */
	validateInput(noun) {
		if (noun === null || noun === undefined || noun === "") {
			throw new Error("Input cannot be empty, null, or undefined");
		}

		if (typeof noun !== "string") {
			throw new Error("Input must be a string");
		}

		if (noun.trim().length === 0) {
			throw new Error("Input cannot be only whitespace");
		}
	}

	/**
	 * @private
	 * @param {string} original
	 * @param {string} transformed
	 * @returns {string}
	 */
	preserveCase(original, transformed) {
		if (this.isUpperCase(original)) {
			return transformed.toUpperCase();
		}

		if (this.isLowerCase(original)) {
			return transformed.toLowerCase();
		}

		if (this.isTitleCase(original)) {
			return (
				transformed.charAt(0).toUpperCase() + transformed.slice(1).toLowerCase()
			);
		}

		return transformed;
	}

	/**
	 * @private
	 * @param {string} value
	 * @returns {boolean}
	 */
	isUpperCase(value) {
		return value === value.toUpperCase();
	}

	/**
	 * @private
	 * @param {string} value
	 * @returns {boolean}
	 */
	isLowerCase(value) {
		return value === value.toLowerCase();
	}

	/**
	 * @private
	 * @param {string} value
	 * @returns {boolean}
	 */
	isTitleCase(value) {
		return (
			value.charAt(0) === value.charAt(0).toUpperCase() &&
			value.slice(1) === value.slice(1).toLowerCase()
		);
	}
}

module.exports = Possessive;
