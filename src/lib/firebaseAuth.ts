import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from 'firebase/auth';
import firebaseApp from '../config/firebase';

const auth = getAuth(firebaseApp);

const invisibeRecaptcha = (el: HTMLElement) => {
	return new RecaptchaVerifier(
		'recaptcha-container',
		{
			size: 'invisible',
			callback: (response: any) => {
				console.log(response);
				// reCAPTCHA solved, allow signInWithPhoneNumber.
			},
		},
		auth
	);
};

export const sendOtp = (el: HTMLElement, phoneNumber: string) => {
	const appVerifier = invisibeRecaptcha(el);

	signInWithPhoneNumber(auth, phoneNumber, appVerifier)
		.then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			// window.confirmationResult = confirmationResult;
			console.log(confirmationResult);
		})
		.catch((error) => {
			// Error; SMS not sent
			// ...
		});
};

// export {};
