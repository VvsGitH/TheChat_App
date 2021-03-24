import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCr-FYUZWwOEm1KPpk7hWS3oV1-BNEg96Q',
	authDomain: 'my-chat-app-aa73c.firebaseapp.com',
	projectId: 'my-chat-app-aa73c',
	storageBucket: 'my-chat-app-aa73c.appspot.com',
	messagingSenderId: '422748533719',
	appId: '1:422748533719:web:2fc9ec870dbeaf4bad9192',
	measurementId: 'G-ZVBXSF1QPL',
};

firebase.initializeApp(firebaseConfig);

// Authentication
export const auth = firebase.auth();

// Database
export const firestore = firebase.firestore();

// UTILIS -> Google Auth
export async function signInWithGoogle() {
	try {
		// Setting persistance
		await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
		// Configuring provider
		let provider = new firebase.auth.GoogleAuthProvider();
		provider.setCustomParameters({ prompt: 'select_account' });
		// Signing in
		await auth.signInWithPopup(provider);
	} catch (error) {
		throw error;
	}
}

// UTILS -> Create New User
export async function createNewUser(name, email, password) {
	try {
		// Setting persistance
		await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
		// Create new user with email and password
		let { user } = await auth.createUserWithEmailAndPassword(email, password);
		// Adding the name to the user profile
		await user.updateProfile({
			displayName: name,
		});
	} catch (error) {
		throw error;
	}
}

// UTILS -> Log in
export async function logIn(email, password) {
	try {
		await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
		await auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		throw error;
	}
}
