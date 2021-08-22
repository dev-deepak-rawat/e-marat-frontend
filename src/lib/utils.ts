/* eslint-disable no-console */
import {
    getAuth,
    signInWithCustomToken,
    signOut as firebaseSignOut,
} from 'firebase/auth';

export const signIn = async (token: string) => {
    try {
        const auth = getAuth();
        await signInWithCustomToken(auth, token);
        return true;
    } catch (err) {
        console.log({ err: err.message });
    }
    return false;
};

export const signOut = async () => {
    const auth = getAuth();
    try {
        await firebaseSignOut(auth);
        return true;
    } catch (err) {
        console.log({ err: err.message })
    }
    return false;
};

export const isLoggedIn = () => Boolean(localStorage.getItem('authUser'));

export const getAuthUserInfo = () => {
    const authUser = localStorage.getItem('authUser');
    const parsedAuthUser = authUser ? JSON.parse(authUser) : {};
    return parsedAuthUser;
}
export const isAdmin = () => {
    const { claims = {} } = getAuthUserInfo();
    const { isAdmin: isAdminRole = false } = claims;
    return isAdminRole;
}
export const getAuthToken = () => {
    const { token = '' } = getAuthUserInfo();
    return token;
}
