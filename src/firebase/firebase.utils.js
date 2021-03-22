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
export default firebase;

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
		// Signing in and returning the result
		let result = await auth.signInWithPopup(provider);
		return result;
	} catch (error) {
		alert('Something went wrong, try again!');
		console.error(
			'Error in handleGoogleSubmit: ',
			error.code,
			error.message,
			error.credentials
		);
	}
}

// UTILS -> Add new user to db
export async function addUserToDb(userAuth, additionalData) {
	if (!userAuth) return;

	try {
		const userRef = firestore.doc('users/' + userAuth.uid);
		const userSnap = await userRef.get();

		if (!userSnap.exists) {
			const { displayName, email } = userAuth;
			const createdAt = new Date();
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		}

		return userSnap;
	} catch (error) {
		console.error('An error occurred with the db: ', error);
	}
}
