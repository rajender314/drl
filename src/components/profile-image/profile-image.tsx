import React from 'react';
import { ProfileIcon } from './profile-image-components';

type Props = {
    imageUrl?:string
    onClick?:() => void
}
export default function ProfileImage({imageUrl,onClick}:Props){
    return <ProfileIcon image={imageUrl} onClick={onClick}/>
}