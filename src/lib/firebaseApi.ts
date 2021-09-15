import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuthToken } from 'lib/firebaseAuth';

const buildRequestData = async (shallow: boolean) => {
	const token = await getAuthToken();

	return {
		params: {
			shallow,
			auth: token,
		},
	};
};

export const get = async (url: string, shallow: boolean = true) => {
	const reqOptions = await buildRequestData(shallow);
	const apiUrl = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${
		url.endsWith('.json') ? url : `${url}.json`
	}`;

	try {
		const response = await axios.get(apiUrl, reqOptions);
		const jsonResponse = await response.data;
		return jsonResponse;
	} catch (err) {
		toast.error('Something went wrong');
		return false;
	}
};
