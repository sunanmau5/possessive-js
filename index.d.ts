export type PossessiveStyle = "standard" | "alternative";

export interface PossessiveOptions {
	style?: PossessiveStyle;
	enableFrenchRules?: boolean;
	enableGermanRules?: boolean;
	enableNordicRules?: boolean;
}

declare class Possessive {
	constructor(options?: PossessiveOptions);
	makePossessive(noun: string): string;
	addException(noun: string, possessiveForm: string): void;
}

export default Possessive;
