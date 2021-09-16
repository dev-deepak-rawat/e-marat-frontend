/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import { useApiCall, useAuth } from 'config/hooks';
import { CLOUDINARY_IMAGES, RAZORPAY_SCRIPT } from 'lib/constants';
import { useState } from 'react';
import { apiRequest } from 'config/apiRequest';
import { loadScript } from 'lib/utils';

export const usePayment = () => {
	const { userInfo } = useAuth();
	const [fetchPayments, setFetchPayments] = useState(0);
	const { data: paymentInfo, loading } = useApiCall({
		apiUrl: 'getPayments',
		initDataValue: {},
		refetch: fetchPayments,
	});
	const [orderId, setOrderId] = useState('');

	const handlePayment = (response: any) => {
		const { razorpay_order_id: razorpayOrderId } = response;
		if (razorpayOrderId) {
			setOrderId(razorpayOrderId);
		} else toast.error('Something went wrong, Please try again later!');
	};

	const displayRazorpay = async () => {
		const { firstName, lastName, phone, flat } = userInfo?.claims || {};
		const res = await loadScript(RAZORPAY_SCRIPT);
		if (!res) {
			return;
		}

		const { data: orderData, meta } = await apiRequest({ apiUrl: 'pay' });
		if (meta?.success) {
			const { id, notes } = orderData;
			const options = {
				key: process.env.REACT_APP_RAZORPAY_KEY_ID,
				name: 'E-marat',
				description: `Flat-No. ${flat} monthly maintenance fee.`,
				image: CLOUDINARY_IMAGES.LOGO,
				order_id: id,
				handler: (respone: any) => handlePayment(respone),
				prefill: {
					name: `${firstName} ${lastName}`,
					contact: phone,
					email: 'emarat@gmail.com',
				},
				notes,
				theme: {
					color: '#125D98',
				},
			};
			const windowObj = window as any;
			const paymentObject = new windowObj.Razorpay(options);
			paymentObject.open();
		}
	};

	const handleSuccessClick = () => {
		setOrderId('');
		setFetchPayments(fetchPayments + 1);
	};

	return {
		paymentInfo,
		loading,
		orderId,
		displayRazorpay,
		handleSuccessClick,
	};
};
