
import { Button, Icon } from '@app/components';
import { useLocation } from '@app/utils';
import React from 'react';
import { useParams } from "react-router-dom";
import {
	Container,
	TopSection,
	IconContainer,
	SuccessIcon,
	Title,
	SubTitle,
	MiddleSection,
	Label,
	AuthCode,
	SubText,
	BottomSection

} from './payment-components';


export default function PaymentSuccess() {
	const { navigate } = useLocation();

	const { orderAuth, appointmentAuth, id } = useParams<any>()
	const gotoDetails = () => {
		if (orderAuth) {
			navigate(`/orders/${id}`)
		} else if (appointmentAuth) {
			navigate(`/files/appointments/${id}`)
		}
	}
	return (
		<Container>
			<TopSection>
				<IconContainer>
					<SuccessIcon><Icon name="tick" /></SuccessIcon>
				</IconContainer>
				<Title>Payment Successful</Title>
				<SubTitle>Confirmation code for the {orderAuth ? 'order' : 'appointment'} request has been sent to your WhatsApp
				</SubTitle>
			</TopSection>
			<MiddleSection>
				<Label>Authentication Code</Label>
				<AuthCode>{appointmentAuth ? appointmentAuth : orderAuth ? orderAuth : null}</AuthCode>
				<SubText>Please use this code to start your {orderAuth ? 'test' : 'consultation'}</SubText>
			</MiddleSection>
			<BottomSection>
				<Button onClick={() => gotoDetails()} width={'150px'} variant='secondary'>Done</Button>
			</BottomSection>

		</Container>
	);
}
