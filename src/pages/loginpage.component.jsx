import React, { useState } from 'react';
import firebase, {
	auth,
	signInWithGoogle,
	addUserToDb,
} from '../firebase/firebase.utils';

import './loginpage.style.css';

import Header from '../components/header.component';

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

	const logIn = async event => {
		event.preventDefault();
		try {
			await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
			await auth.signInWithEmailAndPassword(userEmail, userPass);
			setUserEmail('');
			setUserPass('');
			history.push('/');
		} catch (error) {
			alert('Credential are wrong');
			console.error('Error during sign-in: ', error.code, error.message);
		}
	};

	const signInGoogle = async () => {
		let { user } = await signInWithGoogle();
		await addUserToDb(user);
		history.push('/');
	};

	return (
		<div>
			<Header history={history} />

			<div className='loginpage card'>
				<div className='option'>
					<form onSubmit={logIn}>
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
					<h3>Login with your email and password</h3>
				</div>

				<hr />

				<div className='option'>
					<button
						className='btn btn-google'
						type='button'
						onClick={signInGoogle}>
						LOG IN WITH GOOGLE
					</button>
					<h3>Login with Google</h3>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
