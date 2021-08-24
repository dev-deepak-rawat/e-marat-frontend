export type FieldType = {
	name: string;
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultValue: any;
	label: string;
	validations?: {
		[key: string]: {
			value: boolean | RegExp | number | string;
			message: string;
		};
	};
	role?: string;
	options?: Array<{ value: string; label: string }>;
	placeholder?: string;
};

export type FormMetaType = {
	submitLabel?: string;
	apiUrl?: string;
};
