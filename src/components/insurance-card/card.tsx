import React from 'react';
import {
    Container,
    Card,
    CardBg,
    CardContent,
    Label,
    Name,
    Number,
    InfoContainer,
    CardLayer,

} from './card-components';
import { Icon } from './../../components'
import { useLocation } from '@app/utils';
type Props = {
    data?: any

}
export default function HealthFileCard({
    data
}: Props) {
    const { navigate } = useLocation();

    return (
        <Container>
            <Card>
            </Card>
            <CardBg>
                <Icon name="cardInnerLogo" />
            </CardBg>
            <CardLayer>
                <CardContent>
                    <Icon name="InsuranceCardLogo" />
                    <InfoContainer>
                        <Label>Member ID</Label>
                        <Number>{data.insuranceId}</Number>
                        <Name>{data.phName}</Name>
                    </InfoContainer>
                </CardContent>
            </CardLayer>
        </Container>
    );
}
