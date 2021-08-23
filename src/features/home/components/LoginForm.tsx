import React, { useState, FormEvent } from 'react';
import { ConfirmationResult } from 'firebase/auth';
import { apiRequest } from 'app/apiRequest';
import { stripNonNumbers } from '../../../helpers/stringHelpers';
import { sendOtp, confirmOtp } from '../../../lib/firebaseAuth';
import Button from '../../common/Button';

export default function LoginForm() {
	const [mobile, setMobile] = useState<string>('');
	const [feedbackText, setfeedbackText] = useState<string>('');
	const [otpSentResult, setotpSentResult] = useState<ConfirmationResult>();

	const [otp, setOtp] = useState<string>('');

	const mobileHandler = (e: FormEvent<HTMLInputElement>) => {
		setMobile(stripNonNumbers(e.currentTarget.value));
	};

	const otpHandler = (e: FormEvent<HTMLInputElement>) => {
		setOtp(stripNonNumbers(e.currentTarget.value));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setfeedbackText('');

		if (mobile.length !== 10) {
			setfeedbackText('Mobile number must be 10 digits long.');
			return;
		}

		if (otpSentResult) {
			const jwt = await confirmOtp(otpSentResult, otp);

			if (jwt) {
				await apiRequest({ apiUrl: 'login', data: { token: jwt } });
			} else {
				setOtp('');
				setfeedbackText('Inavlid OTP entered.');
			}
		} else {
			const otpSentResultResult = await sendOtp(
				e.currentTarget,
				`+91${mobile}`
			);

			if (otpSentResultResult) {
				setotpSentResult(otpSentResultResult);
			} else {
				setfeedbackText('Could not send OTP.');
			}
		}
	};

	return (
		<div className="shadow-around px-7 py-10 rounded-3xl w-full">
			<div>
				<h3 className="text-4xl font-regular">Login</h3>
				<p className="mt-2 text-gray-400">
					Login to your Emarat account
				</p>
				<form onSubmit={handleSubmit}>
					{otpSentResult ? (
						<input
							type="text"
							className="block mt-6 border py-3 px-4 border-gray-200 rounded-lg w-full outline-none"
							placeholder="OTP"
							onInput={otpHandler}
							value={otp}
							maxLength={6}
						/>
					) : (
						<input
							type="text"
							className="block mt-6 border py-3 px-4 border-gray-200 rounded-lg w-full outline-none"
							placeholder="Mobile Number"
							onInput={mobileHandler}
							value={mobile}
							maxLength={10}
						/>
					)}
					<div className="mt-1 pl-1 text-xs text-red-500">
						{feedbackText}
					</div>
					<Button></Button>
				</form>
			</div>
		</div>
	);
}
