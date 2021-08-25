export const stripNonNumbers = (val: string) =>
	val.length > 0 ? val.replace(/[^0-9]+/g, '') : val;
