import { useLocation, testImage, getShortName } from '@app/utils';
import moment from 'moment';
import React, { useState } from 'react';
import {
	Card,
	ProfileIcon,
	UserInfo,
	Title,
	Text,
	Pill,
	StatusText,
} from './profile-card-components';

type Props = {
	user: any;
};

export default function ProfileCard({ user }: Props) {
	const { navigate } = useLocation();
	const [isImage, setIsImage] = useState(false)
	const getUrl = async () => {
		if (!user) {
			return
		}
		await testImage(user.profileImage).then((res: any) => {
			if (res) {
				setIsImage(true)
			} else {
				setIsImage(false)
			}
		}).catch(error => { })
	}
	return (
		<Card style={{width:'100%'}} >
			<ProfileIcon image={user.profileImage || ''} >
				{!isImage && getShortName(user)}
			</ProfileIcon>
			<UserInfo>
				<Title>{user.fullName || user.name}</Title>
				<Text>{`${user.age} years`}</Text>
				{user.dob && <Text>{moment(user.dob).format('DD MMM, YYYY')}</Text>}
				<Text>{user.userPersona || user.relationShip}</Text>
				<Pill onClick={() => navigate(`/myaccount/${user.svassUserId || user.patientId}`)}>View Profile</Pill>
				{/* {user.userPersona && <StatusText>Currently Viewing</StatusText>} */}
			</UserInfo>

		</Card>

	);
}
