import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import { ProgressBar } from '../../../@lib';
import { currency } from '../../../utils';
import {
    Container,
    DoctorInfoContainer,
    CongratsContainer,
    CongratsIcon,
    CongratsTxtCont,
    TextHighlight,
    InfoTextContainer,
    Title,
    DeliveryContainer,
    OrderSummary,
    OrderSummaryInfo,
    Invoice,
    InvoiceLabel,
    StoreSummary,
    SummaryIcn,
    SummaryTxt,
    SummaryLabel,
    ConfirmImg,
    CardTitle,
    ProgressWrapper,
    LabContainer,
    UpdatePickup,
    Qty,
    Description,
    Amount,
    Separator,
    OrderInfo,
    OrderInfoIcn,
    OrderInfoTxt,
    BttnHolder,
    Text,
    StoreIdentity,
    AddressContainer,
    Summary,
    Product,
    OrderItem,
    ItemName,
    ItemCount,
    OrderStatus,
    OrderStatusTxt,
    OrderStatusPill,
    PaymentBttn,
    StoreDetailsWrapper,
    StoreDetails,
    Heading,
    PText,
    FlexWrapper,
    ButtonElement,
    OrderContent

} from './map-order-details-components'
import {
    Icon,

    Button,
    Header,
    Radio
} from "../../../components"


import AddEditAddress from '../../account/account-info/saved-addresses/add-edit-address'
import { useLocation } from '@app/utils';
import { getMedicineOrderDetail } from '@app/@services/medicine-orders/medicine-orders';
import moment from 'moment';
import { Spinner } from '@app/components/icon/icons';
import { ButtonContainer, StatusText } from '@app/modules/order-details/order-details-components';
import { getPaymentLinkApi, getPaymentStatusApi } from '@app/@services';
// import { isMobile } from 'react-device-detect';

