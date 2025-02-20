import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { ProgressBar } from '../../../@lib';


import {
    Container,
    DoctorInfoContainer,
    InfoTextContainer,
    Title,
    DeliveryContainer,
    AddressContainer,
    PlaceHolder,
    CardTitle,
    ProgressWrapper,
    BttnHolder,
    LabContainer,
    UpdatePickup,
    Summary,
    Qty,
    Product,
    OrderInfo,
    OrderInfoIcn,
    OrderInfoTxt,
    OrderStatusHolder,
    Btncntr

} from './map-order-components'
import {
    Icon,
    Button,
    Header,
    Radio
} from "../../../components"
import { Spinner } from '@app/components/icon/icons';
import { useLocation } from '@app/utils';
import { getDiagnosticCartItems, createMedicineOrder } from '@app/@services'

export default function MAPOrder() {
    const StorageKey = 'CART-CREATE-ORDER-INFO';
    const { navigate } = useLocation();

    const [loading, setLoading] = useState<boolean>();
    const [cartHome, setCartHome] = useState<any>([]);
    const [cartPickup, setCartPickup] = useState<any>([]);
    const [cart, setCart] = useState<any>([]);
    const [createOrderStatus, setCreateOrderStatus] = useState<any>();
    const [createOrderStatusMessage, setCreateOrderStatusMessage] = useState<any>();
    const [CIOC, SetCIOC] = React.useState<any>()
    const [orderProcessing, setOrderProcessing] = useState<boolean>(false);    
    const [tref, seTref] = useState<any>();

    let deliveryProgress = [
        {
            label: 'Select Address',
            subtitle: '',
            name: '',
            content: '',
        },
        {
            label: 'Choose Pharmacy',
            subtitle: '',
            name: '',
            content: '',
        },
        {
            label: 'Review',
            subtitle: '',
            name: '',
            content: '',
            reviewStep: true
        },

    ];
    const getCartItems = () => {
        setLoading(true)
        getDiagnosticCartItems().then((result) => {
            //console.log(result)
            if (result && result.status == 200) {
                let medicineItems = result.data.medicineItems;
                if (medicineItems) {
                    let home = medicineItems.homeDeliveryItems;
                    let pickup = medicineItems.storePickupItems;
                    //console.log(pickup)
                    setCartHome(home);
                    setCartPickup(pickup);
                    //setCart(home);
                    setCart(pickup);
                    cartOperation({ key: 'reset', value: pickup.length })
                } else {
                    cartOperation({ key: 'empty', value: 0 })
                }
            } else {
                cartOperation({ key: 'empty', value: 0 })
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        let userAddress: any = sessionStorage.getItem('CART-DELIVERY-ADDRESS');
        let storeAddress: any = sessionStorage.getItem('CART-STORE-ADDRESS');

        if (!userAddress) {
            navigate('/cart/delivery');
        }
        if (!storeAddress) {
            navigate('/cart/pickup');
        }
        sessionStorage.setItem(StorageKey, '')
        getCartItems();
    }, []);

    const concatenate = (string: string) => {
        return (string && string.trim().length > 0) ? ", " + string : ""
    }

    const getUserAddress = (user: any) => {
        // console.log(user)
        return (user.houseBuildingNumber +
            concatenate(user.streetAddress) +
            concatenate(user.landmark) +
            concatenate(user.area) +
            concatenate(user.city) +
            concatenate(user.state))
    }

    const submit = () => {

        clearTimeout(tref)
        if (sessionStorage.getItem('IS-CART-ORDER-CREATED') == 'Yes' || orderProcessing == true) {
            return false;
        }
        setOrderProcessing(true)
        //setTimeout(() => { setOrderProcessing(false); }, 3000)
        //alert(orderProcessing)
        let userAddressString: any = sessionStorage.getItem('CART-DELIVERY-ADDRESS');
        let storeAddressString: any = sessionStorage.getItem('CART-STORE-ADDRESS');
        let userString: any = sessionStorage.getItem('user');
        if (userAddressString && storeAddressString) {
            let userAddress = JSON.parse(userAddressString);
            let storeAddress = JSON.parse(storeAddressString);
            let user = JSON.parse(userString);

            // console.log(user);
            // console.log(storeAddress)
            // console.log(userAddress)

            let MedicineInfo: any = [];
            let prescription_url: any = []
            cart.map((item: any, index: any) => {
                //if (item.medicineSvaasId) {
                let temp = {
                    cartId: item.id,
                    medicine_id: item.medicineSvaasId,
                    medicine_name: item.medicineName,
                    prescriptionId: item.prescriptionId,
                    qty: item.pillCount,
                }
                MedicineInfo.push(temp)
                if (item.prescriptionUrl) {
                    prescription_url.push(item.prescriptionUrl);
                }

                //}
            })
            prescription_url = Array.from(new Set(prescription_url));
            //console.log(prescription_url)

            let MedicineInfo2: any = [
                {
                    medicine_id: "SVMED-997df-ab786t76-a8s97f-a880d7",
                    medicine_name: "AUGMENTIN DUO 625MG TAB",
                    qty: 20
                },
                {
                    medicine_id: "SVMED-88100d3e-1257-4a01-af62-efb2b8b6c567",
                    medicine_name: "ALOEDERM MOISTURISING 200ML LOTION",
                    qty: 10
                }
            ]


            let pdfLink = "https://media.healthplix.in/tempPdfFiles/1629378308_pdf_6VleNr5JWdjTB80CnXiv.pdf"
            let createOrder = {
                "address": getUserAddress(userAddress),
                "authorization_code": "null",
                "created_by": user.userId,
                "customerName": user.firstName + ' ' + user.lastName,
                "insurance_company": user.insurancePartnerName,
                "insurance_id": user.insurancePartnerId,
                "medicineInfo": MedicineInfo,
                "mobileNumber": user.mobile,
                "policy_number": user.opdId,
                "prescription_url": prescription_url,
                //"prescription_url": [pdfLink],
                "state_code": userAddress.state,  // user address
                "storeId": storeAddress.branchId,
                "uhid": user.opdId
            }
            //console.log('proceed')
            // console.log(createOrder)
            // return false

            createMedicineOrder(createOrder).then((response) => {
                if (response && response.status != 500 && response.status != 400) {
                    setCreateOrderStatus(true);
                    let string = JSON.stringify(response);
                    sessionStorage.setItem(StorageKey, string);
                    cartOperation({ key: 'empty', value: 0 })
                    sessionStorage.setItem('IS-CART-ORDER-CREATED', 'Yes');
                    navigate('/cart/maporderconfirm')
                } else {
                    setCreateOrderStatusMessage(response.data.message)
                    setCreateOrderStatus(false);
                    setOrderProcessing(false)
                    seTref(setTimeout(() => { setCreateOrderStatus(true); }, 3000))
                }
            })

        }
    }
    const cancel = () => {
        if(orderProcessing == true) {
            return false;
        }
        navigate('/cart')
    }
    const pageBack = () => {
        navigate('/cart/pickup')
    }
    const cartOperation = (code: any) => {
        SetCIOC(code);
        setTimeout(() => { SetCIOC('') }, 500)
    }
    return (
        <Container>
            {/* {JSON.stringify(sessionStorage.getItem('CART-DELIVERY-ADDRESS'))} */}
            {/* {sessionStorage.getItem('IS-CART-ORDER-CREATED')} */}
            {loading && <Spinner size='3px' />}
            <Header onClose={pageBack} CIOC={CIOC} />
            <DoctorInfoContainer>
                <Title>My Cart</Title>
            </DoctorInfoContainer>
            <DeliveryContainer>
                <PlaceHolder>
                    <CardTitle>Pickup</CardTitle>
                    <ProgressWrapper>
                        <ProgressBar
                            startingStep={3}
                            onSubmit={() => { }}
                            steps={deliveryProgress}
                            stepClass='horizontal'
                            progressClass='horizontal'
                            showLabel
                        />
                    </ProgressWrapper>
                </PlaceHolder>


                <AddressContainer>
                    <CardTitle>Order Summary</CardTitle>
                    <LabContainer>
                        <PlaceHolder>
                            {loading == false && cart.length > 0 &&
                                (<>
                                    <Summary type="header" >
                                        <Product>Product</Product>
                                        <Qty type="header">Order QTY</Qty>
                                    </Summary>
                                    {
                                        cart.map((item: any, index: any) => {
                                            return (<Summary type="row" >
                                                <Product>{item.medicineName}</Product>
                                                <Qty type="none">{item.pillCount}</Qty>
                                            </Summary>)
                                        })
                                    }
                                    <OrderInfo isBorder={false} >
                                        <OrderInfoIcn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.66989 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66989C2.27989 19.999 -0.000106812 17.62 -0.000106812 14.09V5.91902C-0.000106812 2.37902 2.27989 -0.000976562 5.66989 -0.000976562ZM9.98989 7.06002C9.51989 7.06002 9.12989 6.66902 9.12989 6.19002C9.12989 5.70002 9.51989 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98989 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98989 14.65C9.50989 14.65 9.11989 14.26 9.11989 13.78V9.36002C9.11989 8.87902 9.50989 8.48002 9.98989 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="#BDBDBD" />
                                            </svg>
                                        </OrderInfoIcn>
                                        <OrderInfoTxt pos=''>
                                            Pricing and Available Quantities will be updated only after visiting the pharmacy store
                                        </OrderInfoTxt>
                                    </OrderInfo>
                                </>)}
                            {loading == false && cart.length == 0 && (
                                <OrderInfoTxt pos='center'>
                                    No Order Summary Found.
                                </OrderInfoTxt>
                            )}
                        </PlaceHolder>
                    </LabContainer>
                </AddressContainer>



            </DeliveryContainer>

            <Btncntr>


                {/* {createOrderStatus == false && <OrderStatusHolder>Apologies! Please try again.</OrderStatusHolder>} */}
                {createOrderStatus == false && <OrderStatusHolder>{createOrderStatusMessage}</OrderStatusHolder>}
                
                {loading == false && cart.length > 0 && (
                    <BttnHolder><Button
                        onClick={submit}
                        variant={(sessionStorage.getItem('IS-CART-ORDER-CREATED') == 'No' && orderProcessing == false) ? 'primary' : 'disabled'} >Place Order</Button></BttnHolder>)}

                {loading == false && cart.length > 0 && sessionStorage.getItem('IS-CART-ORDER-CREATED') == 'No' &&
                    (<Button 
                    variant={orderProcessing == false ? 'secondary' : 'disabled'}
                    onClick={cancel} >Cancel</Button>)}

            </Btncntr>

        </Container>
    )
}