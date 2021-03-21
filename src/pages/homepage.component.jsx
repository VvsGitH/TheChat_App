import React from 'react';
import { auth } from '../firebase/firebase.utils';

import './homepage.style.css';

const HomePage = ({ isLoggedIn, history }) => {
	const logOut = async () => {
		try {
			await auth.signOut();
		} catch (error) {
			console.error('Error in signOut(): ', error);
		}
	};

	return (
		<div className='homepage card'>
			<h2>
				Welcome to <span>The Chat</span>
			</h2>
			{isLoggedIn ? (
				<div className='container'>
					<p>Start chatting with your friends</p>
					<button className='btn' onClick={() => history.push('/chat')}>
						START
					</button>
					<p className='link' onClick={logOut}>
						Log out
					</p>
				</div>
			) : (
				<div className='container'>
					<p>Please login</p>
					<button className='btn' onClick={() => history.push('/login')}>
						LOG IN
					</button>
					<p className='link' onClick={() => history.push('/signin')}>
						Are you new? Register
					</p>
				</div>
			)}
		</div>
	);
};

export default HomePage;