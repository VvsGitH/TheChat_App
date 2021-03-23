import React, { useEffect, useRef, useState } from 'react';
import Message from '../components/message.component';
import { auth, firestore } from '../firebase/firebase.utils';

import './chatpage.style.css';

const ChatPage = ({ user, history }) => {
	const [newMsgContent, setNewMsgContent] = useState('');
	const [messages, setMessages] = useState([]);

	// Reference di un div vuoto alla fine della lista dei messaggi. Utile per lo scrolling automatico
	const scrollerDummy = useRef();

	useEffect(() => {
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
					scrollerDummy.current.scrollIntoView({ behavior: 'smooth' });
				},
				error => console.error(error)
			);

		return () => unsubFromFirestore();
	}, []);

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

	return (
		<div className='chatpage'>
			<header className='top-bar'>
				<h2 className='logo' onClick={() => history.push('/')}>
					THE CHAT
				</h2>
				<span className='sign-out' onClick={logOut}>
					Sign Out
				</span>
			</header>

			<div className='chat-container'>
				<div className='chat-slider'>
					{messages.map(msg => (
						<Message
							key={msg.id}
							sender={msg.senderName}
							content={msg.content}
							time={msg.sentAt.toDate().toLocaleString()}
							isReceived={msg.senderId !== user.id}
						/>
					))}
					<div ref={scrollerDummy}></div>
				</div>
			</div>

			<form className='chat-controls' onSubmit={sendMessage}>
				<textarea
					type='text'
					placeholder='Write your message'
					value={newMsgContent}
					onChange={handleChange}
					required
				/>
				<button className='btn' type='submit'>
					SEND
				</button>
			</form>
		</div>
	);
};

export default ChatPage;
