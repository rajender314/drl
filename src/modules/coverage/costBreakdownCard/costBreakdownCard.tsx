import { Button, Icon, Logo, Header, InsuranceCard } from '@app/components';
import { useLocation } from '@app/utils';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {
    Container,
    PriceDetails,
    Pricekey,
    Price,
    NoDataMessage

} from './cost-components';
type Props = {
    data?: any
}

export function CostCard({ data }: Props) {
    const { navigate } = useLocation();
    const [coverageData, setCoverageData] = useState(data)



    return (
        <Container>
            {coverageData && coverageData.costBreakDown ? (
                <>
                    <PriceDetails type="price">
                        <Pricekey>Paid by insurance</Pricekey>
                        <Price> &#8377; {coverageData.costBreakDown.paidByinsurance ? coverageData.costBreakDown.paidByinsurance : 0}</Price>
                    </PriceDetails>
                    <PriceDetails type="price">
                        <Pricekey>Paid by consumer</Pricekey>
                        <Price> &#8377; {coverageData.costBreakDown.paidByConsumer ? coverageData.costBreakDown.paidByConsumer : 0}</Price>
                    </PriceDetails>
                    <PriceDetails type="total">
                        <Pricekey>Transaction Total</Pricekey>
                        <Price> &#8377; {coverageData.costBreakDown.totalTransactionAmt ? coverageData.costBreakDown.totalTransactionAmt : 0}</Price>
                    </PriceDetails>

                </>
            ) : (
                <NoDataMessage>No data available</NoDataMessage>
            )}
        </Container>
    );
}
