import React, { useEffect, useState } from 'react';
import { Button, Dialog, Header, Icon } from '@app/components';
import moment from 'moment';

import { useHistory, useParams } from "react-router-dom";
import { appointmentDetails, getInvoice } from '@app/@services'
import { currency, directDownload, downloadPDF } from '@app/utils'
import { StatusText } from '@app/modules/order-details/order-details-components';
import { Label, Specialization } from '@app/components/appointment-card/appointment-card-components';
import { getUserAddressess } from '@app/@services/user/user';
import { Spinner } from '@app/components/icon/icons';
import { SuccessContainer, SuccessTitle, SuccessSubTitle } from '@app/modules/cancel-appointment/cancel-components';
import { primaryRed } from '@app/styles';
import { DetailsWrapper, DetailsContainer, ButtonContainer, Container, Title, Section, SectionHeader, FlexWrapper, TimeInfo, InfoDate, BillingDetails, PriceWrapper, InfoWrapper, Text } from '@app/modules/health-file/appointments/appointment-invoice/invoice-components';
import { getMedicineOrderDetail, getPharInvoice } from '@app/@services/medicine-orders/medicine-orders';
import { ItemCount, ItemName, OrderInfo, OrderInfoIcn, OrderInfoTxt,  OrderItem, Summary } from '../map-order-details/map-order-details-components';
let user: any = sessionStorage.getItem('user') || localStorage.getItem('user');
user = JSON.parse(user);
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
export default function MedicineInvoice() {
    const history = useHistory();
    const { location } = history;
    const { state }: any = location;
    const { invoiceDetails } = state || { invoiceDetails: null };
    const [invoiceData, setInvoiceData] = useState<any>();
    const [invData, setInvData] = useState<any>({})
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [homeAddress, setHomeAddress] = useState<any>({});
    const { orderId } = useParams<any>();
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

        // getUserAddress();
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
        await getMedicineOrderDetail({ orderId: orderId }).then((res: any) => {
            if (res.status === 200) {
                //console.log(res);
                setInvoiceData(res.data);
                getInvoiceData();
                // setInvoiceData(res.data);
                // getPaymentInfo(res.data);
                // updateTrackingDetails(res.data ? res.data.confirmationDetail : {});
            }
        }).finally(() => {
            // setLoading(false);
        })

    }
    function getSlotData() {
        if (invoiceData && invoiceData.orderedDate) {
            const  date = invoiceData.orderedDate;
            let todayDate = moment(new Date()).toDate();
            const IsoDateTo = moment(date).toDate();
            // const IsoTimeTo = moment(slot.startTime, ['hh:mm:ss A']).format('hh:mm A');
            // const IsoTimeEnd = moment(slot.endTime, ['hh:mm:ss A']).format('hh:mm A');
            // if (todayDate === IsoDateTo) {
            //     return `Today, ${moment(IsoDateTo).format('dddd, DD MMM YYYY')} - ${IsoTimeEnd}`;
            // }
            return `${moment(IsoDateTo).format('dddd, DD MMM YYYY')}  `;
        } else {
            return ''
        }

    }
    const getInvoiceData = async () => {
        // console.log('getInvoice', appointmentId)
        await getPharInvoice(orderId).then((res: any) => {
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
        directDownload(url, 'invoice.pdf');
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
                            <DetailsContainer >
                                <Section>
                                    <SectionHeader>Order Status</SectionHeader>
                                    {invoiceData.orderStatus &&
                                        <StatusText className="mb-16" style={{ height: '50px' }}>
                                            <span>{invoiceData.orderStatus ? invoiceData.orderStatus.replace(/_/g, ' ') : ''}</span>
                                        </StatusText>
                                    }
                                    <FlexWrapper className="space-between">
                                        <Label>Order ID</Label>
                                        <Text>{invoiceData.svaasOrderId}</Text>
                                    </FlexWrapper>
                                    <FlexWrapper className="space-between">
                                        <Label>Order Type</Label>
                                        <Text>{invoiceData.orderType ? invoiceData.orderType : 'Store Pick Up'}</Text>
                                    </FlexWrapper>
                                    {invData && invData.invoiceId ? (
                                        <FlexWrapper className="space-between">
                                            <Label>Invoice Number</Label>
                                            <Text>{invData.invoiceId}</Text>
                                        </FlexWrapper>
                                    ) : ''}
                                </Section>
                            </DetailsContainer>
                        }

                        {updateData &&
                            <DetailsContainer>
                                <Section className="mb-32">
                                    <SectionHeader>Pharmacy Details</SectionHeader>
                                    {/* <FlexWrapper className="space-between" style={{ alignItems: 'flex-start' }}>
										<Label>Doctor ID</Label>
										<Text className="lh">{invoiceData.doctorDetails ? invoiceData.doctorDetails.svaasDoctorId : '--'}</Text>
									</FlexWrapper> */}
                                    <FlexWrapper className="space-between">
                                        <Label>Pharmacy Name</Label>
                                        {invoiceData.store ?
                                            <Text>{invoiceData.store.storeName}</Text>
                                            : ''}
                                    </FlexWrapper>
                                    {invoiceData.store ? (
                                        <Text className="alt-wt left-aligned grey-text lh">
                                            {invoiceData.store.storeAddress}
                                        </Text>
                                    ) : ''
                                    }
                                   {invoiceData.orderedDate && <TimeInfo>
                                        <Icon name="dateSlot" />
                                        <InfoDate>
                                            {' '}
                                            {getSlotData()}
                                        </InfoDate>
                                    </TimeInfo>}
                                </Section>


                                <BillingDetails>

                                    <Section className="mb-32">
                                        <SectionHeader>Billing Details</SectionHeader>
                                        {userDtl &&
                                            <FlexWrapper className="space-between">
                                                <Label>Patient Name</Label>
                                                <Text>{userDtl.firstName + ' ' + userDtl.lastName}</Text>
                                            </FlexWrapper>
                                        }
                                        <FlexWrapper className="space-between">
                                            <Label>Member ID</Label>
                                            <Text>{userDtl ? userDtl.insuranceId : '--'}</Text>
                                        </FlexWrapper>
                                        <Label className="mb-8">Primary Address</Label>
                                        {invoiceData.userAddress ? (
                                            <Text className="alt-wt left-aligned grey-text lh">
                                                {invoiceData.userAddress}
                                                {/* {`${homeAddress.streetAddress}, ${homeAddress.area}, ${homeAddress.city}`}
                                                <br />
                                                {`${homeAddress.state}, ${homeAddress.pin}`} */}
                                            </Text>
                                        ) : ''
                                        }
                                    </Section>
                                    <Section>
                                    <SectionHeader>Order Summary</SectionHeader>
                                    {((invoiceData.orderStatus.toLowerCase().includes('placed') || invoiceData.orderStatus.toLowerCase().includes(' processing') || invoiceData.orderStatus.toLowerCase().includes(' progress')) &&  invoiceData.totalAmount < 1)?
                                        <>
                                        <Summary type ="header" >
                                        <OrderItem args={{ width: 40, isBold: true, align: 'left' }}>Product</OrderItem>
                                        <OrderItem args={{ width: 60, isBold: true, align: 'right' }}>Order QTY</OrderItem>
                                        </Summary>
                                    {invoiceData.cartItems.map((item: any, index: number) => (
                                        <Summary type ="row" >
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
                                        <Summary type ="header" >
                                        <OrderItem args={{ width: 25, isBold: true, align: 'left' }}>Product</OrderItem>
                                        <OrderItem args={{ width: 25, isBold: true, align: 'center' }}>Order QTY</OrderItem>
                                        <OrderItem args={{ width: 30, isBold: true, align: 'center' }}>Fulfilled</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'right' }}>Amount</OrderItem>
                                        </Summary>
                                    {invoiceData.cartItems.map((item: any, index: number) => (
                                        <Summary type ="row" >
                                        <OrderItem args={{ width: 25, isBold: false, align: 'left' }}>
                                        <ItemName>{item.medicineName}</ItemName>
                                    {item.packSize && <ItemCount>{item.packSize} per strip</ItemCount>}
                                        </OrderItem>
                                        <OrderItem args={{ width: 25, isBold: false, align: 'center' }}>{item.orderedQuantity}</OrderItem>
                                        <OrderItem args={{ width: 30, isBold: false, align: 'center' }}>{item.fullfilledQuantity}</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(item.amount)}</OrderItem>
                                        </Summary>
                                    ))}                                        
                                    <OrderInfo isBorder={false} style={{padding :0}} >
                                        <OrderInfoIcn>
                                        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.66989 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66989C2.27989 19.999 -0.000106812 17.62 -0.000106812 14.09V5.91902C-0.000106812 2.37902 2.27989 -0.000976562 5.66989 -0.000976562ZM9.98989 7.06002C9.51989 7.06002 9.12989 6.66902 9.12989 6.19002C9.12989 5.70002 9.51989 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98989 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98989 14.65C9.50989 14.65 9.11989 14.26 9.11989 13.78V9.36002C9.11989 8.87902 9.50989 8.48002 9.98989 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="#BDBDBD" />
                                        </svg> */}
                                        </OrderInfoIcn>
                                        <OrderInfoTxt>
                                        {/* Pricing and Available Quantities will be updated only after visiting the pharmacy store */}
                                        </OrderInfoTxt>
                                        </OrderInfo>
                                        </>
                                    }
                                    </Section>
                                    <Section>
                                        <SectionHeader>Payment Details</SectionHeader>
                                        {invoiceData.status && !invoiceData.status.toLowerCase().includes('declined')&& !invoiceData.status.toLowerCase().includes('rejected') && !invoiceData.status.toLowerCase().includes('cancelled') && invoiceData.paymentStatus &&
                                            <StatusText style={{ height: '50px' }}>
                                                Payment Status<span>Payment {invoiceData.paymentStatus}</span>
                                            </StatusText>
                                        }
                                        {invoiceData.refundStatus &&(invoiceData.refundStatus.toUpperCase() === 'SUCCESS' || invoiceData.refundStatus.toUpperCase() === 'TXN_SUCCESS')&& <StatusText style={{ height: '50px', textTransform: 'capitalize' }}>
                                            Refund Status<span>Refund {invoiceData.refundStatus.toUpperCase() === 'SUCCESS' ? 'Intiated' : invoiceData.refundStatus.toUpperCase() === 'TXN_SUCCESS' ? 'Intiated' : invoiceData.refundStatus.replace(/_/g, ' ')}</span>
                                        </StatusText>}

                                        <PriceWrapper>
                                            <p className="item-label">Payable by User</p>
                                            <p className="price"><span>₹</span>{invoiceData.costToYou}</p>
                                        </PriceWrapper>
                                        <PriceWrapper>
                                            <p className="item-label">Payable by Insurance</p>
                                            <p className="price"><span>₹</span>{invoiceData.costToInsurance}</p>
                                        </PriceWrapper>
                                        <PriceWrapper>
                                            <p className="item-label alt">Total Amount</p>
                                            <p className="price"><span>₹</span>{invoiceData.totalAmount}</p>
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
                                    {invoiceData.orderStatus && !invoiceData.orderStatus.toLowerCase().includes('cancelled') && !invoiceData.orderStatus.toLowerCase().includes('declined') &&!invoiceData.orderStatus.toLowerCase().includes('rejected') &&
                                        <Button variant={invData.invoiceUrl ? 'primary' : 'disabled'} onClick={() =>{
                                            if(invData.invoiceUrl){
                                            downloadPDFApi(
                                                invData.invoiceUrl,
                                                'invoice'
                                            )}} }>
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
