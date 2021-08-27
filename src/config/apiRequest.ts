import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG } from 'lib/constants';
import { getAuthToken, signIn } from 'lib/firebaseAuth';
import { GenericObject, StringMapObj, apiResponse } from 'lib/types';

type BuildRequestDataType = {
	apiUrl: keyof typeof API_CONFIG;
	headers?: StringMapObj;
	data?: GenericObject;
	appendToUrl?: string;
};

const buildRequestData = async (options: BuildRequestDataType) => {
	const { apiUrl, headers = {}, data, appendToUrl } = options;
	const { url, method } = API_CONFIG[apiUrl];
	const reqUrl = `${process.env.REACT_APP_PROXY}${url}${appendToUrl || ''}`;
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

const handleAuthorization = async (response: apiResponse) => {
	const { meta } = response;
	const { code } = meta;
	if (code === 3001) {
		const { data } = response;
		const { authorizationToken = '' } = data || {};
		const success = await signIn(authorizationToken);
		if (!success) {
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
			return {};
		}
		toast.error('Something went wrong');
	}
	return {};
};
