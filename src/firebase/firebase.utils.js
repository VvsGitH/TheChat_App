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
const provider = new firebase.auth.GoogleAuthProvider();
export async function signInWithGoogle() {
	try {
		let result = await auth.signInWithPopup(provider);
		return result.user;
	} catch (error) {
		throw error;
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
		return userRef;
	} catch (error) {
		throw error;
	}
}

// UTILS -> Add new msg to db
export async function sendMessage(message) {
	if (!message) return;

	try {
		const msgsRef = firestore.collection('messages/');
		const msgsSnap = await msgsRef.get();

		if (msgsSnap.exists) {
			const { sender, content } = message;
			const sentAt = new Date();
			await msgsRef.add({
				sender,
				content,
				sentAt,
			});
		}
	} catch (error) {
		throw error;
	}
}
