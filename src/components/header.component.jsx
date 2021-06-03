import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { signOut } from '../firebase/firebase.utils';
import './header.style.css';

const Header = () => {
	const location = useLocation();
	const isChat = location.pathname === '/chat';

	return (
		<header className={`header ${isChat ? 'reduced' : null}`}>
			<Link to='/' className='logo'>
				The Chat
			</Link>

			{isChat ? (
				<button className='sign-out' onClick={signOut}>
					Sign Out
				</button>
			) : null}
		</header>
	);
};

export default Header;
