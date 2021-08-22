import React, { useState, FormEvent } from 'react';
import { stripNonNumbers } from '../../../helpers/stringHelpers';
import { sendOtp } from '../../../lib/firebaseAuth';

export default function LoginForm() {
	const [mobile, setMobile] = useState<string>('');
	const [mobileHelpText, setMobileHelpText] = useState<string>('');

	const mobileHandler = (e: FormEvent<HTMLInputElement>) => {
		setMobile(stripNonNumbers(e.currentTarget.value));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mobile.length !== 10) {
			setMobileHelpText('Mobile number must be 10 digits long.');
			return;
		}
		setMobileHelpText('');
		sendOtp(e.currentTarget, `+91${mobile}`);
	};

	return (
		<div className="shadow-around px-7 py-10 rounded-3xl w-full">
			<div>
				<h3 className="text-4xl font-regular">Login</h3>
				<p className="mt-2 text-gray-400">
					Login to your Emarat account
				</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="block mt-6 border py-3 px-4 border-gray-200 rounded-lg w-full outline-none"
						placeholder="Mobile Number"
						onInput={mobileHandler}
						value={mobile}
						maxLength={10}
					/>
					<div className="mt-1 pl-1 text-xs text-red-500">
						{mobileHelpText}
					</div>
					<button
						type="submit"
						className="inline-block mt-6 py-3 px-10 bg-emarat-accent text-white font-bold rounded-full"
					>
						Send OTP
					</button>
				</form>
			</div>
		</div>
	);
}
