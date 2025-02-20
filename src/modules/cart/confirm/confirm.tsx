import React, { useState, useEffect } from 'react'
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
    Summary,
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
    BttnHolder


} from './confirm-components'
import {
    Icon,

    Button,
    Header,
    Radio
} from "../../../components"


export default function Confirm() {

    return (
        <Container>
            <Header />
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
                                Sample pick up for Mudra has been scheduled.
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
                        <ConfirmImg/>
                            <Summary>

                                <SummaryIcn>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.8974 10.3178C3.8974 5.71789 7.83984 2 12.6086 2C17.3909 2 21.3333 5.71789 21.3333 10.3178C21.3333 12.6357 20.4687 14.7876 19.0456 16.6116C17.4757 18.6235 15.5406 20.3765 13.3626 21.7524C12.8641 22.0704 12.4142 22.0944 11.8671 21.7524C9.67662 20.3765 7.74159 18.6235 6.18509 16.6116C4.76097 14.7876 3.8974 12.6357 3.8974 10.3178ZM9.73763 10.5768C9.73763 12.1177 11.0273 13.3297 12.6086 13.3297C14.191 13.3297 15.4931 12.1177 15.4931 10.5768C15.4931 9.0478 14.191 7.77683 12.6086 7.77683C11.0273 7.77683 9.73763 9.0478 9.73763 10.5768Z" fill="#B6B8D7" />
                                    </svg>
                                </SummaryIcn>
                                <SummaryTxt>
                                    <SummaryLabel roll="header">Medplus</SummaryLabel>
                                    <SummaryLabel roll="txt">Order ID: 000000</SummaryLabel>
                                    <SummaryLabel roll="code">Authentication Code</SummaryLabel>
                                    <SummaryLabel roll="count">5896</SummaryLabel>
                                    <SummaryLabel roll="info">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.66988 -0.000976562H14.3399C17.7299 -0.000976562 19.9999 2.37902 19.9999 5.91902V14.09C19.9999 17.62 17.7299 19.999 14.3399 19.999H5.66988C2.27988 19.999 -0.00012207 17.62 -0.00012207 14.09V5.91902C-0.00012207 2.37902 2.27988 -0.000976562 5.66988 -0.000976562ZM9.98988 7.06002C9.51988 7.06002 9.12988 6.66902 9.12988 6.19002C9.12988 5.70002 9.51988 5.31002 10.0099 5.31002C10.4899 5.31002 10.8799 5.70002 10.8799 6.19002C10.8799 6.66902 10.4899 7.06002 9.98988 7.06002ZM10.8699 13.78C10.8699 14.26 10.4799 14.65 9.98988 14.65C9.50988 14.65 9.11988 14.26 9.11988 13.78V9.36002C9.11988 8.87902 9.50988 8.48002 9.98988 8.48002C10.4799 8.48002 10.8699 8.87902 10.8699 9.36002V13.78Z" fill="url(#paint0_linear)" />
                                            <defs>
                                                <linearGradient id="paint0_linear" x1="-0.000122783" y1="-9.37598" x2="12.3332" y2="32.4118" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#9096ED" />
                                                    <stop offset="1" stop-color="#494E9D" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        Why do I need an Authentication Code?
                                    </SummaryLabel>
                                </SummaryTxt>

                            </Summary>
                        </OrderSummaryInfo>

                        <Invoice>
                            <InvoiceLabel>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="#979797" />
                                    <path d="M14.5 9.22222H13.949C13.874 8.80889 13.7081 8.43556 13.4871 8.11111H14.5C14.776 8.11111 15 7.86222 15 7.55556C15 7.24889 14.776 7 14.5 7H11.5001H9.50023C9.22424 7 9.00025 7.24889 9.00025 7.55556C9.00025 7.86222 9.22424 8.11111 9.50023 8.11111H11.5001C12.1511 8.11111 12.7011 8.57667 12.9081 9.22222H9.50023C9.22424 9.22222 9.00025 9.47111 9.00025 9.77778C9.00025 10.0844 9.22424 10.3333 9.50023 10.3333H12.9081C12.7011 10.9789 12.1511 11.4444 11.5001 11.4444H9.50023C9.43523 11.4444 9.37023 11.4589 9.30924 11.4867C9.18724 11.5433 9.08925 11.6511 9.03825 11.7878C8.98725 11.9233 8.98725 12.0767 9.03825 12.2122C9.06325 12.2811 9.10025 12.3422 9.14724 12.3933L13.1461 16.8367C13.2441 16.9456 13.3721 17 13.5001 17C13.6281 17 13.7561 16.9456 13.854 16.8378C14.049 16.6211 14.049 16.2689 13.854 16.0522L10.7072 12.5556H11.5001C12.7081 12.5556 13.7171 11.6 13.949 10.3333H14.5C14.776 10.3333 15 10.0844 15 9.77778C15 9.47111 14.776 9.22222 14.5 9.22222Z" fill="white" />
                                </svg>
                                Invoice
                            </InvoiceLabel>
                            <InvoiceLabel>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.22558 16.8758C5.22558 15.6665 5.6964 14.5301 6.55123 13.6757L13.7247 6.50142C14.1005 6.12601 14.5327 5.8294 14.9993 5.60959V5.60159L14.9989 0L0 0.00220008V20.0005H6.48262C5.6732 19.1545 5.22558 18.0504 5.22558 16.8758ZM3.62513 3.25111H11.5754V4.65116H3.62513V3.25111ZM3.62513 6.65123H8.6003V8.05128H3.62513V6.65123Z" fill="#494E9D" />
                                    <path d="M13.0269 19.9994H14.9999L14.9997 18.0264L13.0269 19.9994Z" fill="#494E9D" />
                                    <path d="M15.0136 15.8783L10.6841 11.5483C10.6827 11.5469 10.6817 11.5451 10.6803 11.5439L7.53658 14.6881C6.32114 15.9029 6.32114 17.8734 7.53658 19.089C8.75122 20.304 10.7225 20.304 11.9373 19.089L15.0876 15.9385C15.0624 15.9195 15.0368 15.9013 15.0136 15.8783Z" fill="#494E9D" />
                                    <path d="M19.0883 7.53726C17.873 6.32222 15.903 6.32222 14.6875 7.53726L11.6694 10.5556C11.6708 10.557 11.6726 10.558 11.6738 10.5594L16.0036 14.8891C16.0266 14.9121 16.0448 14.9377 16.064 14.9629L19.0885 11.9382C20.3039 10.7234 20.3039 8.7527 19.0883 7.53726Z" fill="#494E9D" />
                                </svg>
                                Prescription
                            </InvoiceLabel>
                        </Invoice>
                    </OrderSummary>
                </PlaceHolder>

            </DeliveryContainer>

            <PlaceHolder>
                <BttnHolder><Button variant='primary' >Done</Button></BttnHolder>
               
            </PlaceHolder>

        </Container>
    )
}