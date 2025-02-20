import { Icon, PillText } from '@app/components';
import { InfoText } from '@app/components/order-card/order-card-components';
import { useLocation } from '@app/utils';
import React from 'react';
import { useHistory } from 'react-router';
import {
	AuthenticationBlock,
	CardInfo,
	Label,
	Name,
	OrderCardContainer,
	OrderInfoCard,
	OtherInfo,
	SessionCode,
} from './common-components';

type Props = {
	cardIndex?: string;
	data?: any;
	tab?: string;
};
export default function OrderCard({ cardIndex = '0', data, tab }: Props) {
	const [isExpand, setIsExpand] = React.useState(false);
	const [expandCard, updateExpandCard] = React.useState('');
	const history = useHistory();
	//console.log(tab);

	function onClick(index: any) {
		if (data.status && data.status.toLowerCase() !== 'cancelled') {
			updateExpandCard(index);
			setIsExpand(!isExpand);
		} else {
			navigateTo()
		}
	}
	function navigateTo() {
		//console.log(tab);
		// http://localhost:3000/drlconsumerapp/order/maporderdetails/SVORDMDC-41f55dca-d063-419c-8391-01e9cfb9a1b7
		if (tab === 'medication') {
			history.push({
				pathname: `/order/maporderdetails/${data.orderId}`,
				// state: { selectedTab: tab },
			});
		} else {
			history.push({
				pathname: `/orders/${data.orderId}`,
				state: { selectedTab: tab },
			});
		}

	}
	return (
		<OrderCardContainer
			onClick={navigateTo}>
			<OrderInfoCard>
				<CardInfo>
					<Name>{data.labName ? data.labName : data.storeName ? data.storeName : ''}</Name>
					<Label>Order ID: {data.svaasOrderId ? data.svaasOrderId : data.svassOrderId ?data.svassOrderId :  data.orderId}</Label>
				</CardInfo>
				{data.status ? <PillText variant={data.status} className="m-0">{data.status}</PillText> : ''}
			</OrderInfoCard>
			{
			!data.status.toLowerCase().includes('completed') && 
			!data.status.toLowerCase().includes('cancelled') && 
			<OtherInfo>
				<div>
					<AuthenticationBlock>
						<p>Authentication Code{' '}</p>
						<SessionCode className={data.authCode && !data.status.toLowerCase().includes('completed') &&!data.status.toLowerCase().includes('cancelled')  ? '' : 'c-gray'}>{!data.status.toLowerCase().includes('cancelled') &&  !data.status.toLowerCase().includes('completed') ? data.authCode || '' : ''}</SessionCode>
					</AuthenticationBlock>
					{tab === 'lab' &&!data.status.toLowerCase().includes('completed') &&!data.status.toLowerCase().includes('cancelled') && <InfoText>
						<Icon name='info' />
						{data.authCode ? data.labOrderType && (data.labOrderType.toUpperCase().includes('AT_LAB')) ? 'Please share the Authentication code with the Lab Officer to start the test.'
							: 'Please share the Authentication code with the Phlebo to start the sample collection.' : (((data.paymentStatus != null && data.paymentStatus.toLowerCase() == "required") || (data.paymentStatus != null && data.paymentStatus.toLowerCase() == "pending"))) ? 'To be shared once the payment is successfully complete.' :
							'To be shared once the order has been confirmed.'}
					</InfoText>}
					{tab === 'medication' &&!data.status.toLowerCase().includes('completed') &&!data.status.toLowerCase().includes('cancelled') &&<InfoText>
						<Icon name='info' />
						{data.authCode ? data.labOrderType && (data.labOrderType.toUpperCase().includes('AT_LAB')) ? 'Please share your Authentication Code to the pharmacist at the store..'
							: 'Please share your Authentication Code to the pharmacist at the store..' : (((data.paymentStatus != null && data.paymentStatus.toLowerCase() == "required") || (data.paymentStatus != null && data.paymentStatus.toLowerCase() == "pending"))) ? 'To be shared once the payment is successfully complete.' :
							'To be shared once the order has been confirmed.'}
					</InfoText>}
					{/* <Label>Share authentication code with Delivery Agent.</Label> */}
				</div>
			</OtherInfo>}
		</OrderCardContainer>
	);
}
