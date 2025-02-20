
import React, { useState } from 'react';
import {
	ButtonContainer,
	ProfileCardsOuter,
	SavedAddressOuter,
	Title,
	PackageLabel,
	PackageTitle
} from './account-info-components';
import ProfileCard from './profile-card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SavedAddress from './saved-addresses';
import { Button, Icon, PillText, Dialog } from '@app/components';
import { useLocation, getShortName } from '@app/utils';
import { LogoutDialog } from '@app/modules';
type Props = {
	userInfo: any;
};
export default function AccountInfo({ userInfo }: Props) {
	let userString: any = sessionStorage.getItem('user');
	const user = JSON.parse(userString);

	const [logoutModel, setLogoutModel] = useState(false)
	const { navigate } = useLocation();
	//console.log(userInfo)
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		className :'slide-100'
	};
	function confirmLogout() {
		setLogoutModel(true)
	}
	function closeLogoutModel() {
		setLogoutModel(false)
	}	

	return (
		<>
			{logoutModel && <LogoutDialog onClose={closeLogoutModel}/>}
			<Title>Profiles</Title>
			<ProfileCardsOuter >
				<Slider {...settings}>
					<ProfileCard user={userInfo}  />
					{userInfo.dependentList.map((dependent: any) => (
						<ProfileCard user={dependent} key={dependent.id} />
					))}
				</Slider>
			</ProfileCardsOuter>
			<PackageLabel>Insurance Product</PackageLabel>
			<PackageTitle><PillText variant='primary'>{userInfo.productName && userInfo.productName.includes('_') ? userInfo.productName.replace(/_/g, ' ') : userInfo.productName}</PillText></PackageTitle>
			<Title>Saved Address</Title>
			<SavedAddressOuter>
				<SavedAddress userInfo={userInfo} />
			</SavedAddressOuter>
			<Title>Support</Title>
			<ButtonContainer className="start">
				{/* <Button variant='secondary' onClick={() => navigate('/legal')}>
					<Icon name='legalIcon' />
					Legal
				</Button> */}
				<Button variant='secondary' onClick={(e)=>        document.location.href = "tel:180010288227" } className="just-ar">
					Call Customer Care 1800 1028 8227
					{/* <Icon name='questionmark' /> */}
					{/* FAQ */}
				</Button>
				{/* <Button variant='secondary' onClick={confirmLogout}>
					<Icon name='logout' /> Logout
				</Button> */}
			</ButtonContainer>
		</>
	);
}
