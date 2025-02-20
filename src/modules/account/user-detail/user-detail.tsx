import { getUserDetail } from '@app/@services/user/user';
import { Spinner } from '@app/components/icon/icons';
import React from 'react';
import { useParams } from 'react-router';
import {
	Container,
	DetailsContainer,
	Label,
	Name,
	ProfileImage,
	Text,
} from './user-detail-components';
import { Header } from '@app/components';
import moment from 'moment';

export default function UserDetail() {
	const [userdata, setUserData] = React.useState<any>(null);
	const [loading, setLoading] = React.useState(true);
	const { userId }: any = useParams();

	React.useEffect(() => {
		getUser();
	}, []);

	async function getUser() {
		const data = await getUserDetail(userId);
		setUserData(data.data);
		setLoading(false);
	}

	if (loading) {
		return <Spinner size='3px' />;
	}

	return (
		<Container>
			<Header />
			<ProfileImage image={userdata.profileImage} />
			<DetailsContainer>
				<Name>{userdata.firstName?`${userdata.firstName} ${userdata.lastName}`:''}</Name>
				<Label>Registered Name</Label>
				<Text>{userdata.firstName?`${userdata.firstName} ${userdata.lastName}`:''}</Text>
				<Label>Age</Label>
				<Text>{userdata.age}</Text>
				<Label>Registered mobile number</Label>
				<Text>{userdata.mobile}</Text>
				<Label>Email</Label>
				<Text>{userdata.emailId}</Text>
				<Label>OPD ID</Label>
				<Text>{userdata.opdId}</Text>
				<Label>Valid Till</Label>
				<Text>{userdata.validity?moment(userdata.validity).format('MM/DD/YYYY'):''}</Text>
				{/* <Label>Employee ID</Label>
				<Text>{userdata.employeeNumber}</Text> */}
			</DetailsContainer>
		</Container>
	);
}
