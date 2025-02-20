import React from 'react';
import { useHistory } from 'react-router';
import { Icon, ProfileImage } from '..';
import defaultImage from '@app/assets/images/doctor-female.jpeg';
import defaultImageMale from '@app/assets/images/doctormale.jpg';
import {
    Container,

    DoctorImg,
} from './image-components';

type Props = {
    isDoctor?: boolean;
    url?: string;
    gender?: string;
};

export default function Image({ isDoctor = true, url, gender = 'MALE' }: Props) {
    let history = useHistory();

    const addDefaultSrc = (ev: any) => {
        ev.target.src = gender == 'MALE' ? defaultImageMale : defaultImage
    }
    return (
        <Container>
            <DoctorImg onError={addDefaultSrc} src={url} />
        </Container>
    );
}
