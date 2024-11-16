/**
 * @license MIT
 * possessive-js
 * Copyright (c) 2024 Sunan Regi Maunakea
 */

/**
 * @typedef {Object} PossessiveOptions
 * @property {'standard' | 'alternative'} [style='standard'] - The style of possessive form for words ending in 's'
 * @property {boolean} [enableFrenchRules=true] - Handle French names with silent letters
 * @property {boolean} [enableGermanRules=true] - Handle German special characters
 * @property {boolean} [enableNordicRules=true] - Handle Nordic special characters
 */

/**
 * @name Possessive
 * @category String Manipulation
 * @summary Handle English possessive forms of nouns.
 *
 * @description
 * Returns the possessive form of a given noun according to English grammar rules.
 * The result may vary based on the chosen style and special cases.
 *
 * > ⚠️ Please note that this library handles singular possessives only.
 * > For plural possessives, different rules apply.
 *
 * The library supports two main styles for words ending in 's':
 * - standard: Adds only apostrophe (e.g., "Chris'")
 * - alternative: Adds apostrophe + s (e.g., "Chris's")
 *
 * Possessive patterns:
 * | Case                    | Example Input | Result           | Notes |
 * |-------------------------|---------------|------------------|-------|
 * | Regular noun            | John          | John's           |       |
 * | Ending in 's'          | Chris         | Chris'/Chris's   | 1     |
 * | German 'ß'             | Strauß        | Strauß'          | 2     |
 * | Pronouns               | it            | its              | 3     |
 * | Names with umlauts     | Müller        | Müller's         | 4     |
 *
 * Notes:
 * 1. Words ending in 's' follow different rules based on style preference.
 *    Both forms are grammatically correct in modern English.
 *
 *    ```javascript
 *    const possessive = new Possessive();
 *    possessive.makePossessive('Chris') //=> 'Chris''
 *
 *    const altPossessive = new Possessive({ style: 'alternative' });
 *    altPossessive.makePossessive('Chris') //=> 'Chris's'
 *    ```
 *
 * 2. Special cases (pronouns) have their own unique possessive forms
 *    that don't follow the regular apostrophe rules:
 *    - it → its
 *    - he → his
 *    - she → her
 *    - they → their
 *
 * 3. Case sensitivity is preserved in the output:
 *    - Uppercase input remains uppercase
 *    - Lowercase input remains lowercase
 *    - Mixed case is preserved as is
 *
 * 4. Special rules apply for international names:
 *    - German names ending in 'ß' only receive an apostrophe (Strauß')
 *    - Names ending in 's', 'ss', 'z', 'x', or 'ce' follow the same rules as English names ending in 's'
 *    - Other special characters (ä, ö, ü, etc.) follow regular possessive rules
 *
 * @example
 * // Basic usage with regular noun
 * const possessive = new Possessive();
 * const result = possessive.makePossessive('John')
 * //=> 'John's'
 *
 * @example
 * // Using alternative style for words ending in 's'
 * const altPossessive = new Possessive({ style: 'alternative' });
 * const result = altPossessive.makePossessive('Chris')
 * //=> 'Chris's'
 *
 * @example
 * // Handling international names
 * const possessive = new Possessive();
 * const result = possessive.makePossessive('Straße')
 * //=> 'Straße's'
 */
class Possessive {
  /**
   * Creates a new Possessive instance.
   * @param {PossessiveOptions} [options={}] - Configuration options
   * @throws {Error} If style option is neither 'standard' nor 'alternative'
   */
  constructor(options = {}) {
    if (options.style && !["standard", "alternative"].includes(options.style)) {
      throw new Error(
        "Style option must be either 'standard' or 'alternative'"
      );
    }

    /**
     * @private
     * @type {PossessiveOptions}
     */
    this.options = {
      style: "standard",
      enableFrenchRules: true,
      enableGermanRules: true,
      enableNordicRules: true,
      ...options
    };

    /**
     * @private
     * @type {Map<string, string>}
     */
    this.exceptions = new Map([
      ["it", "its"],
      ["its", "its"], // Handle case where input is already possessive
      ["they", "their"],
      ["he", "his"],
      ["she", "her"]
      // Add more exceptions as needed
    ]);

    this.frenchSilentEndings = ["s", "x", "z"];
    this.germanEszett = "ß";
  }

  /**
   * Converts a noun to its possessive form.
   * @param {string} noun - The noun to convert to possessive form
   * @returns {string} The possessive form of the noun
   * @throws {Error} If input is empty, null, or undefined
   * @throws {Error} If input is not a string
   * @throws {Error} If input contains only whitespace
   */
  makePossessive(noun) {
    this.validateInput(noun);
    noun = noun.trim();

    const lowerNoun = noun.toLowerCase();
    if (this.exceptions.has(lowerNoun)) {
      return this.preserveCase(noun, this.exceptions.get(lowerNoun));
    }

    if (this.options.enableGermanRules && noun.endsWith(this.germanEszett)) {
      return `${noun}'`;
    }

    if (noun.endsWith("s")) {
      const suffix = this.options.style === "alternative" ? "'s" : "'";
      return noun === noun.toUpperCase()
        ? noun + suffix.toUpperCase()
        : noun + suffix;
    }

    const suffix = "'s";
    return noun === noun.toUpperCase()
      ? noun + suffix.toUpperCase()
      : noun + suffix;
  }

  isFrenchSilentEnding(noun) {
    return this.frenchSilentEndings.some(
      (ending) => noun.endsWith(ending) && this.isFrenchName(noun)
    );
  }

  isFrenchName(noun) {
    const frenchPatterns = [/eau$/i, /eux$/i, /aux$/i, /oux$/i, /è/, /é/, /ç/];

    return frenchPatterns.some((pattern) => pattern.test(noun));
  }

  /**
   * Validates the input noun.
   * @private
   * @param {*} noun - The input to validate
   * @throws {Error} If input is invalid
   */
  validateInput(noun) {
    if (!noun) {
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
   * Preserves the case of the original word in the transformed version.
   * @private
   * @param {string} original - The original word
   * @param {string} transformed - The transformed word
   * @returns {string} The transformed word with preserved case
   */
  preserveCase(original, transformed) {
    if (original === original.toUpperCase()) {
      return transformed.toUpperCase();
    }
    if (original === original.toLowerCase()) {
      return transformed.toLowerCase();
    }
    // If it's mixed case, return as is
    return transformed;
  }

  /**
   * Adds a custom exception to the possessive rules.
   * @param {string} noun - The base noun
   * @param {string} possessiveForm - The custom possessive form
   * @throws {Error} If either parameter is invalid
   */
  addException(noun, possessiveForm) {
    this.validateInput(noun);
    this.validateInput(possessiveForm);
    this.exceptions.set(noun.toLowerCase(), possessiveForm);
  }
}

module.exports = Possessive;
