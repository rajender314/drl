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

} from './count-components';
type Props = {
    data?: any
}

export function CountCard({ data }: Props) {
    const { navigate } = useLocation();
    const [coverageData, setCoverageData] = useState(data)



    return (
        <Container>
            {coverageData && coverageData.countBreakDown ? (
                <>
                    <PriceDetails type="price">
                        <Pricekey>Starting Count</Pricekey>
                        <Price> {coverageData.countBreakDown.eligibleCount ? coverageData.countBreakDown.eligibleCount : 0}</Price>
                    </PriceDetails>
                    <PriceDetails type="price">
                        <Pricekey>Claimed</Pricekey>
                        <Price>  {coverageData.countBreakDown.claimCount ? coverageData.countBreakDown.claimCount : 0}</Price>
                    </PriceDetails>
                    <PriceDetails type="total">
                        <Pricekey>Final count</Pricekey>
                        <Price>  {coverageData.countBreakDown.availableCount ? coverageData.countBreakDown.availableCount : 0}</Price>
                    </PriceDetails>

                </>
            ) : (
                <NoDataMessage>No data available</NoDataMessage>
            )}
        </Container>
    );
}
