export const stripNonNumbers = (val: string) => {
	return val.length > 0 ? val.replace(/[^0-9]+/g, '') : val;
};
