export type PossessiveStyle = "standard" | "alternative";

export interface PossessiveOptions {
	style?: PossessiveStyle;
}

declare class Possessive {
	constructor(options?: PossessiveOptions);
	makePossessive(noun: string): string;
	addException(noun: string, possessiveForm: string): void;
}

export default Possessive;
