import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './actionTypes';
// import { setAlert } from './alert';
import { auth, db } from '../../firebase-config';
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    onAuthStateChanged(auth, (currentUser) => {
      console.log('user current:', currentUser);
      dispatch({
        type: USER_LOADED,
        payload: currentUser
      });
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const createUser = ({ displayName, photoURL, uid, email, createdAt, isOnline = true }) => {
  try {
    const loggedInUser = {
      displayName,
      photoURL,
      uid,
      email,
      createdAt,
      isOnline
    };
    db.collection('users').doc(uid).set(loggedInUser);
    // db.collection('users').onSnapshot((snap) => {
    //   snap.forEach((doc) => {
    //     const user = doc.data();
    //     if (user.uid === value?.id) {
    //       // setUser(doc.data());
    //     }
    //   });
    // });
  } catch (error) {
    console.log('here is err', error);
  }
};

// Register User
export const register = (registerEmail, registerPassword) => async (dispatch) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    console.log('here is res:', res);
    // db.collection('users').doc(uid).set(loggedInUser);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res
    });
    dispatch(loadUser(res));
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  console.log('login:', email, password);
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log('res user:', res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res
    });

    dispatch(loadUser(res));
  } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: LOGIN_FAIL
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
