import React from 'react';

export default function Collapse(args?: any) {
	return (
		<>
			{args.params.collapse &&
				(<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 7L8 2L15 7" stroke="#BC333A" stroke-width="2" />
				</svg>)
			}
			{!args.params.collapse &&
				(<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L8 6L15 0.999999" stroke="#BC333A" stroke-width="2" />
				</svg>)
			}
		</>

	);
}
