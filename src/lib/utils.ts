import {
	getAuth,
	getIdTokenResult,
	signInWithCustomToken,
	signOut,
	setPersistence,
	browserLocalPersistence,
} from 'firebase/auth';
import firebaseApp from '../config/firebase';

export const signIn = async (token: string) => {
	try {
		await setAuthPersistence();
		const auth = getAuth(firebaseApp);
		const { user } = await signInWithCustomToken(auth, token);
		console.log({ user });
		const idToken = await getIdToken();
		console.log({ idToken });
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log({ errorCode, errorMessage });
		// ...
	}
};

export const signOutUtil = () => {
	const auth = getAuth(firebaseApp);
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
};

export const getIdToken = async () => {
	const auth = getAuth(firebaseApp);
	const { currentUser } = auth;
	try {
		if (currentUser) {
			const idToken = await getIdTokenResult(currentUser, true);
			return idToken;
		}
	} catch (err) {
		console.log(err);
	}
};

export const setAuthPersistence = async () => {
	try {
		const auth = getAuth(firebaseApp);
		setPersistence(auth, browserLocalPersistence);
	} catch (err) {
		console.log(err);
	}
};
