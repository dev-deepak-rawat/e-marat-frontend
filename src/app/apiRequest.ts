import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG, SERVICE_URL } from 'lib/constants';
import { getAuthToken, signIn } from 'lib/firebaseAuth';
import type { AnyMapObj, StringMapObj } from './types';

type BuildRequestDataType = {
	apiUrl: keyof typeof API_CONFIG;
	headers?: StringMapObj;
	data?: AnyMapObj;
};

const buildRequestData = async (options: BuildRequestDataType) => {
	const { apiUrl, headers = {}, data } = options;
	const { url, method } = API_CONFIG[apiUrl];
	const reqUrl = `${SERVICE_URL}${url}`;
	const token = await getAuthToken();
	const reqHeaders = {
		'Content-Type': 'application/json',
		Authorizatoin: token ? `Bearer ${token}` : undefined,
		...headers,
	};

	return {
		url: reqUrl,
		headers: reqHeaders,
		data: JSON.stringify(data),
		method,
	};
};

type HandleAuthorizationParams = {
	meta: {
		code: string;
	};
	data?: { authorizationToken: string };
};

const handleAuthorization = async (response: HandleAuthorizationParams) => {
	const { meta } = response;
	const { code } = meta;
	if (code === '3001') {
		const { data } = response;
		const { authorizationToken = '' } = data || {};
		const success = await signIn(authorizationToken);
		if (success) {
			toast.success('Logged In successfully');
		} else {
			toast.error('Error while Loggin In');
		}
	}
};

export const apiRequest = async (options: BuildRequestDataType) => {
	const reqData = await buildRequestData(options);
	try {
		const response = await axios(reqData);
		const jsonResponse = await response.data;
		await handleAuthorization(jsonResponse);
		const { meta = {} } = jsonResponse;
		const { success = false, msg = '' } = meta;
		if (success && msg) {
			toast.success(msg);
		}
		return jsonResponse;
	} catch (err) {
		if (err.response) {
			const { data = {} } = err.response;
			const { meta = {} } = data;
			const { msg = '' } = meta;
			toast.error(msg || 'Something Went Wrong');
		}
	}
	return {};
};
