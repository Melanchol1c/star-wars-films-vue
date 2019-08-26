import firebase from 'firebase/app';

/**
 * Method using firebase SDK to login.
 * @param {string} email User email.
 * @param {string} password User password.
 */
const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

/**
 * Method using firebase SDK to register.
 * @param {string} email User email.
 * @param {string} password User password.
 */
const register = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

/** Method using firebase SDK to logout. */
const logout = () => firebase.auth().signOut();

/** Method using firebase SDK to get current user data. */
const getCurrentUser = () => firebase.auth().currentUser;

export { login, register, logout, getCurrentUser };
