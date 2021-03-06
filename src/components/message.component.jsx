import React from 'react';

import './message.style.css';

const Message = ({ sender, content, time, isReceived, color }) => (
	<article className={'message ' + (isReceived ? 'received' : '')}>
		<h4 className='name' style={{ color: `hsl(${color}, 100%, 40%)` }}>
			{sender}
		</h4>
		<p className='content'>{content}</p>
		<time className='date'>{time}</time>
	</article>
);

export default React.memo(Message);
