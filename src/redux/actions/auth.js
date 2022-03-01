import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "./actionTypes";
import { auth, db } from "../../firebase-config";
// import { setAlert } from './alert';
// Load User
export const loadUser = () => async (dispatch) => {
	try {
		onAuthStateChanged(auth, (currentUser) => {
			dispatch({
				type: USER_LOADED,
				payload: currentUser,
			});
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const createUser = ({
	displayName,
	photoURL,
	uid,
	email,
	createdAt,
	isOnline = true,
}) => {
	try {
		const loggedInUser = {
			displayName,
			photoURL,
			uid,
			email,
			createdAt,
			isOnline,
		};
		// await setDoc(doc(db, "users", note.id), loggedInUser);
		// db.collection("users").doc(uid).set(loggedInUser);
		// db.collection('users').onSnapshot((snap) => {
		//   snap.forEach((doc) => {
		//     const user = doc.data();
		//     if (user.uid === value?.id) {
		//       // setUser(doc.data());
		//     }
		//   });
		// });
	} catch (error) {
		console.log("here is err", error);
	}
};

// Register User
export const register =
	({ firstName, lastName, email, password, role }) =>
	async (dispatch) => {
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			// check if user already existed or not
			const noteSnapshot = await getDoc(doc(db, "users", res.user.uid));
			if (!noteSnapshot.exists()) {
				// create new user in database
				await setDoc(doc(db, "users", res.user.uid), {
					displayName: `${firstName} ${lastName}`,
					firstName,
					lastName,
					email,
					password,
					role,
				});
			}
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res,
			});
			dispatch(loadUser(res));
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

// Login User
export const login = (email, password) => async (dispatch) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res,
		});

		dispatch(loadUser(res));
	} catch (err) {
		// const errors = err.response.data.errors;

		// if (errors) {
		//   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		// }

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout

export const logout = () => async (dispatch) => {
	try {
		await signOut(auth);

		dispatch({ type: LOGOUT });
	} catch (err) {
		console.log(err);
	}
};
