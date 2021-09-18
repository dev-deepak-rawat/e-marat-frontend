import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CONFIG, SERVICE_URL } from 'lib/constants';
import { getAuthToken, signIn, signOut } from 'lib/firebaseAuth';
import { GenericObject, StringMapObj } from 'lib/types';

type BuildRequestDataType = {
	apiUrl: keyof typeof API_CONFIG;
	headers?: StringMapObj;
	data?: GenericObject;
	appendToUrl?: string;
};
/**
 * Build Request for axios with given options
 * @returns axios request
 */
const buildRequestData = async (options: BuildRequestDataType) => {
	const { apiUrl, headers = {}, data, appendToUrl } = options;
	const { url, method } = API_CONFIG[apiUrl];
	const reqUrl = `${SERVICE_URL}${url}${appendToUrl || ''}`;
	const token = await getAuthToken();
	const reqHeaders = {
		'Content-Type': 'application/json',
		Authorization: token ? `Bearer ${token}` : undefined,
		...headers,
	};

	return {
		url: reqUrl,
		headers: reqHeaders,
		data: JSON.stringify(data),
		method,
	};
};

/**
 * handles APIs request and sanitizes response
 * Also logs errors on the screen if errored response
 * or something went wrong.
 */
export const apiRequest = async (options: BuildRequestDataType) => {
	const reqData = await buildRequestData(options);
	try {
		const response = await axios(reqData);
		const jsonResponse = await response.data;
		const { meta = {} } = jsonResponse;
		const { success = false, msg = '' } = meta;
		const { headers = {} } = response;
		const { authorization } = headers;
		if (authorization) {
			await handleAuthorization(authorization);
		}
		if (success && msg) {
			toast.dismiss();
			toast.success(msg);
		}
		return jsonResponse;
	} catch (err) {
		toast.dismiss();
		if (axios.isAxiosError(err)) {
			const { response: errResponse } = err;
			if (errResponse) {
				const { data = {} } = errResponse;
				const { meta = {} } = data;
				const { msg = '', code } = meta;
				toast.error(msg || 'Something Went Wrong');
				if ([401, 403].includes(code)) {
					await signOut();
				}
				return errResponse;
			}
		}
		toast.error('Something went wrong');
	}
	return { meta: { success: false } };
};

/**
 * If received token in the response header
 * then signin with the token
 * @param  {string} token
 */
const handleAuthorization = async (token: string) => {
	const success = await signIn(token);
	if (!success) {
		toast.dismiss();
		toast.error('Error while Loggin In');
	}
};
