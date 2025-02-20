import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router';
import { useLocation } from '@app/utils';
import {
    Container,
    MedicineContainer,
    MedicineTitle,
    MedicineName,
    MedicineDesc,
    EditMedicine,
    MedicineEditContainer,
    MedicineEditBox,
    MedicineEditRuler,
    Icn,
    IcnTextSwitch,
    IcnTextRemove,
    MedicinePrescriptionContainer,
    MedicinePrescription,
    MedicinePrescriptionCell,
    RadioButton,
    MedInfo,
    MedicineNameIcn,
    PrescriptionCell,
    PrescriptionCellData,
    Nodata,
    TabletContainer,
    TabletName,
    DeliveryLabel,
    Btncntr

} from './medication-components'
import {
    Icon,
    Button,
    Header,
    Tabs,
    Radio,
} from "../../../components"
import { Spinner } from '@app/components/icon/icons';
import { getDiagnosticCartItems, deleteCartItem, cartItemToggle } from '@app/@services'
import { async } from 'q';

type Props = {
    cartOperation?: any
};

export default function Medication({ cartOperation }: Props) {
    const StorageKey: any = 'IS-CART-ORDER-CREATED';
    const { navigate } = useLocation();
    let cartHomeResult = [
        {
            tab: 'crocine 650-h',
            prescription: {
                pillCount: 50,
                form: 'Tablet',
                dosage: '1-1-1',
                timeing: 'Pre Meal',
                frequency: 'daily once',
                duration: '3 months'
            }
        },
        {
            tab: 'Paracetomol',
            prescription: {
                pillCount: 50,
                form: 'Tablet',
                dosage: '1-1-1',
                timeing: 'Pre Meal',
                frequency: 'daily once',
                duration: '3 months'
            }
        }
    ]
    let cartPickupResult = [
        {
            tab: 'crocine 650-p',
            prescription: {
                pillcount: 50,
                form: 'Tablet',
                dosage: '1-1-1',
                timeing: 'Pre Meal',
                frequency: 'daily once',
                duration: '3 months'
            }
        },
        {
            tab: 'Paracetomol',
            prescription: {
                pillcount: 50,
                form: 'Tablet',
                dosage: '1-1-1',
                timeing: 'Pre Meal',
                frequency: 'daily once',
                duration: '3 months'
            }
        }
    ];
    let mom_pop = true;
    const [loading, setLoading] = useState<boolean>();
    const [deliveryType, setDeliveryType] = useState<string>('pickup');
    const [cartHome, setCartHome] = useState<any>([]);
    const [cartPickup, setCartPickup] = useState<any>([]);
    const [cart, setCart] = useState<any>([]);
    const switchDelivery = (e: any) => {
        setDeliveryType(e.target.value);
        (e.target.value == 'delivery') ? (setCart(cartHome)) : (setCart(cartPickup))
    }
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
                    //cartOperation({ key: 'reduceTo', value: pickup.length })
                    cartOperation({ key: 'reset', value: pickup.length })
                    //setCart([]);
                } else {
                    cartOperation({ key: 'empty', value: 0 })
                }
            } else {
                cartOperation({ key: 'empty', value: 0 })
            }
            setLoading(false);
        })
    }
    const removeCartItem = (id: number) => {
        setLoading(true)
        deleteCartItem(id).then((result) => {

        }).finally(() => {
            setLoading(false);
        })
    }
    const moveCartItem = (id: number, param: any) => {
        setLoading(true)
        cartItemToggle(id, param).then((result) => {
        }).finally(() => {
            setLoading(false);

        })
    }
    useEffect(() => {
        sessionStorage.setItem(StorageKey, 'No');
        getCartItems();
    }, []);

    const toggleCollapse = (index: number) => {
        cart[index].collapse = !cart[index].collapse;
        setCart([...cart]);
    };
    const cartAction = (action: string, index: number) => {
        // console.log(action)
        // console.log(index)
        //deleteCartItem(12)
        if (action == 'remove') {
            let item = cart.splice(index, 1);
            let id = item[0]['id'];
            setCart([...cart])
            removeCartItem(id)
            cartOperation({ key: 'remove', value: 0 })
        }
        if (action == 'switch') {

            let item = cart.splice(index, 1);
            let id = item[0]['id'];
            if (deliveryType == 'delivery') {
                setCartPickup([...cartPickup, item[0]]);
                moveCartItem(id, { "moveTo": "PICKUP" })
            }
            if (deliveryType == 'pickup') {
                setCartHome([...cartHome, item[0]]);
                moveCartItem(id, { "moveTo": "DELIVERY" })
            }
        }
    }
    const submit = () => {
        navigate('/cart/delivery')
    }
    return (
        <Container>
            {loading && <Spinner size='3px' />}
            <DeliveryLabel>Pharmacy Pickup</DeliveryLabel>
            {!mom_pop && <RadioButton>
                <Radio
                    selected={deliveryType}
                    name="deliveryType"
                    type="radio"
                    value="delivery"
                    onChange={switchDelivery}>
                    Delivery
                </Radio>
                <Radio
                    selected={deliveryType}
                    name="deliveryType"
                    type="radio"
                    value="pickup"
                    onChange={switchDelivery}>
                    Pick Up
                </Radio>
            </RadioButton>}
            {
                loading == false && cart.length > 0 && cart.map((item: any, index: any) => {
                    return (
                        <MedicineContainer key={index}>
                            <MedInfo>
                                <TabletContainer>
                                    <TabletName>{item.medicineName}</TabletName>

                                    <MedicineNameIcn onClick={() => toggleCollapse(index)}>
                                        <Icon name="collapse" params={{ collapse: (item.collapse) ? true : false }} />
                                    </MedicineNameIcn>
                                </TabletContainer>
                                <MedicineDesc>Price may vary</MedicineDesc>
                            </MedInfo>

                            {!mom_pop && <EditMedicine>
                                <MedicineEditContainer>
                                    <MedicineEditBox onClick={() => cartAction('switch', index)}>
                                        <Icn>
                                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.8335 3.66671L12.5002 7.00004H15.0002C15.0002 9.75837 12.7585 12 10.0002 12C9.1585 12 8.3585 11.7917 7.66683 11.4167L6.45016 12.6334C7.47516 13.2834 8.69183 13.6667 10.0002 13.6667C13.6835 13.6667 16.6668 10.6834 16.6668 7.00004H19.1668L15.8335 3.66671ZM5.00016 7.00004C5.00016 4.24171 7.24183 2.00004 10.0002 2.00004C10.8418 2.00004 11.6418 2.20837 12.3335 2.58337L13.5502 1.36671C12.5252 0.716707 11.3085 0.333374 10.0002 0.333374C6.31683 0.333374 3.3335 3.31671 3.3335 7.00004H0.833496L4.16683 10.3334L7.50016 7.00004H5.00016Z" fill="#007AFF" />
                                            </svg>
                                        </Icn>
                                        <IcnTextSwitch>
                                            {(deliveryType == 'delivery') ? 'Switch Pickup' : 'Switch Delivery'}
                                        </IcnTextSwitch>
                                    </MedicineEditBox>
                                    <MedicineEditRuler></MedicineEditRuler>
                                    <MedicineEditBox onClick={() => cartAction('remove', index)}>
                                        <Icn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1.6665" y="1.66663" width="16.6667" height="16.6667" rx="8" fill="#EB5757" />
                                                <path d="M12.4998 10.8333H7.49984C6.99984 10.8333 6.6665 10.5 6.6665 9.99996C6.6665 9.49996 6.99984 9.16663 7.49984 9.16663H12.4998C12.9998 9.16663 13.3332 9.49996 13.3332 9.99996C13.3332 10.5 12.9998 10.8333 12.4998 10.8333Z" fill="white" />
                                            </svg>
                                        </Icn>
                                        <IcnTextRemove>Remove</IcnTextRemove>
                                    </MedicineEditBox>
                                </MedicineEditContainer>
                            </EditMedicine>}
                            {mom_pop && <EditMedicine>
                                <MedicineEditContainer>
                                    <MedicineEditBox onClick={() => cartAction('remove', index)}>
                                        <Icn>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="1.6665" y="1.66663" width="16.6667" height="16.6667" rx="8" fill="#EB5757" />
                                                <path d="M12.4998 10.8333H7.49984C6.99984 10.8333 6.6665 10.5 6.6665 9.99996C6.6665 9.49996 6.99984 9.16663 7.49984 9.16663H12.4998C12.9998 9.16663 13.3332 9.49996 13.3332 9.99996C13.3332 10.5 12.9998 10.8333 12.4998 10.8333Z" fill="white" />
                                            </svg>
                                        </Icn>
                                        <IcnTextRemove>Remove</IcnTextRemove>
                                    </MedicineEditBox>
                                </MedicineEditContainer>
                            </EditMedicine>}

                            {((item.collapse) ? true : false) && <MedicinePrescriptionContainer>
                                <MedicinePrescription>
                                    <MedicinePrescriptionCell pos='left'>
                                        <PrescriptionCellData ftype='bold'>{item.pillCount}</PrescriptionCellData>
                                        <PrescriptionCellData ftype='normal'>Pill Count</PrescriptionCellData>
                                    </MedicinePrescriptionCell>

                                    <MedicinePrescriptionCell pos='center'>
                                        <PrescriptionCellData ftype='bold'>{item.form}</PrescriptionCellData>
                                        <PrescriptionCellData ftype='normal'>Form</PrescriptionCellData>
                                    </MedicinePrescriptionCell>

                                    <MedicinePrescriptionCell pos='right'>
                                        <PrescriptionCellData ftype='bold'>{item.dosage}</PrescriptionCellData>
                                        <PrescriptionCellData ftype='normal'>Dosage</PrescriptionCellData>
                                    </MedicinePrescriptionCell>

                                </MedicinePrescription>
                                <MedicinePrescription>
                                    <MedicinePrescriptionCell pos='left'>
                                        <PrescriptionCellData ftype='bold'>{item.timing}</PrescriptionCellData>
                                        <PrescriptionCellData ftype='normal'>Timing</PrescriptionCellData>
                                    </MedicinePrescriptionCell>
                                    <MedicinePrescriptionCell pos='center'>
                                        <PrescriptionCellData ftype='bold'>{item.frequency}</PrescriptionCellData>
                                        <PrescriptionCellData ftype='normal'>Frequency</PrescriptionCellData>
                                    </MedicinePrescriptionCell>
                                    <MedicinePrescriptionCell pos='right'>
                                        <PrescriptionCellData ftype='bold'>{item.duration}</PrescriptionCellData>
                                        <PrescriptionCellData ftype='normal'>Duration</PrescriptionCellData>
                                    </MedicinePrescriptionCell>
                                </MedicinePrescription>
                            </MedicinePrescriptionContainer>}
                        </MedicineContainer>
                    )
                })
            }
            <Btncntr>
                {loading == false && cart.length == 0 && (<Nodata request='Nodata'>
                    <Icon name="noMedicine" />
                    <Nodata request='header'>No medicines in your cart</Nodata>
                    <Nodata request='title'>Please add medicines from Prescription.</Nodata>
                </Nodata>)}
                {loading == false && cart.length > 0 && (<Button onClick={submit} variant='primary'>
                    {(deliveryType == 'delivery') ? 'Home Delivery' : 'Place Order'}</Button>)}
            </Btncntr>
        </Container >
    )
}