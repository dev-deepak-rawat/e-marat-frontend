/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from 'antd';
import { apiRequest } from 'config/apiRequest';
import { useAuth } from 'config/hooks';
import { IMAGES_LINKS } from 'lib/constants';
import { toast } from 'react-toastify';

export default function MyPayments() {
	const { userInfo } = useAuth();
	const { firstName, lastName, phone } = userInfo?.claims || {};
	const displayRazorpay = async () => {
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);
		if (!res) {
			return;
		}

		const { data, meta } = await apiRequest({ apiUrl: 'pay' });
		if (meta?.success) {
			const { amount, currency, id, notes } = data;
			const options = {
				key: process.env.REACT_APP_RAZORPAY_KEY_ID,
				amount,
				currency,
				name: 'E-marat',
				description: 'User monthly maintenance Fees',
				image: IMAGES_LINKS.LOGO,
				order_id: id,
				handler: (response: any) => {
					if (response?.razorpay_payment_id)
						toast.success('Payment Successful.');
				},
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

	const loadScript = (src: string) =>
		new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			document.body.appendChild(script);
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
		});

	return (
		<>
			<div>My Payments</div>
			<Button type="primary" onClick={displayRazorpay}>
				Pay
			</Button>
		</>
	);
}
