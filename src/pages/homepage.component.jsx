import React from 'react';
import Header from '../components/header.component';
import { signOut } from '../firebase/firebase.utils';

import './homepage.style.css';

const HomePage = ({ isLoggedIn, history }) => {
	return (
		<div>
			<Header history={history} />

			<div className='homepage card flex-column'>
				<h2>
					Welcome to <span className='logo'>The Chat</span>
				</h2>
				{isLoggedIn ? (
					<div className='container'>
						<p>Start chatting with your friends</p>
						<button
							className='btn'
							onClick={() => history.push('/TheChat_App/chat')}>
							START
						</button>
						<p className='link' onClick={signOut}>
							Log out
						</p>
					</div>
				) : (
					<div className='container'>
						<p>Please login</p>
						<button
							className='btn'
							onClick={() => history.push('/TheChat_App/login')}>
							LOG IN
						</button>
						<p
							className='link'
							onClick={() => history.push('/TheChat_App/signin')}>
							Are you new? Register
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
