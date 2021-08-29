import { Method } from 'axios';

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
	amenities: {
		url: '/api/amenities/',
		method: 'GET',
	},
	postAmenities: {
		url: '/api/amenities/',
		method: 'POST',
	},
	amenitiesDel: {
		url: '/api/amenities/',
		method: 'DELETE',
	},
	broadcast: {
		url: '/broadcasts',
		method: 'POST',
	},
	announcements: {
		url: '/broadcasts',
		method: 'GET',
	},
};

export const PATTERNS = {
	NAME: /^[a-zA-Z]+$/,
	PHONE: /^\d{10}$/,
	DIGITS: /^\d+$/,
};

export const FORM_TYPES = {
	TEXT: 'text',
	TEXTAREA: 'textarea',
	SELECT: 'select',
	CHECKBOX: 'checkbox',
	NUMBER: 'number',
	UPLOAD: 'file',
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

export const SERVICE_URL = process.env.REACT_APP_PROXY;

export const CLOUDINARY_IMG_SPLITTER = 'upload/';
export const CLOUDINARY_IMG_TRANSFORMATIONS = {
	WIDTH_600: 'w_600/',
	AVATAR: 'w_50,h_50,c_thumb,g_face,r_max/',
};
