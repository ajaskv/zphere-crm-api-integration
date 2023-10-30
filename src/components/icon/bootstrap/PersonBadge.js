import * as React from 'react';

function SvgPersonBadge(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M6.5 2a.5.5 0 000 1h3a.5.5 0 000-1h-3zM11 8a3 3 0 11-6 0 3 3 0 016 0z' />
			<path d='M4.5 0A2.5 2.5 0 002 2.5V14a2 2 0 002 2h8a2 2 0 002-2V2.5A2.5 2.5 0 0011.5 0h-7zM3 2.5A1.5 1.5 0 014.5 1h7A1.5 1.5 0 0113 2.5v10.795a4.2 4.2 0 00-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 00-.776.492V2.5z' />
		</svg>
	);
}

export default SvgPersonBadge;
