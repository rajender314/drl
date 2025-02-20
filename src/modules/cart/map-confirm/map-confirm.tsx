import React, { useState, useEffect } from 'react'
// import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router';
import { ProgressBar } from '../../../@lib';
import Donesvg from './donesvg';
import {
    Container,
    DoctorInfoContainer,
    CongratsContainer,
    CongratsIcon,
    CongratsTxtCont,
    CongratsTxt,
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
    PlaceHolder,
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
    StoreIdentity,
    AddressContainer,
    Summary,
    Product



} from './map-confirm-components'
import {
    Icon,

    Button,
    Header,
    Radio
} from "../../../components"
import { Spinner } from '@app/components/icon/icons';
import { useLocation } from '@app/utils';
import { getDiagnosticCartItems } from '@app/@services'
import AddEditAddress from '../../account/account-info/saved-addresses/add-edit-address'

export default function MAPConfirm() {
    const isMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    let storeStr: any = sessionStorage.getItem('CART-STORE-ADDRESS');
    const storeLoc: any = JSON.parse(storeStr)
    const storeLocation = {
        location: {
            latitude: parseFloat(storeLoc.latitude),
            longitude: parseFloat(storeLoc.longitude)
        }
    };
    const { navigate } = useLocation();
    const [loading, setLoading] = useState<boolean>();
    const [userAddress, setUserAddress] = useState<any>([]);
    const [storeAddress, setStoreAddress] = useState<any>([]);
    const [createOrderInfo, setCreateOrderInfo] = useState<any>([]);

    const [mapFlag, setMapFlag] = useState<boolean>(false);


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

    const storeLocator = () => {
        //setEditAddress(temp);
        //setMapFlag(true);
        let lat = parseFloat(storeLoc.latitude);
        let lng = parseFloat(storeLoc.longitude);
        var url = "https://maps.google.com/?q=" + lat + "," + lng;
        window.open(url);
    }
    const storePhone = () => {
        //console.log(storeAddress)
        let tel = "tel:" + storeAddress.phoneNo;
        document.location.href = tel;
    }

    useEffect(() => {
        let userAddress: any = sessionStorage.getItem('CART-DELIVERY-ADDRESS');
        let storeAddress: any = sessionStorage.getItem('CART-STORE-ADDRESS');
        let createOrderInfo: any = sessionStorage.getItem('CART-CREATE-ORDER-INFO');
        let userString: any = sessionStorage.getItem('user');

        if (!userAddress) {
            navigate('/cart/delivery');
        } else if (!storeAddress) {
            navigate('/cart/pickup');
        } else if (!createOrderInfo) {
            navigate('/cart/mapordersummary');
        } else {
            //console.log(JSON.parse(storeAddress))
            setUserAddress(JSON.parse(userAddress))
            setStoreAddress(JSON.parse(storeAddress))
            setCreateOrderInfo(JSON.parse(createOrderInfo))
            setLoading(false);
        }
    }, []);

    const closeMap = () => {
        setMapFlag(false);
    }
    const submit = () => {
        navigate('/order/maporderdetails/' + createOrderInfo.drl_order_id)
        //navigate('/orders')
    }
    const pageBack = () => {
        //navigate('/cart/mapordersummary')
        navigate('/files/prescriptions')
    }
    return (
        <Container>
            {/* {JSON.stringify(storeLoc)} */}
            {/* {isMobile ? 'this is mobile' : 'this is not mobile'} */}
            {loading && <Spinner size='3px' />}
            {mapFlag && (
                <AddEditAddress
                    userInfo={[]}
                    editAddress={storeLocation}
                    getAddressess={closeMap}
                    onClose={closeMap}
                    customHeader={true}
                    height={500}
                    locateOnly={true}
                />
            )
            }

            <Header onClose={pageBack} />
            {/* {JSON.stringify(storeAddress)} */}


            <DoctorInfoContainer>
                <Donesvg />
            </DoctorInfoContainer>
            <DeliveryContainer>

                <PlaceHolder>
                    <CongratsContainer>
                        <CongratsIcon>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#F6F6FA" />
                                <path d="M12.7999 17.5998L10.3999 19.9998L17.5999 27.1998L29.5999 15.1998L27.1999 12.7998L17.5999 22.3998L12.7999 17.5998Z" fill="url(#paint0_linear)" />
                                <defs>
                                    <linearGradient id="paint0_linear" x1="16.9845" y1="16.4442" x2="39.1028" y2="42.1268" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#4DCEBF" />
                                        <stop offset="1" stop-color="white" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </CongratsIcon>
                        <CongratsTxtCont>
                            <CongratsTxt type="header">
                                Congratulations
                            </CongratsTxt>
                            <CongratsTxt type="text">
                                Your order has been successfully placed
                            </CongratsTxt>
                        </CongratsTxtCont>
                    </CongratsContainer>

                    <CongratsTxt type="orderConfirm">
                        Order confirmation
                    </CongratsTxt>

                </PlaceHolder>
                <PlaceHolder>
                    <OrderSummary>
                        <OrderSummaryInfo>
                            <ConfirmImg />
                            <StoreSummary>

                                <SummaryIcn>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.8974 10.3178C3.8974 5.71789 7.83984 2 12.6086 2C17.3909 2 21.3333 5.71789 21.3333 10.3178C21.3333 12.6357 20.4687 14.7876 19.0456 16.6116C17.4757 18.6235 15.5406 20.3765 13.3626 21.7524C12.8641 22.0704 12.4142 22.0944 11.8671 21.7524C9.67662 20.3765 7.74159 18.6235 6.18509 16.6116C4.76097 14.7876 3.8974 12.6357 3.8974 10.3178ZM9.73763 10.5768C9.73763 12.1177 11.0273 13.3297 12.6086 13.3297C14.191 13.3297 15.4931 12.1177 15.4931 10.5768C15.4931 9.0478 14.191 7.77683 12.6086 7.77683C11.0273 7.77683 9.73763 9.0478 9.73763 10.5768Z" fill="#B6B8D7" />
                                    </svg>
                                </SummaryIcn>
                                <SummaryTxt>
                                    <SummaryLabel roll="header">{storeAddress.pharmacyName}</SummaryLabel>
                                    <SummaryLabel roll="txt">Order ID: {createOrderInfo.svaasOrderId}</SummaryLabel>
                                    <SummaryLabel roll="addr">{storeAddress.address}</SummaryLabel>
                                    {!isMobile && <SummaryLabel roll="phone"><Icon name="phoneHandle" />{storeAddress.phoneNo}</SummaryLabel>}
                                </SummaryTxt>
                                <StoreIdentity>
                                    {isMobile && <div onClick={storePhone}><Icon name="phoneHandler" /></div>}
                                    <div onClick={storeLocator}><Icon name="locationPoint" /></div>
                                </StoreIdentity>
                            </StoreSummary>
                        </OrderSummaryInfo>

                        <AddressContainer>
                            <CardTitle>Order Summary</CardTitle>
                            <LabContainer>
                                <PlaceHolder>
                                    {loading == false && createOrderInfo.medicineInfo.length > 0 &&
                                        (<>
                                            <Summary type="header" >
                                                <Product>Product</Product>
                                                <Qty type="header">Order QTY</Qty>
                                            </Summary>
                                            {
                                                createOrderInfo.medicineInfo.map((item: any, index: any) => {
                                                    return (<Summary type="row" >
                                                        <Product>{item.medicine_name}</Product>
                                                        <Qty type="none">{item.qty}</Qty>
                                                    </Summary>)
                                                })
                                            }
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
                                        </>)}
                                </PlaceHolder>
                            </LabContainer>
                        </AddressContainer>
                    </OrderSummary>
                </PlaceHolder>

            </DeliveryContainer>

            <PlaceHolder>
                {loading == false && createOrderInfo.medicineInfo.length > 0 && (<BttnHolder><Button variant='primary' onClick={submit} >Done</Button></BttnHolder>)}

            </PlaceHolder>

        </Container >
    )
}