import React, { useState } from 'react';
import { signInWithGoogle, logIn } from '../firebase/firebase.utils';

import './loginpage.style.css';

const LoginPage = ({ history }) => {
	const [userEmail, setUserEmail] = useState('');
	const [userPass, setUserPass] = useState('');

	const handleInput = event => {
		event.preventDefault();
		switch (event.target.name) {
			case 'email':
				setUserEmail(event.target.value);
				break;
			case 'password':
				setUserPass(event.target.value);
				break;
			default:
				console.error('Something is wrong with the input');
		}
	};

	const handleLogIn = async event => {
		event.preventDefault();
		try {
			await logIn(userEmail, userPass);
			history.push('/');
		} catch (error) {
			alert('Credential are wrong');
			console.error('Error during sign-in: ', error.code, error.message);
		}
	};

	const handleGoogleSignin = async () => {
		try {
			await signInWithGoogle();
			history.push('/');
		} catch (error) {
			alert('Something went wrong, try again!');
			console.error(
				'Error in Google signin: ',
				error.code,
				error.message,
				error.credentials
			);
		}
	};

	return (
		<main className='loginpage'>
			<div className='card flex-column'>
				<section className='option'>
					<h3>Login with your email and password</h3>
					<form onSubmit={handleLogIn}>
						<label>Email</label>
						<input
							type='email'
							placeholder='insert your email'
							name='email'
							value={userEmail}
							onChange={handleInput}
							required
						/>
						<label>Password</label>
						<input
							type='password'
							placeholder='insert your password'
							name='password'
							value={userPass}
							onChange={handleInput}
							required
						/>
						<button className='btn' type='submit'>
							LOG IN
						</button>
					</form>
				</section>

				<hr />

				<section className='option'>
					<h3>Login with Google</h3>
					<button
						className='btn btn-google'
						type='button'
						onClick={handleGoogleSignin}>
						LOG IN WITH GOOGLE
					</button>
				</section>
			</div>
		</main>
	);
};

export default LoginPage;
