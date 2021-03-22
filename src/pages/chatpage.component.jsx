import React, { useEffect, useState } from 'react';
import Message from '../components/message.component';
import { auth, firestore } from '../firebase/firebase.utils';

import './chatpage.style.css';

const ChatPage = ({ user, history }) => {
	const [newMsgContent, setNewMsgContent] = useState('');
	const [messages, setMessages] = useState([]);

	const handleChange = event => {
		event.preventDefault();
		setNewMsgContent(event.target.value);
	};

	const sendMessage = async event => {
		event.preventDefault();

		try {
			await firestore.collection('messages/').add({
				senderId: user.id,
				senderName: user.name,
				content: newMsgContent,
				sentAt: new Date(),
			});
			setNewMsgContent('');
		} catch (error) {
			console.error('Error sending message: ', error);
		}
	};

	const logOut = async () => {
		try {
			await auth.signOut();
		} catch (error) {
			console.error('Error during sign-out: ', error.code, error.message);
		}
	};

	/*useEffect(() => {
		const unsubFromFirestore = firestore
			.collection('messages/')
			.orderBy('sentAt')
			.limit(25)
			.onSnapshot(
				snapshot => {
					console.log('Updating the chat from db!');
					let dbMessages = [];
					snapshot.forEach(msg => {
						let msgWithId = {
							id: msg.id,
							...msg.data(),
						};
						dbMessages.push(msgWithId);
					});
					setMessages(dbMessages);
				},
				error => console.error(error)
			);

		return () => unsubFromFirestore();
	}, []); */

	return (
		<div className='chatpage'>
			<header className='top-bar'>
				<h2 onClick={() => history.push('/')}>THE CHAT</h2>
				<span className='sign-out' onClick={logOut}>
					Sign Out
				</span>
			</header>

			<div className='main-container'>
				<div className='chat-container'>
					{messages.map(msg => (
						<Message
							key={msg.id}
							sender={msg.senderName}
							content={msg.content}
							time={msg.sentAt.toDate().toLocaleString()}
						/>
					))}
					<Message
						sender='Vito'
						content='This is a message'
						time='22/03/2021 - 18:12'
					/>
					<Message
						sender='Luca'
						content='This is a message'
						time='22/03/2021 - 18:12'
					/>
					<Message
						sender='Vito'
						content='This is a message'
						time='22/03/2021 - 18:12'
					/>
					<Message
						sender='Luca'
						content='This is a message'
						time='22/03/2021 - 18:12'
					/>
				</div>
				<form className='chat-controls' onSubmit={sendMessage}>
					<textarea
						type='text'
						placeholder='Write your message'
						value={newMsgContent}
						onChange={handleChange}
						required
					/>
					<button type='submit'>SEND</button>
				</form>
			</div>
		</div>
	);
};

export default ChatPage;
