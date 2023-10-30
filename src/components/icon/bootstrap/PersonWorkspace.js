import * as React from 'react';

function SvgPersonWorkspace(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4zm4-5.95a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' />
			<path d='M2 1a2 2 0 00-2 2v9.5A1.5 1.5 0 001.5 14h.653a5.373 5.373 0 011.066-2H1V3a1 1 0 011-1h12a1 1 0 011 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 001.5-1.5V3a2 2 0 00-2-2H2z' />
		</svg>
	);
}

export default SvgPersonWorkspace;
