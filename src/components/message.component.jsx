import React from 'react';

import './message.style.css';

const Message = ({ sender, content, time, isReceived }) => {
	return (
		<div className={'message ' + (isReceived ? 'received' : '')}>
			<h4 className='name'>{sender}</h4>
			<p className='content'>{content}</p>
			<time className='date'>{time}</time>
		</div>
	);
};

export default Message;