// import { SessionCode } from '@app/components/appointment-card/appointment-card-components';
import { OtherInfo, AuthenticationBlock } from '@app/modules/my-orders/common/common-components';
import { InfoText,SessionCode,Label } from '@app/components/order-card/order-card-components';
export default function MAPOrderDetails() {
    const isMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const [mapFlag, setMapFlag] = useState<boolean>(false);
    const { navigate } = useLocation();
    const { orderId }: any = useParams();
    const [orderData, setOrderData] = React.useState<any>(null);
    const [deliveryProgress, setDeliveryProg] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(true);
    const [isPaymentLinkUnAvailable, setPaymentLinkUnAvailable] = React.useState(false);
    const [payDetails, setPayDetails] = React.useState<any>({});
    const [linkId, setLinkId] = React.useState(0);
    const [isPaymentEnabled, setIsPaymentEnabled] = React.useState(false);
    const [paymentSuccess, setPaymentSuccess] = React.useState(false);
    React.useEffect(() => {
        const interval = setInterval(() => {
            checkPaymentStatus(linkId);
        }, 3000);
        return () => clearInterval(interval);
    }, [linkId, isPaymentEnabled]);
    let editAddress = {
        "addressName": "Home",
        "area": "Phase 2, HITEC City",
        "city": "Hyderabad",
        "houseBuildingNumber": "2-90",
        "id": 0,
        "isPrimary": false,
        "landmark": "cyber",
        "location": { latitude: 17.4469309, longitude: 78.3760138 },
        "pin": 500081,
        "state": "Telangana",
        "streetAddress": "Plot No 10, Hitech City Main Road"
    }
    // let deliveryProgress = [
    //     {
    //         label: 'Order Confirm',
    //         subtitle: 'Order Confirmed',
    //         name: '',
    //         content: '  ',
    //     },
    //     {
    //         label: 'Order Processing',
    //         subtitle: 'Tuesday, 24 Oct 2020 at 09:00 AM',
    //         name: '',
    //         content: '',
    //     },
    //     {
    //         label: 'Billing & Dispatch',
    //         subtitle: '',
    //         name: '',
    //         content: '',
    //     },
    //     {
    //         label: 'Order Picked Up',
    //         subtitleWithCode: '121',
    //         subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut imperdiet risus.',
    //         name: '',
    //         content: '',
    //     },
    //     {
    //         label: 'Pickup',
    //         subtitle: '',
    //         name: '',
    //         content: '',
    //     },

    // ];
    useEffect(() => {
        window.scrollTo(0, 0);
        getDetails();
    }, [])
    async function getDetails() {
        let data = await getMedicineOrderDetail({ orderId: orderId }).then((res: any) => {
            if (res.status === 200) {
                //console.log(res);
                setOrderData(res.data);
                getPaymentInfo(res.data);
                updateTrackingDetails(res.data ? res.data.confirmationDetail : {});
            }
        }).finally(() => {
            // setLoading(false);
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
                        // getAppointmentData()
                    }

                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
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
            orderInfo.costToYou > -1
        ) {
            getPaymentLink(orderInfo);
        } else {
            // setLoading(false);
        }
    };
    const getPaymentLink = async (orderInfo?: any) => {
        //let id = appointmentData.id;
        // let id = 'SVORDAPT-d2914f98-d880-415c-b3d4-bba7eb0ad030'
        await getPaymentLinkApi(orderInfo.orderId)
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
    const updateTrackingDetails = (details: any) => {
        let trackingDetails = details && details['statusList'] ? details['statusList'] : []
        let activeIndex = 0;
        let track = trackingDetails.map((item: any, index: any) => {
            let label = item.statusName && item.statusName.replace(/_/g, ' ');
            let desc = item.date ? '' : item.status ? item.status.replace(/_/g, ' ') : '';
            let content = '';
            if (item.isActive) {
                activeIndex = index + 1;
            }
            return {
                label: label,
                subtitle: item.date
                    ? moment(item.date).format('dddd, DD MMM YYYY  h:mm A').toString()
                    : '',
                detail: content,
                name: item.event,
                completed: item.isActive,
                subtitleWithCode: item.authCode ? item.authCode : '',
                content: desc,
            };
            // if (item.completed) {
            // 	if (idx == -1) {
            // 		idx = index;
            // 	}
            // }
        })
        //console.log(track);
        setDeliveryProg(track);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    const getStarStep = () => {
        let trackingDetails = [...deliveryProgress]
        if (
            trackingDetails &&
            trackingDetails.length &&
            trackingDetails[trackingDetails.length - 1].completed
        ) {
            return trackingDetails.length;
        }
        else if (trackingDetails && trackingDetails.length) {
            return trackingDetails.filter((track: any) => track.completed).length;
        }
        else {
            return trackingDetails.length - 1;
        }
    }
    const storeLocator = (data?:any) => {
        var url = "https://maps.google.com/?q=" + data.latitude + "," + data.langitude;
        window.open(url);
        //setEditAddress(temp);
        // setMapFlag(true);
    }
    const storePhone = (num?: any) => {
        document.location.href = "tel:" + num;
    }

    const makePayment = () => {
        setIsPaymentEnabled(true);
        window.open(payDetails.url);
    };
    const closeMap = () => {
        setMapFlag(false);
    }
    const submit = () => {
        navigate(`/orders/mapordercancel/${orderId}`)

        // navigate('/order/mapordercancel/'+orderId)
    };
    const viewInvoice = () => {
        navigate(`/order/medicineinvoice/${orderId}`)
    };
    if (loading) {
        return <Spinner size='3px' />;
    }
    return (orderData ?

        <Container>
            {mapFlag && (
                <AddEditAddress
                    userInfo={[]}
                    editAddress={editAddress}
                    getAddressess={closeMap}
                    onClose={closeMap}
                    customHeader={true}
                    height={500}
                    locateOnly={true}
                />
            )
            }
            <Header />
            <Title>Order Details</Title>
            <DeliveryContainer>

                <OrderStatus>
                    <OrderStatusTxt>Order Status</OrderStatusTxt>
                    <OrderStatusPill status="success">{orderData.orderStatus}</OrderStatusPill>
                </OrderStatus>

                <OrderSummaryInfo>
                    <ConfirmImg />
                    <OrderContent>
                        <StoreDetailsWrapper>
                            <div style={{ paddingTop: '8px' }}>
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.8974 10.3178C3.8974 5.71789 7.83984 2 12.6086 2C17.3909 2 21.3333 5.71789 21.3333 10.3178C21.3333 12.6357 20.4687 14.7876 19.0456 16.6116C17.4757 18.6235 15.5406 20.3765 13.3626 21.7524C12.8641 22.0704 12.4142 22.0944 11.8671 21.7524C9.67662 20.3765 7.74159 18.6235 6.18509 16.6116C4.76097 14.7876 3.8974 12.6357 3.8974 10.3178ZM9.73763 10.5768C9.73763 12.1177 11.0273 13.3297 12.6086 13.3297C14.191 13.3297 15.4931 12.1177 15.4931 10.5768C15.4931 9.0478 14.191 7.77683 12.6086 7.77683C11.0273 7.77683 9.73763 9.0478 9.73763 10.5768Z" fill="#B6B8D7" />
                                </svg>
                            </div>
                            <StoreDetails style={{ paddingTop: '8px' }}>
                                <Heading className="title-font">{orderData.store ? orderData.store.storeName : '--'}</Heading>
                               {/* {!isMobile ? <PText><Icon name="phoneHandle" /><span>{orderData.store ? orderData.store.storeContactNo : ''}</span></PText> : null} */}
                               { !isMobile ? <SummaryLabel roll="phone" style={{display:'flex',alignItems : 'center'}}><Icon name="phoneHandle" /><span style={{paddingLeft:'5px'}}>{orderData.store ? orderData.store.storeContactNo : ''}</span></SummaryLabel> : null}
                                {/* <PText className="grey-text lh reg-font m-0">{orderData.store ?orderData.store.storeAddress : '--' }</PText> */}
                            </StoreDetails>
                            <FlexWrapper>
                                {isMobile ?<ButtonElement className="secondary" onClick={(e) => { storePhone(orderData.store.storeContactNo) }}>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6076 8.66595C11.1253 8.56479 10.7438 8.78311 10.406 8.97377C10.06 9.17025 9.40219 9.69057 9.02511 9.5574C7.09452 8.78238 5.27876 7.13484 4.49274 5.24497C4.35421 4.86947 4.88538 4.22399 5.0854 3.88269C5.2795 3.55231 5.49879 3.17681 5.39877 2.70306C5.30839 2.27735 4.13937 0.827019 3.72599 0.430415C3.45337 0.168439 3.17408 0.0243513 2.88738 0.00106452C1.80948 -0.0440537 0.605637 1.35825 0.394502 1.69373C-0.134447 2.40907 -0.131484 3.36092 0.403392 4.51507C1.69243 7.61513 6.5678 12.2936 9.75927 13.5977C10.3482 13.8662 10.8868 14.0008 11.3706 14.0008C11.844 14.0008 12.2655 13.872 12.6277 13.6166C12.9011 13.463 14.3983 12.231 14.3591 11.1518C14.3353 10.8767 14.1879 10.6017 13.9227 10.3353C13.519 9.92853 12.041 8.75473 11.6076 8.66595Z" fill="#BC333A" />
                                    </svg>
                                </ButtonElement> : null}
                                <ButtonElement className="primary" onClick={(e) =>{storeLocator(orderData.store)}}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.76613e-05 5.24068C-0.00185159 5.35892 0.0322042 5.47495 0.0977295 5.57339C0.163255 5.67183 0.257155 5.74803 0.366979 5.79189L5.96732 8.03232L8.20781 13.6331C8.25109 13.7414 8.32586 13.8343 8.42246 13.8997C8.51906 13.9651 8.63305 14 8.7497 14H8.75904C8.87718 13.9981 8.99197 13.9604 9.08821 13.8919C9.18446 13.8234 9.25762 13.7272 9.29801 13.6162L13.9645 0.783729C14.0027 0.679334 14.0103 0.566198 13.9863 0.457644C13.9624 0.34909 13.9079 0.249639 13.8293 0.171004C13.7507 0.0923686 13.6513 0.0378234 13.5428 0.0137924C13.4343 -0.0102385 13.3211 -0.00275457 13.2167 0.0353627L0.383895 4.70171C0.272813 4.74221 0.176643 4.81548 0.108108 4.91182C0.039573 5.00816 0.00190178 5.12246 7.76613e-05 5.24068Z" fill="white" />
                                    </svg>
                                </ButtonElement>
                            </FlexWrapper>
                        </StoreDetailsWrapper>
                        <div style={{paddingTop :'10px'}}>
                            <Text className="bold">Order ID: {orderData.svaasOrderId}</Text>
                            {/* <PText>Order ID: {orderData.svaasOrderId}</PText> */}
                            <PText className="grey-text lh reg-font m-0">{orderData.store ? orderData.store.storeAddress : '--'}</PText>
                        </div>
                        {!orderData.orderStatus.toLowerCase().includes('completed') &&!orderData.orderStatus.toLowerCase().includes('cancelled') ? <>
                        <Label className="a-code">Authentication Code</Label>
                        <SessionCode className={orderData.authCode && !orderData.orderStatus.toLowerCase().includes('completed') && !orderData.orderStatus.toLowerCase().includes('cancelled') ? '' : 'c-gray'}>{orderData.authCode || ''}</SessionCode>
                        {!orderData.orderStatus.toLowerCase().includes('completed') &&!orderData.orderStatus.toLowerCase().includes('cancelled') &&<InfoText>
						<Icon name='info' />
						{orderData.authCode ? orderData.labOrderType && (orderData.labOrderType.toUpperCase().includes('AT_LAB')) ? 'Please share your Authentication Code to the pharmacist at the store..'
							: 'Please share your Authentication Code to the pharmacist at the store..' : (((orderData.paymentStatus != null && orderData.paymentStatus.toLowerCase() == "required") || (orderData.paymentStatus != null && orderData.paymentStatus.toLowerCase() == "pending"))) ? 'To be shared once the payment is successfully complete.' :
							'To be shared once the order has been confirmed.'}
					</InfoText>}
                        </>  :null}                     
                        <LabContainer style={{paddingTop : '10px'}}>
                            {((orderData.orderStatus.toLowerCase().includes('placed') || orderData.orderStatus.toLowerCase().includes(' processing') || orderData.orderStatus.toLowerCase().includes(' progress')) && orderData.totalAmount < 1) ?
                                <>
                                    <Summary type="header" >
                                        <OrderItem args={{ width: 40, isBold: true, align: 'left' }}>Product</OrderItem>
                                        <OrderItem args={{ width: 60, isBold: true, align: 'right' }}>Order QTY</OrderItem>
                                    </Summary>
                                    {orderData.cartItems.map((item: any, index: number) => (
                                        <Summary type="row" >
                                            <OrderItem args={{ width: 40, isBold: true, align: 'left' }}>{item.medicineName}</OrderItem>
                                            <OrderItem args={{ width: 60, isBold: false, align: 'right' }}>{item.orderedQuantity}</OrderItem>
                                        </Summary>
                                    ))}
                                    <OrderInfo isBorder={false} >
                                        <OrderInfoIcn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.66989 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66989C2.27989 19.999 -0.000106812 17.62 -0.000106812 14.09V5.91902C-0.000106812 2.37902 2.27989 -0.000976562 5.66989 -0.000976562ZM9.98989 7.06002C9.51989 7.06002 9.12989 6.66902 9.12989 6.19002C9.12989 5.70002 9.51989 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98989 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98989 14.65C9.50989 14.65 9.11989 14.26 9.11989 13.78V9.36002C9.11989 8.87902 9.50989 8.48002 9.98989 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="#BDBDBD" />
                                            </svg>
                                        </OrderInfoIcn>
                                        <OrderInfoTxt>
                                            Pricing and Available Quantities will be updated only after visiting the pharmacy store
                                        </OrderInfoTxt>
                                    </OrderInfo>
                                </>
                                :
                                <>
                                    <Summary type="header" >
                                        <OrderItem args={{ width: 25, isBold: true, align: 'left' }}>Product</OrderItem>
                                        <OrderItem args={{ width: 25, isBold: true, align: 'center' }}>Order QTY</OrderItem>
                                        <OrderItem args={{ width: 30, isBold: true, align: 'center' }}>Fulfilled</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'right' }}>Amount</OrderItem>
                                    </Summary>
                                    {orderData.cartItems.map((item: any, index: number) => (
                                        <Summary type="row" >
                                            <OrderItem args={{ width: 25, isBold: false, align: 'left' }}>
                                                <ItemName>{item.medicineName}</ItemName>
                                                {item.packSize && <ItemCount>{item.packSize} per strip</ItemCount>}
                                            </OrderItem>
                                            <OrderItem args={{ width: 25, isBold: false, align: 'center' }}>{item.orderedQuantity}</OrderItem>
                                            <OrderItem args={{ width: 30, isBold: false, align: 'center' }}>{item.fullfilledQuantity}</OrderItem>
                                            <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(item.amount)}</OrderItem>
                                        </Summary>
                                    ))}
                                    <Summary type="row-noborder" >
                                        <OrderItem args={{ width: 80, isBold: false, align: 'left' }}>Payable by User</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(orderData.costToYou)}</OrderItem>
                                    </Summary>
                                    <Summary type="row" >
                                        <OrderItem args={{ width: 80, isBold: false, align: 'left' }}>Payable by Insurance</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(orderData.costToInsurance)}</OrderItem>
                                    </Summary>
                                    <Summary type="total" >
                                        <OrderItem args={{ width: 80, isBold: true, align: 'left' }}>Total Amount</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'right' }}>{currency(orderData.totalAmount)}</OrderItem>
                                    </Summary>
                                    {/* <OrderInfo isBorder={false} >
                                        <OrderInfoIcn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.66989 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66989C2.27989 19.999 -0.000106812 17.62 -0.000106812 14.09V5.91902C-0.000106812 2.37902 2.27989 -0.000976562 5.66989 -0.000976562ZM9.98989 7.06002C9.51989 7.06002 9.12989 6.66902 9.12989 6.19002C9.12989 5.70002 9.51989 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98989 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98989 14.65C9.50989 14.65 9.11989 14.26 9.11989 13.78V9.36002C9.11989 8.87902 9.50989 8.48002 9.98989 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="#BDBDBD" />
                                            </svg>
                                        </OrderInfoIcn>
                                        <OrderInfoTxt>
                                            Pricing and Available Quantities will be updated only after visiting the pharmacy store
                                        </OrderInfoTxt>
                                    </OrderInfo> */}

                                    {/* <Summary type="row-noborder" >
                                        <OrderItem args={{ width: 80, isBold: false, align: 'left' }}>Not coverd by Insurance</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(200)}</OrderItem>
                                    </Summary>

                                    <Summary type="row-noborder" >
                                        <OrderItem args={{ width: 80, isBold: false, align: 'left' }}>GST</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(200)}</OrderItem>
                                    </Summary> */}
                                    {/* <OrderInfo isBorder={true} >
                                        <OrderInfoIcn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.66989 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66989C2.27989 19.999 -0.000106812 17.62 -0.000106812 14.09V5.91902C-0.000106812 2.37902 2.27989 -0.000976562 5.66989 -0.000976562ZM9.98989 7.06002C9.51989 7.06002 9.12989 6.66902 9.12989 6.19002C9.12989 5.70002 9.51989 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98989 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98989 14.65C9.50989 14.65 9.11989 14.26 9.11989 13.78V9.36002C9.11989 8.87902 9.50989 8.48002 9.98989 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="url(#paint0_linear)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear" x1="-0.000107524" y1="-9.37598" x2="12.3333" y2="32.4118" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#9096ED" />
                                                        <stop offset="1" stop-color="#494E9D" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </OrderInfoIcn>
                                        <OrderInfoTxt>
                                            Why do I need to pay it?
                                        </OrderInfoTxt>
                                    </OrderInfo>
                                    <OrderInfo isBorder={false} >
                                        <OrderInfoIcn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.66989 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66989C2.27989 19.999 -0.000106812 17.62 -0.000106812 14.09V5.91902C-0.000106812 2.37902 2.27989 -0.000976562 5.66989 -0.000976562ZM9.98989 7.06002C9.51989 7.06002 9.12989 6.66902 9.12989 6.19002C9.12989 5.70002 9.51989 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98989 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98989 14.65C9.50989 14.65 9.11989 14.26 9.11989 13.78V9.36002C9.11989 8.87902 9.50989 8.48002 9.98989 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="#BDBDBD" />
                                            </svg>
                                        </OrderInfoIcn>
                                        <OrderInfoTxt>
                                            Pricing and Available Quantities will be updated only after visiting the pharmacy store
                                        </OrderInfoTxt>
                                    </OrderInfo> */}
                                </>
                            }
                            {(!orderData.orderStatus.toLowerCase().includes('rejected') && !orderData.orderStatus.toLowerCase().includes('cancelled')) && orderData.paymentStatus && <StatusText style={{ height: '50px', marginBottom: '16px' }}>
                                Payment Status <span>Payment {orderData.paymentStatus}</span>
                            </StatusText>}
                            {orderData.refundStatus&& (orderData.refundStatus.toUpperCase() === 'SUCCESS' ||orderData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ) && <StatusText style={{ height: '50px', marginBottom: '16px' }}>
                                Refund Status <span>Refund {orderData.refundStatus.toUpperCase() === 'SUCCESS' ? 'Initiated' : orderData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ? 'Initiated' : orderData.refundStatus.toLowerCase().replace(/_/g, ' ')}</span>
                            </StatusText>}
                            {orderData.orderStatus === 'cancelled' ||
                                orderData.orderStatus === 'Order cancelled' ||
                                orderData.orderStatus.toLowerCase().indexOf('cancelled') > -1 || orderData.orderStatus.toLowerCase().includes('rejected') ? (
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
                            {/* <PaymentBttn>Payment Complete</PaymentBttn> */}
                        </LabContainer>
                    </OrderContent>

                </OrderSummaryInfo>

                <AddressContainer>
                    <TextHighlight type="header">
                        Tracking Details
                    </TextHighlight>
                    <ProgressWrapper>
                        <ProgressBar
                            startingStep={getStarStep()}
                            onSubmit={() => { }}
                            steps={deliveryProgress}
                            stepClass='vertical'
                            progressClass='vertical'
                            showLabel
                        />
                    </ProgressWrapper>


                </AddressContainer>

                {(!orderData.orderStatus.toLowerCase().includes('completed') && !orderData.orderStatus.toLowerCase().includes('cancelled')) ? <Button variant='secondary' onClick={(e) => { navigate(`/order/mapordercancel/${orderId}`) }} >Cancel Order</Button> : null}
                <Button variant='primary' onClick={viewInvoice} >View Invoice Details</Button>

            </DeliveryContainer>

        </Container >
        : null
    )
}