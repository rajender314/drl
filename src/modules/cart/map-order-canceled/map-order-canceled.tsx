import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
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
    Product,
    OrderItem,
    ItemName,
    ItemCount,
    OrderStatus,
    OrderStatusTxt,
    OrderStatusPill,
    PaymentBttn

} from './map-order-canceled-components'
import {
    Icon,
    Button,
    Header,
    Radio
} from "../../../components"

import { useLocation } from '@app/utils';
export default function MAPOrderCanceled() {

    return (
        <Container>
            <Header />
            <DoctorInfoContainer>
                <Icon name="OrderCancelImgLarge" />
            </DoctorInfoContainer>
            <DoctorInfoContainer>
                <InfoTextContainer>
                    <Title>Order Cancelled</Title>
                </InfoTextContainer>
            </DoctorInfoContainer>
            <DeliveryContainer>

                <PlaceHolder>
                    <OrderStatus>
                        <OrderStatusTxt>Order Status</OrderStatusTxt>
                        <OrderStatusPill status="success">Refund Initiated</OrderStatusPill>
                    </OrderStatus>
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
                                    <SummaryLabel roll="header">Vijay Pharma</SummaryLabel>
                                    <SummaryLabel roll="txt">Order ID: 000000</SummaryLabel>
                                    <SummaryLabel roll="addr">23 Lajpat Road, Amber Colony, Opp DLF Mall, New Delhi</SummaryLabel>
                                </SummaryTxt>
                                <StoreIdentity>
                                    <OrderStatusPill status="canceled">Canceled</OrderStatusPill>
                                </StoreIdentity>
                            </StoreSummary>
                            <LabContainer>
                                <PlaceHolder>
                                    <Summary type="header" >
                                        <OrderItem args={{ width: 60, isBold: true, align: 'left' }}>Product</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'center' }}>Quantity</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'right' }}>Amount</OrderItem>
                                    </Summary>
                                    <Summary type="row" >
                                        <OrderItem args={{ width: 60, isBold: false, align: 'left' }}>
                                            Crocine
                                        </OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'center' }}>10</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(200)}</OrderItem>
                                    </Summary>
                                    <Summary type="row" >
                                        <OrderItem args={{ width: 60, isBold: false, align: 'left' }}>
                                            Dolo
                                        </OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'center' }}>20</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: false, align: 'right' }}>{currency(2100)}</OrderItem>
                                    </Summary>



                                    <Summary type="header" >
                                        <OrderItem args={{ width: 80, isBold: true, align: 'left' }}>Total Cost</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'right' }}>{currency(1200)}</OrderItem>
                                    </Summary>
                                    <Summary type="header" >
                                        <OrderItem args={{ width: 80, isBold: true, align: 'left' }}>Refund Amount</OrderItem>
                                        <OrderItem args={{ width: 20, isBold: true, align: 'right' }}>{currency(200)}</OrderItem>
                                    </Summary>
                                </PlaceHolder>
                            </LabContainer>
                        </OrderSummaryInfo>
                    </OrderSummary>
                </PlaceHolder>
            </DeliveryContainer>

            <PlaceHolder>
                <BttnHolder><Button variant='primary' >Done</Button></BttnHolder>
            </PlaceHolder>

        </Container >
    )
}