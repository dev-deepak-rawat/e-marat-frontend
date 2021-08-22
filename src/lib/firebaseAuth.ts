import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	ConfirmationResult,
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

export const sendOtp = async (
	el: HTMLElement,
	phoneNumber: string
): Promise<ConfirmationResult | false> => {
	const appVerifier = invisibeRecaptcha(el);

	try {
		// SMS sent. Prompt user to type the code from the message, then sign the
		// user in with confirmationResult.confirm(code).
		return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
	} catch (error) {
		// Error; SMS not sent
		console.error(error);
		return false;
	}
};

export const confirmOtp = async (
	confirmationResult: ConfirmationResult,
	otp: string
): Promise<string | false> => {
	try {
		const credentials = await confirmationResult.confirm(otp);

		// User signed in successfully.
		// Return token
		return await credentials.user.getIdToken();
	} catch (error) {
		// User couldn't sign in (bad verification code?)
		console.error(error);
		return false;
	}
};
