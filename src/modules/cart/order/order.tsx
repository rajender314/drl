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
    LabContainer,
    UpdatePickup,
    Summary,
    Qty,
    Description,
    Amount,
    Separator,
    OrderInfo,
    OrderInfoIcn,
    OrderInfoTxt,
    BttnHolder


} from './order-components'
import {
    Icon,

    Button,
    Header,
    Radio
} from "../../../components"


export default function Oreder() {
    let deliveryProgress = [
        {
            label: 'Select Address',
            subtitle: '',
            name: '',
            content: '',
        },
        {
            label: 'Choose Quantity',
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
    return (
        <Container>
            <Header />
            <DoctorInfoContainer>
                <InfoTextContainer>
                    <Title>My Cart</Title>
                </InfoTextContainer>
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
                    <PlaceHolder>
                        <CardTitle>Order Summary</CardTitle>
                    </PlaceHolder>
                    <LabContainer>
                        <UpdatePickup>
                            <PlaceHolder>
                               
                                    <Summary type="header" >
                                        <Qty type="none">QTY</Qty>
                                        <Description>Description</Description>
                                        <Amount lablel="" >Amount</Amount>
                                    </Summary>

                                    <Summary type="row" >
                                        <Qty type="none">1</Qty>
                                        <Description>Crocine</Description>
                                        <Amount lablel="prescription" >&#8377; 450</Amount>
                                    </Summary>
                                    <Summary type="row" >
                                        <Qty type="none">2</Qty>
                                        <Description>Dolo</Description>
                                        <Amount lablel="prescription" >450</Amount>
                                    </Summary>
                                    <Summary type="row" >
                                        <Qty type="none">2</Qty>
                                        <Description>Paracetamol</Description>
                                        <Amount lablel="prescription" >450</Amount>
                                    </Summary>
                                    <Summary type="total-cost" >
                                        <Qty type="total">Total Cost</Qty>
                                        <Amount lablel="totlal-prescription" >800</Amount>
                                    </Summary>
                                    <Summary type="other" >
                                        <Qty type="other">Insurance Coverage</Qty>
                                        <Amount lablel="prescription" >800</Amount>
                                    </Summary>
                                    <Summary type="other" >
                                        <Qty type="other">cost to you</Qty>
                                        <Amount lablel="prescription" >400</Amount>
                                    </Summary>
                                    <Summary type="other" >
                                        <Qty type="other">Not covered by Insurance</Qty>
                                        <Amount lablel="prescription" >45</Amount>
                                    </Summary>
                                    <Summary type="other" >
                                        <Qty type="other">GST</Qty>
                                        <Amount lablel="prescription" >45</Amount>
                                    </Summary>

                                    
                                        <OrderInfo isBorder={true} >
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
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut imperdiet risus.
                                            </OrderInfoTxt>
                                        </OrderInfo>
                                    
                               
                            </PlaceHolder>
                        </UpdatePickup>
                    </LabContainer>
                </AddressContainer>

            </DeliveryContainer>

            <PlaceHolder>
                <BttnHolder><Button variant='primary' >Confirm Odrder</Button></BttnHolder>
                <BttnHolder><Button variant='secondary'>Cancel</Button></BttnHolder>
            </PlaceHolder>

        </Container>
    )
}