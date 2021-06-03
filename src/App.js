import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { auth } from './firebase/firebase.utils';
import './App.css';

import Header from './components/header.component';
import ChatPage from './pages/chatpage.component';
import HomePage from './pages/homepage.component';
import SignPage from './pages/signpage.component';
import LoginPage from './pages/loginpage.component';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({ id: '', name: '' });

	useEffect(() => {
		const unsubFromAuth = auth.onAuthStateChanged(userAuth => {
			console.log('Auth state changed: ', userAuth);
			if (userAuth) {
				setUserInfo({
					id: userAuth.uid,
					name: userAuth.displayName,
				});
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				setUserInfo({ id: '', name: '' });
			}
		});

		return () => unsubFromAuth();
	}, []);

	return (
		<>
			<Header />
			<Switch>
				<Route exact path='/'>
					<HomePage isLoggedIn={isLoggedIn} />
				</Route>
				<Route path='/login' component={LoginPage} />
				<Route path='/signin' component={SignPage} />
				<Route path='/chat'>
					{isLoggedIn ? <ChatPage user={userInfo} /> : <Redirect to='/' />}
				</Route>
				<Route>
					<h2>404 Page Not Found</h2>
				</Route>
			</Switch>
		</>
	);
}

export default App;
