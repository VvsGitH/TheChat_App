import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from '../firebase/firebase.utils';

import './homepage.style.css';

const HomePage = ({ isLoggedIn }) => {
	const history = useHistory();

	return (
		<main className='homepage'>
			<div className='card flex-column'>
				<h2>
					Welcome to <span className='logo'>The Chat</span>
				</h2>
				{isLoggedIn ? (
					<div className='container'>
						<p>Start chatting with your friends</p>
						<button className='btn' onClick={() => history.push('/chat')}>
							START
						</button>
						<button className='link' onClick={signOut}>
							Log out
						</button>
					</div>
				) : (
					<div className='container'>
						<p>Please login</p>
						<button className='btn' onClick={() => history.push('/login')}>
							LOG IN
						</button>
						<Link to='/signin' className='link'>
							Are you new? Register
						</Link>
					</div>
				)}
			</div>
		</main>
	);
};

export default HomePage;
