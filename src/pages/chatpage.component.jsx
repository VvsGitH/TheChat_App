import React, { useEffect, useRef, useState } from 'react';
import Message from '../components/message.component';
import { auth, firestore } from '../firebase/firebase.utils';

import './chatpage.style.css';

const ChatPage = ({ user, history }) => {
	const [newMsgContent, setNewMsgContent] = useState('');
	const [messages, setMessages] = useState([]);
	const [colorHueDictionary, setColorHueDictionary] = useState([]);

	// Reference di un div vuoto alla fine della lista dei messaggi. Utile per lo scrolling automatico
	const scrollerDummy = useRef();
	const textArea = useRef();

	useEffect(() => {
		// Al caricamento del componente, viene fatta una iscrizione ad un listener del database, che aggiorna lo stato messages ogni volta che rileva un nuovo messaggio nel db
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
	}, []);

	useEffect(() => {
		// Ogni volta che lo stato messages cambia viene creato un dizionario che assegna un colore (solo il valore Hue) ad ogni sender ...
		let senders = messages.map(msg => msg.senderId);
		let uniqueSenders = senders.filter(
			(sender, indx) => senders.indexOf(sender) === indx
		);
		let colorHueDistance = Math.ceil(360 / uniqueSenders.length);
		let colorSenderDict = {};
		for (let i = 0; i < uniqueSenders.length; i++) {
			colorSenderDict[uniqueSenders[i]] = i * colorHueDistance;
		}
		setColorHueDictionary(colorSenderDict);

		// ... E la chat scorre in basso fino al nuovo messaggio
		scrollerDummy.current.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleChange = event => {
		event.preventDefault();
		setNewMsgContent(event.target.textContent);
	};

	const sendMessage = async event => {
		event.preventDefault();
		if (newMsgContent === '') {
			return;
		}

		try {
			await firestore.collection('messages/').add({
				senderId: user.id,
				senderName: user.name,
				content: newMsgContent,
				sentAt: new Date(),
			});
			setNewMsgContent('');
			textArea.current.textContent = '';
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
							color={colorHueDictionary[msg.senderId]}
						/>
					))}
					<div ref={scrollerDummy}></div>
				</div>
			</div>

			<form className='chat-controls' onSubmit={sendMessage}>
				<span
					className='text-area'
					role='textbox'
					contentEditable
					onInput={handleChange}
					ref={textArea}
				/>
				<button className='btn' type='submit'>
					SEND
				</button>
			</form>
		</div>
	);
};

export default ChatPage;
