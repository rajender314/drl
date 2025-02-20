import { useLocation } from '@app/utils';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { Icon } from '..';
import {
	Action,
	CardContainer,
	Details,
	IconsContainer,
	Image,
	InfoText,
	Label,
	OrderDetailsWrapper,
	OrderInfoContainer,
	PrescriptionContainer,
	SessionCode,
	Title,
	Text
} from './order-card-components';

type Props = {
	data: any;
};
export default function OrderCard({ data }: Props) {
	const history = useHistory();
	const [isExpand, setIsExpand] = React.useState(false);
	const { navigate } = useLocation();

	function getSlotData() {
		const { date, slot } = data.slotDetail;
		let todayDate = moment(new Date(), 'DD-MM-YYYY').toDate();
		const IsoDateTo = moment(date, 'DD-MM-YYYY').toDate();
		const IsoTimeTo = slot.startTime ? moment(slot.startTime, ['hh:mm:ss A']).format('hh:mm A') : '';
		if (todayDate === IsoDateTo) {
			return `Today, ${moment(IsoDateTo).format('DD MMM YYYY')} ${IsoTimeTo ? '-' : ''} ${IsoTimeTo}`;
		}
		return `${moment(IsoDateTo).format('DD MMM YYYY')} ${IsoTimeTo ? '-' : ''} ${IsoTimeTo} `;
	}
	function getUserName() {
		let user: any = sessionStorage.getItem('user') || localStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			return `${user.firstName}`;
		}
		return '';
	}

	function openMaps(event: any) {
		event.stopPropagation();
		let coordinates = `${data.labDetail.address.location.latitude},${data.labDetail.address.location.longitude}`;
		let url = `https://www.google.com.sa/maps/search/${coordinates}?hl=en`;
		window.open(url, '_blank');
	}
	function openInvoice() {
		const invoiceData = {
			amountBreakdown: data.amountBreakdown,
			labDetail: data.labDetail,
			address: data.address,
			slotDetail: data.slotDetail,
			labOrderType: data.labOrderType,
			orderStatus: data.orderStatus,
			paymentStatus: data.paymentStatus,
			invoiceUrl: data.invoiceURL,
			patientName: data.patientName,
			labItems: data.labItems,
			orderTransactionId: data.svaasOrderId,
			refundStatus:data.refundStatus,
			refundAmount:data.refundAmount		};
		history.push({
			pathname: `/order-invoice/${data.orderId}`,
			state: {
				invoiceDetails: invoiceData,
			},
		});
	}
	return (
		<CardContainer>
			<Image />
			<OrderInfoContainer>
				<OrderDetailsWrapper>
					<Icon name='location' />
					<Details>
						<Title>{data.labDetail.name}</Title>
						{data['labOrderType'] == 'LAB_VISIT' &&
							<>
								<InfoText className="address" style={{ margin: '0' }}>
									{`${data.labDetail.address.streetAddress}, ${data.labDetail.address.area ? data.labDetail.address.area : ''}, ${data.labDetail.address.city}`}
								</InfoText>
								<InfoText className="address" style={{ margin: '0 0 8px' }}>
									{`${data.labDetail.address.state}, ${data.labDetail.address.pin}`}
								</InfoText>
							</>
						}
						<Text style={{marginBottom :'5px'}}>{getSlotData()}</Text>
						<Text className="bold">Order ID: <span>{data.svaasOrderId}</span></Text>
						{(data.orderStatus != 'cancelled' &&
							data.orderStatus != 'Order cancelled' &&
							data.orderStatus.toLowerCase().indexOf('cancelled') < 0) && 
							
							!data.orderStatus.toLowerCase().includes('completed') &&
							!data.orderStatus.toLowerCase().includes('rejected') &&
							!data.orderStatus.toLowerCase().includes('declined') &&
							!data.orderStatus.toLowerCase().includes('closed') &&
							(
								<>
									<Label className="a-code">Authentication Code</Label>
									<SessionCode className={data.authCode&& !data.orderStatus.toLowerCase().includes('completed')  && !data.orderStatus.toLowerCase().includes('closed')? '' : 'c-gray'}>{data.authCode ? data.authCode : ''}</SessionCode>
								{!data.orderStatus.toLowerCase().includes('closed') &&!data.orderStatus.toLowerCase().includes('completed') &&	<InfoText>
										<Icon name='info' />
										{data.authCode ? data.labOrderType.toLowerCase().indexOf('lab_visit') > -1 ? 'Please share the Authentication code with the Lab Officer to start the test.'
											: 'Please share the Authentication code with the Phlebo to start the sample collection.' : (((data.paymentStatus != null && data.paymentStatus.toLowerCase() == "required") || (data.paymentStatus != null && data.paymentStatus.toLowerCase() == "pending"))) ? 'To be shared once the payment is successfully completed.' :
											'To be shared once the order has been confirmed.'}
									</InfoText>}
								</>
							)}
					</Details>
				</OrderDetailsWrapper>
			</OrderInfoContainer>
			<PrescriptionContainer>
				<IconsContainer>
					<Action disabled={!data.invoiceURL} onClick={openInvoice}>
						<Icon name='rupee' />
						<p>Invoice Details</p>
					</Action>
					{/* {data['labOrderType'] == 'LAB_VISIT' && <Seperator />} */}
					{data['labOrderType'] == 'LAB_VISIT' && <Action isPrescriptionIcon onClick={(e) => openMaps(e)}>
						<Icon name='location' />
						<p>View Map</p>
					</Action>}
				</IconsContainer>
			</PrescriptionContainer>
		</CardContainer>
	);
}
