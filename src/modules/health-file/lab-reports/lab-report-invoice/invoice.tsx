import React, { useEffect, useState } from 'react';
import { Button, Dialog, Header, Icon } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
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
	ViewDetail,
	DetailsWrapper,
	SectionHeader,
	FlexWrapper,
	Text,
	Section,
	PriceWrapper,
	InfoWrapper,
} from './invoice-components';
import { useHistory, useParams } from 'react-router-dom';
import { getInvoice } from '@app/@services';
import { NoDataMessage } from '../../healthfile-components';
import { getLabOrderDetail } from '@app/@services/lab-orders/lab-orders';
import { directDownload, downloadPDF } from '@app/utils'
import { StatusText } from '@app/modules/order-details/order-details-components';
import { SuccessContainer, SuccessTitle, SuccessSubTitle } from '@app/modules/cancel-appointment/cancel-components';
import { primaryRed } from '@app/styles';
const invData = {
	invoiceNo: 'SV-device1004346-0135',
	invoiceType: 'DOCTOR_CONSULTATION_INVOICE',
	invoiceFileName:
		'https://svaasstorageaccount.blob.core.windows.net/icicicontainer/doctor-invoice-1621504772602-1243152990976001299.pdf',
	hplxDoctorId: 'device1004346',
	isSentToInsurance: false,
	sentToInsuranceTimestamp: null,
	invoiceData: {
		place_of_supply: 'Hyderabad',
		appointment_date: '14/10/2020',
		paid_by_insurance: '100',
		catalogue_fees: 'null',
		invoice_date: '14/10/2020',
		svaas_appointment_id: 'null',
		paid_by_patient: '200',
		appointment_type: 'InPerson',
		patient_name: 'Raj Das',
		doctor_name: 'Test Doctor',
		invoice_number: 'SV-device1004346-0135',
		date_of_order: '29/08/2021',
		patient_phone_number: 'null',
		doctor_address: 'Test Address',
		payor_address: 'Abcd 123',
		total_amount: '2000',
		payor_name: 'Aditya Birla',
		invoice_generation_date: '14/10/2020',
		qty: '1',
		amount_chargeable: 'One Thousand Only',
		state_code: 'WB',
	},
};
export default function LabReportInvoice() {
	const history = useHistory();
	const { location } = history;
	const { state }: any = location;
	const { invoiceDetails } = state || { invoiceDetails: null };
	const [invoiceData, setInvoiceData] = useState<any>(null);
	const { orderId } = useParams<any>();
	const [loading, setLoading] = React.useState(true);
	const [invoiceInfo, setInvoiceInfo] = React.useState<any>(null);
	const [showDetails, toggleDetails] = React.useState(false);
	const [userDtl, setUsetDtl] = useState<any>()
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	let user: any = sessionStorage.getItem('user') || localStorage.getItem('user');
	useEffect(() => {

		getDetails();

		if (!invoiceDetails) {
			getDetails();
		} else {
			getInvoiceData();
		}
		if (user) {
			setUsetDtl(JSON.parse(user));
		}
	}, []);
	async function getDetails() {
		await getLabOrderDetail({ orderId: orderId }).then((res: any) => {
			if (res.status === 200) {
				let data = res.data;
				console.log(data);
				if (data.orderId) {
					const invoiceData = {
						amountBreakdown: data.amountBreakdown,
						labDetail: data.labDetail,
						address: data.address,
						slotDetail: data.slotDetail,
						invoiceUrl: data.invoiceURL,
						labOrderType: data.labOrderType,
						patientName: data.patientName,
						orderStatus: data.orderStatus,
						paymentStatus: data.paymentStatus,
						refundStatus: data.refundStatus,
						refundAmount: data.refundAmount,
						labItems: data.labItems,
						orderTransactionId: data.svaasOrderId,
					};
					setInvoiceData(invoiceData);
					getInvoiceData();
				}
			}
		})

	}
	const getInvoiceData = async () => {
		let invoiceType = 'DIAGNOSTIC';
		let id = orderId;
		await getInvoice(id, invoiceType)
			.then((res: any) => {
				if (res.status === 200) {
					setInvoiceInfo(res.data);
				}
			})
			.finally(() => {
				if (invoiceDetails) {
					// setInvoiceData(invoiceDetails);
				}
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			});
	};
	function getSlotData() {
		if (invoiceData && invoiceData.slotDetail) {
			const { date, slot } = invoiceData.slotDetail;
			let todayDate = moment(new Date(), 'DD-MM-YYYY').toDate();
			const IsoDateTo = moment(date, 'MMMM DD-MM-YYYY').toDate();
			const IsoTimeTo = moment(slot.startTime, ['hh:mm:ss A']).format('hh:mm A');
			const IsoTimeEnd = moment(slot.endTime, ['hh:mm:ss A']).format('hh:mm A');
			if (todayDate === IsoDateTo) {
				return `Today, ${moment(IsoDateTo).format('dddd, DD MMM YYYY')} - ${IsoTimeEnd}`;
			}
			return `${moment(IsoDateTo).format('dddd, DD MMM YYYY')} ${IsoTimeTo}- ${IsoTimeEnd} `;
		}
		else {
			return '';
		}
	}
	function download(e: any, url: string, filename: string) {
		if (invoiceInfo && invoiceInfo.invoiceFileName) {

			e.stopPropagation();
			directDownload(url,'invoice.pdf');
			setTimeout(() => {
				setIsDialogOpen(true);
			}, 1000);
			//let URL:any = `https://stage.svaas.com/storage/drlsvaas/lab-invoice-2776222-1628686055770-8172712940465960138.pdf?sp=r&st=2021-08-12T10:43:31Z&se=2021-08-12T18:43:31Z&spr=https&sv=2020-08-04&sr=b&sig=bEeZb8W6vuLwHaRiXlhri1Tp8Bj%2FBh%2F86ZUf8dOllOM%3D`
			// downloadPDF(url, filename).then((res) => {
			// 	console.log(res)
			// })
		}

	}
	if (loading) {
		return <Spinner size='3px' />;
	}
	return (
		<Container>
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
			<Header />
			{invoiceData ? (
				<>
					<Title>Invoice</Title>
					<DetailsWrapper>
						<DetailsContainer>
							<Section>
								<SectionHeader>Order Status</SectionHeader>
								<StatusText style={{ height: '50px' }}>
									<span>{invoiceData.orderStatus}</span>
								</StatusText>
								<FlexWrapper className="space-between">
									<Label>Order ID</Label>
									<Text>{invoiceData.orderTransactionId}</Text>
								</FlexWrapper>
								<FlexWrapper className="space-between">
									<Label>Visit Type</Label>
									<Text style={{ textTransform: 'capitalize' }}>{invoiceData.labOrderType && invoiceData.labOrderType.toLowerCase().replace(/_/g, ' ')}</Text>
								</FlexWrapper>
								{invoiceInfo && invoiceInfo.invoiceNo ?
									(
										<FlexWrapper className="align-start space-between">
											<Label>Invoice Number</Label>
											<Text className="lh">{invoiceInfo.invoiceNo}</Text>
										</FlexWrapper>
									) : ''
								}
							</Section>
						</DetailsContainer>

						<DetailsContainer>
							<Section>
								<SectionHeader>Lab Details</SectionHeader>
								<Label className="alt-wt">{invoiceData.labDetail ? invoiceData.labDetail.name : ''}</Label>
								{invoiceData.labOrderType && invoiceData.labOrderType == 'LAB_VISIT' && invoiceData.labDetail && invoiceData.labDetail.address ?
									(
										<Text  className="left-aligned grey-text alt-wt lh">
											{`${invoiceData.labDetail.address.streetAddress}, ${invoiceData.labDetail.address.area ? invoiceData.labDetail.address.area : ''}, ${invoiceData.labDetail.address.city}`}
											<br />
											{`${invoiceData.labDetail.address.state}, ${invoiceData.labDetail.address.pin}`}
										</Text>
									) : ''
								}
								<TimeInfo>
									<Icon name='dateSlot' />
									<InfoDate>
										{' '}
										{getSlotData()}
										{/* <TimeSlot>6.00 PM to 6.30 PM</TimeSlot> */}
									</InfoDate>
								</TimeInfo>
							</Section>
							<BillingDetails>
								<Section className="mb-32">
									<SectionHeader>Billing Details</SectionHeader>
									<FlexWrapper className="space-between">
										<Label>Patient Name</Label>
										<Text>{invoiceData.patientName ? invoiceData.patientName : ''}</Text>
									</FlexWrapper>
									<FlexWrapper className="space-between">
										<Label>Member ID</Label>
										<Text>{userDtl ? userDtl.insuranceId : '--'}</Text>
									</FlexWrapper>
									<Label className="mb-8">Primary Address</Label>
									{invoiceData.address ?
										(
											<Text className="left-aligned grey-text alt-wt lh">
												{`${invoiceData.address.streetAddress}, ${invoiceData.address.area ? invoiceData.address.area : ''}, ${invoiceData.address.city}`}
												<br />
												{`${invoiceData.address.state}, ${invoiceData.address.pin}`}
											</Text>
										) : ''
									}
								</Section>

								<Section className="mb-32">
									<SectionHeader>Order Summary</SectionHeader>
									<PriceWrapper>
										<p className="item-label">Test</p>
										<p className="price"></p>
									</PriceWrapper>
									{invoiceData && invoiceData['labItems'] && invoiceData['labItems'].map((option: any, index: number) =>
									(
										<PriceWrapper>
											<p className="item-label">{option.name}</p>
											<p className="price"><span>₹</span>{option.cost}</p>
										</PriceWrapper>
									))}
								</Section>

								<Section>
									<SectionHeader>Payment Details</SectionHeader>
									{!invoiceData.orderStatus.toLowerCase().includes('declined') && !invoiceData.orderStatus.toLowerCase().includes('rejected') &&!invoiceData.orderStatus.toLowerCase().includes('cancelled') && invoiceData.paymentStatus && <StatusText style={{ height: '50px' }}>
										Payment Status<span>Payment {invoiceData.paymentStatus}</span>
									</StatusText>}
									{invoiceData.refundStatus &&(invoiceData.refundStatus.toUpperCase() === 'SUCCESS' || invoiceData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ) &&<StatusText style={{ height: '50px', textTransform: 'capitalize' }}>
										Refund Status<span>Refund {invoiceData.refundStatus.toUpperCase() === 'SUCCESS' ? 'Initiated' : invoiceData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ? 'Initiated' : invoiceData.refundStatus.toLowerCase().replace(/_/g, ' ')}</span>
									</StatusText>}
									<PriceWrapper>
										<p className="item-label">Payable by User</p>
										<p className="price"><span>₹</span>{invoiceData.amountBreakdown ? invoiceData.amountBreakdown.costToYou : ''}</p>
									</PriceWrapper>
									<PriceWrapper>
										<p className="item-label">Payable by Insurance</p>
										<p className="price"><span>₹</span>{invoiceData.amountBreakdown ? invoiceData.amountBreakdown.insuranceCoverageCost : ''}</p>
									</PriceWrapper>
									<PriceWrapper>
										<p className="item-label">Total Amount</p>
										<p className="price"><span>₹</span>{invoiceData.amountBreakdown ? invoiceData.amountBreakdown.totalAmount : ''}</p>
									</PriceWrapper>
									{showDetails && (
										<>
											<PriceWrapper>
												<p className="item-label">Not covered by Insurance</p>
												<p className="price"><span>₹</span>{invoiceData.amountBreakdown ? invoiceData.amountBreakdown.notCoveredByInsurance : ''}</p>
											</PriceWrapper>
											<PriceWrapper>
												<p className="item-label">GST</p>
												<p className="price"><span>₹</span>{invoiceData.amountBreakdown ? invoiceData.amountBreakdown.gstCost : ''}</p>
											</PriceWrapper>
										</>
									)}
									{invoiceData.paymentStatus && invoiceData.paymentStatus.toLowerCase().includes('pending') ?
										<InfoWrapper>
											<Icon name="info" />
											<p className="info">Payment of &#8377;{invoiceData.amountBreakdown
												? invoiceData.amountBreakdown.costToYou
												: ''} is pending to complete this order.</p>
										</InfoWrapper>
										: invoiceData.paymentStatus && invoiceData.paymentStatus.toLowerCase().includes('failed') ?
											<InfoWrapper>
												<Icon name="info" />
												<p className="info">Payment transaction is failed. If the amount is already paid it will refund within 7-14 working days. If amount is not deducted, please retry payment.</p>
											</InfoWrapper>
											: invoiceData.refundStatus && (invoiceData.refundStatus.toUpperCase().includes('SUCCESS') || invoiceData.refundStatus.toUpperCase().includes('TXN_SUCCESS') || invoiceData.refundStatus.toUpperCase().includes('PENDING')) ?
												<InfoWrapper>
													<Icon name="info" />
													<p className="info">Refund of amount  &#8377;{invoiceData.refundAmount} is initiated. Amount will be refunded to original source of payment within 7-14 working days.</p>
												</InfoWrapper> : invoiceData.refundStatus && (invoiceData.refundStatus.toUpperCase().includes('TXN_SUCCESS')) ?
													<InfoWrapper>
														<Icon name="info" />
														<p className="info">Refund Amount  of &#8377;{invoiceData.refundAmount} is successfully credited into your account.</p>
													</InfoWrapper> : ''
									}
								</Section>
							</BillingDetails>
							<ButtonContainer>
								{!invoiceData.orderStatus.toLowerCase().includes('cancelled') && !invoiceData.orderStatus.toLowerCase().includes('declined') && <Button
									variant={invoiceInfo && invoiceInfo.invoiceFileName ? 'primary' : 'disabled'}
									onClick={(e) =>
										download(
											e,
											invoiceInfo && invoiceInfo.invoiceFileName
												? invoiceInfo.invoiceFileName
												: '',
											'invoice'
										)
									}>
									Download Invoice
							</Button>}
								{/* <Button variant='secondary' onClick={() => history.goBack()}>
								Close
							</Button> */}
							</ButtonContainer>
						</DetailsContainer>
					</DetailsWrapper>
				</>
			) : (
				<NoDataMessage className="text-white">No Data to display</NoDataMessage>
			)}
		</Container>
	);
}