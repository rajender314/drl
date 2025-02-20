/* eslint-disable react-hooks/exhaustive-deps */
import { getPaymentLinkApi, getPaymentStatusApi } from '@app/@services';
import { getLabOrderDetail } from '@app/@services/lab-orders/lab-orders';
import { Button, Header, Icon, OrderCard, PillText } from '@app/components';
import { Spinner } from '@app/components/icon/icons';
import { useLocation } from '@app/utils';
import { truncate } from 'fs';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import {
	CardTitle,
	Container,
	InfoText,
	NoDataMessage,
	StatusText,
	PayStatus,
	Text,
	ButtonContainer,
	Title,
	SubTitle,
	IconOuter,
	CardTitleWrapper,
	Heading,
} from './order-details-components';
import OrderTracking from './order-tracking';

export default function OrderDetails() {
	const { navigate } = useLocation();
	const history = useHistory();
	const { location } = history;
	const { state }: any = location;
	const { selectedTab } = state || { selectedTab: '' };
	const { orderId }: any = useParams();
	const [orderData, setOrderData] = React.useState<any>(null);
	const [loading, setLoading] = React.useState(true);
	const [linkId, setLinkId] = React.useState(0);
	const [isPaymentEnabled, setIsPaymentEnabled] = React.useState(false);
	const [payDetails, setPayDetails] = React.useState<any>({});
	const [paymentSuccess, setPaymentSuccess] = React.useState(false);
	const [isPaymentLinkUnAvailable, setPaymentLinkUnAvailable] = React.useState(false);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		getDetails();
	}, []);
	React.useEffect(() => {
		const interval = setInterval(() => {
			checkPaymentStatus(linkId);
		}, 3000);
		return () => clearInterval(interval);
	}, [linkId, isPaymentEnabled]);
	async function getDetails() {
		let data = await getLabOrderDetail({ orderId: orderId }).then((res: any) => {
			if (res.status === 200) {
				setOrderData(res.data);
				getPaymentInfo(res.data);
			}
		}).finally(() => {
			setLoading(false);
		})

	}
	const getPaymentInfo = async (data?: any) => {
		let orderInfo = orderData || data;
		if (
			orderInfo &&
			orderInfo.orderStatus &&
			orderInfo.orderStatus !== 'cancelled' &&
			orderInfo.orderStatus !== 'Order cancelled' &&
			orderInfo.orderStatus.toLowerCase().indexOf('cancelled') < 0 &&
			orderInfo.orderStatus !== 'order Completed/Reports delivered' &&
			orderInfo.orderStatus.toLowerCase().indexOf('completed') < 0 &&
			!orderInfo.orderStatus.toLowerCase().includes('rejected') &&
			orderInfo.amountBreakdown &&
			orderInfo.amountBreakdown.costToYou > 0
		) {
			getPaymentLink(orderInfo);
		} else {
			setLoading(false);
		}
	};
	const getPaymentLink = async (orderInfo?: any) => {
		//let id = appointmentData.id;
		// let id = 'SVORDAPT-d2914f98-d880-415c-b3d4-bba7eb0ad030'
		await getPaymentLinkApi(orderInfo.orderTransactionId)
			.then((res: any) => {
				//console.log(res)
				if (res.data.isActive) {
					setPaymentLinkUnAvailable(false)
					getPaymentStatus(res.data);
				} else {
					setPaymentLinkUnAvailable(true)
				}
			}).catch((error) => {
				setPaymentLinkUnAvailable(true)
			})
			.finally(() => { setLoading(false); });
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
				setLoading(false);
			});
	};
	const getAppointmentData = async () => {
		await getLabOrderDetail({ orderId: orderId }).then((res: any) => {
			if (res.data && res.data.authCode) {
				navigate(`/orders/paymentSuccess/${res.data.authCode}/${orderId}`);
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
					if (orderData.authCode) {
						navigate(`/orders/paymentSuccess/${orderData.authCode}/${orderId}`);
					} else {
						getAppointmentData()
					}

				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const makePayment = () => {
		setIsPaymentEnabled(true);
		window.open(payDetails.url);
	};
	if (loading) {
		return <Spinner size='3px' />;
	}
	const pageBack = () => {
        navigate('/orders')
    }	
	return (
		<>
			<Header onClose={pageBack} />
			{orderData ? (
				<>
					{orderData.orderStatus === 'cancelled' ||
						orderData.orderStatus === 'Order cancelled' ||
						orderData.orderStatus.toLowerCase().indexOf('cancelled') > -1 ? (
						<>
							<Title>Order Cancelled</Title>

							{orderData.paymentStatus.toLowerCase().includes('success') &&
								<>
									<InfoText style={{ marginBottom: '0px' }}>
										We apologize there seems to be an issue with the payment
						</InfoText>
									<InfoText style={{ marginTop: '0px' }}>
										In case the payment was made, same would be refunded back within 7-14 days
							</InfoText>
								</>
							}
						</>
					) : (orderData.paymentStatus != null && orderData.paymentStatus.toLowerCase().includes('error')) ? (
						<>
							<Title>Payment Issue</Title>
							<InfoText>
								We apologize there seems to be an issue with the payment
							</InfoText>
						</>
					) : (
						''
					)}
					<Container>
						{/* {orderData.orderStatus === 'cancelled' ||
							orderData.orderStatus === 'Order cancelled' ||
							(orderData.orderStatus.toLowerCase().indexOf('cancelled') >
								-1 && (
									<>
										<SubTitle>
											<IconOuter>
												<Icon name='alert' />
											</IconOuter>
											Order Cancelled
										</SubTitle>
										<InfoText
											style={{
												margin: '0 0 20px 50px',
												fontSize: '13px',
												lineHeight: '17px',
											}}>
											The refund has been initiated. It should take 2-3 days to
											reflect in your account.
										</InfoText>

									</>
								))} */}
						<CardTitleWrapper>
							<CardTitle>Order Details</CardTitle>
							{orderData.totalAmount ? (
								<PillText variant='IN_PROGRESS'>
									INR {orderData.totalAmount}
								</PillText>
							) : (
								''
							)}
						</CardTitleWrapper>
						<Heading>{orderData.labOrderType ? orderData.labOrderType.toLowerCase().replace(/_/g, ' ') : ''}</Heading>
						<OrderCard data={orderData} />
						{orderData.orderStatus && <StatusText style={{ height: '50px', marginBottom: '16px' }}>
							Order Status <span>{orderData.orderStatus}</span>
						</StatusText>}
						{!orderData.orderStatus.toLowerCase().includes('rejected') && !orderData.orderStatus.toLowerCase().includes('declined') && !orderData.orderStatus.toLowerCase().includes('cancelled') && orderData.paymentStatus && <StatusText style={{ height: '50px', marginBottom: '16px' }}>
							Payment Status <span>Payment {orderData.paymentStatus}</span>
						</StatusText>}
						{orderData.refundStatus && (orderData.refundStatus.toUpperCase() === 'SUCCESS' || orderData.refundStatus.toUpperCase() === 'TXN_SUCCESS')&&<StatusText style={{ height: '50px',textTransform : 'capitalize'  }}>
							Refund Status <span>Refund {orderData.refundStatus.toUpperCase() === 'SUCCESS'? 'Initiated' : orderData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ? 'Initiated':orderData.refundStatus.toLowerCase().replace(/_/g, ' ') }</span>
						</StatusText>}
						{orderData.orderStatus === 'cancelled1' ||
							orderData.orderStatus === 'Order cancelled1' ||
							orderData.orderStatus.toLowerCase().indexOf('cancelled1') > -1 || orderData.orderStatus.toLowerCase().includes('rejected') ? (
							null
						) : payDetails && payDetails.isActive ? (
							<ButtonContainer style={{ padding: '0px' }}>
								<Button variant={'primary'} size='large' onClick={makePayment}>
									Make Payment
								</Button>
							</ButtonContainer>
						) : isPaymentEnabled ? <Button variant={'disabled'} size='large' >
							Make Payment
					</Button> : null}
					</Container>
					{						orderData.trackingDetails &&
						orderData.trackingDetails.length && (
							<OrderTracking
								orderId={orderData.orderId}
								trackingDetails={orderData.trackingDetails}
								orderData={orderData}
								selectedTab={selectedTab}
							/>
						)}
				</>
			) : (
				<NoDataMessage>No Data Available</NoDataMessage>
			)}
		</>
	);
}
