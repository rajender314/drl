import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { ProgressBar } from '../../../@lib';
import { currency } from '../../../utils';
import Medplus from './medplus/medplus';
import MomAndPop from './momandpop/momandpop';

import {
    Container,
    DoctorInfoContainer,
    InfoTextContainer,
    Title,
    DeliveryContainer,
    PlaceHolder,
    CardTitle,
    ProgressWrapper

} from './pickup-components'
import {
    Icon,

    Button,
    Header,
    Radio
} from "../../../components"
import { useLocation } from '@app/utils';

export default function Pickup() {
    let mom_pop = true;
    const { navigate } = useLocation();
    let stageMessage = (mom_pop) ? 'Choose Pharmacy' : 'Choose Quantity'
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
            reviewStep: true
        },
        {
            label: 'Review',
            subtitle: '',
            name: '',
            content: '',
        },

    ];
    const pageBack = () => {
        navigate('/cart/delivery')
    }
    return (
        <Container>
            <Header onClose={pageBack} />
            <Title>My Cart</Title>
            <DeliveryContainer>
                <PlaceHolder>
                    <CardTitle>Pickup</CardTitle>
                    <ProgressWrapper>
                        <ProgressBar
                            startingStep={2}
                            onSubmit={() => { }}
                            steps={deliveryProgress}
                            stepClass='horizontal'
                            progressClass='horizontal'
                            showLabel
                        />
                    </ProgressWrapper>
                </PlaceHolder>

                {!mom_pop && <Medplus />}
                {mom_pop && <MomAndPop />}

            </DeliveryContainer>

            {/* <PlaceHolder>
                <Button variant='primary'>Next</Button>
            </PlaceHolder> */}

        </Container>
    )
}