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
