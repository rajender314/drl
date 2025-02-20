import React, { useState } from 'react';
import {
	Container,
	Header,
	TitleContainer,
	Body,
	Label,
	CodeText,
	Content,
	Status,
	TitleText,
	InfoContent,
	InfoText,
	InlineButtonContainer,
	ButtonContainer,
	ButtonText,
	ErxIcon,
	Anchor,
} from './clinic-visit-components';
import { Spinner } from '@app/components/icon/icons';
import { isMobile } from 'react-device-detect';
import { Icon, Button, PillText } from '@app/components';
import { useLocation } from '@app/utils';
import moment from 'moment';
import {
	getPaymentLinkApi,
	appointmentDetails,
	getPaymentStatusApi,

} from '@app/@services';
import { SessionCode, SessionInfoContainer } from '../appointment-card/appointment-card-components';
import { useHistory } from 'react-router';
import {openLink } from '@app/utils'

type Props = {
	appointmentData: any;
};
/* 
CONFIRMED("confirmed"),    
CANCELLED("cancelled"),    
BOOKED("booked"),    
CONFIRMATION_PENDING("Confirmation Pending"),    
DECLINED("declined"),    
RE_SCHEDULED("re-scheduled"),    
//PENDING_FOR_APPROVAL("Pending for Approval"),    
COMPLETED("completed"),    
ACCEPTED("accepted"),    
IN_PROGRESS("in progress"),    
NO_SHOW("no_show"),    
MISSED("missed"); 
*/
export default function ClinicVisit({ appointmentData }: Props) {
	const { navigate } = useLocation();
	const [payDetails, setPayDetails] = useState<any>({});
	const [spinner, setSpinner] = useState(true);
	const [validMin, setValidMin] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [linkId, setLinkId] = useState(0);
	const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
	const [showButtons, setShowButtons] = React.useState(false);

	const callCoach = (data: any) => {
		//isMobile
		if (isMobile) {
			//console.log(data)
		}
	};
// const openLink =(link: any)=>{
// 	// window.open(link, '_blank');
// 	// directDownload(link,'invoice.pdf');
// }
	React.useEffect(() => {

		const interval = setInterval(() => {
			checkPaymentStatus(linkId);
		}, 3000);
		return () => clearInterval(interval);
	}, [linkId, isPaymentEnabled]);
	React.useEffect(() => {

		getPaymentInfo();
	}, []);
	React.useEffect(() => {
		if (
			!appointmentData ||
			!appointmentData.slot ||
			!appointmentData.slot.date
		) {
			return;
		}
		const interval = setInterval(() => {
			try {
				var dateOfAppointment = moment(appointmentData.slot.date, 'DD/MM/YYYY');

				let timeSlot = appointmentData.slot.slot.startTime.split(':');
				let validTime = moment(dateOfAppointment).add(timeSlot[0], 'hours');
				validTime = moment(validTime).add(timeSlot[1], 'minutes');
				//console.log(validTime.diff(moment(), 'minutes'))
				// console.log(appointmentData.slot.slot.startTime, 'days')

				if (validTime.diff(moment(), 'minutes') <= appointmentData.rescheduleCancelRuleSetInMin) {
					setValidMin(false);
				} else {
					setValidMin(true);
				}
				/*
				var today = moment();
				var timeOfAppointment = moment(
					appointmentData.slot.slot.startTime,
					'hh:mm:ss'
				);
				var now = moment();
				 let difDay = dateOfAppointment.diff(today, 'days');
				let difTime = timeOfAppointment.diff(now, 'minutes');
				if (difDay < 1 && difTime <= 30) {
					console.log('difDay,difTime', 'disabled')
					setValidMin(false);
				} else {
					console.log('difDay,difTime', 'enabled')
					setValidMin(true);
				} */
				setShowButtons(true);
			} catch (er) {

			}

		}, 1000);
		return () => clearInterval(interval);

	}, [appointmentData]);

	React.useEffect(() => {

	}, [spinner]);


	const getPaymentInfo = async () => {
		if (
			appointmentData &&
			(appointmentData.status === 'CONFIRMED' ||
				appointmentData.status === 'ACCEPTED') &&
			!appointmentData.isPaymentDone &&
			appointmentData.costBreakdown &&
			appointmentData.costBreakdown.costToYou > 0
		) {
			getPaymentLink();
		} else {
			setSpinner(false);
		}
	};
	const getPaymentLink = async () => {
		//let id = appointmentData.id;
		// let id = 'SVORDAPT-d2914f98-d880-415c-b3d4-bba7eb0ad030'
		await getPaymentLinkApi(appointmentData.transactiondId)
			.then((res: any) => {
				if (res.data.isActive) {
					getPaymentStatus(res.data);
				} else {
					setSpinner(false);
				}
			})
			.finally(() => { });
	};
	const getPaymentStatus = async (payData: any) => {
		await getPaymentStatusApi(payData.linkId)
			.then((res: any) => {
				if (
					res.data.txnStatus &&
					res.data.txnStatus === 'Txn Unsuccessful' &&
					payData.isActive &&
					payData.amount > 0
				) {
					setPayDetails(payData);
					setLinkId(payData.linkId);
				}
			})
			.finally(() => {
				setSpinner(false);
			});
	};
	const getAppointmentData = async () => {
		await appointmentDetails(appointmentData.id).then((res) => {
			if (res.data.authCode) {
				navigate(`/files/paymentSuccess/${res.data.authCode}/${appointmentData.id}`);
			}
		})
	}
	const checkPaymentStatus = async (id: any) => {
		if (!linkId || !isPaymentEnabled) {
			return;
		}
		await getPaymentStatusApi(id)
			.then((res: any) => {
				if (res.data.txnStatus && res.data.txnStatus === 'SUCCESS') {
					setPaymentSuccess(true);
					setIsPaymentEnabled(false);
					if (appointmentData.authCode) {
						navigate(`/files/paymentSuccess/${appointmentData.authCode}/${appointmentData.id}`);
					} else {
						getAppointmentData()
					}
				}
			})
			.finally(() => {
				setSpinner(false);
			});
	};

	const makePayment = () => {
		setIsPaymentEnabled(true);
		window.open(payDetails.url);
	};
	const history = useHistory();

	const gotoInvoice = (data: any) => {
		// if (data.erxGenerated) {
		history.push({
			pathname: `/files/appointments/${data.id}/invoice`,
			state: {
				invoiceDetails: data,
			},
		});
		// navigate(`/files/appointments/${data.id}/invoice`);
		// }clini

	};
	const gotoPrescription = (data: any) => {
		if (data.erxGenerated) {
			navigate(`/files/prescription/${data.prescriptionId}`);
		}
	};
	if (spinner) {
		return <Spinner size='3px' />;
	}
	return (
		<Container>
			<Content>
				<Header>
					<TitleContainer>
						<Icon
							name={
								appointmentData.appointmentType === 'InPerson' ||
									appointmentData.appointmentType === 'IN_PERSON'
									? `stethoscope`
									: appointmentData.appointmentType === 'VIDEO'
										? `video`
										: 'questionmark'
							}
						/>
						<TitleText>
							{appointmentData.appointmentType === 'InPerson' ||
								appointmentData.appointmentType === 'IN_PERSON'
								? 'Clinic Visit'
								: appointmentData.appointmentType === 'VIDEO'
									? 'Video Consultation'
									: ``}
						</TitleText>					
					</TitleContainer>					
					<Status className="withLabel">
						<Label className="label">Appointment Status</Label>
						<PillText variant={appointmentData.status}>
							{appointmentData && appointmentData.status === 'IN_PROGRESS'
								? 'In Progress'
								: appointmentData.status === 'REJECTED'
									? 'DECLINED'
									: appointmentData.status === 'ACCEPTED'
										? 'CONFIRMED'
										: appointmentData.status}
						</PillText>
					</Status>
				</Header>
				<Body>
					{appointmentData &&
						(appointmentData.status === 'CONFIRMED' ||
							appointmentData.status === 'ACCEPTED') &&
						(appointmentData.isPaymentDone || (appointmentData.costBreakdown && appointmentData.costBreakdown.costToYou == 0)) ? (
						<>
							<SessionInfoContainer className="m-0 p-0">
								<div style={
									appointmentData.webLink
										? { width: 'calc(100% - 120px)' }
										: { width: '100%' }
								}>
									<Label>Authentication Code</Label>
									<CodeText className={appointmentData.authCode && !appointmentData.status.toLowerCase().includes('closed') ? '' : 'c-gray'} status={appointmentData.status}>
										{appointmentData && appointmentData.authCode ? appointmentData.authCode : ''}
									</CodeText>
								</div>
								{/* {appointmentData.status !== 'CANCELLED'
									&& appointmentData.status !== 'REJECTED'
									&& appointmentData.status !== 'DECLINED' &&
									appointmentData.status !== 'COMPLETED' &&appointmentData.status !== 'IN_PROGRESS' &&
									appointmentData.appointmentType != 'InPerson' &&
								appointmentData.appointmentType !== 'IN_PERSON'
									&& appointmentData.webLink ? (
									<Button
										variant={
											appointmentData.authCode ? 'primary' : 'disabled'
										}
										size='large'
										width='120px'
									>
										<Anchor
											target='_blank'
											href={appointmentData.webLink}
											onClick={(e: any) => {
												e.stopPropagation();
											}}>
											Join
										</Anchor>
									</Button>
								) : appointmentData.isPaymentDone} */}
							</SessionInfoContainer>
							<InfoContent>
								<Icon name='info' />
								<InfoText>
									Share authentication code to start consultation
								</InfoText>
							</InfoContent>
						</>
					) : appointmentData &&
						(appointmentData.status === 'CONFIRMED' ||
							appointmentData.status === 'ACCEPTED') &&
						(!appointmentData.isPaymentDone && (appointmentData.costBreakdown && appointmentData.costBreakdown.costToYou > 0)) ? (
						<>
							<Label>Authentication Code</Label>
							<CodeText className={appointmentData.authCode && !appointmentData.status.toLowerCase().includes('closed') ? '' : 'c-gray'} status={appointmentData.status}>
								{appointmentData && appointmentData.authCode ? appointmentData.authCode : ''}
							</CodeText>
							<InfoContent>
								<Icon name='info' />
								<InfoText>
									To be shared once payment is successfully completed
								</InfoText>
							</InfoContent>
						</>
					) : appointmentData && appointmentData.status === 'PENDINGS' ? (
						<>
							<Label>Authentication Code</Label>
							<CodeText className={appointmentData.authCode ? '' : 'c-gray'} status={appointmentData.status}>
								{appointmentData && appointmentData.authCode ? appointmentData.authCode : ''}
							</CodeText>
							<InfoContent>
								<Icon name='info' />
								<InfoText>
									{' '}
									To be shared once doctor confirms the appointment
								</InfoText>
							</InfoContent>
							
						</>
					) : appointmentData && appointmentData.status === 'IN_PROGRESSS' ? (
						<>
							<Label>Authentication Code</Label>
							<SessionCode className={'c-gray'} status={appointmentData.status}>
								{appointmentData.authCode}
							</SessionCode>
							<InfoContent style={{ margin: 0 }}>
								<Icon name='info' />
								<InfoText>
									{' '}
									Authentication code is valid till the appointment is completed
								</InfoText>
							</InfoContent>
						</>
					) : null}

					<ButtonContainer disabled={!isMobile}>
						{!appointmentData.status.toLowerCase().includes('declined') && !appointmentData.status.toLowerCase().includes('cancelled') && appointmentData.paymentStatus && <Button variant='warm'>
							<ButtonText> Payment Status</ButtonText>Payment {appointmentData.paymentStatus}
						</Button>}
						{appointmentData.refundStatus && (appointmentData.refundStatus.toUpperCase() === 'SUCCESS' || appointmentData.refundStatus.toUpperCase() === 'TXN_SUCCESS') && <Button variant='warm'>
							<ButtonText> Refund Status</ButtonText>Refund {appointmentData.refundStatus.toUpperCase() === 'SUCCESS' ? 'Initiated' : appointmentData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ? 'Initiated' : appointmentData.refundStatus.toLowerCase().replace(/_/g, ' ')}
						</Button>}

						{appointmentData &&
							(appointmentData.status === 'CONFIRMED' ||
								appointmentData.status === 'ACCEPTED') &&
							payDetails &&
							payDetails.isActive ? (
							<>
								{/* <Button variant='warm'>
									<ButtonText> Payment Status</ButtonText>Awaiting Payment
								</Button> */}
								<Button variant='primary' onClick={() => makePayment()}>
									Make Payment
								</Button>
							</>
						) : appointmentData && appointmentData.status === 'UNCONFIRMED' ? (
							<>
								{/* <Button variant='warm'>
									<ButtonText> Payment Status</ButtonText>On Hold
								</Button>
								<Button variant='disabled'>Payment On Hold</Button> */}
							</>
						) : null}
							
						{appointmentData && showButtons ? (
							<>
						
								{appointmentData.status !== 'CANCELLED'
									&& appointmentData.status !== 'REJECTED'
									&& appointmentData.status !== 'DECLINED' &&
									appointmentData.status !== 'COMPLETED'&& !appointmentData.status.toLowerCase().includes('closed') && appointmentData.status !== 'IN_PROGRESS' &&
									appointmentData.appointmentType != 'InPerson' &&
									appointmentData.appointmentType !== 'IN_PERSON'
									&& appointmentData.webLink ? (
									<Button
										variant={
											appointmentData.authCode ? 'primary' : 'disabled'
										}
										size='large'
										onClick={(e)=>{if(appointmentData.authCode){openLink(appointmentData.webLink)}}}
									>
										<Anchor
											target='_blank'
											href={appointmentData.webLink}
											onClick={(e: any) => {
												e.stopPropagation();
											}}>
											Join
										</Anchor>
									</Button>
								) : appointmentData.isPaymentDone && appointmentData.appointmentType === "VIDEO" && !appointmentData.isWebLinkConfigured ? (
									<Button
										variant={'disabled'}
										size='large'
									>
										<Anchor
											onClick={(e: any) => {
												e.stopPropagation();
											}}>
											Join
										</Anchor>
									</Button>
								) : null}
								{appointmentData &&
									(appointmentData.status === 'CONFIRMED ' ||
										appointmentData.status === 'ACCEPTED' ||
										appointmentData.status === 'PENDING') &&
									!appointmentData.isWebLinkConfigured &&
									validMin ? (
									<>
										{/* <Button
									onClick={() =>
										navigate(`/files/appointments/${appointmentData.id}/reschedule`)
									}
									variant='secondary'>
									Reschedule
								</Button> */}
										<Button
											onClick={() =>
												navigate(`/files/appointments/${appointmentData.id}/cancel`)
											}
											variant='warm'>
											Cancel Appointment
								</Button>
									</>
								) : null}


								<Button
									variant={isMobile ? 'primary' : 'disabled'}
								// onClick={() => callCoach(appointmentData)}
								>
									<Icon name='caller' />
									<Anchor
										href={`tel:${appointmentData.hcDetail.hcPhoneNumber ? appointmentData.hcDetail.hcPhoneNumber : appointmentData.hcDetail.patientPhoneNumber}`}>
										Call Health Coach
									</Anchor>

								</Button>
							</>
						) : null}
						{appointmentData &&

							showButtons ? (
							<>
								<InlineButtonContainer>
									{appointmentData.status === 'COMPLETED' && <Button
										width='45%'
										size='medium'
										variant={
											appointmentData.erxGenerated ? 'secondary' : 'disabled'
										}
										onClick={() => gotoPrescription(appointmentData)}>
										<ErxIcon>
											<Icon name='prescription' />
										</ErxIcon>
										View eRx
									</Button>}
									<Button
										width={appointmentData.status === 'COMPLETED' ? '45%' : '100%'}
										onClick={() => gotoInvoice(appointmentData)}
										size='medium'
										variant="primary">
										View Invoice
									</Button>
								</InlineButtonContainer>
							</>
						) : null}
					</ButtonContainer>
				</Body>
			</Content>
		</Container>
	);
}
