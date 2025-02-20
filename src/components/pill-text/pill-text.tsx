import React from 'react';
import { Container, Text } from './pill-text-components';

type Props = {
	children: any;
	className?: any;
	variant?:
	| 'primary'
	| 'PENDING'
	| 'ACCEPTED'
	| 'REJECTED'
	| 'COMPLETED'
	| 'CANCELLED'
	| 'IN_PROGRESS'
	| 'ACTIVE'
	| 'defaultAccepted';
};
export default function PillText({ children, variant, className }: Props) {
	let status = variant?.toUpperCase();

	return (
		<Container variant={status} className={className}>
			<Text>{children}</Text>
		</Container>
	);
}
