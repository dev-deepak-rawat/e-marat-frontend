import { API_CONFIG } from './constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ColorType =
	| 'primary'
	| 'danger'
	| 'warning'
	| 'success'
	| 'emarat-accent';

export type ColorMap = {
	[key in ColorType]?: string;
};

// export type ColorMap = { [key: string]: string; };

export type FieldType = {
	name: string;
	type: 'text' | 'textarea' | 'number' | 'file' | 'checkbox';
	defaultValue: any;
	label: string;
	validations?: {
		[key: string]: {
			value: boolean | RegExp | number | string;
			message?: string;
		};
	};
	role?: string;
	options?: Array<{ value: string; label: string }>;
	placeholder?: string;
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
};

export type FormMetaType = {
	submitLabel?: string;
	apiUrl?: keyof typeof API_CONFIG;
	imageField?: string;
};

export type StringMapObj = { [key: string]: string };

export type GenericObject = { [key: string]: any };

export type ApiResponse = {
	meta: {
		success: booelan;
		code: number;
		msg: string;
	};
	data?: any;
};
