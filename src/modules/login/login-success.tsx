import React from 'react';
import {
	BgCircle,
	Container,
	InnerContainer,
	LogoContainer,
	Text,
} from './login-success-components';
import { Icon } from '@app/components';

export default function LoginSuccess() {
	return (
		<>
			<Container>
				<InnerContainer>
					<BgCircle />
					<Icon name='loginSuccess' />
					<Text>
						PLEASE WAIT...
						<p>We are fetching your data and it may take a few minutes.</p>
					</Text>
				</InnerContainer>
				<Icon name='loading' />
			</Container>
		</>
	);
}
