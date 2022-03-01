import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_USERS
} from "../actions/actionTypes";

const initialState = {
	profile: null,
	users: [],
	loading: true,
	error: {},
};

export const user = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case GET_USERS:
			return {
				...state,
				users: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
			
			};
		default:
			return state;
	}
};
