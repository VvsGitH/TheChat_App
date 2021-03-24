import React from 'react';

import './message.style.css';

const Message = ({ sender, content, time, isReceived, color }) => {
	return (
		<div className={'message ' + (isReceived ? 'received' : '')}>
			<h4 className='name' style={{ color: `hsl(${color}, 100%, 50%)` }}>
				{sender}
			</h4>
			<p className='content'>{content}</p>
			<time className='date'>{time}</time>
		</div>
	);
};

export default Message;
