import React, { useEffect, useState } from 'react';
import { Button, Dialog, Header, Icon } from '@app/components';
import moment from 'moment';
import {
	Container,
	InnerTitle,
	Title,
	DetailsContainer,
	ButtonContainer,
	Address,
	TimeInfo,
	InfoDate,
	TimeSlot,
	BillingDetails,
	PriceDetails,
	Pricekey,
	Price,
	AvailableBalance,
	PriceRemain,
	Label,
	InfoText,
	TitleContainer,
	Value,
	AccountDetails,
	NoDataMessage,
	Section,
	SectionHeader,
	FlexWrapper,
	Text,
	DetailsWrapper,
	PriceWrapper,
	InfoWrapper
} from './invoice-components';
import { useHistory, useParams } from "react-router-dom";
import { appointmentDetails, getInvoice } from '@app/@services'
import { directDownload, downloadPDF } from '@app/utils'
import { StatusText } from '@app/modules/order-details/order-details-components';
import { Specialization } from '@app/components/appointment-card/appointment-card-components';
import { getUserAddressess } from '@app/@services/user/user';
import { Spinner } from '@app/components/icon/icons';
import { SuccessContainer, SuccessTitle, SuccessSubTitle } from '@app/modules/cancel-appointment/cancel-components';
import { primaryRed } from '@app/styles';
/* const invData = {
	"invoiceNo": "SV-device1004346-0135",
	"invoiceType": "DOCTOR_CONSULTATION_INVOICE",
	"invoiceFileName": "https://svaasstorageaccount.blob.core.windows.net/icicicontainer/doctor-invoice-1621504772602-1243152990976001299.pdf",
	"hplxDoctorId": "device1004346",
	"isSentToInsurance": false,
	"sentToInsuranceTimestamp": null,
	"invoiceData": {
		"place_of_supply": "Hyderabad",
		"appointment_date": "14/10/2020",
		"paid_by_insurance": "100",
		"catalogue_fees": "null",
		"invoice_date": "14/10/2020",
		"svaas_appointment_id": "null",
		"paid_by_patient": "200",
		"appointment_type": "InPerson",
		"patient_name": "Raj Das",
		"doctor_name": "Test Doctor",
		"invoice_number": "SV-device1004346-0135",
		"date_of_order": "29/08/2021",
		"patient_phone_number": "null",
		"doctor_address": "Test Address",
		"payor_address": "Abcd 123",
		"total_amount": "2000",
		"payor_name": "Aditya Birla",
		"invoice_generation_date": "14/10/2020",
		"qty": "1",
		"amount_chargeable": "One Thousand Only",
		"state_code": "WB"
	}
} */
export function AppointmentInvoice() {
	const history = useHistory();
	const { location } = history;
	const { state }: any = location;
	const { invoiceDetails } = state || { invoiceDetails: null };
	const [invoiceData, setInvoiceData] = useState<any>();
	const [invData, setInvData] = useState<any>({})
	const [showInfoWindow, setShowInfoWindow] = useState(false);
	const [homeAddress, setHomeAddress] = useState<any>({});
	const { appointmentId } = useParams<any>();
	const [userDtl, setUsetDtl] = useState<any>();
	const [updateData, setUpdateData] = useState(false);
	let user: any = sessionStorage.getItem('user') || localStorage.getItem('user');
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	useEffect(() => {
		//console.log(invoiceDetails);
		if (!invoiceDetails) {
			getDetails();
		} else {
			getInvoiceData();
			// setUpdateData(true);
		}
		if (user) {
			setUsetDtl(JSON.parse(user));
		}
		getDetails();

		getUserAddress();
		// getInvoiceData();
	}, [])
	async function getUserAddress() {
		await getUserAddressess().then((res: any) => {
			if (res.status && res.status == 200 && res.data.length) {
				//console.log(res);
				let addresses = res.data;
				// setHome(
				let homeAdd = (addresses.filter(
					(addr: any) => addr.isPrimary
				))
				setHomeAddress(homeAdd.length ? homeAdd[0] : addresses.length ? addresses[0] : {})
				// )
			}
		})
	}
	async function getDetails() {

		await appointmentDetails(appointmentId).then((res: any) => {
			//console.log(res);
			if (res.status === 200) {
				let data = res.data;
				//console.log(data);
				if (data.appointmentId) {
					const invoiceData = {
						status: data.status,
						svaasAppointmentId: data.svaasAppointmentId,
						appointmentType: data.appointmentType,
						doctorDetails: data.doctorDetails,
						slot: data.slot,
						paymentStatus: data.paymentStatus,
						costBreakdown: data.costBreakdown,
						refundStatus : data.refundStatus,
						refundAmount: data.refundAmount,
						userDetails:data.userDetails
					};
					setInvoiceData(invoiceData);
					getInvoiceData();
				}
			}
		})

	}
	function getSlotData() {
		if (invoiceData && invoiceData.slot) {
			const { date, slot } = invoiceData.slot;
			let todayDate = moment(new Date(), 'DD-MM-YYYY').toDate();
			const IsoDateTo = moment(date, 'MMMM DD-MM-YYYY').toDate();
			const IsoTimeTo = moment(slot.startTime, ['hh:mm:ss A']).format('hh:mm A');
			const IsoTimeEnd = moment(slot.endTime, ['hh:mm:ss A']).format('hh:mm A');
			if (todayDate === IsoDateTo) {
				return `Today, ${moment(IsoDateTo).format('dddd, DD MMM YYYY')} - ${IsoTimeEnd}`;
			}
			return `${moment(IsoDateTo).format('dddd, DD MMM YYYY')} ${IsoTimeTo}- ${IsoTimeEnd} `;
		} else {
			return ''
		}

	}
	const getInvoiceData = async () => {
		//console.log('getInvoice', appointmentId)
		await getInvoice(appointmentId, 'DOCTOR').then((res: any) => {
			if (res.status === 200) {
				setInvData(res.data)
			}
		}).finally(() => {
			if (invoiceDetails) {
				// setInvoiceData(invoiceDetails);
			}
			setUpdateData(true);
			// setLoading(false);
		});
	}

	const getDate = (date: any) => {
		const IsoDateTo = moment(date, 'DD-MM-YYYY').toDate();
		return moment(IsoDateTo).format('ddd, DD MMM YYYY')
	}
	const downloadPDFApi = (url: string, filename: string) => {
		directDownload(url,'invoice.pdf');
		setTimeout(() => {
			setIsDialogOpen(true);
		}, 1000);
		// downloadPDF(url, filename).then((res) => {
		// 	console.log(res)
		// })
	}
	const getSpecialization = (name: any) => {
		if (name.includes(',')) {
			name = name.split(',');
			return name[0]
		} else {
			return name
		}
	}
	const invoiceRender = () => {
		return (
			invoiceData ?
				<>
				{
				isDialogOpen ? (
					<Dialog classN="c-dialog" fullScreen={false} title={''}>
						<Dialog.Body style={{ background: primaryRed }}>
							<SuccessContainer>
								{/* <SuccessTick><Icon name='tick' /></SuccessTick> */}
								<SuccessTitle><Icon name='successTick' /></SuccessTitle>
								{/* <SuccessSubTitle></SuccessSubTitle> */}
							</SuccessContainer>
						</Dialog.Body>
						<Dialog.Footer>
							<SuccessSubTitle style={{ justifyContent: "center" }}>Invoice Successfully Downloaded</SuccessSubTitle>
							<Button variant="primary" onClick={() => setIsDialogOpen(false)}>Ok</Button>
						</Dialog.Footer>
					</Dialog>
				) : null
			}
					<DetailsWrapper>
						{updateData &&
							<DetailsContainer>
								<Section>
									<SectionHeader>Appointment Status</SectionHeader>
									{invoiceData.status &&
										<StatusText className="mb-16" style={{ height: '50px' }}>
											<span>{invoiceData.status ? invoiceData.status.replace(/_/g, ' ') : ''}</span>
										</StatusText>
									}
									<FlexWrapper className="space-between">
										<Label>Appointment ID</Label>
										<Text>{invoiceData.svaasAppointmentId}</Text>
									</FlexWrapper>
									<FlexWrapper className="space-between">
										<Label>Consultation Type</Label>
										<Text>{invoiceData.appointmentType && invoiceData.appointmentType === "IN_PERSON" ? "In Clinic" : "Video"}</Text>
									</FlexWrapper>
									{invData && invData.invoiceNo ? (
										<FlexWrapper className="space-between">
											<Label>Invoice Number</Label>
											<Text>{invData.invoiceNo}</Text>
										</FlexWrapper>
									) : ''}
								</Section>
							</DetailsContainer>
						}

						{updateData &&
							<DetailsContainer>

								<Section className="mb-32">
									<SectionHeader>Doctor Details</SectionHeader>
									<FlexWrapper className="space-between" style={{ alignItems: 'flex-start' }}>
										<Label>Doctor ID</Label>
										<Text className="lh">{invoiceData.doctorDetails ? invoiceData.doctorDetails.svaasDoctorId : '--'}</Text>
									</FlexWrapper>
									<FlexWrapper className="space-between">
										<Label>Doctor Name</Label>
										{invoiceData.doctorDetails ?
											<Text>{invoiceData.doctorDetails.firstName.toLowerCase().indexOf('dr') === 0 ? '' : 'Dr'}{' '} {invoiceData.doctorDetails.firstName + ' ' + invoiceData.doctorDetails.lastName}</Text>
											: ''}
									</FlexWrapper>
									<FlexWrapper className="space-between">
										<Label>Speciality</Label>
										{invoiceData.doctorDetails ? <Text>{getSpecialization(invoiceData.doctorDetails.speciality.split(',')[0])}</Text> : ''}
									</FlexWrapper>
									<TimeInfo>
										<Icon name="dateSlot" />
										<InfoDate>
											{' '}
											{getSlotData()}
										</InfoDate>
									</TimeInfo>
								</Section>


								<BillingDetails>

									<Section className="mb-32">
										<SectionHeader>Billing Details</SectionHeader>
										{invoiceData.userDetails &&
											<FlexWrapper className="space-between">
												<Label>Patient Name</Label>
												<Text>{invoiceData.userDetails.firstName + ' ' + invoiceData.userDetails.lastName}</Text>
											</FlexWrapper>
										}
										<FlexWrapper className="space-between">
											<Label>Member ID</Label>
											<Text>{userDtl ? userDtl.insuranceId : '--'}</Text>
										</FlexWrapper>
										<Label className="mb-8">Primary Address</Label>
										{homeAddress ? (
											<Text className="alt-wt left-aligned grey-text lh">
												{`${homeAddress.streetAddress}, ${homeAddress.area}, ${homeAddress.city}`}
												<br />
												{`${homeAddress.state}, ${homeAddress.pin}`}
											</Text>
										) : ''
										}
									</Section>

									<Section>
										<SectionHeader>Payment Details</SectionHeader>
										{invoiceData.status && !invoiceData.status.toLowerCase().includes('declined')&& !invoiceData.status.toLowerCase().includes('rejected') && !invoiceData.status.toLowerCase().includes('cancelled') && invoiceData.paymentStatus &&
											<StatusText style={{ height: '50px' }}>
												Payment Status<span>Payment {invoiceData.paymentStatus}</span>
											</StatusText>
										}
										{invoiceData.refundStatus &&(invoiceData.refundStatus.toUpperCase() === 'TXN_SUCCESS' || invoiceData.refundStatus.toUpperCase() === 'SUCCESS' )&& <StatusText style={{ height: '50px', textTransform: 'capitalize' }}>
											Refund Status<span>Refund {invoiceData.refundStatus.toUpperCase() === 'SUCCESS' ? 'Intiated' : invoiceData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ? 'Intiated' : invoiceData.refundStatus.replace(/_/g, ' ')}</span>
										</StatusText>}

										<PriceWrapper>
											<p className="item-label">Payable by User</p>
											<p className="price"><span>₹</span>{invoiceData.costBreakdown ? invoiceData.costBreakdown.costToYou : ''}</p>
										</PriceWrapper>
										<PriceWrapper>
											<p className="item-label">Payable by Insurance</p>
											<p className="price"><span>₹</span>{invoiceData.costBreakdown ? invoiceData.costBreakdown.insuranceCoverageCost : ''}</p>
										</PriceWrapper>
										<PriceWrapper>
											<p className="item-label alt">Total Amount</p>
											<p className="price"><span>₹</span>{invoiceData.costBreakdown ? invoiceData.costBreakdown.totalAmount : ''}</p>
										</PriceWrapper>

										{invoiceData.paymentStatus && invoiceData.paymentStatus.toLowerCase().includes('pending') ?
											<InfoWrapper>
												<Icon name="info" />
												<p className="info">Payment of rs &#8377;{invoiceData.costBreakdown ? invoiceData.costBreakdown.costToYou : ''} is pending to complete this appointment.</p>
											</InfoWrapper> : invoiceData.paymentStatus && invoiceData.paymentStatus.toLowerCase().includes('failed') ?
												<InfoWrapper>
													<Icon name="info" />
													<p className="info">Payment transaction is failed. If the amount is already paid it will refund within 7-14 working days. If amount is not deducted, please retry payment.</p>
												</InfoWrapper>
												: invoiceData.refundStatus && (invoiceData.refundStatus.toUpperCase().includes('SUCCESS') || invoiceData.refundStatus.toUpperCase().includes('TXN_SUCCESS') || invoiceData.refundStatus.toUpperCase().includes('PENDING')) ? <InfoWrapper>
													<Icon name="info" />
													<p className="info">Refund of amount  &#8377;{invoiceData.refundAmount} is initiated. Amount will be refunded to original source of payment within 7-14 working days.</p>
												</InfoWrapper> : invoiceData.refundStatus && (invoiceData.refundStatus.toUpperCase().includes('TXN_SUCCESS')) ?
													<InfoWrapper>
														<Icon name="info" />
														<p className="info">Refund Amount  of &#8377;{invoiceData.refundAmount} is successfully credited into your account.</p>
													</InfoWrapper> : ''}
									</Section>
								</BillingDetails>
								<ButtonContainer>
									{invoiceData.status && !invoiceData.status.toLowerCase().includes('cancelled') && !invoiceData.status.toLowerCase().includes('declined') &&
										<Button variant={invData.invoiceFileName ? 'primary' : 'disabled'} onClick={() =>
											downloadPDFApi(
												invData.invoiceFileName,
												'report'
											)} >
											Download Invoice
										</Button>
									}
								</ButtonContainer>
							</DetailsContainer>
						}
					</DetailsWrapper>
				</>
				: ''
		)
	}
	if (!updateData) {
		return <Spinner size='3px' />;
	}
	return (
		<Container>
			<Header />
			<Title>Invoice</Title>
			{/* {invData && invData.invoiceData && invData.invoiceData.qty ? ( */}
			{invoiceData ? invoiceRender() : ''}
			{/* ) : <NoDataMessage>No Invoice Display.</NoDataMessage>} */}

		</Container>
	);
}
