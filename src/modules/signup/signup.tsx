import { Button, Icon } from '@app/components';
import { useLocation as UtilLocation } from '@app/utils';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Registration from './registration';
import {
	BgCircle,
	Container,
	InnerContainer,
	LogoContainer,
	Text,
} from './signup-components';
import logo from '../../assets/images/ABC_logo.jpg';


export default function Signup() {
	const { navigate } = UtilLocation();
	const { state }: any = useLocation();
	const history = useHistory();
	// useEffect(() => {
	// 	localStorage.clear();
	// }, [])
	return (
		<>

			{state && state.showRegistration ? (
				<Registration />
			) : (
				<Container>
					<InnerContainer>
						{/* <img src={logo} alt='' style={{ margin: '0 0 20px' }} /> */}

						<LogoContainer isLogo style={{ width: '100px' }}>
							{/* <Icon name='logo' /> */}
							<img src={logo} alt='' style={{ margin: '0 0 20px', width: '100%' }} />
						</LogoContainer>
						{/* <LogoContainer>
							<Icon name='logo' />
						</LogoContainer> */}
						<BgCircle />
						<Icon name='WelcomeIcon' />
						<Button
							onClick={() =>
								history.push({
									pathname: '/signup',
									state: { showRegistration: true },
								})
							}>
							Sign Up
						</Button>
					</InnerContainer>
					<Text>Already have an account?</Text>
					<Button size='small' width='120px' onClick={() => navigate('/login')}>
						Login Now
					</Button>
				</Container>
			)}
		</>
	);
}
