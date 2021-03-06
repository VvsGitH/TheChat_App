import React, { useState } from 'react';
import { createNewUser } from '../firebase/firebase.utils';

import './signpage.style.css';

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

	const handleUserCreation = async event => {
		event.preventDefault();
		try {
			await createNewUser(userName, userEmail, userPass);
			history.push('/');
			// onAuthStateChange() viene evocato prima che createNewUser() aggiorni l'utente con il suo username.
			// Quindi in questo momento auth.diplayName è corretto, ma lo stato user di App ha name:null.
			// Devo dunque aggiornare la pagina in modo che onAuthStateChange() venga chiamato di nuovo e imposti lo stato user in modo corretto.
			window.location.reload();
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
		<main className='signpage'>
			<div className='card flex-column'>
				<h3>Sign in with your email and password</h3>
				<form className='sign-form' onSubmit={handleUserCreation}>
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
		</main>
	);
};

export default SignPage;
