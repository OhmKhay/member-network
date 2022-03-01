import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDzZwsbHdoJteI91ovz8TgcC_fBQyeDdLA",
	authDomain: "membernetwork-31599.firebaseapp.com",
	projectId: "membernetwork-31599",
	storageBucket: "membernetwork-31599.appspot.com",
	messagingSenderId: "579450353305",
	appId: "1:579450353305:web:ffa6217bd290ab256a6a08",
	measurementId: "G-MCDSPXVKHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
