import { doc, getDocs, getDoc, updateDoc, collection, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"
import { GET_PROFILE, GET_USERS } from "./actionTypes";
import { db, auth } from "../../firebase-config";



export const getUserProfile = (id) => async (dispatch) => {
	try {
		const userSnapshot = await getDoc(doc(db, "users", id));
		if (userSnapshot.exists()) {
			dispatch({
				type: GET_PROFILE,
				payload: userSnapshot.data(),
			});
		
		}
	} catch (error) {
		console.log("her eis errro:", error);
	}
};

// get all users
export const getUsers = () => async (dispatch) => {
	try {
		    const usersSnapshot = await getDocs(collection(db, "users"));

			const usersList = usersSnapshot.docs.map((doc) => doc.data());
			dispatch({
				type: GET_USERS,
				payload: usersList
			});
			
	} catch (error) {
		console.log("her eis errro:", error);
	}
};

// update User Profile
export const updateUserProfile =
	({ id, firstName, lastName, email, role }) =>
	async (dispatch) => {
		try {
			const userRef = doc(db, "users", id);
			await updateDoc(userRef, {
				displayName: `${firstName} ${lastName}`,
				firstName,
				lastName,
				email,
				role,
			});

			dispatch(getUserProfile(id));
		} catch (err) {
			console.log("udpate user; error", err);
			// dispatch({
			// 	type: UPDATE_PROFILE,
			// });
		}
	};

export const deleteUser = (id) => async (dispatch) => {
	try {
	
		const userRef = doc(db, "users", id);
		await deleteDoc(userRef);

		dispatch(getUsers())

	} catch (error) {
		console.log("here is errro:", error)
	}
}