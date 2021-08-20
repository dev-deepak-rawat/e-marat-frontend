import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyAv2pnbWxCTN9uF07SSugY9vMA9Ke2KflU",
    authDomain: "e-marat.firebaseapp.com",
    projectId: "e-marat",
    storageBucket: "e-marat.appspot.com",
    messagingSenderId: "880326889479",
    appId: "1:880326889479:web:744f0049830e8f694a5aa2",
    measurementId: "G-GLS6ZMSC0X"
};

export const firebaseApp = initializeApp(firebaseConfig);
