import { LOGIN_SUCCESS, LOGOUT, USER_LOADED, GET_AUTH_PROFILE } from '../actions/actionTypes';

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null
};

export const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload?.user,
        loading: false,
        isAuthenticated: true
      };
    case USER_LOADED:
    case GET_AUTH_PROFILE:
      return {
        ...state,
        isAuthenticated: Boolean(payload?.accessToken),
        loading: false,
        user: payload
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
