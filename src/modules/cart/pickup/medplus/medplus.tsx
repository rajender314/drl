import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { currency } from '../../../../utils';
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
    UnavailableIcn

} from './medplus-components'
import {
    Icon,
    Button,
    Header,
    Radio
} from "../../../../components"


export default function Medplus() {

    return (
        <>
            <UpdatePickup isOpened={true}>
                <PlaceHolder>
                    <EditMedicineCont>
                        <Price>
                            <Selection>
                                <Radio
                                    selected="first"
                                    name="address"
                                    type="radio"
                                    value="first"
                                >
                                </Radio>
                            </Selection>
                            <Address>
                                <Customer>MedPlus Kukatpally</Customer>
                                <CustomerAddress>
                                    23 Lajpat Road, Amber Colony,
                                    Opp DLF Mall, New Delhi
                                    pincode - 011000
                                </CustomerAddress>
                            </Address>
                            <TotalPrice>{currency(11110)}</TotalPrice>
                        </Price>

                        <MediCineList>
                            <Selection></Selection>
                            <MediCineListLable>5 kms away</MediCineListLable>
                            <MediCineListIcon>
                                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 7L8 2L15 7" stroke="#494E9D" stroke-width="2" />
                                </svg>
                            </MediCineListIcon>
                        </MediCineList>

                        <MediCineCont>

                            <MediCine>
                                <Selection></Selection>
                                <MediLeftCont>Crocin 650</MediLeftCont>
                                <MediRightCont>{currency(200)}</MediRightCont>
                            </MediCine>
                            <MediCine>
                                <Selection></Selection>
                                <PillLeft>

                                    <div>15 strips</div>
                                    <UnavailableIcn>
                                        <Icon name="removeItem" />
                                        Unavailable
                                    </UnavailableIcn>
                                </PillLeft>
                                <PillRight>
                                    <ErrorMessageCont>
                                        <EditMedicine>
                                            <EditMedicineBox>
                                                <svg width="21" height="4" viewBox="0 0 21 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 2H19.5" stroke="#4BD763" stroke-width="3" stroke-linecap="round" />
                                                </svg>
                                            </EditMedicineBox>
                                            <EditMedicineBoxInput>
                                                <input value="1" type='text' />
                                            </EditMedicineBoxInput>
                                            <EditMedicineBox>

                                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 11H19.5" stroke="#4BD763" stroke-width="3" stroke-linecap="round" />
                                                    <path d="M10.75 19.75L10.75 2.25" stroke="#4BD763" stroke-width="3" stroke-linecap="round" />
                                                </svg>
                                            </EditMedicineBox>
                                        </EditMedicine>
                                        <ErrorMessage>Apologies! but a limited amount are available.</ErrorMessage>
                                    </ErrorMessageCont>
                                </PillRight>
                            </MediCine>
                        </MediCineCont>
                        <Separator />
                        <MediCineCont>
                            <MediCine>
                                <Selection></Selection>
                                <MediLeftCont>dolo 650</MediLeftCont>
                                <MediRightCont>{currency(10)}</MediRightCont>
                            </MediCine>
                            <MediCine>
                                <Selection></Selection>
                                <PillLeft>15 strips</PillLeft>
                                <PillRight>
                                    <EditMedicine>
                                        <EditMedicineBox>
                                            <svg width="21" height="4" viewBox="0 0 21 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 2H19.5" stroke="#4BD763" stroke-width="3" stroke-linecap="round" />
                                            </svg>
                                        </EditMedicineBox>
                                        <EditMedicineBoxInput>
                                            <input value="1" type='text' />
                                        </EditMedicineBoxInput>
                                        <EditMedicineBox>

                                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 11H19.5" stroke="#4BD763" stroke-width="3" stroke-linecap="round" />
                                                <path d="M10.75 19.75L10.75 2.25" stroke="#4BD763" stroke-width="3" stroke-linecap="round" />
                                            </svg>

                                        </EditMedicineBox>
                                    </EditMedicine>

                                </PillRight>
                            </MediCine>
                        </MediCineCont>

                    </EditMedicineCont>
                </PlaceHolder>
            </UpdatePickup>

            <UpdatePickup isOpened={false}>
                <PlaceHolder>
                    <EditMedicineCont>
                        <Price>
                            <Selection>
                                <Radio
                                    selected="first"
                                    name="address"
                                    type="radio"
                                    value="first"
                                >
                                </Radio>
                            </Selection>
                            <Address>
                                <Customer>mudra madhure kulakarni</Customer>
                                <CustomerAddress>
                                    23 Lajpat Road, Amber Colony,
                                    Opp DLF Mall, New Delhi
                                    pincode - 011000
                                </CustomerAddress>
                            </Address>
                            <TotalPrice>{currency(1200)}</TotalPrice>
                        </Price>

                        <MediCineList>
                            <Selection></Selection>
                            <MediCineListLable>5 kms away</MediCineListLable>
                            <MediCineListIcon>
                                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L8 6L15 0.999999" stroke="#494E9D" stroke-width="2" />
                                </svg>

                            </MediCineListIcon>
                        </MediCineList>

                    </EditMedicineCont>
                </PlaceHolder>
            </UpdatePickup>
        </>
    )
}