import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { ProgressBar } from '../../../@lib';
import { useParams } from 'react-router';
import { useLocation } from '@app/utils';
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
    AddressSelection,
    AddressGroup,
    Customer,
    CustomerAddress,
    Selection,
    Address,
    EditIcon,
    EditIconCnt,
    Separator,
    Viewmore,
    AddAddr,
    AddIcn,
    AddIcnTxt,
    Marker,
    Location,
    DefaultAddress,
    Nodata,
    Btncntr

} from './delivery-components'
import {
    Icon,
    Button,
    Header,
    Radio,
    Dialog,
    Pagination
} from "../../../components"
import { Spinner } from '@app/components/icon/icons';
import AddEditAddress from '../../account/account-info/saved-addresses/add-edit-address'
import { getDeliveryAddress } from '@app/@services'

export default function Delivery() {
    const StorageKey = 'CART-DELIVERY-ADDRESS';
    const { navigate } = useLocation();
    let mom_pop = true;
    let stageMessage = (mom_pop) ? 'Choose Pharmacy' : 'Choose Quantity'
    const addressLimit = 2;
    // const { deliveryType }: any = useParams();
    const [mapFlag, setMapFlag] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>();
    const [address, setAddress] = useState<any>([]);

    const [selectedAddress, setSelectedAddress] = useState<any>([]);

    const [displayLimit, setDisplayLimit] = useState(addressLimit);
    const [viewToggle, setViewToggle] = useState('more');
    const [editAddress, setEditAddress] = useState<any>([]);
    const [userInfo, setUserInfo] = useState<any>([])

    const getAddress = () => {
        setLoading(true)
        getDeliveryAddress().then((response: any) => {
            if (response && response.status === 200) {
                let result: any = response.data
                let itemIndex = result.findIndex((address: any) => {
                    return address.isPrimary;
                })
                //console.log('itemIndex', itemIndex)
                if (result.length > 0 && itemIndex == -1) {
                    result[0].isPrimary = true;
                    setAddress(result);
                    setSelectedAddress(result[0])
                }
                if (itemIndex > -1) {
                    let item = result.splice(itemIndex, 1);
                    result = [...item, ...result];
                    setAddress(result);
                    setSelectedAddress(item[0])
                }
            }

        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 100)
        })
    }

    const changeDefaultAddress = (index: number) => {
        address.map((item: any) => {
            item.isPrimary = false;
        });
        address[index].isPrimary = true;
        setAddress([...address]);
        setSelectedAddress(address[index])
    }

    const viewLimit = () => {
        if (viewToggle == 'more') {
            setDisplayLimit(address.length);
            setViewToggle('less')
        }
        if (viewToggle == 'less') {
            setDisplayLimit(addressLimit);
            setViewToggle('more')
        }
    }

    useEffect(() => {
        //console.log('here')
        //console.log(selectedAddress)
        let string = JSON.stringify(selectedAddress);
        sessionStorage.setItem(StorageKey, string);
    }, [selectedAddress]);

    useEffect(() => {
        if (sessionStorage.getItem('IS-CART-ORDER-CREATED') == 'Yes') {
            navigate('/cart')
        } else {
            sessionStorage.setItem(StorageKey, '')
            let user: any = sessionStorage.getItem('user')
            setUserInfo(JSON.parse(user));
            getAddress();
        }
    }, []);

    const userInfo1 =
    {
        userId: 551,
        userPersona: "policyHolder",
        policyHolderFullName: "Abhinav Dubey",
        mobileNumber: "9847032823",
        corporateName: "Dr. Reddys Laboratories",
        emailID: "abhinavdubey0112@gmail.com",
        fullName: "Abhinav Dubey",
        roleShortcode: null,
        insuranceProductName: "Basic family plan",
        opdIdNumber: "OPD74656",
        dependentList: [],
        status_code: 200,
        firstName: "Abhinav",
        lastName: "Dubey",
        profileImage: "http://40.80.85.188:8888/api/user/uploaded_files/free-profile-photo-whatsapp-4.png",
        validity: "2021-07-19T09:31:26.096+0000",
        opdId: "OPD74656",
        employeeNumber: "EMP52436",
        analyticsData: {
            doctorVisits: { count: 10, total: 18 },
            medicineOrders: { count: 15, total: 25 },
            testAvailed: { count: 20, total: 22 },
            available: 50000,
            totalLimit: 4000000,
            perDayLimit: 1000,
            coverage: 10000,
            spent: 6000
        },
        age: 30,
        mobile: "9847032823",
        emailId: "abhinavdubey0112@gmail.com",
        totalCoverage: 500000,
        patientId: "SVEMP-d070bc6b-9e94-11eb-817b-6045bd7243ce"
    }
    const userAddress2 = {
        id: 54,
        addressName: "Home",
        houseBuildingNumber: "22 K colony",
        streetAddress: "243 fh",
        landmark: "Near shiv mandir",
        area: "27 Dm banglow",
        city: "Hyderabad",
        state: "Telangana",
        pin: 500003,
        location: { latitude: 17.3304, longitude: 78.5556 },
        isPrimary: false
    }
    let deliveryProgress = [
        {
            label: 'Select Address',
            subtitle: '',
            name: '',
            content: '',
        },
        {
            label: stageMessage,
            subtitle: '',
            name: '',
            content: '',
        },
        {
            label: 'Review',
            subtitle: '',
            name: '',
            content: '',
        },

    ];

    const setCustomerAddress = (type: string, index: number) => {
        if (type == 'edit') {
            let temp = address[index];
            setEditAddress(temp);
            setMapFlag(true);
        }
        if (type == 'new') {
            setEditAddress(null);
            setMapFlag(true);
        }

    }
    const closeMap = () => {
        setMapFlag(false)
    }
    const getAddressess = () => {
        getAddress();
    }
    const submit = () => {
        navigate('/cart/pickup')
    }
    const pageBack = () => {
        navigate('/cart')
    }
    return (
        <Container>

            {/* {JSON.stringify(selectedAddress)} */}
            {/* {sessionStorage.getItem('IS-CART-ORDER-CREATED')} */}
            {loading && <Spinner size='3px' />}
            {mapFlag && (
                <AddEditAddress
                    userInfo={userInfo}
                    editAddress={editAddress}
                    getAddressess={getAddressess}
                    onClose={closeMap}
                    customHeader={true}
                    height={250}
                />
            )}
            <Header onClose={pageBack} />
            <DoctorInfoContainer>
            <Title>My Cart</Title>
            </DoctorInfoContainer>
            <DeliveryContainer>
                <PlaceHolder>
                    <CardTitle>Delivery</CardTitle>
                    <ProgressWrapper>
                        <ProgressBar
                            startingStep={1}
                            onSubmit={() => { }}
                            steps={deliveryProgress}
                            stepClass='horizontal'
                            progressClass='horizontal'
                            showLabel
                        />
                    </ProgressWrapper>
                </PlaceHolder>

                <AddressContainer>
                    <PlaceHolder>
                        <CardTitle>
                            {(mom_pop) ? 'Select Your Address' : 'Confirm Address for Delivery'}</CardTitle>
                        <AddressGroup>
                            {
                                loading == false && address.length > 0 && address.map((item: any, index: any) => {
                                    return (
                                        <>
                                            {index < displayLimit && <AddressSelection key={index}>
                                                <Selection>
                                                    <Radio
                                                        selected={(item.isPrimary == true) ? item.id : 0}
                                                        name="address"
                                                        type="radio"
                                                        value={item.id}
                                                        onChange={() => { changeDefaultAddress(index) }}>
                                                    </Radio>
                                                </Selection>
                                                <Address>
                                                    <Customer>{item.addressName}
                                                        {(item.isPrimary == true) ? <DefaultAddress>(Default)</DefaultAddress> : ''}
                                                    </Customer>
                                                    {/* {index}-{(item.isPrimary == true) ? 'true' : 'false'} */}
                                                    <CustomerAddress>
                                                        <Location space={true}>{item.houseBuildingNumber},</Location>
                                                        <Location space={true}>{item.streetAddress},</Location>
                                                        <Location space={true}>{item.landmark},</Location>
                                                        <Location space={true}>{item.area},</Location>
                                                        <Location space={true}>{item.city},</Location>
                                                        <Location space={false}>{item.state}-{item.pin}</Location>
                                                    </CustomerAddress>
                                                </Address>
                                                <EditIconCnt onClick={() => {
                                                    setCustomerAddress('edit', index)
                                                }} >
                                                    <EditIcon>
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2583 4.69167C17.5833 5.01667 17.5833 5.54168 17.2583 5.86667L15.7333 7.39167L12.6083 4.26667L14.1333 2.74167C14.4583 2.41667 14.9833 2.41667 15.3083 2.74167L17.2583 4.69167ZM2.5 17.5V14.375L11.7167 5.15834L14.8417 8.28334L5.625 17.5H2.5Z" fill="#BC333A" />
                                                        </svg>
                                                    </EditIcon>
                                                </EditIconCnt>
                                            </AddressSelection>}
                                        </>
                                    )
                                })
                            }
                        </AddressGroup>

                        {loading == false && address.length == 0 && (
                            <Nodata request='Nodata'>
                                <Icon name="noMedicine" />
                                <Nodata request='header'>No addreses found</Nodata>
                                <Nodata request='title'>Please add new addres.</Nodata>
                            </Nodata>)}

                    </PlaceHolder>
                </AddressContainer>
                <Separator />
            </DeliveryContainer>

            <Btncntr>
                {loading == false && address.length > 0 && (<>
                    {addressLimit < address.length && (<Viewmore onClick={viewLimit}>{(viewToggle == 'more') ? 'View More' : 'View Less'}</Viewmore>)}
                </>)}

                {loading == false && (

                    <AddAddr onClick={() => {
                        setCustomerAddress('new', 0)
                    }} >

                        <AddIcn>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00016 2V14" stroke="#BC333A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M14 7.99992H2" stroke="#BC333A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </AddIcn>
                        <AddIcnTxt>
                            Add New Address
                        </AddIcnTxt>
                    </AddAddr>)}

                {loading == false && address.length > 0 && (<Button variant='primary' onClick={submit}>Confirm</Button>)}
            </Btncntr>

        </Container>
    )
}