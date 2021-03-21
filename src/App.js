import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { auth } from './firebase/firebase.utils';
import './App.css';

import ChatPage from './pages/chatpage.component';
import HomePage from './pages/homepage.component';
import SignPage from './pages/signpage.component';
import Header from './components/header.component';
import LoginPage from './pages/loginpage.component';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubFromAuth = auth.onAuthStateChanged(userAuth => {
			if (userAuth) {
				//console.log(userAuth);
				setIsLoggedIn(true);
				setUser(userAuth.displayName);
			} else {
				setIsLoggedIn(false);
				setUser(null);
			}
		});

		return () => unsubFromAuth();
	});

	return (
		<div className='App'>
			<Route path='/' component={Header} />
			<Route
				exact
				path='/'
				render={props => <HomePage {...props} isLoggedIn={isLoggedIn} />}
			/>
			<Route path='/login' component={LoginPage} />
			<Route path='/signin' component={SignPage} />
			<Route
				path='/chat'
				render={props => <ChatPage {...props} user={user} />}
			/>
		</div>
	);
}

export default App;
