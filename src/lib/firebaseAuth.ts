/* eslint-disable no-console */
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	ConfirmationResult,
	User,
	signInWithCustomToken,
	signOut as firebaseSignOut,
} from 'firebase/auth';
import firebaseApp from '../config/firebase';

const auth = getAuth(firebaseApp);

export const listenUserAuthState = () => {
	auth.onAuthStateChanged((authUser) => {
		if (!authUser) {
			localStorage.removeItem('authUser');
		}
		authUser?.getIdTokenResult().then((idToken) => {
			localStorage.setItem('authUser', JSON.stringify(idToken));
		});
	});
};

// https://firebase.google.com/docs/auth/web/phone-auth#use-invisible-recaptcha
const invisibeRecaptcha = (el: HTMLElement) =>
	new RecaptchaVerifier(
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

// https://firebase.google.com/docs/auth/web/phone-auth#send-a-verification-code-to-the-users-phone
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

// https://firebase.google.com/docs/auth/web/phone-auth#sign-in-the-user-with-the-verification-code
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

// https://firebase.google.com/docs/auth/admin/custom-claims#propagate_custom_claims_to_the_client
export const refreshToken = async (user: User) =>
	auth.currentUser?.getIdToken(true);

export const signIn = async (token: string) => {
	try {
		await signInWithCustomToken(auth, token);
		return true;
	} catch (err) {
		console.log({ err: err.message });
	}
	return false;
};

export const signOut = async () => {
	try {
		await firebaseSignOut(auth);
		return true;
	} catch (err) {
		console.log({ err: err.message });
	}
	return false;
};

export const isLoggedIn = () => Boolean(localStorage.getItem('authUser'));

export const getAuthUserInfo = () => {
	const authUser = localStorage.getItem('authUser');
	const parsedAuthUser = authUser ? JSON.parse(authUser) : {};
	return parsedAuthUser;
};
export const isAdmin = () => {
	const { claims = {} } = getAuthUserInfo();
	const { isAdmin: isAdminRole = false } = claims;
	return isAdminRole;
};
export const getAuthToken = () => {
	const { token = '' } = getAuthUserInfo();
	return token;
};
