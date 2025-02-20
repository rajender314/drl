import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import {
    Container,
    Logo,
    Logolabel,
    DoctorInfoContainer,
    InfoTextContainer,
    Title,
    DeliveryContainer,
    AddressContainer,
    PlaceHolder,
    CardTitle,
    BttnHolder,
    LabContainer
} from './logout-components'
import {
    Icon,
    Button,
    Header,
    Radio
} from "../../components"
import { useLocation } from '@app/utils';
import { clearSession } from '@app/@services/user/user';
export default function Logout() {
    const { navigate } = useLocation();


    React.useEffect(() => {
        clearSession().then((res: any) => {
            localStorage.clear();
            sessionStorage.clear();           
        });
    }, []);
    const moveLogin = () => {
        window.location.href = `${process.env.REACT_APP_HOMEPAGE}/login`
        //navigate('/login')
    }
    const moveSignup = () => {
        window.location.href = `${process.env.REACT_APP_HOMEPAGE}/signup`
        //navigate('/signup')
    }
    return (
        <Container>
            <Title>You have successfully logged out. We hope to see you again.</Title>
            <DeliveryContainer>
                <Logo><Icon name="logoutscreen" /></Logo>
                {/* <Logolabel></Logolabel> */}

                <PlaceHolder>
                    <BttnHolder><Button variant='primary' onClick={moveLogin}>Login Now</Button></BttnHolder>
                    <BttnHolder><Button variant='secondary' onClick={moveSignup}>Sign Up</Button></BttnHolder>
                </PlaceHolder>
            </DeliveryContainer>
            <Title  className="t-cen">Powered by SVAAS</Title>
        </Container>
    )
}