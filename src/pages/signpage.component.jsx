import React, { useState } from 'react';
import { auth, addUserToDb } from '../firebase/firebase.utils';

import './signpage.style.css';

import Header from '../components/header.component';

const SignPage = ({ history }) => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPass, setUserPass] = useState('');

	const handleInput = event => {
		event.preventDefault();
		switch (event.target.name) {
			case 'name':
				setUserName(event.target.value);
				break;
			case 'email':
				setUserEmail(event.target.value);
				break;
			case 'password':
				setUserPass(event.target.value);
				break;
			default:
				console.error('Something went wrong with the input');
		}
	};

	const createNewUser = async event => {
		event.preventDefault();
		try {
			let { user } = await auth.createUserWithEmailAndPassword(
				userEmail,
				userPass
			);

			let displayName = userName;
			await addUserToDb(user, { displayName });

			setUserName('');
			setUserEmail('');
			setUserPass('');
			history.push('/');
		} catch (error) {
			alert('Something went wrong, try again');
			console.error(
				'An error occurred during registration: ',
				error.code,
				error.message
			);
		}
	};

	return (
		<div>
			<Header history={history} />

			<div className='signpage card flex-column'>
				<h3>Sign in with your email and password</h3>
				<form className='sign-form' onSubmit={createNewUser}>
					<div className='container'>
						<label>Full Name</label>
						<input
							type='text'
							placeholder='insert your name'
							name='name'
							value={userName}
							onChange={handleInput}
							required
						/>
					</div>
					<div className='container'>
						<label className='email-label'>Email</label>
						<input
							type='email'
							placeholder='insert your email'
							name='email'
							value={userEmail}
							onChange={handleInput}
							required
						/>
					</div>
					<div className='container'>
						<label>Password</label>
						<input
							type='password'
							placeholder='insert your password'
							name='password'
							value={userPass}
							onChange={handleInput}
							required
						/>
					</div>
					<button className='btn' type='submit'>
						SIGN IN
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignPage;
