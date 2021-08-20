import { getAuth, getIdTokenResult, signInWithCustomToken, signOut } from "firebase/auth";

export const signIn = async (token: string) => {
    const auth = getAuth();
    signInWithCustomToken(auth, token)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log({ user })
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({ errorCode, errorMessage })
            // ...
        });
}

export const signOutUtil = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export const getIdToken = () => {
    const auth = getAuth();
    const { currentUser } = auth;
    try {
        if (currentUser) {
            const idToken = getIdTokenResult(currentUser, true);
            return idToken;
        }
    } catch (err) {
        console.log(err);
    }
}