import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import Medication from '../medication';
import { useLocation } from '@app/utils';
import {
    Container,
    DoctorInfoContainer,
    InfoTextContainer,
    Title,
    LabCard,
    RescheduleContainer,
    CancelTitle,
    RescheduleCard,
    SlotsDetails,
    Detail,
    Label,
    LabVisitContainer,
    NoDataMessage,
    DetailsContainer,
    TabDetails

} from './cart-components'
import {
    Icon,
    Button,
    Header,
    Tabs,
} from "../../../components"


export default function Cart() {
    const history = useHistory();
    const { navigate } = useLocation();
    //const { state }: any = location;

    const labels = ['Medication', 'Laboratory'];
    const [selectedTab, setSelectedTab] = React.useState(labels[0]);
    const [CIOC, SetCIOC] = React.useState<any>()
    React.useEffect(() => {
        //console.log(history)
    }, []);
    function setTab(tab: string) {
        history.push({
            pathname: '/cart',
            state: { selectedTab: tab },
        });
        setSelectedTab(tab);
    }
    const pageBack = () => {
        navigate('files/prescriptions')
    }
    const cartOperation = (code: any) => {
        SetCIOC(code);
        setTimeout(() => { SetCIOC('') }, 500)
    }
    return (
        <Container>
            <Header onClose={pageBack} CIOC={CIOC} />
            <Title>My Cart</Title>
            {/* <DetailsContainer>
                <Tabs
                    selectedLabel={selectedTab}
                    onClick={(e: any) => setTab(e)}
                    labels={labels}
                    type="custom-yellow"
                />
                <TabDetails>
                    {selectedTab === 'Medication' && <Medication cartOperation = {cartOperation} />}
                    {selectedTab === 'Laboratory' &&
                        <NoDataMessage>Diagnosis orders are placed by Health Coach, Please connect with your Health Coach for more details</NoDataMessage>
                    }
                </TabDetails>
            </DetailsContainer> */}
            <DetailsContainer>
                <TabDetails>
                    <Medication cartOperation={cartOperation} />
                </TabDetails>

            </DetailsContainer>

        </Container>
    )
}