import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG, SERVICE_URL } from 'lib/constants';
import { getAuthToken } from 'lib/utils';
import type { AnyMapObj, StringMapObj } from './types';

type BuildRequestDataType = {
	apiUrl: keyof typeof API_CONFIG;
	headers?: StringMapObj;
	data?: AnyMapObj;
};

const buildRequestData = (options: BuildRequestDataType) => {
	const { apiUrl, headers = {}, data } = options;
	const { url, method } = API_CONFIG[apiUrl];
	const reqUrl = `${SERVICE_URL}${url}`;
	const token = getAuthToken();
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

export const apiRequest = async (options: BuildRequestDataType) => {
	const reqData = buildRequestData(options);
	try {
		const response = await axios(reqData);
		const jsonResponse = await response.data;
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
