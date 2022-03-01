import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GET_PROFILE } from "./actionTypes";
import { db } from "../../firebase-config";

export const getUserProfile = (id) => async (dispatch) => {
	try {
		const userSnapshot = await getDoc(doc(db, "users", id));
		if (userSnapshot.exists()) {
			dispatch({
				type: GET_PROFILE,
				payload: userSnapshot.data(),
			});
			return userSnapshot.data();
		}
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
