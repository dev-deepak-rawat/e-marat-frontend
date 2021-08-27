import { Method } from 'axios';

export const SERVICE_URL = 'http://localhost:5000';

type ApiConfigType = { [key: string]: { url: string; method: Method } };

export const API_CONFIG: ApiConfigType = {
	postUser: {
		url: '/users/',
		method: 'POST',
	},
	login: {
		url: '/login/',
		method: 'POST',
	},
};

export const PATTERNS = {
	NAME: /^[a-zA-Z]+$/,
	PHONE: /^\d{10}$/,
	DIGITS: /^\d+$/,
};

export const FORM_TYPES = {
    TEXT: 'text',
	SELECT: 'select',
	CHECKBOX: 'checkbox',
};

export const ROLES = {
	ADMIN: 'admin',
	RESIDENT: 'resident',
};

export const STYLE_COMPONENT_THEME = {
	colors: {
		emarat: {
			primary: '#DDDDDD',
			secondary: '#125D98',
			tertiary: '#3C8DAD',
			accent: '#F5A962',
		},
		brands: {
			facebook: '#1877F2',
			instagram: '#DC2743',
			twitter: '#1C9CEA',
			linkedin: '#0A66C2',
		},
	},
};
