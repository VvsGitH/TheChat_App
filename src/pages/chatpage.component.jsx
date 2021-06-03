import React, { useEffect, useRef, useState } from 'react';
import Message from '../components/message.component';
import { firestore } from '../firebase/firebase.utils';

import './chatpage.style.css';

const ChatPage = ({ user }) => {
	const [newMsgContent, setNewMsgContent] = useState('');
	const [messages, setMessages] = useState([]);
	const [moreMessages, setMoreMessages] = useState([]);
	const [colorHueDictionary, setColorHueDictionary] = useState([]);

	// Reference di un div vuoto alla fine della lista dei messaggi. Utile per lo scrolling automatico
	const scrollerDummy = useRef();

	// Al caricamento del componente, viene fatta una iscrizione ad un listener del database, che aggiorna lo stato messages ogni volta che rileva un nuovo messaggio nel db
	useEffect(() => {
		const unsubFromFirestore = firestore
			.collection('messages/')
			.orderBy('sentAt', 'desc')
			.limit(25)
			.onSnapshot(
				snapshot => {
					console.log('Updating the chat from db!');
					// Creo un array con solo i messaggi aggiunti rispetto all'ultimo snapshot
					let newMsgs = [];
					snapshot
						.docChanges()
						.filter(change => change.type === 'added')
						.forEach(change => {
							let msgWithId = {
								id: change.doc.id,
								...change.doc.data(),
							};
							newMsgs.push(msgWithId);
						});
					// Metto i messaggi più recenti alla fine
					newMsgs.reverse();
					setMessages(msgs => [...msgs, ...newMsgs]);
					// La chat scorre in basso fino al nuovo messaggio
					scrollerDummy.current.scrollIntoView({ behavior: 'smooth' });
				},
				error => console.error(error)
			);
		// Annullo l'iscrizione al listener del database
		return () => unsubFromFirestore();
	}, []);

	// Ogni volta che gli stati messages o moreMessages cambiano, viene creato un dizionario che assegna un colore (solo il valore Hue) ad ogni sender
	useEffect(() => {
		let senders = messages.map(msg => msg.senderId);
		// Combino i senders di messages e moreMessages
		senders.push(...moreMessages.map(msg => msg.senderId));
		// Creo un array con tutti i sender, non ripetuti
		let uniqueSenders = senders.filter(
			(sender, indx) => senders.indexOf(sender) === indx
		);
		// H va da 0 a 359. Divido il range di colori in base al numero di senders presenti in chat
		let colorHueDistance = Math.ceil(360 / uniqueSenders.length);
		let colorSenderDict = {};
		// Creo il dizionario
		for (let i = 0; i < uniqueSenders.length; i++) {
			colorSenderDict[uniqueSenders[i]] = i * colorHueDistance;
		}
		setColorHueDictionary(colorSenderDict);
	}, [messages, moreMessages]);

	const handleChange = event => {
		event.preventDefault();
		setNewMsgContent(event.target.value);
		// Auto-resize
		event.target.style.height = '100%';
		event.target.style.height = event.target.scrollHeight + 'px';
	};

	const sendMessage = async event => {
		event.preventDefault();
		if (newMsgContent.trim() === '') {
			setNewMsgContent('');
			return;
		}
		// Aggiungo i messaggi non vuoti al database
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

	const loadMoreMessages = async () => {
		let oldDbMessages = [];
		let snapshot = [];
		try {
			console.log('Loading more messages from the db...');
			// Imposto la query in base alla data di invio dei messaggi. Tale data deve essere inferiore rispetto a quella del messaggio più vecchio presente nella chat: questo messaggio è presente inizialmente in messages e successivamente in moreMessages.
			if (moreMessages.length === 0) {
				snapshot = await firestore
					.collection('messages/')
					.where('sentAt', '<', messages[0].sentAt)
					.orderBy('sentAt', 'desc')
					.limit(25)
					.get();
			} else {
				snapshot = await firestore
					.collection('messages/')
					.where('sentAt', '<', moreMessages[0].sentAt)
					.orderBy('sentAt', 'desc')
					.limit(25)
					.get();
			}
			// Inserisco i messaggi del db in moreMessages. A differenza di messages, moreMessages è un array che viene caricato 25 messaggi per volta e i nuovi messaggi sono più vecchi dei precedenti. Quindi devo mettere mettere i 'nuovi' messaggi sopra quell già presenti.
			if (!snapshot.empty) {
				snapshot.forEach(msg => {
					let msgWithId = {
						id: msg.id,
						...msg.data(),
					};
					oldDbMessages.push(msgWithId);
				});
				oldDbMessages.reverse().push(...moreMessages);
				setMoreMessages(oldDbMessages);
			} else {
				console.log('No more messages');
			}
		} catch (error) {
			console.error('Error during the load of old messages: ', error);
		}
	};

	return (
		<main className='chatpage'>
			<section className='chat-container'>
				<div className='chat-slider'>
					<button className='load-btn' onClick={loadMoreMessages}>
						....MORE...
					</button>
					{moreMessages.map(msg => (
						<Message
							key={msg.id}
							sender={msg.senderName}
							content={msg.content}
							time={msg.sentAt.toDate().toLocaleString()}
							isReceived={msg.senderId !== user.id}
							color={colorHueDictionary[msg.senderId]}
						/>
					))}
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
			</section>

			<form className='chat-controls' onSubmit={sendMessage}>
				<textarea
					className='text-area'
					name='input'
					rows='1'
					placeholder='Write your message!'
					value={newMsgContent}
					onInput={handleChange}
				/>
				<button className='btn' type='submit'>
					<i className='fa fa-paper-plane'></i>
				</button>
			</form>
		</main>
	);
};

export default ChatPage;
