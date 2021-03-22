import React from 'react';

import './message.style.css';

const Message = ({ sender, content, time }) => {
	return (
		<div className='message'>
			<h4>{sender}</h4>
			<p>{content}</p>
			<time>{time}</time>
		</div>
	);
};

export default Message;
