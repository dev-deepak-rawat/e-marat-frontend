import { store } from 'config/store';
import {
	removeAuthUser,
	saveAuthUser,
} from 'features/shared/reducers/authSlice';
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	ConfirmationResult,
	signInWithCustomToken,
	signOut as firebaseSignOut,
	User,
} from 'firebase/auth';
import firebaseApp from 'config/firebase';
import { errorLogger } from 'lib/utils';

const auth = getAuth(firebaseApp);

/**
 * Save Redux Auth state on browser local storage
 */
const saveAuthStateOnLocalStorage = () => {
	store.subscribe(() => {
		localStorage.setItem(
			'authState',
			JSON.stringify(store.getState().auth)
		);
	});
};

/**
 * To load auth state from browser local storage
 * and save it to redux store
 */
const loadAuthStateFromLocalStorage = () => {
	const persistedState = localStorage.getItem('authState');
	if (persistedState) {
		const authState = JSON.parse(persistedState);
		store.dispatch(saveAuthUser(authState));
	}
};

/**
 * Get auth info from firebase auth user
 * and save that info to the store
 * @param  {User|null} authUser
 */
const saveAuthUserOnStore = (authUser: User | null) => {
	if (!authUser) {
		store.dispatch(removeAuthUser());
	}
	authUser?.getIdTokenResult().then((authUserInfo) => {
		const { claims = {} } = authUserInfo;
		if ('isAdmin' in claims) {
			store.dispatch(
				saveAuthUser({
					isLoggedIn: true,
					isAdmin: Boolean(claims.isAdmin),
					userInfo: authUserInfo,
					isLoaded: true,
				})
			);
		}
	});
};

/**
 * Listen for auth state
 * if changed, update it to redux store
 */
export const listenUserAuthState = () => {
	saveAuthStateOnLocalStorage();
	loadAuthStateFromLocalStorage();
	auth.onAuthStateChanged(saveAuthUserOnStore);
};

const invisibeRecaptcha = (elId: string) =>
	new RecaptchaVerifier(
		elId,
		{
			size: 'invisible',
		},
		auth
	);
/**
 * send otp to number
 * @param  {string} captchaElId
 * @param  {string} phoneNumber
 * @returns Promise
 */
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
		errorLogger(error as Error);
		return false;
	}
};

/**
 * Confirm Otp result
 * @param  {ConfirmationResult} confirmationResult
 * @param  {string} otp
 * @returns Promise
 */
export const confirmOtp = async (
	confirmationResult: ConfirmationResult,
	otp: string
): Promise<boolean> => {
	try {
		await confirmationResult.confirm(otp);
		return true;
	} catch (error) {
		// User couldn't sign in (bad verification code?)
		errorLogger(error as Error);
		return false;
	}
};

/**
 * Get current auth user when authuser state changes
 * @returns Promise
 */
const getCurrentUser = () =>
	new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
			unsubscribe();
			resolve(user);
		}, reject);
	});

/**
 * @returns {string} authToken
 */
export const getAuthToken = async () => {
	const authUser = await getCurrentUser();
	return (authUser as User)?.getIdToken();
};

/**
 * Sign in with token
 * @param  {string} token
 */
export const signIn = async (token: string) => {
	try {
		await signInWithCustomToken(auth, token);
		const authUser = await getCurrentUser();
		saveAuthUserOnStore(authUser as User);
		return true;
	} catch (err) {
		errorLogger(err as Error);
	}
	return false;
};

/**
 * Sign Out current auth user
 */
export const signOut = async () => {
	try {
		await firebaseSignOut(auth);
		return true;
	} catch (err) {
		errorLogger(err as Error);
	}
	return false;
};
