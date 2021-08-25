import { store } from 'app/store';
import { removeAuthUser, saveAuthUser } from 'features/home/authSlice';
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	ConfirmationResult,
	signInWithCustomToken,
	signOut as firebaseSignOut,
} from 'firebase/auth';
import firebaseApp from '../config/firebase';

const auth = getAuth(firebaseApp);

const saveAuthStateOnLocalStorage = () => {
	store.subscribe(() => {
		localStorage.setItem(
			'authState',
			JSON.stringify(store.getState().auth)
		);
	});
};

const loadAuthStateFromLocalStorage = () => {
	const persistedState = localStorage.getItem('authState');
	if (persistedState) {
		const authState = JSON.parse(persistedState);
		store.dispatch(saveAuthUser(authState));
	}
};

export const listenUserAuthState = () => {
	saveAuthStateOnLocalStorage();
	loadAuthStateFromLocalStorage();
	auth.onAuthStateChanged((authUser) => {
		if (!authUser) {
			store.dispatch(removeAuthUser());
		}
		authUser?.getIdTokenResult().then((authUserInfo) => {
			const { claims = {} } = authUserInfo;
			const { isAdmin } = claims;
			store.dispatch(
				saveAuthUser({
					isLoggedIn: true,
					isAdmin: Boolean(isAdmin),
					userInfo: authUserInfo,
					isLoaded: true,
				})
			);
		});
	});
};

const invisibeRecaptcha = (elId: string) =>
	new RecaptchaVerifier(
		elId,
		{
			size: 'invisible',
		},
		auth
	);

export const sendOtp = async (
	captchaElId: string,
	phoneNumber: string
): Promise<ConfirmationResult | false> => {
	const appVerifier = invisibeRecaptcha(captchaElId);

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

export const getAuthToken = async () => auth.currentUser?.getIdToken();

export const signIn = async (token: string) => {
	try {
		await signInWithCustomToken(auth, token);
		return true;
	} catch (err) {
		console.error(err.message);
	}
	return false;
};

export const signOut = async () => {
	try {
		await firebaseSignOut(auth);
		return true;
	} catch (err) {
		console.error(err.message);
	}
	return false;
};
