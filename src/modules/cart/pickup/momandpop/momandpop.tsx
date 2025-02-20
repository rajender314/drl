import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router';
import { currency } from '../../../../utils';
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
    LabContainer,
    LabHeader,
    LabHeaderName,
    LabHeaderPrice,
    MediCineCont,
    UpdatePickup,
    MediCine,
    MediLeftCont,
    MediRightCont,
    Customer,
    CustomerAddress,
    Selection,
    Price,
    TotalPrice,
    Address,
    Separator,
    EditMedicine,
    EditMedicineBox,
    EditMedicineBoxInput,
    PillLeft,
    PillRight,
    EditMedicineCont,
    MediCineList,
    MediCineListLable,
    MediCineListIcon,
    ErrorMessage,
    ErrorMessageCont,
    UnavailableIcn,
    FilterContainer,
    FilterLabel,
    Nodata,
    PaginationHolder,
    Viewmore

} from './momandpop-components'
import {
    Icon,
    Pagination,
    Button,
    Header,
    Radio,
    Select
} from "../../../../components"
import { getMomandPopStores } from '@app/@services'
import { Spinner } from '@app/components/icon/icons';

type selectStoreType = {
    id: any, index: number
}

export default function MomAndPop() {
    const StorageKey = 'CART-STORE-ADDRESS';
    const { navigate } = useLocation();
    const sortyBy = [
        { "label": "Nearest to Farthest", "value": 'NEAR_TO_FAR' },
        { "label": "Farthest to Nearest", "value": 'FAR_TO_NEAR' }]
    const [selectSortyBy, setSelectSortyBy] = useState<any>({ "label": "Nearest to Farthest", "value": 'NEAR_TO_FAR' });
    const [loading, setLoading] = useState<boolean>();
    const [stores, setStores] = useState<any>([]);
    const [totalStores, setTotalStores] = useState<any>();
    const [selectedStore, setSelectedStore] = useState<any>({});

    const [currentPage, setCurrentPage] = useState(-1);
    const PageSize = 10;

    const getMomAndPopStores = (sortyBy: any) => {
        setLoading(true)
        let cartDeliveryAddressString: any = sessionStorage.getItem('CART-DELIVERY-ADDRESS');
        let cartDeliveryAddress = JSON.parse(cartDeliveryAddressString);
        //console.log(cartDeliveryAddress)
        let param = {
            pinCode: cartDeliveryAddress && cartDeliveryAddress.pin,
            location: cartDeliveryAddress && cartDeliveryAddress.location,
            pageSize: PageSize,
            pageNo: currentPage,
            filter: sortyBy.value
        }
        //console.log(param)
        getMomandPopStores(param).then((result: any) => {
            if (result) {
                //console.log(result)
                let records = result.entries;
                let totalRecords = result.total;
                if (currentPage == 0) {
                    if (records.length) {
                        let temp = { id: records[0].branchId, index: 0 };
                        setSelectedStore(temp);
                        let string = JSON.stringify(records[0]);
                        sessionStorage.setItem(StorageKey, string);
                    }
                    
                    setStores(records)
                } else {
                    setStores([...stores, ...records])
                }
                setTotalStores(totalRecords);
            }
            setLoading(false);
        })
    }
    useEffect(() => {
        //console.log('calling page no: ' + currentPage)
        if (currentPage > -1) {
            // let records = (currentPage * PageSize);
            // let allStores = [...totalStores]
            // let stores = allStores.splice(0, records);
            // setStores(stores)
            getMomAndPopStores(selectSortyBy);
        }
    }, [currentPage]);

    const onFilterChange = (option: any) => {
        setSelectSortyBy(option);
        if (currentPage != 0) {
            setCurrentPage(0);
        } else {
            getMomAndPopStores(option);
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('IS-CART-ORDER-CREATED') == 'Yes') {
            navigate('/cart')
        } else {
            sessionStorage.setItem(StorageKey, '')
            let cartDeliveryAddressString: any = sessionStorage.getItem('CART-DELIVERY-ADDRESS');
            if (!cartDeliveryAddressString) {
                navigate('/cart/delivery')
            } else {
                setCurrentPage(0)
            }
        }
    }, []);

    const toggleCollapse = (index: number) => {
        stores.map((store: any, position: number) => {
            //console.log(position, index)
            if (index != position) {
                store.openMedicinList = false;
                store.openStore = false;
            }
        });

        let collapse = !stores[index].openMedicinList;
        stores[index].openMedicinList = collapse;
        stores[index].openStore = collapse;
        setStores([...stores]);
    };
    const selectStore = (position: number) => {
        let temp = { id: stores[position].branchId, index: position };
        //console.log(temp)        
        setSelectedStore(temp);
        let string = JSON.stringify(stores[position]);
        sessionStorage.setItem(StorageKey, string);
    }
    const submit = () => {
        if (selectedStore.id) {
            navigate('/cart/mapordersummary')
        }
    }

    return (
        <AddressContainer>
            {/* {JSON.stringify(selectedStore)} */}
            {/* {JSON.stringify(selectedStore)} */}
            {/* page: = {currentPage},
            current showing : = {stores.length},
            total Stores: {totalStores} */}
            {/* {sessionStorage.getItem('IS-CART-ORDER-CREATED')} */}
            {loading && <Spinner size='3px' />}
            {stores.length > 0 && (<>
                <CardTitle>SELECT Pharmacy for MEDICINE PICK UP</CardTitle>
                <FilterContainer>
                    <FilterLabel>Sort by</FilterLabel>
                    <Select
                        options={sortyBy}
                        value={selectSortyBy}
                        onChange={(option) => { onFilterChange(option); }}
                    />
                </FilterContainer>
                <PlaceHolder>
                    <LabHeader>
                        <LabHeaderName>Pharmacy Name</LabHeaderName>
                        <LabHeaderPrice></LabHeaderPrice>
                    </LabHeader>
                </PlaceHolder>
                {stores.map((store: any, index: any) => {
                    return (<UpdatePickup isOpened={store.openStore == true}>
                        <PlaceHolder>
                            <EditMedicineCont>
                                <Price>
                                    <Selection>
                                        <Radio
                                            selected={(selectedStore?.id == store.branchId) ? store.branchId : null}
                                            name="address"
                                            type="radio"
                                            value={store.branchId}
                                            onChange={() => { selectStore(index) }}>
                                        </Radio>
                                    </Selection>
                                    <Address>
                                        <Customer>{store.pharmacyName}</Customer>
                                        <CustomerAddress>{store.address}</CustomerAddress>
                                    </Address>
                                    <TotalPrice></TotalPrice>
                                </Price>

                                <MediCineList>
                                    <Selection></Selection>
                                    <MediCineListLable>{store.distance.toFixed(2)} kms away</MediCineListLable>
                                    <MediCineListIcon>
                                        {/*
                                        onClick={() => toggleCollapse(index)}
                                        <Icon name="collapse" params={{ collapse: (store.openMedicinList == true) ? true : false }} /> */}
                                    </MediCineListIcon>
                                </MediCineList>

                                {store.openMedicinList == true && (
                                    <>
                                        <MediCineCont>
                                            <MediCine>
                                                <Selection></Selection>
                                                <MediLeftCont>Crocin 650</MediLeftCont>
                                                <MediRightCont>16</MediRightCont>
                                            </MediCine>
                                        </MediCineCont>

                                        <Separator />

                                        <MediCineCont>
                                            <MediCine>
                                                <Selection></Selection>
                                                <MediLeftCont>Crocin 650</MediLeftCont>
                                                <MediRightCont>16</MediRightCont>
                                            </MediCine>
                                        </MediCineCont>

                                        <Separator />

                                        <MediCineCont>
                                            <MediCine>
                                                <Selection></Selection>
                                                <MediLeftCont>Crocin 650</MediLeftCont>
                                                <MediRightCont>16</MediRightCont>
                                            </MediCine>
                                        </MediCineCont>
                                    </>)}

                            </EditMedicineCont>

                        </PlaceHolder>
                    </UpdatePickup>)
                })
                }
                {/* <PaginationHolder>
                    <Pagination
                        siblingCount={0}
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={totalStores.length}
                        pageSize={PageSize}
                        onPageChange={(page: number) => { setCurrentPage(page) }}
                    /> </PaginationHolder> */}
                <PlaceHolder>
                    {
                        (stores.length < totalStores) &&
                        (<Viewmore onClick={() => {
                            setCurrentPage((page) => { return page + 1 })
                        }}>View More</Viewmore>)
                    }

                    <Button onClick={submit} variant={selectedStore?.id ? 'primary' : 'disabled'}>Proceed</Button>
                </PlaceHolder>
            </>)}
            {loading == false && stores.length == 0 && (
                <PlaceHolder>
                    <Nodata request='Nodata'>
                        <Icon name="nostore" />
                        <Nodata request='header'>No store found</Nodata>
                        <Nodata request='title'>Please search using other address.</Nodata>
                    </Nodata>
                </PlaceHolder>
            )}
        </AddressContainer>
    )
}