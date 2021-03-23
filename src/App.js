import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { auth, firestore } from './firebase/firebase.utils';
import './App.css';

import ChatPage from './pages/chatpage.component';
import HomePage from './pages/homepage.component';
import SignPage from './pages/signpage.component';
import LoginPage from './pages/loginpage.component';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({ id: '', name: '' });

	useEffect(() => {
		const unsubFromAuth = auth.onAuthStateChanged(async userAuth => {
			console.log('Auth state changed: ', userAuth);
			if (userAuth) {
				console.log('A new user logged in');
				let userDb = await firestore.doc('users/' + userAuth.uid).get();
				if (userDb.exists) {
					setUserInfo({
						id: userDb.id,
						name: userDb.data().displayName,
					});
					setIsLoggedIn(true);
				} else {
					console.error('User does not exist in database!');
				}
			} else {
				setIsLoggedIn(false);
				setUserInfo({ id: '', name: '' });
			}
		});

		return () => unsubFromAuth();
	}, []);

	return (
		<div className='App'>
			<Route
				exact
				path='/'
				render={props => <HomePage {...props} isLoggedIn={isLoggedIn} />}
			/>
			<Route path='/login' component={LoginPage} />
			<Route path='/signin' component={SignPage} />
			<Route
				path='/chat'
				render={props =>
					isLoggedIn ? (
						<ChatPage {...props} user={userInfo} />
					) : (
						<Redirect to='/' />
					)
					//<ChatPage {...props} user={userInfo} />
				}
			/>
		</div>
	);
}

export default App;
